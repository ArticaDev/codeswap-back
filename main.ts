import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router } from "https://crux.land/router@0.0.12";
import { nanoid } from "https://deno.land/x/nanoid/mod.ts";
import { snippets } from "./database.ts";

const retrieveSnippet = async (_req) => {
  const identifier = _req.url.split("/").pop();
  const snippet = await snippets.findOne({ identifier: identifier });

  return new Response(JSON.stringify(snippet), { status: 200 });
};

const saveSnippet = async (_req) => {
  const snippet = await _req.json();
  const identifier = nanoid(8);

  await snippets.insertOne({
    identifier: identifier,
    code: snippet.code,
    description: snippet.description,
    title: snippet.title,
  });

  return new Response(JSON.stringify({ id: identifier }), { status: 200 });
};

const handler = router({
  "GET@/:id": (_req) => retrieveSnippet(_req),
  "POST@/": (_req) => saveSnippet(_req),
});

await serve(handler);
