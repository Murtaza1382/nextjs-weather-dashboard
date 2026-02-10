// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? "", // set in Vercel/GitHub Actions when ready
  tracesSampleRate: 0.1,
  // Optionally add environment/other settings
});
