This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Development

### Run tests

```bash
npm run test
```

### Lint
```bash
npm run lint
```

### Prettier
```bash
npm run prettier
```

## Data
This application loads data from a Google sheet with read-only access restricted to a service account.

1. Create a project https://console.cloud.google.com/projectcreate
1. Create a service account for your project https://console.cloud.google.com/iam-admin/serviceaccounts
1. Use the service account credentials to populate your environment variables https://googleapis.dev/nodejs/googleapis/latest/sheets/index.html#service-account-credentials

`GOOGLE_PROJECT_ID` is the ID of the project
`GOOGLE_EMAIL` is the email for the service account
`GOOGLE_PRIVATE_KEY` is the service account's private key
`SHEET_ID` is the ID of the sheet

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
