import Express from "express";
import processMessage from "./process-message";
const app = Express();

app.use("/", Express.json())

app.get('/test', async(req, res) => {
    return res.send("I am here!")
});

app.post("/message", async(req, res) => {
    try {
        const body = req.body;
        console.log("Body =>", body);
        processMessage(body.requestType, body.args, body.clock);
        return res.status(201).json({message: "Received"});
    } catch(err) {
        console.log("Error Processing received message");
    }
})

app.listen(7000, () => {
    console.log("Server is listening on port 7000...")
})