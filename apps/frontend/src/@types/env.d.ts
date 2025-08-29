/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly FEATURE_ENTERPRISE?: "true" | "false";
  readonly FEATURE_AI?: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
