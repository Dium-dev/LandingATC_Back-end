import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface IAdminUser {
  id?: string;
  nickName?: string;
  email?: string;
  password?: string;
}

@Table({
  tableName: 'AdminUser',
  timestamps: false,
  underscored: true,
})
export class AdminUser extends Model implements IAdminUser {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  nickName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
