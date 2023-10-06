import { env } from "~/lib/env";
import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { serve } from "~/lib/serve";
import { handleIndex } from "./handle_index";
import { handleAbout } from "./handle_about";
import { handleError } from "./handle_error";
import { createClient } from "@libsql/client";
import { ping, turso } from "~/lib/turso";

if (
    import.meta.main
) {
    const db = createClient({ url: env("DATABASE_URL") });
    await ping(db);

    const app = new Elysia()
        .use(turso(db))
        .use(html())
        .onError((c) => c.set.redirect = "/ouch");

    app.get("/", handleIndex());
    app.get("/about", handleAbout());
    app.get("/ouch", handleError());

    await serve(app);

    // TODO -- handle graceful shutdown
    // required to sync changes to Turso
}
