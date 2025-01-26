export interface EnvironmentVariables {
    port: number;
    database: {
        host: string;
        user: string;
        password: string;
        database: string;
        port: number;
    }
}

export default (): EnvironmentVariables => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST || 'default_host',
      user: process.env.DATABASE_USER || 'default_user',
      password: process.env.DATABASE_PASSWORD || 'default_password',
      database: process.env.DATABASE_NAME || 'default_database',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306
    }
});
