import { Html } from "@elysiajs/html";
import { Handler } from "elysia";
import { Base } from "~/jsx/dom/base";

export function handleAbout(): Handler {
    return c => {
        return (
            <Base head={{ title: "Home" }}>
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
                        <h1>About</h1>
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
