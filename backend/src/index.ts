import express, { json } from "express";
import { createPassword, getPassword, deletePassword, updatePassword, initializePasswords, getPasswords } from "./routes";
import { Password, passwordschema, PasswordType, initSchema } from "./types";
import _ from "lodash";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use("/", cors({ origin: "*" }), json());

app.get("/", (req, res) => {

    res.json({ msg: "test" });
});

//@ts-ignore
app.post("/initialize", async (req, res) => {
    const parsed = initSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error });
    }
    const data = parsed.data;
    const result = await initializePasswords(data);
})
//@ts-ignore
app.get("/get", async (req, res) => {
    try {
        const result = await getPasswords();
        return res.status(200).send({ data: result, message: "Passwords retrieved" });
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
});

//@ts-ignore
app.get("/get/:service", async (req, res) => {
    const { service } = req.params;
    if (!service || service === "" || _.isString(service)) {
        return res.status(400).json({ error: "service is required, should be a string" });
    }
    try {
        const result = await getPassword(service);

        return res.status(200).send({ data: result, message: "Password retrieved" });
    }
    catch (e) {
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
        return res.status(201).send({ data: result, message: "Password created" });
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
});

//@ts-ignore
app.delete("/delete:id", async (req, res) => {

    try {
        const { id } = req.params;
        if (!id || _.isNumber(id)) {
            return res.status(400).json({ error: "id is required, should be a number" });
        }
        const result = await deletePassword(id);
        return res.status(201).send({ data: result, message: "Password deleted" });
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
});

//@ts-ignore
app.put("/update", async (req, res) => {
    try {
        const body = req.body;
        let data = passwordschema.safeParse(body);
        if (!data.success) {
            return res.status(400).json({ error: data.error });
        }
        let parsed = data.data;
        const result = await updatePassword(parsed);
        return res.status(201).send({ data: result, message: "Password updated" });
    }
    catch (error) {
        return res.status(400).json({ error: error });
    }
})



const port = process.env.PORT ?? "5000";
app.listen(port, () => {
    console.log("server is listening on port:" + port);
});
