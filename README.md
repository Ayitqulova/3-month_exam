# Transport & Staff Management REST API

Backend REST API for managing staff, branches, and transport assets with role-based access control.

## Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (pg)
- **JWT** — authentication
- **bcrypt** — password hashing
- **Nodemailer** — OTP email verification
- **Joi** — request validation
- **express-fileupload** — file uploads

## Features

- OTP-based email verification on registration
- JWT authentication (access token)
- Role-based access control (RBAC) with granular permissions
- Full CRUD for Staff, Branches, and Transport
- Error logging to file

## API Endpoints

### Auth / Staff
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/staff/register` | Register (sends OTP to email) |
| POST | `/staff/verify` | Verify OTP and create account |
| POST | `/staff/login` | Login, returns JWT |
| GET | `/staff` | Get all staff (auth required) |
| PUT | `/staff/:id` | Update staff |
| DELETE | `/staff/:id` | Delete staff |
| POST | `/staff/permissions` | Assign permissions to staff |

### Branch
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/branch` | Create branch |
| GET | `/branch` | Get all branches |
| PUT | `/branch/:id` | Update branch |
| DELETE | `/branch/:id` | Delete branch |

### Transport
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/branch/:branch_id/transport` | Add transport to branch |
| GET | `/transport` | Get all transport |
| PUT | `/branch/:branch_id/transport/:id` | Update transport |
| DELETE | `/branch/:branch_id/transport/:id` | Delete transport |

## Setup

```bash
npm install
```

Create `.env` file:
```
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_DATABASE=your_db_name
Db_PASSWORD=your_password
PORT=4545
JWT_SECRET=your_secret
```

```bash
npm run dev
```
