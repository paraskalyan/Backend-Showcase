import redis from "../lib/redis.js";

export const setValue = async (key: string, value: string, expiryInSeconds: number)=>{
    if(expiryInSeconds){
        await redis.set(key, value, "EX", expiryInSeconds);
    }
    else{
        await redis.set(key, value);
    }
};

export const getValue = async (key: string) => {
    await redis.get(key);
}

export const deleteValue = async (key: string) => {
    await redis.del(key)
}