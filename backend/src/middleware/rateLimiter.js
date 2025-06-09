import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await ratelimit.limit("my-limit-key") // we make use of userid in authentication instead of the written text {my-limit-key}
        if(!success) {
            return res.status(429).json({message: "Too many request, please try again later"})
        }
        next()
    } catch(error){
        console.log("Rate Limit Error", error);
        next(error);
    }
}

export default rateLimiter