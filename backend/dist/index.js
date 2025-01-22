// src/index.ts
import express, { json } from "express";

// src/types.ts
import { z } from "zod";
var passwordschema = z.object({
  email: z.string().optional(),
  password: z.string(),
  note: z.string().optional(),
  service: z.string(),
  username: z.string().optional()
});
var initSchema = z.object({
  clock: z.record(z.string(), z.number()),
  clientName: z.string(),
  neighbours: z.array(
    z.object({
      name: z.string(),
      address: z.string()
    })
  )
});
var BASE_HOST = "http://localhost:3000";

// src/routes.ts
import * as crypto from "node:crypto";
import axios from "axios";
async function createPassword(password) {
  try {
    return await axios.post(`${BASE_HOST}/add`, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function updatePassword(password, id) {
  try {
    return await axios.patch(`${BASE_HOST}/update/${id}`, password);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function deletePassword(id) {
  try {
    return await axios.delete(`${BASE_HOST}/delete/${id}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function getPassword(service) {
  try {
    return await axios.get(`${BASE_HOST}/get/${service}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function getPasswords() {
  try {
    return await axios.get(`${BASE_HOST}/get`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function initializePasswords() {
  const init = {
    clientName: crypto.randomBytes(20).toString("hex"),
    clock: {},
    neighbours: []
  };
  console.log("Ran initializePasswords");
  return await axios.post(`${BASE_HOST}/initialize`, init);
}

// src/index.ts
import fs from "fs";
import _ from "lodash";
import cors from "cors";
import "dotenv/config";
var app = express();
var FLAG_FILE = "init_done.flag";
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
app.get("/get", async (req, res) => {
  try {
    const result = await getPasswords();
    res.status(200).send(result.data);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
});
app.get("/get/:service", async (req, res) => {
  const { service } = req.params;
  if (!service || service === "" || _.isString(service)) {
    return res.status(400).json({ error: "service is required, should be a string" });
  }
  try {
    const result = await getPassword(service);
    return res.status(200).send(result.data);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});
app.post("/add", async (req, res) => {
  try {
    const body = req.body;
    let data = passwordschema.safeParse(body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }
    let parsed = data.data;
    const result = await createPassword(parsed);
    return res.status(201).send({ data: result.data, message: "Password created" });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || _.isNumber(id)) {
      return res.status(400).json({ error: "id is required, should be a number" });
    }
    const result = await deletePassword(id);
    return res.status(201).send({ data: result.data, message: "Password deleted" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
app.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || _.isNumber(id)) {
      return res.status(400).json({ error: "id is required, should be a number" });
    }
    const body = req.body;
    let data = passwordschema.safeParse(body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }
    let parsed = data.data;
    const result = await updatePassword(parsed, id);
    return res.status(201).send({ data: result.data, message: "Password updated" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
var port = process.env.PORT ?? "5000";
app.listen(port, () => {
  console.log("server is listening on port:" + port);
});
//# sourceMappingURL=index.js.map