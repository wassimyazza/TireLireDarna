

const STORAGE_KEY = 'pkce_state'

export interface PKCEState {
    codeVerifier: string
    codeChallenge: string
    state: string
}

/**
 * Generate a random string for PKCE code verifier
 */
function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let result = ''
    const randomValues = new Uint8Array(length)
    crypto.getRandomValues(randomValues)

    for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % chars.length]
    }

    return result
}

/**
 * Generate SHA256 hash and base64url encode it
 */
async function sha256(plain: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    const hash = await crypto.subtle.digest('SHA-256', data)

    // Convert to base64url
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

/**
 * Generate PKCE code verifier and challenge
 */
export async function generatePKCE(): Promise<PKCEState> {
    const codeVerifier = generateRandomString(128)
    const codeChallenge = await sha256(codeVerifier)
    const state = generateRandomString(32)

    const pkceState: PKCEState = {
        codeVerifier,
        codeChallenge,
        state,
    }

    // Store in sessionStorage for OAuth flow
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pkceState))

    return pkceState
}

/**
 * Retrieve and clear PKCE state from storage
 */
export function retrievePKCEState(): PKCEState | null {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    try {
        const state = JSON.parse(stored) as PKCEState
        sessionStorage.removeItem(STORAGE_KEY)
        return state
    } catch {
        return null
    }
}

/**
 * Build OAuth authorization URL with PKCE
 */
export function buildAuthorizationUrl(
    authEndpoint: string,
    clientId: string,
    redirectUri: string,
    codeChallenge: string,
    state: string,
    scope = 'openid profile email'
): string {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        state,
        scope,
    })

    return `${authEndpoint}?${params.toString()}`
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(
    tokenEndpoint: string,
    code: string,
    codeVerifier: string,
    clientId: string,
    redirectUri: string
): Promise<{
    access_token: string
    id_token?: string
    refresh_token?: string
    expires_in: number
}> {
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: codeVerifier,
        }),
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Token exchange failed: ${error}`)
    }

    return response.json()
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
    tokenEndpoint: string,
    refreshToken: string,
    clientId: string
): Promise<{
    access_token: string
    refresh_token?: string
    expires_in: number
}> {
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
        }),
    })

    if (!response.ok) {
        throw new Error('Token refresh failed')
    }

    return response.json()
}
