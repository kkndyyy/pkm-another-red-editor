import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

function u8Literal(file: string) {
  const b64 = readFileSync(file).toString("base64");
  return `u8("${b64}")`;
}

function embeddedDataPlugin(): Plugin {
  const dataDir = resolve(rootDir, "public/data");
  return {
    name: "redforge-embedded-data",
    resolveId(id) {
      if (id === "virtual:redforge-embedded") return id;
      return null;
    },
    load(id) {
      if (id !== "virtual:redforge-embedded") return null;
      const workspace = readFileSync(resolve(dataDir, "workspace.json"), "utf8");
      const names = readFileSync(resolve(dataDir, "names-ko.json"), "utf8");
      return `function u8(b){var s=atob(b),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
export default {
  workspace: ${workspace},
  names: ${names},
  species: ${u8Literal(resolve(dataDir, "species.dat"))},
  moves: ${u8Literal(resolve(dataDir, "moves.dat"))},
  abilities: ${u8Literal(resolve(dataDir, "abilities.dat"))},
  messages: ${u8Literal(resolve(dataDir, "messages_kor_core.dat"))},
  encounters: ${u8Literal(resolve(dataDir, "encounters.dat"))}
};`;
    },
  };
}

export default defineConfig({
  plugins: [embeddedDataPlugin(), tailwindcss(), viteReact()],
  publicDir: false,
  define: {
    "import.meta.env.SSR": "false",
  },
  resolve: {
    tsconfigPaths: true,
    alias: { "@": resolve(rootDir, "src") },
  },
  build: {
    outDir: "dist-portable",
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: false,
    minify: true,
    target: "es2020",
    assetsInlineLimit: 100000000,
    rollupOptions: {
      input: resolve(__dirname, "src/portable-entry.tsx"),
      output: {
        format: "iife",
        name: "RedforgeApp",
        inlineDynamicImports: true,
        entryFileNames: "redforge.js",
        assetFileNames: "redforge[extname]",
      },
    },
  },
});
