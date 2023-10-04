import { Elysia } from "elysia";
import { handleIndex } from "./handle_index";
import { serve } from "~/lib/serve";
import { html } from "@elysiajs/html";

if (
    import.meta.main
) {
    const app = new Elysia()
    .use(html());

    app.get("/", handleIndex());

    await serve(app)
}
