import { PluginOption, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import importMetaUrlPlugin from '@ws-ui/vite-plugins/dist/esbuild-plugin-import-meta-url';
import monacoEditorPlugin from '@ws-ui/vite-plugins/dist/vite-plugin-monaco-editor';
import { federation } from '@module-federation/vite';
import { initProxy } from './proxy.config';
import { dependencies as deps, app_id } from './package.json';

const exposes = {
  './components': './src/components/index.tsx',
};

const isDevEnv = process.env.NODE_ENV === 'development';

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

const getBuildPlugins = () => {
  if (isDevEnv) {
    return [monacoEditorPlugin()];
  }

  return [
    federation({
      name: app_id,
      filename: 'components.js',
      exposes,
      library: { type: 'var' },
      shared: {
        ...['react', 'react-dom', 'react/jsx-runtime'].reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              requiredVersion: deps[key],
              singleton: true,
              eager: true,
            },
          }),
          {},
        ),
        ...[
          // @ws-ui
          '@ws-ui/webform-editor',
          '@ws-ui/craftjs-core',
          '@ws-ui/craftjs-layers',
          '@ws-ui/craftjs-utils',
          '@ws-ui/shared',
        ].reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              singleton: true,
              eager: true,
            },
          }),
          {},
        ),
      },
    }),
  ];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode = 'local' }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const port = env.PORT || 5001;
  const host = env.HOST || '0.0.0.0';

  const proxy = initProxy(env);

  return {
    plugins: [
      react(),
      redirect({
        from: '/studio/',
        to: '/',
      }),
      ...getBuildPlugins(),
    ],
    define: {
      'process.env': {},
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: isDevEnv ? [importMetaUrlPlugin] : [],
      },
    },
    server: {
      host,
      proxy,
      port: +port,
    },
    build: {
      rollupOptions: {
        external: ['@ws-ui/code-editor'],
        output: {},
      },
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});
