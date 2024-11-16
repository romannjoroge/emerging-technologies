import "dotenv/config";
import Express from "express";
import store from "./store";
import { MIDDLEWARE_CLOCK } from "./constants";
import { initSchema, passwordSchema, updatePasswordSchema } from "./types";
import database from "./database";

const app = Express();
app.use("/", Express.json());

// This is only to be called once when a client is being set up
//@ts-ignore
app.post("/initialize", (req, res) => {
  try {
    const parsed = initSchema.safeParse(req.body);
    if (parsed.success) {
      const data = parsed.data;
      let { clock, clientName, neighbours } = data;
      clock[clientName] = 0;

      // Store the current vector clock key somewhere
      store.store(MIDDLEWARE_CLOCK, JSON.stringify(clock));

      // Store neighbours as well somewhere
      neighbours.forEach((ne) => {
        database.storeNeighbour(ne.name, ne.address);
      });
      return res
        .status(201)
        .json({ message: "Middleware set up successfully" });
    } else {
      return res.status(401).json({ err: parsed.error });
    }
  } catch (err) {
    console.log("Error Initializing Middleware => ", err);
    return res.status(500).json({ err: "Internal Server Error" });
  }
});

//@ts-ignore
app.get("/get", async (req, res) => {
  try {
    const passwords = await database.getAllPasswords();
    return res.json(passwords);
  } catch (err) {
    console.log("Error Getting All Passwords =>", err);
    return res.status(500).json({ err: "Internal server error" });
  }
});

//@ts-ignore
app.get("/get/:service", async (req, res) => {
  try {
    const service = req.params.service;
    const password = await database.getPassword(service);

    return res.json(password);
  } catch (err) {
    console.log("Error Getting Password => ", err);
    return res.status(501).json({ message: "Internal server error!" });
  }
});

//@ts-ignore
app.post("/add", (req, res) => {
  try {
    const parsed = passwordSchema.safeParse(req.body);
    if (parsed.success) {
      database.storePassword(parsed.data);
      return res.status(201).json({ message: "Password Saved Succesfully!" });
    } else {
      return res.status(404).json({ err: parsed.error });
    }
  } catch (err) {
    console.log("Error Adding password =>", err);
    return res.status(500).json({ message: "Internal sever error" });
  }
});

//@ts-ignore
app.delete("/delete/:id", (req, res) => {
  try {
    let id = Number.parseInt(req.params.id);
    database.deletePassword(id);
    return res.status(201).json({ message: "Password Deleted Succesfully!" });
  } catch (err) {
    console.log("Error Deleting Password", err);
    return res.status(500).json({ message: "Internal Sever Error" });
  }
});

//@ts-ignore
app.patch("/update/:id", (req, res) => {
  try {
    let id = Number.parseInt(req.params.id);
    let parsed = updatePasswordSchema.safeParse(req.body);
    if (parsed.success) {
      database.updatePassword(id, parsed.data);
      return res.status(201).json({ message: "Updated password successful" });
    } else {
      return res.status(400).json({ message: parsed.error });
    }
  } catch (err) {
    console.log("Error Updating Password", err);
    return res.status(500).json({ message: "Internal Sever Error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}...`);
});
