# TireLireDarna Frontend

Complete React TypeScript frontend for the TireLireDarna platform - combining real estate (Darna) and savings groups (Tirelire) with integrated SSO authentication.

## Features

- **Authentication**: PKCE OAuth 2.0 flow with SSO, automatic token refresh, and secure token storage
- **Real Estate (Darna)**:
  - Property browsing with advanced filtering and search
  - Property CRUD operations
  - Image uploads with progress tracking
  - Map-based location search
  - Favorites and messaging
- **Savings Groups (Tirelire)**:
  - Group creation and management
  - Contribution tracking
  - KYC verification flow
  - Trust score system
- **Admin Panel**: User and property moderation, KYC review
- **Real-time**: Socket.IO integration for chat and notifications
- **State Management**: Redux Toolkit + React Query
- **UI**: Responsive design with TailwindCSS

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Redux Toolkit** for app state
- **React Query** for server state
- **React Router** for routing
- **Socket.IO Client** for real-time features
- **Axios** for HTTP requests
- **React Hook Form** + **Zod** for forms
- **Jest** + **React Testing Library** for testing

## Prerequisites

- Node.js 20+
- npm

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Required Environment Variables:**

```env
# Backend APIs
VITE_DARNA_API_URL=http://localhost:4000
VITE_TIRELIRE_API_URL=http://localhost:5000
VITE_SSO_API_URL=http://localhost:4444

# SSO OAuth Configuration
VITE_SSO_CLIENT_ID=tireliredarna-client
VITE_SSO_REDIRECT_URI=http://localhost:5173/auth/callback
VITE_SSO_AUTH_ENDPOINT=http://localhost:4444/auth/authorize
VITE_SSO_TOKEN_ENDPOINT=http://localhost:4444/auth/token
VITE_SSO_LOGOUT_ENDPOINT=http://localhost:4444/auth/logout

# Optional
VITE_MAPBOX_TOKEN=<your-mapbox-token>
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_<your-key>
VITE_SENTRY_DSN=<your-sentry-dsn>
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Backend Services

Ensure the following backend services are running:

- **Darna API**: `http://localhost:4000`
- **Tirelire API**: `http://localhost:5000`
- **SSO Service**: `http://localhost:4444`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── api/              # API clients and interceptors
├── components/       # React components
│   ├── auth/        # Auth-related components
│   ├── common/      # Shared components
│   └── layouts/     # Layout components
├── config/          # Configuration files
├── contexts/        # React contexts
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── admin/      # Admin pages
│   ├── dashboard/  # User dashboard pages
│   ├── public/     # Public pages
│   └── tirelire/   # Tirelire pages
├── store/           # Redux store and slices
├── utils/           # Utility functions
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

## Authentication Flow

1. User clicks "Login" → redirected to SSO
2. OAuth PKCE flow initiated with code challenge
3. User authenticates on SSO
4. Redirect to `/auth/callback` with authorization code
5. Frontend exchanges code for tokens using code verifier
6. Tokens stored in memory (configurable to localStorage)
7. API clients auto-inject tokens and handle 401 refresh

**SSO Redirect URIs to whitelist:**
- `http://localhost:5173/auth/callback`

## API Integration

### Darna API Endpoints

- `GET /properties` - List properties
- `POST /properties` - Create property (auth required)
- `GET /properties/:id` - Get property details
- `PUT /properties/:id` - Update property (auth required)
- `DELETE /properties/:id` - Delete property (auth required)
- `GET /auth/profile` - Get user profile

### Tirelire API Endpoints

- `GET /api/groups` - List groups
- `POST /api/groups` - Create group (KYC required)
- `GET /api/groups/:id` - Group details
- `POST /api/groups/:id/invite` - Invite members
- `POST /api/contributions/group/:id/contribute` - Contribute
- `POST /api/kyc/upload` - Upload KYC documents
- `GET /api/kyc/status` - Get KYC status

### SSO Endpoints

- `GET /auth/authorize` - OAuth authorization
- `POST /auth/token` - Token exchange
- `POST /auth/logout` - Logout

## Testing

Run tests:

```bash
npm test
```

Run with coverage:

```bash
npm test -- --coverage
```

## Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` directory.

### Environment Variables for Production

Update `.env.production` with production URLs and keys.

## Troubleshooting

### Token Refresh Issues

- Check that `VITE_SSO_TOKEN_ENDPOINT` is correct
- Verify refresh token is being stored
- Check browser console for specific error messages

### CORS Errors

- Ensure backend APIs have CORS configured for frontend origin
- Check Vite proxy configuration in `vite.config.ts`

### Socket.IO Connection Failures

- Verify `VITE_SOCKET_URL` points to correct backend
- Check that Socket.IO server is running
- Ensure auth token is valid

## Contributing

1. Create a feature branch
2. Make changes
3. Run tests and lint
4. Submit pull request

## License

MIT

## Support

For issues or questions, contact: contact@darna.com
