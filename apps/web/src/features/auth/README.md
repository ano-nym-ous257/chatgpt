# Auth Feature

Handles user authentication, session management, and identity.

Responsibilities:
- Login and registration flows
- Session lifecycle (access/refresh tokens)
- MFA enrollment and verification
- Password management
- Device trust and recognition

Boundaries:
- Does NOT manage user profile data (see settings)
- Does NOT enforce payment authorization (see payments)
- Exposes auth state to other features via AuthProvider
