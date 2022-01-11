import app from "./app";
import { start } from "./database";

async function main() {
  start();
  app.listen(app.get("port"));
  console.log("Server on port ", app.get("port"));
}

main();
