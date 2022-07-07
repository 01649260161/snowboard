import { MinigameSnowboardHeroController } from "../controllerDB.ts/MinigameSnowboardHeroController";
import { UsersController } from "../controllerDB.ts/UsersController";

export const Routes = [{
    method: "post",
    route: "/user/info",
    controller: UsersController,
    action: "getInfo"
}, {
    method: "post",
    route: "/game/info",
    controller: MinigameSnowboardHeroController,
    action: "getInfoMiniGameAndInsert"
}, {
    method: "post",
    route: "/game/update",
    controller: MinigameSnowboardHeroController,
    action: "updateInfoMinigame"
}, {
    method: "post",
    route: "/gamePvp/update",
    controller: MinigameSnowboardHeroController,
    action: "updateGameBet"
}]





