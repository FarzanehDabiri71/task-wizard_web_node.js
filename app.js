import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import "dotenv/config";

import getRoutes from "./get-routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use("/", getRoutes);
app.listen(3000);
