import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IReview } from "./interface/reviews.interface";
import { RatingEnum } from "./enum/reviews.enum";

@Table({
    tableName: 'Review',
    timestamps: false,
    paranoid: true,
    underscored: true,
})
export class Review extends Model implements IReview {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    })
    id: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    review: string;

    @Column({
        type: DataType.ENUM(...Object.values(RatingEnum)),
        allowNull: false
    })
    rating: RatingEnum;

    @Column({
        type: DataType.STRING({ length: 50 }),
        allowNull: false,
    })
    user: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    date: Date;

}
