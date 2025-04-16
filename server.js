import fs from 'node:fs'
import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer } from 'vite'

async function main() {
  const app = express();

  const vite = await createServer({
    appType: 'custom',    
    server: {
      middlewareMode: true,
    },
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const template = await vite.transformIndexHtml(url, fs.readFileSync(path.resolve(import.meta.dirname, 'index.html'), 'utf-8'));

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

      const { root } = await render(url);

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(
          template.replace(`<!-- root-outlet -->`, root)
        );
    } catch (error) {
      vite.ssrFixStacktrace(error);

      next(error);
    }
  })

  app.listen(5173);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
