# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in PaymentFlow AI, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

### How to Report

Email: security@paymentflow.ai

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

| Action | SLA |
|--------|-----|
| Acknowledgment | 48 hours |
| Initial assessment | 5 business days |
| Fix for critical issues | 7 days |
| Fix for high issues | 14 days |
| Fix for medium/low issues | 30 days |

### Scope

The following are in scope:
- Source code in this repository
- API endpoints (when deployed)
- Authentication and authorization logic
- Data handling and storage
- Dependencies with known vulnerabilities

### Out of Scope

- Social engineering
- Denial of service attacks
- Issues in third-party services not controlled by this project

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.x (current) | Yes — development phase |

## Security Practices

- All dependencies are audited via `pnpm audit` in CI
- Secrets are never committed to the repository
- PII is masked in all log output
- Input is validated at every API boundary
- See `CLAUDE.md` §6 for complete security rules
