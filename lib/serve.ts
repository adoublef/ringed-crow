
export async function serve(
    handler: { fetch: (req: Request) => Response | Promise<Response>; },
    opts?: { port: number; }): Promise<void> {
    if (opts?.port) {
        await bootServer(handler, opts);
    } else {
        let firstError;
        for (let port = 8000; port < 8020; port++) {
            try {
                await bootServer(handler, { ...opts, port });
                firstError = undefined;
                break;
            } catch (err) {
                // @ts-expect-error is of type `Error`
                if (err.name === "EADDRINUSE") {
                    // Throw first EADDRINUSE error
                    // if no port is free
                    if (!firstError) {
                        firstError = err;
                    }
                    continue;
                }

                throw err;
            }
        }

        if (firstError) {
            throw firstError;
        }
    }
}

async function bootServer(handler: { fetch: (req: Request) => Response | Promise<Response>; }, opts: { port: number; }): Promise<void> {
    const server = Bun.serve({ ...opts, fetch: handler.fetch });
    console.log(`🦊 Server is listening on http://${server.hostname}:${server.port}`);
}