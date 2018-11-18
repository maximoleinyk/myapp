import * as dotenv from 'dotenv';

dotenv.config();

export interface ApplicationConfig {
    service: {
        host: string,
        port: number
    }
}

export default {
    service: {
        host: process.env.SERVICE_HOST,
        port: parseInt(process.env.SERVICE_PORT || '', 10)
    }
}