import { config, MongoClient } from "./deps.ts";

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
