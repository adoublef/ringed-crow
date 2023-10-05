import { Elysia } from "elysia";
import { handleIndex } from "./handle_index";
import { serve } from "~/lib/serve";
import { html } from "@elysiajs/html";
import { handleAbout } from "./handle_about";
import { ping, turso } from "~/lib/turso";
import { createClient } from "@libsql/client";
import { env } from "~/lib/env";

if (
    import.meta.main
) {
    const db = createClient({ url: env("DATABASE_URL") });
    await ping(db);

    const app = new Elysia()
        .use(turso(db))
        .use(html());

    app.get("/", handleIndex());
    app.get("/about", handleAbout());

    await serve(app);

    // TODO -- handle graceful shutdown
    // required to sync changes to Tursogs
}
