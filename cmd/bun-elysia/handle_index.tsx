import { Html } from "@elysiajs/html";
import { Handler } from "elysia";
import { Output, maxBytes, object, optional, parse, string } from "valibot";

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

        return (<strong>hello, {name ?? "world"}</strong>);
    };
}