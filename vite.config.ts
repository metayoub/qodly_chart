import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import proxy from './proxy.config';

const port = process.env.PORT || 5001;
const host = process.env.HOST || '0.0.0.0';

const redirect = (opts: { from: string; to: string }): PluginOption => {
  return {
    name: 'redirect',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.startsWith(opts.from)) {
          res.statusCode = 307;
          res.setHeader('Location', opts.to);
          res.setHeader('Content-Length', '0');
          return res.end();
        }

        return next();
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    redirect({
      from: '/studio/',
      to: '/',
    }),
  ],
  define: {
    'process.env': {},
  },
  server: {
    host,
    proxy,
    port: +port,
  },
});
