import { Client, Config, createClient } from "@libsql/client";
import { describe, expect, test } from "bun:test";
import { ping } from "./turso";
import { unlink } from "node:fs/promises";

export function withClient(
    fn: (c: Client) => Promise<void>,
    extraConfig: Partial<Config> = {},
): () => Promise<void> {
    return async () => {
        const filename = `libsql-${crypto.randomUUID()}.db`;

        // const f = await Deno.create(`./${filename}`);
        const c = createClient({ url: `file:${filename}`, ...extraConfig });
        try {
            await fn(c);
        } finally {
            // NOTE -- cannot call `close` twice
            !c.closed && c.close();
            await unlink(`./${filename}`);
        }
    };
}

describe("turso.ts", () => {
    describe("ping()", () => {
        test("should return true", withClient(async c => {
            const ok = await ping(c);
            expect(ok).toBeTrue();
        }));
        test("should throw error", withClient(async c => {
            c.close();
            expect(() => ping(c)).toThrow(ReferenceError);
        }));
    });
});