/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    translate: (key: string, param?: string | number) => string
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_ANALYTICS_ID: string
  readonly PUBLIC_UMAMI_ANALYTICS_ID: string
  readonly POSTHOG_PROJECT_API_KEY: string
  readonly POSTHOG_PROJECT_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
