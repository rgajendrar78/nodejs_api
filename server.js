import { app } from "./app.js";
import { dbConnect } from "./data/database.js";

// database connectivity
dbConnect(dbConnect);

// created server
app.listen("4000", () => console.log("listening on port 4000"));
