import { connect } from "mongoose";

export async function start() {
  await connect("mongodb://localhost/photo-gallery-db");
  console.log("Database is conected");
}
