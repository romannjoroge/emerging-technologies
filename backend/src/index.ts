import express, { json } from "express";
import {
  createPassword,
  getPassword,
  deletePassword,
  updatePassword,
  initializePasswords,
  getPasswords,
  pair,
} from "./routes";
import { Password, passwordschema, PasswordType, initSchema, pairSchema } from "./types";
import fs from "fs";
import _ from "lodash";
import cors from "cors";
import "dotenv/config";
const app = express();
app.use("/", express.json());

const FLAG_FILE = "init_done.flag";
(function safeInitializePasswords() {
  if (!fs.existsSync(FLAG_FILE)) {
    initializePasswords();
    fs.writeFileSync(FLAG_FILE, "Initialization complete");
  }
})();
function cleanup() {
  if (fs.existsSync(FLAG_FILE)) {
    fs.unlinkSync(FLAG_FILE);
    console.log("Cleanup complete: Flag file deleted.");
  }
}

process.on("SIGINT", () => {
  console.log("SIGINT received: Shutting down gracefully...");
  cleanup();
  process.exit(0);
});

process.on("exit", () => {
  console.log("Process exiting: Performing cleanup...");
  cleanup();
});
app.use("/", cors({ origin: "*" }), json());
app.get("/", (req, res) => {
  res.json({ msg: "test" });
});
//@ts-ignore
app.get("/get", async (req, res) => {
  try {
    const result = await getPasswords();
    // console.log("data=>", result.data);
    res.status(200).send(result.data);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});

//@ts-ignore
app.get("/get/:service", async (req, res) => {
  const { service } = req.params;
  if (!service || service === "" || _.isString(service)) {
    return res
      .status(400)
      .json({ error: "service is required, should be a string" });
  }
  try {
    const result = await getPassword(service);

    return res.status(200).send(result.data);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});
//@ts-ignore
app.post("/add", async (req, res) => {
  try {
    const body = req.body;
    let data = passwordschema.safeParse(body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }
    let parsed = data.data;
    const result = await createPassword(parsed);
    return res
      .status(201)
      .send({ data: result.data, message: "Password created" });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});

//@ts-ignore

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || _.isNumber(id)) {
      return res
        .status(400)
        .json({ error: "id is required, should be a number" });
    }
    const result = await deletePassword(id);
    return res
      .status(201)
      .send({ data: result.data, message: "Password deleted" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

//@ts-ignore
app.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || _.isNumber(id)) {
      return res
        .status(400)
        .json({ error: "id is required, should be a number" });
    }
    const body = req.body;
    let data = passwordschema.safeParse(body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }
    let parsed = data.data;
    const result = await updatePassword(parsed, id);
    return res
      .status(201)
      .send({ data: result.data, message: "Password updated" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

app.post("/pair", async (req, res) => {
  try {
    const parsed = pairSchema.safeParse(req.body);
    if (parsed.success) {
      const data = parsed.data;
      await pair(data.name, data.address, data.url);
      res.status(201).json({message: "Paired Succesfully"})
    } else {
      res.status(400).json({error: parsed.error});
    }
  } catch(err) {
    console.log("Error Pairing");
    res.status(501).json({ error: "Internal Server Error"});
  }
})

const port = process.env.PORT ?? "5000";
app.listen(port, () => {
  console.log("server is listening on port:" + port);
});
