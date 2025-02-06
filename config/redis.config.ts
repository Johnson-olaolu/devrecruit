import { createClient, RedisClientType } from "redis";
import logger from "./wiston.config";

let redisClient;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => logger.error(`Error : ${error}`));

  await redisClient.connect();
})();

export default redisClient as any as RedisClientType;
