const {Ratelimit} = require("@upstash/ratelimit")
const {Redis} = require("@upstash/redis")
const  dotenv = require("dotenv")

dotenv.config();

//create ratelimit that allows 10 requests per 20 seconds
exports.ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
})