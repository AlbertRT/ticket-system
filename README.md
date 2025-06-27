# 🎫 Ticket-System

A modern ticket management system with support for Google OAuth authentication, quick login via registered devices, and biometric authentication (currently in beta).

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/ticket-system.git
cd ticket-system
npm install
```

```
npx prisma db push
```

> ⚠️ Ensure the folder name is correctly spelled as `ticket-system`.

---

## 🛠️ Environment Variables

To run this project, create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=postgresql://<dbusername>:<dbpassword>@localhost:5432/tiketen
AUTH_SECRET=
JWT_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=localhost
NEXT_PUBLIC_ORIGIN=http://localhost:3000
```

To obtain `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`, set up your project at:  
👉 https://console.cloud.google.com/

> Register your app on Google Cloud Console and enable the "OAuth 2.0 Client IDs" under the **Credentials** section.

---

## 🔐 Features

- **Google OAuth** – Sign up and log in using your Google account.
- **Quick Login** – Instantly log in from previously registered devices.
- **Biometric Authentication (Beta)** – Enhanced security with fingerprint or face recognition.

---

## Documentation
[AuthJS](https://authjs.dev/)

[Prisma](https://www.prisma.io/)

## 🧪 Status

This project is currently under development. Contributions and feedback are welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
