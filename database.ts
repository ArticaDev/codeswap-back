import { MongoClient } from "https://deno.land/x/mongo@v0.30.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();

const client = new MongoClient();

await client.connect(
  `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}/?readPreference=primary&ssl=false`,
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
