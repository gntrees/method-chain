import { execSync, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unlinkSync, writeFileSync } from "node:fs";

const cGenDir = join(import.meta.dir, "gntrees-method-chain/c");

let tempCounter = 0;

export function compileAndRun(
    runner: string,
    options: { flags?: string; cwd?: string; env?: Record<string, string | undefined> } = {}
): { status: number | null; signal: string | null; stderr: string; stdout: string } {
    const tag = `${process.pid}-${tempCounter++}`;
    const tempC = join(tmpdir(), `gntrees-runtime-c-${tag}.c`);
    const binary = join(tmpdir(), `gntrees-runtime-c-${tag}`);
    try {
        writeFileSync(tempC, runner);
        execSync(
            `gcc -Wall -Wextra ${options.flags ?? ""} -o ${binary} ${tempC} ${join(cGenDir, "cJSON.c")} -I${cGenDir} -lm`,
            { stdio: "pipe", cwd: options.cwd }
        );
        const res = spawnSync(binary, [], { encoding: "utf8", env: { ...process.env, ...options.env } });
        return { status: res.status, signal: res.signal, stderr: res.stderr, stdout: res.stdout ?? "" };
    } finally {
        try { unlinkSync(tempC); } catch { /* ignore */ }
        try { unlinkSync(binary); } catch { /* ignore */ }
    }
}
