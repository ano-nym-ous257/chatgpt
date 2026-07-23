# Auth Feature

Provides the deployable MVP authentication experience.

Implemented now:
- Lamplight-inspired login and registration pages
- Browser-local demo accounts with salted SHA-256 password hashes
- Remember-me and session-only sign-in modes
- Protected workspace routes, profile-aware navigation, and sign-out
- Clear demo-security messaging

Production boundary:
- Browser storage is for product demonstration only and is not a security boundary.
- Production auth must move credentials, sessions, verification, MFA, lockout, and audit logging to the auth service described in M1.
- Payment authorization remains separate from identity authentication.
