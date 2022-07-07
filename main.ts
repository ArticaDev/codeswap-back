import { Application, nanoid, oakCors, Router } from "./deps.ts";
import { snippets } from "./database.ts";

const retrieveSnippet = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const snippet = await snippets.findOne({ identifier: params.id });

  response.body = JSON.stringify(snippet);
};

const saveSnippet = async (
  { request, response }: { request: any; response: any },
) => {
  let snippet = await request.body();
  snippet = await snippet.value;
  const identifier = nanoid(8);

  await snippets.insertOne({
    identifier: identifier,
    code: snippet.code,
    description: snippet.description,
    title: snippet.title,
  });

  response.body = JSON.stringify({ id: identifier });
};

const app = new Application();
const port: number = Deno.env.get("PORT") || 8000;

const router = new Router();

router.get("/:id", retrieveSnippet);
router.post("/", saveSnippet);

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
