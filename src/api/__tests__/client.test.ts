import { apiDarna, tokenStorage } from '@/api/client'

describe('API Client Interceptors', () => {
    beforeEach(() => {
        tokenStorage.clearTokens()
    })

    it('should inject access token in request headers', async () => {
        const mockToken = 'test-access-token'
        tokenStorage.setAccessToken(mockToken)

        const requestConfig = await apiDarna.interceptors.request.handlers[0].fulfilled({
            headers: {},
        } as any)

        expect(requestConfig.headers.Authorization).toBe(`Bearer ${mockToken}`)
    })

    it('should handle requests without token', async () => {
        const requestConfig = await apiDarna.interceptors.request.handlers[0].fulfilled({
            headers: {},
        } as any)

        expect(requestConfig.headers.Authorization).toBeUndefined()
    })
})
