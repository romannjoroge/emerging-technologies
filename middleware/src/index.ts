import "dotenv/config";
import Express from "express";

const app = Express()

// This is only to be called once when a client is being set up
//@ts-ignore
app.post("/initialize", (req, res) => {
    try {
        return res.status(201).json({message: "Middleware set up successfully"})
    } catch(err) {
        console.log("Error Initializing Middleware => ", err);
    }
})

//@ts-ignore
app.get("/get", (req, res) => {
    return res.send("GET")
});

//@ts-ignore
app.post("/add", (req, res) => {
    return res.status(201).send("ADD");
});

//@ts-ignore
app.delete("/delete", (req, res) => {
    return res.status(201).send("DELETE");
});

//@ts-ignore
app.put("/update", (req, res) => {
    return res.status(201).send("UPDATE");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`)
})