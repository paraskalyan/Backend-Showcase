import redis from "../lib/redis.js";

// Sets a value in Redis with an optional expiry time. If expiryInSeconds is provided, the key will expire after that duration; otherwise, it will persist indefinitely.
export const setValue = async (key: string, value: string, expiryInSeconds: number)=>{
    if(expiryInSeconds){
        await redis.set(key, value, "EX", expiryInSeconds);
    }
    else{
        await redis.set(key, value);
    }
};

// Retrieves a value from Redis based on the provided key. If the key does not exist, it will return null.
export const getValue = async (key: string) => {
    await redis.get(key);
}

// Deletes a value from Redis based on the provided key. If the key does not exist, it will have no effect.
export const deleteValue = async (key: string) => {
    await redis.del(key)
}