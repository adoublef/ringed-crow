import { Html } from "@elysiajs/html";
import { Client } from "@libsql/client";
import { Handler, NotFoundError, ParseError } from "elysia";
import { Output, maxBytes, object, optional, parse, string, transform } from "valibot";
import { Base } from "~/jsx/dom/base";
import { Decorator as DTurso } from "~/lib/turso";

export function handleIndex(): Handler<any, DTurso> {
    const dto = transform(object({
        q: optional(string([maxBytes(8)]))
    }), ({ q }) => ({ q: q ?? "world" }));

    const parseDto = (data: unknown): Output<typeof dto> => {
        try {
            return parse(dto, data);
        } catch (error) {
            // throw new NotFoundError()
            // NOTE -- no real way of including error code
            throw new ParseError("error parsing dto");
        }
    };

    const getName = async (c: Client, name: string) => {
        // NOTE -- throw internal error if there is an error
        const rs = ((await c.execute({
            sql: "SELECT ?", args: [name]
        })).rows.at(0)!);

        return (rs)[0] as string;
    };

    return async (c) => {
        const { q } = parseDto(c.query);

        return (
            <Base head={{ title: "Welcome" }}>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/about">About</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <hgroup>
                        <h1>
                            Hello, {await getName(c.db, q)}!
                        </h1>
                        <h2>Still under construction 👷🏿</h2>
                    </hgroup>
                    <p>
                        For the meantime you can set your name via the header using the <code>q</code> parameter.
                        The maximum value for this is 20. You will be greeted in the header
                    </p>
                </main>
                <footer>
                    <small>
                        Powered by <a hx-boost={false} href="https://bun.sh">Bun</a>.
                        Source code on <a hx-boost={false} href="https://github.com/adoublef/ringed-crow">GitHub</a>
                    </small>
                </footer>
            </Base>
        );
    };
}
