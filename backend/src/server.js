const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const noteRouter = require("./routes/noteRoute");
const { connectDB } = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter")


dotenv.config();

const app = express()
const PORT = process.env.PORT | 5001;

// {middle ware is usually use for authentication}

//middleware 
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json()) // this middleware will parse JSON bodies: req.body
app.use(rateLimiter)


// // our custom middleware/ratelimiter, this is practice, but it has been built in midleware folder
// app.use((req, res, next)=>{
//     console.log("middleware added,", `Req method is ${req.method} & req url is ${req.url}`);
//     next();
// })


// mongodb+srv://mubaraqadeniyi159:JxXzAGsdv0gBo8ZM@cluster0.r9nie9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use("/api/notes/", noteRouter)

connectDB().then(() => {
    app.listen(PORT, ()=>{
        console.log("server started on PORT:", PORT);
    })
});

