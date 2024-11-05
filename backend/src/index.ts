import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use("/", cors({ origin: "*" }), json());

app.get("/", (req, res) => {
  res.json({ msg: "test" });
});

const port = process.env.PORT ?? "3000";
app.listen(port, () => {
  console.log("server is listening on port:" + port);
});
