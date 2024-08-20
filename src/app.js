import express from "express";
const PORT = 5000
import userRouter from "./routes/UserRoutes.js";


const app = express()


app.use("/user", userRouter);

app.listen(process.env.PORT || PORT, ()=> console.log(`Server running on port ${PORT}`  ))

