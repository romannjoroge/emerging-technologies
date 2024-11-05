import "dotenv/config";
import Express from "express";
import store from "./store";
import { MIDDLEWARE_CLOCK } from "./constants";
import { initSchema } from "./types";
import database from "./database";

const app = Express()

// This is only to be called once when a client is being set up
//@ts-ignore
app.post("/initialize", (req, res) => {
    try {
        const parsed = initSchema.safeParse(req.body);
        if (parsed.success) {
            const data = parsed.data
            let {clock, clientName, neighbours} = data;
            clock[clientName] = 0;

            // Store the current vector clock key somewhere
            store.store(MIDDLEWARE_CLOCK, JSON.stringify(clock));

            // Store neighbours as well somewhere
            neighbours.forEach((ne) => {
                database.storeNeighbour(ne.name, ne.address);
            })
            return res.status(201).json({ message: "Middleware set up successfully" })
        } else {
            return res.status(401).json({err: parsed.error});
        }
    } catch (err) {
        console.log("Error Initializing Middleware => ", err);
        return res.status(500).json({err: "Internal Server Error"})
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