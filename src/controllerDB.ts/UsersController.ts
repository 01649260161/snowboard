import { NextFunction, Request, Response } from "express";
import MysqlDataSource from "../connection/conn";
import { Users } from "../entity/Users";

export class UsersController {
    private userRepository = MysqlDataSource.getRepository(Users);
    async getInfo(request: any) {
        try {
            const { id } = request;
            if (!id) throw new Error("Missing id params")
            const user = await this.userRepository.findOne({ where: { id: id } });
            if (!user) throw new Error("User not found")
            return user
        } catch (error) {
            return {
                errorStatus: 1,
                errorStack: error.stack ? error.stack : error
            }
        }
    }


}