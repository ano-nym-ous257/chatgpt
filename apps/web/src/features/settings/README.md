# Settings Feature

Manages user preferences, profile data, and account configuration.

Responsibilities:
- Profile editing (name, email, phone)
- Security settings (password change, MFA management)
- Notification preferences
- Connected devices and sessions
- Account closure flow

Boundaries:
- Does NOT handle authentication flows (see auth)
- Does NOT manage financial configuration (see wallets)
- Profile changes go through the user service API
