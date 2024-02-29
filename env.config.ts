import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { config } from 'dotenv';
config();

export const Host = {
    port: process.env.HOST_PORT
}
