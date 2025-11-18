# IVR System (NestJS + Twilio)

This project implements an Interactive Voice Response (IVR) system using **NestJS** and **Twilio**.  
It includes user authentication, call handling, voicemail processing, and a modular IVR flow.  
The codebase follows a clean architecture with separated modules, DTOs, interfaces, and schemas.

---

## Features

- IVR call flow handling using Twilio Webhooks
- User authentication using JWT
- Call logging and voicemail recording
- Modular NestJS architecture (Auth, Call, IVR, Common)
- MongoDB schemas for users, calls, and voicemails
- DTO validation for request data
- Response handler for consistent API output

---

## Tech Stack

- **NestJS**
- **TypeScript**
- **Twilio**
- **MongoDB / Mongoose**
- **JWT Authentication**

---

## Project Structure

```
src/
│
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── signup.dto.ts
│   ├── interfaces/
│   │   ├── jwt-payload.interface.ts
│   │   └── user.interface.ts
│   ├── schemas/
│   │   └── user.schema.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
│
├── call/
│   ├── dto/
│   │   ├── create-call.dto.ts
│   │   └── create-voicemail.dto.ts
│   ├── interfaces/
│   │   ├── call.interface.ts
│   │   └── voicemail.interface.ts
│   ├── schemas/
│   │   ├── call.schema.ts
│   │   └── voicemail.schema.ts
│   ├── call.controller.ts
│   ├── call.module.ts
│   └── call.service.ts
│
├── ivr/
│   ├── ivr.controller.ts
│   ├── ivr.module.ts
│   └── ivr.service.ts
│
├── common/
│   └── response-handler.ts
│
├── app.module.ts
└── main.ts
```

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```
MONGODB_URI=mongodb://localhost:27017/ivr
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
BASE_URL=https://your-server.com
```

---

## Running the Project

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

---

## Twilio Webhook Setup

Set the following Twilio webhook URLs:

| Twilio Event       | URL                                      |
|--------------------|-------------------------------------------|
| Incoming Call      | `POST {BASE_URL}/ivr/handle`              |
| Voicemail Callback | `POST {BASE_URL}/call/voicemail`          |

Ensure these URLs are publicly accessible (use **ngrok** for local development).

---

## API Endpoints

### Authentication
| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| POST   | `/auth/signup` | Create a new user    |
| POST   | `/auth/login`  | Authenticate user    |

### IVR
| Method | Endpoint         | Description                    |
|--------|------------------|--------------------------------|
| POST   | `/ivr/handle`    | Entry point for IVR call flow  |

### Call
| Method | Endpoint             | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/call/log`           | Log inbound call              |
| POST   | `/call/voicemail`     | Handle voicemail callback     |

---

## Modules Overview

### Auth Module
- Handles user registration and login
- Uses JWT for authentication
- Stores users in MongoDB

### IVR Module
- Receives incoming calls
- Generates TwiML responses for menu options
- Routes calls to services based on user input

### Call Module
- Saves call information
- Stores voicemail metadata
- Integrates with Twilio callback events

### Common Module
- Shared response handler for consistent API structure

---

## Scripts

```
npm run start           # Start application
npm run start:dev       # Start in watch mode
npm run build           # Compile TypeScript
npm run lint            # Run ESLint
```

---

## License

This project is provided for development and educational purposes.  
You may modify or extend it as needed.

