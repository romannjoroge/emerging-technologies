import "dotenv/config";
import Express from "express";
import store from "./store";
import { MIDDLEWARE_CLOCK, UPDATE_ENDPOINT } from "./constants";
import { handleMessageSchema, initSchema, passwordSchema, updatePasswordSchema } from "./types";
import database from "./database";
import Clock from "./clock";
import Neighbour from "./neighbours";

const app = Express()
app.use("/", Express.json())

// This is only to be called once when a client is being set up
//@ts-ignore
app.post("/initialize", (req, res) => {
    try {
        const parsed = initSchema.safeParse(req.body);
        if (parsed.success) {
            const data = parsed.data
            let {clock, clientName, neighbours} = data;
            
            Clock.setupClock(clientName, clock);
            Neighbour.setupNeighbours(neighbours);
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
app.get("/get", async (req, res) => {
    try {
        const passwords = database.getAllPasswords();
        return res.json(passwords);
    } catch(err) {
        console.log("Error Getting All Passwords =>", err);
        return res.status(500).json({err: "Internal server error"})
    }
})

//@ts-ignore
app.get("/get/:service", async (req, res) => {
    try {
        const service = req.params.service;
        const password = await database.getPassword(service);
        
        return res.json(password);
    } catch(err) {
        console.log("Error Getting Password => ", err);
        return res.status(501).json({message: "Internal server error!"})
    }
});

//@ts-ignore
app.post("/add", (req, res) => {
    try {
        const parsed = passwordSchema.safeParse(req.body);
        if (parsed.success) {
            database.storePassword(parsed.data);

            Clock.incrementClock();
            Neighbour.updateNeighbours({
                requestType: "ADD",
                args: parsed.data,
                clock: Clock.getClock()
            });
            return res.status(201).json({message: "Password Saved Succesfully!"});
        } else {
            return res.status(404).json({err: parsed.error})
        }      
    } catch(err) {
        console.log("Error Adding password =>", err);
        return res.status(500).json({message: "Internal sever error"})
    }
});

//@ts-ignore
app.delete("/delete/:id", async (req, res) => {
    try {
        let id = Number.parseInt(req.params.id);
        let password = await database.getPasswordFromID(id);
        database.deletePassword(id);

        Clock.incrementClock();
        Neighbour.updateNeighbours({
            requestType: "DELETE",
            args: {
                service: password.service
            },
            clock: Clock.getClock()
        })
        return res.status(201).json({message: "Password Deleted Succesfully!"})
    } catch(err) {
        console.log("Error Deleting Password", err);
        return res.status(500).json({message: "Internal Sever Error"})
    }
});

//@ts-ignore
app.patch("/update/:id", async (req, res) => {
    try {
        let id = Number.parseInt(req.params.id);
        let parsed = updatePasswordSchema.safeParse(req.body);
        if (parsed.success) {
            let password = await database.getPasswordFromID(id);
            database.updatePassword(id, parsed.data);

            Clock.incrementClock();
            Neighbour.updateNeighbours({
                requestType: "UPDATE",
                args: {service: password.service, update: parsed.data},
                clock: Clock.getClock()
            })
            return res.status(201).json({message: "Updated password successful"})
        } else {
            return res.status(400).json({message: parsed.error});
        }
    } catch(err) {
        console.log("Error Updating Password", err);
        return res.status(500).json({message: "Internal Sever Error"})
    }
    
});

//@ts-ignore
app.post(`/${UPDATE_ENDPOINT}`, async (req, res) => {
    try {
        let parsed = handleMessageSchema.safeParse(req.body);

        if (parsed.success) {
            // Check if clock is ahead
            let isAhead = Clock.isOwnClockAhead(parsed.data.clock);

            if (isAhead) {
                // Do nothing if own clock is ahead
                return res.status(201).json({message: "Clock is Ahead"});
            }

            // Update if clock not ahead
            let data = parsed.data;
            if (data.requestType === "ADD") {
                let password = passwordSchema.safeParse(data.args);
                if (password.success) {
                    database.storePassword(password.data);
                    Clock.updateClock(data.clock);
                    return res.status(201).json({message: "Succesfully stored password"});
                } else {
                    return res.status(400).json({message: "Invalid Password", err: password.error})
                }
            } else if (data.requestType === "DELETE") {
                if (data.args.service) {
                    database.deletePasswordWithService(data.args.service)
                    Clock.updateClock(data.clock);
                    return res.status(201).json({message: "Successfully deleted password"})
                } else {
                    return res.status(400).json({message: "Invalid Service Name Could Not Delete"});
                }
            } else if (data.requestType === "UPDATE") {
                if (data.args.service) {
                    let service = data.args.service;
                    let updateArgsParsed = updatePasswordSchema.safeParse(data.args.update);

                    if (updateArgsParsed.success) {
                        let updateArgs = updateArgsParsed.data;
                        database.updatePasswordWithService(service, updateArgs);
                        Clock.updateClock(data.clock);
                        return res.status(201).json({message: "Successfully updated password"})
                    } else {
                        return res.status(400).json({message: "Invalid Update Password Args", error: updateArgsParsed.error});
                    }
                } else {
                    return res.status(400).json({message: "Invalid Service Name Could Not Update"});
                }
            }
        } else {
            return res.status(400).json({err: parsed.error})
        }
    } catch(err) {
        console.log("Error Handling other clients message =>", err);
        return res.status(500).json({err: "Internal server error"});
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}...`)
})