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

## 🤮 Test Card BINs (for Internal Use Only)

Here is a list of **test card BINs** for internal use to simulate issuer and brand detection:

| Card Number (Sample)       | Bank Issuer                                           | Brand               | Type     |
|----------------------------|--------------------------------------------------------|---------------------|----------|
| 5264 2200 1234 1230        | PT. BANK NEGARA INDONESIA (PERSERO) TBK               | Mastercard          | Debit    |
| 5243 2544 4000 0001        | PT. BANK MANDIRI (PERSERO) TBK                        | Mastercard          | Credit   |
| 4895 0300 4123 1000        | PT. BANK CIMB NIAGA TBK                               | Visa                | Credit   |
| 4893 8512 3123 1231        | PT. BANK PERMATA TBK                                  | Visa                | Debit    |
| 3795 6512 3444 555         | PT BANK CENTRAL ASIA                                  | American Express    | Credit   |
| 5393 7100 0000 0001        | PT BANK DIGITAL BCA                                   | Mastercard          | Debit    |
| 3562 8055 5555 5555        | PT BANK CENTRAL ASIA                                  | American Express    | Credit   |
| 5104 8111 1231 2333        | PT. BANK MAYBANK INDONESIA TBK                        | Mastercard          | Debit    |
| 5124 2200 9123 1238        | PT. BANK DBS INDONESIA                                | Mastercard          | Debit    |
| 5126 2011 1111 1111        | PT BANK UOB INDONESIA                                 | Mastercard          | Credit   |
| 5149 3412 3456 7890        | PT BANK DANAMON INDONESIA TBK                         | Mastercard          | Credit   |
| 4013 5312 3920 3           | PT BANK OCBC NISP TBK                                 | Visa                | Credit   |
| 6259 1809 2912 9729        | ICBC INDONESIA BRANCH                                 | UnionPay            | Credit   |
| 4043 0512 3123 1222        | PT BANK SYARIAH INDONESIA TBK                         | Visa                | Debit    |
| 4009 3412 3888 8111        | PT BANK HSBC INDONESIA                                | Visa                | Credit   |
| 5541 9923 9123 8199        | PT. PAN INDONESIA BANK TBK (PT. BANK PANIN TBK)       | Mastercard          | Credit   |
| 5534 7912 3123 1231        | PT. BANK RAKYAT INDONESIA (PERSERO)                   | Mastercard          | Credit   |

> 🛑 **Note**: These card numbers are simulated BINs for testing and not connected to real payment networks.

---

## Documentation
[AuthJS](https://authjs.dev/)

[Prisma](https://www.prisma.io/)

## 🧪 Status

This project is currently under development. Contributions and feedback are welcome!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
