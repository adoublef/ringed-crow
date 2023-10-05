import { Html } from "@elysiajs/html";
import { Handler } from "elysia";
import { Base } from "~/jsx/dom/base";

export function handleError(): Handler<any> {
    return async (c) => {
        return (
            <Base head={{ title: "Oh, no!" }}>
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
                            Oh, no!
                        </h1>
                        <h2>Looks like we found an error</h2>
                    </hgroup>
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
