import { DataSource } from "typeorm"
import { MinigameSnowboardHero } from "../entity/MinigameSnowboardHero"
import { Users } from "../entity/Users"

const MysqlDataSource = new DataSource({
    type: "mysql",
    host: "192.168.100.252",
    port: 3306,
    username: "apidev_hpl",
    password: "ialL2XAXpSklAUZWjBsw",
    database: "apidev_hpl",
    entities: [
        Users,
        MinigameSnowboardHero
    ],
})
export default MysqlDataSource