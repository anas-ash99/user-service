import express from "express";
const PORT = 5000
import userRouter from "./routes/UserRoutes.js";
import path from "path"
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()


app.use("/user", userRouter);

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, 'resources/home.html'));
})

app.listen(process.env.PORT || PORT, ()=> console.log(`Server running on port ${PORT}`  ))

