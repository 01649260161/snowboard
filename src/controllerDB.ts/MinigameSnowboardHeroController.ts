import { NextFunction, Request, Response } from "express";
import MysqlDataSource from "../connection/conn";
import { MinigameSnowboardHero } from "../entity/MinigameSnowboardHero";

export class MinigameSnowboardHeroController {

    private rePos = MysqlDataSource.getRepository(MinigameSnowboardHero);

    async getInfoMiniGameAndInsert(request: any) {
        try {
            const { username } = request
            const Info: any = await this.rePos.findOne({
                where: {
                    username: username
                }
            })
              if (!Info) {
                const saveInfo = new MinigameSnowboardHero();
                saveInfo.username = username
                saveInfo.turn = 0
                saveInfo.hCoin = 0
                saveInfo.createdAt = new Date()
                saveInfo.updatedAt = new Date()
                const gameInfo = await this.rePos.save(saveInfo);
                return gameInfo;
              }
              return Info;
        } catch (error) {
            console.log(error)
            return {
                errorStatus: 1,
                errorStack: error.stack ? error.stack : error
            }
        }
    }

    async updateInfoMinigame(request: any) {
        try {
            const { id, hCoin, point } = request
            const Info: any = await this.rePos.findOne({
                where: {
                    id: id
                }
            })
            if(Info) {
                await this.rePos.update({ id: id }, { 
                    hCoin: Info.hCoin + hCoin,
                    totalPoint: Info.totalPoint + point,
                    maxPoint: (Info.totalPoint < point) ? point : Info.totalPoint
                });
            }
            return Info
        } catch (error) {
            console.log(error)
            return {
                errorStatus: 1,
                errorStack: error.stack ? error.stack : error
            }
        }
    }

    async updateGameBet(request: any) {
        try {
            const { username, hCoin, status } = request
            // status : 1 win, 0: lose
            const Info: any = await this.rePos.findOne({
                where: {
                    username: username
                }
            })
            if(Info) {
                if(status === 1) {
                    await this.rePos.update({ username: username }, { 
                        hCoin: Info.hCoin + hCoin
                    });
                } else {
                    await this.rePos.update({ username: username }, { 
                        hCoin: Info.hCoin - hCoin
                    });
                }
            }
            return Info
        } catch (error) {
            console.log(error)
            return {
                errorStatus: 1,
                errorStack: error.stack ? error.stack : error
            }
        }
    }

}