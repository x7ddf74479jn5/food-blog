declare namespace NodeJS {
  interface ProcessEnv {
    readonly GOOGLE_APPLICATION_CREDENTIALS: string;
    readonly GA_PROPERTY_ID: string;
    readonly NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
    readonly SERVICE_DOMAIN: string;
    readonly X_MICROCMS_API_KEY: string;
  }
}
