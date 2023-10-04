import { Html } from "@elysiajs/html";
import { Handler } from "elysia";
import { Output, maxBytes, object, optional, parse, string } from "valibot";
import { Base } from "~/jsx/dom/base";

export function handleIndex(): Handler {
    const dto = object({
        q: optional(string([maxBytes(8)]))
    });

    const parseDto = (data: unknown): Output<typeof dto> => {
        try {
            return parse(dto, data);
        } catch (error) {
            // NOTE -- no real way of including error code
            throw new Error("error parsing dto");
        }
    };

    return c => {
        const { q: name } = parseDto(c.query);

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
                            Hello, {name ?? "world"}!
                        </h1>
                        <h2>Still under construction 👷🏿</h2>
                    </hgroup>
                </main>
                <footer>
                    <small>Powered by <a hx-boost={false} href="https://bun.sh">Bun</a></small>
                </footer>
            </Base>
        );
    };
}
