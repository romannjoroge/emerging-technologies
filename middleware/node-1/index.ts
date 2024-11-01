import Express from "express";
const app = Express();

app.get('/test', async(req, res) => {
    return res.send("I am here!")
})

app.listen(6000, () => {
    console.log("Server is listening on port 6000...")
})