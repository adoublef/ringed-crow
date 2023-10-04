import { Elysia } from "elysia";
import { handleIndex } from "./handle_index";
import { serve } from "~/lib/serve";
import { html } from "@elysiajs/html";
import { handleAbout } from "./handle_about";

if (
    import.meta.main
) {
    const app = new Elysia()
    .use(html());

    app.get("/", handleIndex());
    app.get("/about", handleAbout())

    await serve(app)
}
