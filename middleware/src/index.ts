import "dotenv/config";
import Express from "express";

const app = Express()

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`)
})