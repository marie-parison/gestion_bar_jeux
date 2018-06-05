// Definition for type the define method of sequelize
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";

declare global {
    type SequelizeAttributes<T extends { [key: string]: any }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}