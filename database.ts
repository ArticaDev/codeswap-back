import { MongoClient } from "./deps.ts";

const DB_USER = Deno.env.get("DB_USER");
const DB_PASS = Deno.env.get("DB_PASS");
const DB_HOST = Deno.env.get("DB_HOST");

const client = new MongoClient();
await client.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/?readPreference=primary&ssl=false`,
);

interface SnippetSchema {
  _id: ObjectId;
  title: string;
  code: string;
  description: string;
  identifier: string;
}

const db = client.database("codeswap");
export const snippets = db.collection<SnippetSchema>("snippets");
