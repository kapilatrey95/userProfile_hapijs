import { Sequelize, DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import { userProfile } from '../interfaces/userProfile.model';
import * as bcrypt from 'bcrypt';
export type userProfileAttributes = Partial<
userProfile
>;

export class userProfileModel extends Model{
    id!: string;
    userName!: string;
    hash!: string;
}
export default function (sequelize: Sequelize) : typeof userProfileModel{
    userProfileModel.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          userName:{
            allowNull: false,
            type: DataTypes.STRING
          },
          hash:{
            allowNull: false,
            type:DataTypes.STRING
          }

    },
    {
        tableName: 'userProfile', 
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        sequelize,
      },
    )
    return userProfileModel ;

}



