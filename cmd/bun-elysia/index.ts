import { Elysia } from "elysia";
import { handleIndex } from "./handle_index";

if (
    import.meta.main
) {
    const app = new Elysia();

    app.get("/", handleIndex());

    const server = Bun.serve({ port: 8000, fetch: app.fetch });
    console.log(`🦊 Server is listening on ${server.hostname}:${server.port}`);
}