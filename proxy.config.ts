/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProxyOptions } from 'vite';

const TARGET = process.env.PROXY_SERVER || 'https://127.0.0.1:7443';

function sanitizeSetCookie(cookie = '') {
  return cookie.replace(/; secure/i, '');
}

const proxyOpts = {
  target: TARGET,
  secure: false,
  ws: true,
  onProxyReq(proxyReq: any, req: any) {
    let body = '';

    req.setEncoding('utf-8');
    req.on('data', (data: string) => (body += data));
    req.on('end', () => {
      req.body = body;
    });

    proxyReq.setHeader('Host', new URL(TARGET).host);
    proxyReq.setHeader('Origin', TARGET);
    proxyReq.setHeader('Referer', TARGET);
  },
  onProxyRes(proxyRes: any) {
    if (proxyRes.headers['Set-Cookie']) {
      if (Array.isArray(proxyRes.headers['Set-Cookie'])) {
        proxyRes.headers['Set-Cookie'] = proxyRes.headers['Set-Cookie'].map(sanitizeSetCookie);
      } else {
        proxyRes.headers['Set-Cookie'] = sanitizeSetCookie(proxyRes.headers['Set-Cookie']);
      }
    }
  },
};

const proxy: Record<string, string | ProxyOptions> = [
  '/rest',
  '/$lib',
  '/api',
  '/login.html',
  '/css',
  '/img',
  '/js',
  '/LSP',
  '/remoteDebugger',
  '/dataexplorer',
  '/$shared',
].reduce(
  (prev, cur) => ({
    ...prev,
    [cur]: proxyOpts,
  }),
  {
    '/rest/$upload': {
      target: TARGET,
      secure: false,
    },
  },
);

export default proxy;
