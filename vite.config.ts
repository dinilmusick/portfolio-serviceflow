import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function shimOptionalFloksPeers(): Plugin {
  const shims: Record<string, string> = {
    '@xyflow/react': [
      'const Noop = () => null;',
      'export const ReactFlow = Noop;',
      'export const Background = Noop;',
      'export const Controls = Noop;',
      'export const MiniMap = Noop;',
    ].join('\n'),
    'd3-force': [
      'const chain = () => {',
      '  const sim = { force: () => sim, alphaDecay: () => sim, velocityDecay: () => sim, on: () => sim, stop: () => {}, nodes: () => [] };',
      '  return sim;',
      '};',
      'const force = () => { const f = () => f; f.strength = () => f; f.id = () => f; f.distance = () => f; return f; };',
      'export const forceSimulation = chain;',
      'export const forceManyBody = force;',
      'export const forceCenter = force;',
      'export const forceX = force;',
      'export const forceY = force;',
      'export const forceLink = force;',
    ].join('\n'),
  };
  return {
    name: 'shim-optional-floks-peers',
    resolveId(id) {
      if (id in shims) return `\0virtual:${id}`;
    },
    load(id) {
      if (id.startsWith('\0virtual:')) return shims[id.slice('\0virtual:'.length)];
    },
  };
}

export default defineConfig({
  plugins: [react(), shimOptionalFloksPeers()],
  build: { target: 'es2022' },
  server: { port: 4173, strictPort: true },
});
