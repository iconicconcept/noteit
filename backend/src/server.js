import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import noteRoute from "./routes/noteRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express()
const PORT = process.env.PORT | 5001;
const __dirname = path.resolve();

// {middle ware is usually use for authentication}

//middleware 
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
app.use(express.json()) // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);


// // our custom middleware/ratelimiter, this is practice, but it has been built in midleware folder
// app.use((req, res, next)=>{
//     console.log("middleware added,", `Req method is ${req.method} & req url is ${req.url}`);
//     next();
// })


// mongodb+srv://mubaraqadeniyi159:JxXzAGsdv0gBo8ZM@cluster0.r9nie9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use("/api/notes", noteRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    });
};

connectDB().then(() => {
    app.listen(PORT, ()=>{
        console.log("server started on PORT:", PORT);
    })
});

