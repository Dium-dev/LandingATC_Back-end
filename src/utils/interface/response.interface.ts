import { HttpStatus } from "@nestjs/common";

export default interface IResponse {
    statusCode: HttpStatus;
    message?: string;
}