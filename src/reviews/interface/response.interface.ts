import IResponse from "src/utils/interface/response.interface";
import { IReview } from "../entities/interface/reviews.interface";

export interface IFindAllResponse extends IResponse {
    data?: IReview[] | [];
}