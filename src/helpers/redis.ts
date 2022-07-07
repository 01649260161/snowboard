import Redis from 'ioredis'
import config from '../config/config'

export const redis = new Redis(config.REDIS)

export const REDIS_FREFIX = 'Farm_HPL_'
export const KEY_USER_TOKEN = 'USER_TOKEN'
export const SNOWBOARD_HERO_STATUS = 'SNOWBOARD_HERO_STATUS'

export const getUserToken = async (userId: number) => {
    const userTokenData = await redis.hget(REDIS_FREFIX + KEY_USER_TOKEN, userId.toString())
    return userTokenData
}

export const getUserStatusGameSnowBoardHero = async (userId: number) => {
    const userTokenData = await redis.hget(REDIS_FREFIX + SNOWBOARD_HERO_STATUS, userId.toString())
    return userTokenData
}

export const updateUserStatusGameSnowBoardHero = async (userId: number, status: 'online' | 'offline') => {
    await redis.hset(REDIS_FREFIX + SNOWBOARD_HERO_STATUS, userId, status)
}

export const deleteStatusUser = async () => {
    await redis.del(REDIS_FREFIX + SNOWBOARD_HERO_STATUS)
}


export default redis
