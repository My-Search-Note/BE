declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRETKEY: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}
