## Overview

This application is designed to track server statuses over a specific date range, displaying detailed metrics such as uptime, response time, and status history. The project also includes user authentication to ensure secure access to the data.

---

## Features

- **Server Management**: Displays server information, including status, response time, and uptime.
- **Daily Status Tracking**: Generates and visualizes daily status history for a configurable date range.
- **Dynamic Styling**: Status-based styling for intuitive visuals.
- **User Authentication**: Secure login system to restrict access to authorized users.

---

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Authentication**: Clerk (or your authentication provider)
- **State Management**: Local State
- **Development Tools**: Node.js, ESLint, Prettier

---

## Authentication

The application uses **Clerk** for user authentication, including:

- **Sign In/Sign Out**: Users can securely log in and log out.
- **OTP Authentication**: Login via one-time password sent to a registered phone number or email.
- **Session Management**: Securely manages user sessions.
