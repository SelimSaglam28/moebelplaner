// mycasa3 Möbelplaner – Planer-Code (geladen von index.html nach der Passwort-Abfrage)

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// ---------- Bodenbeläge: Dekore und Muster-Generator (aus frontend/src/tour/paint/floors.ts) ----------
var MC3Boden = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var floors_exports = {};
  __export(floors_exports, {
    FLOOR_DECORS: () => FLOOR_DECORS,
    FLOOR_GROUPS: () => FLOOR_GROUPS,
    defaultMaxPx: () => defaultMaxPx,
    floorDecor: () => floorDecor,
    floorOrder: () => floorOrder,
    floorSwatch: () => floorSwatch,
    floorTexture: () => floorTexture,
    floorTextureAsync: () => floorTextureAsync,
    reflectance: () => reflectance
  });
  const D = (id, group, name, size, pattern, len, wid, look, base, accent, extra = {}) => ({
    id,
    group,
    name,
    size,
    pattern,
    len,
    wid,
    look,
    base,
    accent,
    joint: 6e-4,
    jointColor: "#4a3a2c",
    bevel: 0,
    vary: 0.07,
    offset: 0,
    rough: 0.62,
    waste: pattern === "herringbone" ? 0.12 : pattern === "tiles" ? 0.08 : 0.07,
    ...extra
  });
  const FLOOR_DECORS = [
    // Klick-Vinyl: sehr feine Fuge, leichte Fase
    D("vinyl-eiche-hell", "Vinyl", "Eiche hell", "122 \xD7 18 cm", "planks", 1.22, 0.18, "wood", "#d5bb95", "#a8845c", { bevel: 1e-3 }),
    D("vinyl-landhaus", "Vinyl", "Landhausdiele Eiche", "150 \xD7 23 cm", "planks", 1.5, 0.23, "knotty", "#bf9b72", "#876544", { bevel: 12e-4, vary: 0.08 }),
    D("vinyl-eiche-grau", "Vinyl", "Eiche grau", "122 \xD7 18 cm", "planks", 1.22, 0.18, "wood", "#a69d92", "#776e64", { bevel: 1e-3, jointColor: "#4b4741" }),
    D("vinyl-fischgraet", "Vinyl", "Fischgr\xE4t Eiche", "63 \xD7 12,6 cm", "herringbone", 0.63, 0.126, "wood", "#c5a076", "#8d6a48", { bevel: 8e-4, vary: 0.09 }),
    D("vinyl-stein", "Vinyl", "Steinoptik grau", "61 \xD7 30,5 cm", "tiles", 0.61, 0.305, "stone", "#9d9a95", "#77746e", {
      joint: 15e-4,
      jointColor: "#7c7974",
      vary: 0.04,
      offset: 0.5,
      rough: 0.7
    }),
    // Laminat: deutliche 4V-Fuge
    D("laminat-eiche-natur", "Laminat", "Eiche natur", "128,5 \xD7 19,2 cm", "planks", 1.285, 0.192, "wood", "#c3a07a", "#8e6c4a", { bevel: 16e-4, joint: 8e-4 }),
    D("laminat-eiche-weiss", "Laminat", "Eiche wei\xDF", "128,5 \xD7 19,2 cm", "planks", 1.285, 0.192, "wood", "#e3d7c5", "#b8a68e", {
      bevel: 16e-4,
      joint: 8e-4,
      jointColor: "#8a7c6b",
      vary: 0.05
    }),
    D("laminat-rustikal", "Laminat", "Eiche rustikal", "138 \xD7 24,4 cm", "planks", 1.38, 0.244, "knotty", "#b38a5f", "#785536", { bevel: 18e-4, joint: 8e-4, vary: 0.09 }),
    D("laminat-raeuchereiche", "Laminat", "R\xE4uchereiche", "128,5 \xD7 19,2 cm", "planks", 1.285, 0.192, "wood", "#82614a", "#4f3828", {
      bevel: 16e-4,
      joint: 8e-4,
      jointColor: "#2c2019"
    }),
    D("laminat-nussbaum", "Laminat", "Nussbaum", "128,5 \xD7 19,2 cm", "planks", 1.285, 0.192, "wood", "#71503a", "#432e1f", {
      bevel: 16e-4,
      joint: 8e-4,
      jointColor: "#271b13"
    }),
    // Fliesen: Fuge 2–3 mm
    D("fliese-beton", "Fliesen", "Betonoptik grau", "60 \xD7 60 cm", "tiles", 0.6, 0.6, "concrete", "#aaa7a1", "#8b8882", {
      joint: 3e-3,
      jointColor: "#8e8b86",
      vary: 0.03,
      rough: 0.72
    }),
    D("fliese-anthrazit", "Fliesen", "Anthrazit", "60 \xD7 60 cm", "tiles", 0.6, 0.6, "concrete", "#505255", "#3c3e41", {
      joint: 3e-3,
      jointColor: "#3d3e40",
      vary: 0.035,
      rough: 0.68
    }),
    D("fliese-weiss", "Fliesen", "Wei\xDF matt", "60 \xD7 30 cm", "tiles", 0.6, 0.3, "plain", "#ecebe7", "#dcdad5", {
      joint: 25e-4,
      jointColor: "#cfccc6",
      vary: 0.015,
      offset: 0.5,
      rough: 0.55
    }),
    D("fliese-marmor", "Fliesen", "Marmoroptik", "120 \xD7 60 cm", "tiles", 1.2, 0.6, "marble", "#f0eee9", "#8f8e8b", {
      joint: 2e-3,
      jointColor: "#dcd9d3",
      vary: 0.02,
      rough: 0.22,
      waste: 0.1
    }),
    D("fliese-terrazzo", "Fliesen", "Terrazzo", "60 \xD7 60 cm", "tiles", 0.6, 0.6, "terrazzo", "#e6e1d8", "#9a928a", {
      joint: 2e-3,
      jointColor: "#d3cdc3",
      vary: 0.02,
      rough: 0.45
    }),
    D("fliese-holzoptik", "Fliesen", "Holzoptik", "120 \xD7 20 cm", "planks", 1.2, 0.2, "wood", "#ab8861", "#76563a", {
      joint: 3e-3,
      jointColor: "#8a7a69",
      vary: 0.06,
      rough: 0.7,
      waste: 0.1
    })
  ];
  const FLOOR_GROUPS = ["Vinyl", "Laminat", "Fliesen"];
  function floorDecor(id) {
    var _a;
    return (_a = FLOOR_DECORS.find((d) => d.id === id)) != null ? _a : null;
  }
  function rgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  function reflectance(hex) {
    const [r, g, b] = rgb(hex);
    return Math.min(0.9, 0.92 * (0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)));
  }
  function hashStr(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
  }
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => {
      s = Math.imul(s, 1664525) + 1013904223 >>> 0;
      return s / 4294967296;
    };
  }
  function hash(a, b) {
    let h = Math.imul(a | 0, 374761393) ^ Math.imul((b | 0) + 1, 668265263);
    h = Math.imul(h ^ h >>> 13, 1274126177);
    return ((h ^ h >>> 16) >>> 0) / 4294967296;
  }
  class Noise {
    constructor(seed) {
      __publicField(this, "p", new Uint8Array(512));
      __publicField(this, "g", new Float32Array(256));
      const r = rng(seed);
      const perm = Array.from({ length: 256 }, (_, i) => i);
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [perm[i], perm[j]] = [perm[j], perm[i]];
      }
      for (let i = 0; i < 512; i++) this.p[i] = perm[i & 255];
      for (let i = 0; i < 256; i++) this.g[i] = r();
    }
    at(x, y) {
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = x - xi;
      const yf = y - yi;
      const u = xf * xf * (3 - 2 * xf);
      const v = yf * yf * (3 - 2 * yf);
      const p = this.p;
      const g = this.g;
      const X = xi & 255;
      const Y = yi & 255;
      const a = g[p[p[X] + Y]];
      const b = g[p[p[X + 1] + Y]];
      const c = g[p[p[X] + Y + 1]];
      const d = g[p[p[X + 1] + Y + 1]];
      const top = a + (b - a) * u;
      return top + (c + (d - c) * u - top) * v;
    }
    fbm(x, y, octaves) {
      let sum = 0;
      let amp = 0.5;
      let norm = 0;
      for (let o = 0; o < octaves; o++) {
        sum += amp * this.at(x, y);
        norm += amp;
        x = x * 2.03 + 17.1;
        y = y * 2.03 + 31.7;
        amp *= 0.5;
      }
      return sum / norm;
    }
  }
  const smooth = (e0, e1, x) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };
  function planksLayout(d) {
    const L = d.len;
    const W = d.wid;
    const per = Math.max(2, Math.ceil(3.2 / L));
    const tileX = per * L;
    const rows = Math.max(6, Math.round(tileX * 0.62 / W));
    const tileY = rows * W;
    const r = rng(hashStr(d.id));
    const offs = [];
    const minGap = Math.min(0.3, L * 0.3);
    let prev = 0;
    for (let i = 0; i < rows; i++) {
      let o = 0;
      for (let t = 0; t < 30; t++) {
        o = r() * L;
        const diff = Math.abs(o - prev);
        if (Math.min(diff, L - diff) >= minGap) break;
      }
      offs.push(o);
      prev = o;
    }
    return {
      tileX,
      tileY,
      at(x, y, h) {
        const row = Math.min(rows - 1, Math.max(0, Math.floor(y / W)));
        const s = x - offs[row];
        const k = Math.floor(s / L);
        const u = s - k * L;
        const v = y - row * W;
        const kk = (k % per + per) % per;
        h.seed = row * 131 + kk * 7 + 1;
        h.u = u;
        h.v = v;
        h.pl = L;
        h.pw = W;
        h.dir = 0;
        h.d = Math.min(u, L - u, v, W - v);
      }
    };
  }
  function tilesLayout(d) {
    const L = d.len;
    const W = d.wid;
    const nx = Math.max(2, Math.ceil(1.75 / L));
    let ny = Math.max(2, Math.ceil(1.75 / W));
    if (d.offset > 0 && ny % 2) ny += 1;
    const tileX = nx * L;
    const tileY = ny * W;
    return {
      tileX,
      tileY,
      at(x, y, h) {
        const row = Math.min(ny - 1, Math.max(0, Math.floor(y / W)));
        const s = x - (row % 2 ? d.offset * L : 0);
        const k = Math.floor(s / L);
        const u = s - k * L;
        const v = y - row * W;
        const kk = (k % nx + nx) % nx;
        h.seed = row * 131 + kk * 7 + 3;
        h.u = u;
        h.v = v;
        h.pl = L;
        h.pw = W;
        h.dir = 0;
        h.d = Math.min(u, L - u, v, W - v);
      }
    };
  }
  function herringboneLayout(d) {
    const W = d.wid;
    const k = Math.max(2, Math.round(d.len / W));
    const L = k * W;
    const SQ2 = Math.SQRT2;
    const mx = Math.max(1, Math.round(1.8 / (SQ2 * L)));
    const tileX = mx * SQ2 * L;
    const my = Math.max(1, Math.round(tileX / (SQ2 * W)));
    const tileY = my * SQ2 * W;
    const Q = 4e-3;
    const qx = Math.round(tileX / Q);
    const qy = Math.round(tileY / Q);
    const idOf = (cx, cy) => {
      const x = (cx - cy) / SQ2;
      const y = (cx + cy) / SQ2;
      const ix = (Math.round(x / Q) % qx + qx) % qx;
      const iy = (Math.round(y / Q) % qy + qy) % qy;
      return ix * 7919 + iy * 104729 + 11;
    };
    return {
      tileX,
      tileY,
      at(x, y, h) {
        const X = (x + y) / SQ2;
        const Y = (y - x) / SQ2;
        const j = Math.floor(Y / W);
        const s = X - j * W;
        const n = Math.floor(s / (2 * L));
        const t = s - n * 2 * L;
        if (t < L) {
          h.u = t;
          h.v = Y - j * W;
          h.dir = 0;
          h.seed = idOf(j * W + 2 * L * n + L / 2, j * W + W / 2);
        } else {
          const c = Math.floor(X / W);
          const nn = Math.floor((c - j) / (2 * k));
          const j0 = c - 2 * k * nn - 2 * k + 1;
          h.u = Y - j0 * W;
          h.v = X - c * W;
          h.dir = 1;
          h.seed = idOf(c * W + W / 2, j0 * W + L / 2);
        }
        h.pl = L;
        h.pw = W;
        h.d = Math.min(h.u, L - h.u, h.v, W - h.v);
      }
    };
  }
  function layoutOf(d) {
    return d.pattern === "herringbone" ? herringboneLayout(d) : d.pattern === "tiles" ? tilesLayout(d) : planksLayout(d);
  }
  function lookShader(d, noise) {
    switch (d.look) {
      case "wood":
      case "knotty": {
        const knotty = d.look === "knotty";
        return (h) => {
          const r1 = hash(h.seed, 11);
          const ou = r1 * 97;
          const ov = hash(h.seed, 12) * 89;
          const u = h.u + ou;
          const v = h.v + ov;
          const streak = noise.fbm(u * 0.9, v * 46, 3);
          let a = smooth(0.42, 0.82, streak) * 0.62;
          a += (noise.at(u * 7, v * 380) - 0.5) * 0.22;
          if (hash(h.seed, 13) < 0.55) {
            const vc = (0.25 + 0.5 * hash(h.seed, 14)) * h.pw;
            const q = (h.v - vc) / h.pw;
            const f = q * q * 9 - h.u / h.pl * (2 + 3 * hash(h.seed, 15)) + noise.fbm(u * 1.3, v * 9, 2) * 0.8;
            const band = Math.abs((f * 3.2 % 1 + 1) % 1 - 0.5) * 2;
            a += (1 - smooth(0, 0.22, band)) * 0.38 * smooth(0, 0.25, 1 - Math.abs(q) * 1.6);
          }
          if (knotty) {
            const n = Math.floor(hash(h.seed, 16) * 3.2);
            for (let i = 0; i < n; i++) {
              const ku = hash(h.seed, 20 + i) * h.pl;
              const kv = (0.18 + 0.64 * hash(h.seed, 30 + i)) * h.pw;
              const rad = 6e-3 + 0.012 * hash(h.seed, 40 + i);
              const du = (h.u - ku) / (rad * 1.7);
              const dv = (h.v - kv) / rad;
              const e = du * du + dv * dv;
              if (e < 9) a = Math.max(a, Math.exp(-e * 1.4) * 1.1, Math.exp(-Math.abs(e - 2.2) * 2.5) * 0.45);
            }
          }
          return a;
        };
      }
      case "concrete":
        return (h, x, y) => {
          const o = hash(h.seed, 11) * 50;
          const cloud = noise.fbm(h.u * 2.1 + o, h.v * 2.1 + o, 4);
          let a = (cloud - 0.5) * 0.95 + 0.3;
          a += (noise.at(h.u * 95 + o, h.v * 95) - 0.5) * 0.35;
          const cell = hash(Math.floor(x * 400) + 1000003 * h.seed, Math.floor(y * 400));
          if (cell < 6e-3) a += 0.9;
          return a;
        };
      case "stone":
        return (h) => {
          const o = hash(h.seed, 11) * 50;
          const warp = noise.fbm(h.u * 1.6 + o, h.v * 1.6, 3);
          let a = (noise.fbm(h.u * 1.4 + warp * 1.8 + o, h.v * 5.5 + o, 4) - 0.5) * 2 + 0.45;
          a += (noise.at(h.u * 120 + o, h.v * 120) - 0.5) * 0.3;
          return a;
        };
      case "marble":
        return (h) => {
          const o = hash(h.seed, 11) * 50;
          const ang = 0.35 + 0.5 * hash(h.seed, 12);
          const turb = noise.fbm(h.u * 0.55 + o, h.v * 0.55 + o, 5);
          const f = (h.u * Math.cos(ang) + h.v * Math.sin(ang)) * 0.9 + turb * 1.9 + o;
          const vein = Math.abs(Math.sin(f * Math.PI));
          const g = (h.u * Math.cos(ang + 1.2) + h.v * Math.sin(ang + 1.2)) * 1.6 + noise.fbm(h.u * 1.1 + 9, h.v * 1.1, 4) * 2.2 + o;
          const side = Math.abs(Math.sin(g * Math.PI));
          let a = Math.pow(1 - vein, 9) * 0.5 + Math.pow(1 - vein, 45) * 0.55;
          a += Math.pow(1 - side, 30) * 0.28 * noise.at(h.u * 3 + o, h.v * 3);
          a += (noise.fbm(h.u * 1.3 + o, h.v * 1.3, 4) - 0.5) * 0.22;
          return a;
        };
      case "terrazzo":
        return (h) => {
          const C = 0.032;
          const cx = Math.floor(h.u / C);
          const cy = Math.floor(h.v / C);
          let best = 0;
          for (let i = -1; i <= 1; i++)
            for (let j = -1; j <= 1; j++) {
              const id = (cx + i) * 7349 + (cy + j) * 3517 + h.seed * 13;
              const px = (cx + i + hash(id, 1)) * C;
              const py = (cy + j + hash(id, 2)) * C;
              const rad = 3e-3 + 0.011 * hash(id, 3) ** 1.6;
              const dx = h.u - px;
              const dy = h.v - py;
              if (dx * dx + dy * dy > rad * rad * 1.21) continue;
              const ang = Math.atan2(dy, dx);
              const rr = rad * (0.75 + 0.35 * Math.sin(ang * 3 + hash(id, 4) * 6) * Math.cos(ang * 2 + hash(id, 5) * 4));
              if (dx * dx + dy * dy < rr * rr) best = 2 + Math.floor(hash(id, 6) * 4);
            }
          return best || (noise.at(h.u * 160, h.v * 160) - 0.5) * 0.15;
        };
      default:
        return (h) => (noise.at(h.u * 60, h.v * 60) - 0.5) * 0.25 + (noise.fbm(h.u * 2, h.v * 2, 2) - 0.5) * 0.2;
    }
  }
  const TERRAZZO_CHIPS = ["#9a928a", "#c4b9ab", "#6b655f", "#b58d70"];
  function paintRows(d, lay, shade, ppm, out, w, y0, y1) {
    const base = rgb(d.base);
    const acc = rgb(d.accent);
    const jc = rgb(d.jointColor);
    const chips = TERRAZZO_CHIPS.map(rgb);
    const px = 1 / ppm;
    const jw = Math.max(d.joint, 0.7 * px);
    const jStrength = Math.min(1, d.joint / (0.7 * px));
    const h = { seed: 0, u: 0, v: 0, pl: 1, pw: 1, d: 1, dir: 0 };
    for (let py = y0; py < y1; py++) {
      const y = (py + 0.5) * px;
      let i = py * w * 4;
      for (let pxl = 0; pxl < w; pxl++, i += 4) {
        const x = (pxl + 0.5) * px;
        lay.at(x, y, h);
        const a = shade(h, x, y);
        let r;
        let g;
        let b;
        if (a >= 2) {
          const c = chips[(a - 2) % chips.length];
          r = c[0];
          g = c[1];
          b = c[2];
        } else {
          const t = Math.min(1, Math.max(-0.4, a));
          r = base[0] + (acc[0] - base[0]) * t;
          g = base[1] + (acc[1] - base[1]) * t;
          b = base[2] + (acc[2] - base[2]) * t;
        }
        const tone = 1 + d.vary * (2 * hash(h.seed, 1) - 1) + (h.dir ? -0.025 : 0.02) * (d.pattern === "herringbone" ? 1 : 0);
        const warm = d.vary * 0.35 * (2 * hash(h.seed, 2) - 1);
        r *= tone * (1 + warm);
        g *= tone;
        b *= tone * (1 - warm);
        if (d.bevel > 0 && h.d < d.bevel) {
          const f = 1 - 0.2 * (1 - h.d / d.bevel);
          r *= f;
          g *= f;
          b *= f;
        }
        const cov = jStrength * Math.min(1, Math.max(0, (jw / 2 - h.d) / px + 0.5));
        if (cov > 0) {
          r += (jc[0] - r) * cov;
          g += (jc[1] - g) * cov;
          b += (jc[2] - b) * cov;
        }
        out[i] = r;
        out[i + 1] = g;
        out[i + 2] = b;
        out[i + 3] = 255;
      }
    }
  }
  const MAX_PPM = 520;
  function prepare(d, maxPx) {
    const lay = layoutOf(d);
    const ppm = Math.min(MAX_PPM, maxPx / Math.max(lay.tileX, lay.tileY));
    const w = Math.max(8, Math.round(lay.tileX * ppm));
    const hgt = Math.max(8, Math.round(lay.tileY * ppm));
    const ppmX = w / lay.tileX;
    const ppmY = hgt / lay.tileY;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = hgt;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D nicht verf\xFCgbar");
    const img = ctx.createImageData(w, hgt);
    const shade = lookShader(d, new Noise(hashStr(d.id) ^ 2654435769));
    const sx = ppmX / ppmY;
    const scaled = sx === 1 ? lay : { ...lay, at: (x, y, h) => lay.at(x / sx, y, h) };
    return { lay, canvas, ctx, img, shade, ppmY, w, hgt, scaled, sx };
  }
  const cache = /* @__PURE__ */ new Map();
  const pending = /* @__PURE__ */ new Map();
  function defaultMaxPx() {
    var _a;
    const touch = typeof navigator !== "undefined" && ((_a = navigator.maxTouchPoints) != null ? _a : 0) > 0;
    return touch ? 1280 : 2048;
  }
  function floorTexture(d, maxPx = defaultMaxPx()) {
    const key = `${d.id}|${maxPx}`;
    const hit = cache.get(key);
    if (hit) return hit;
    const p = prepare(d, maxPx);
    paintRows(d, p.scaled, p.shade, p.ppmY, p.img.data, p.w, 0, p.hgt);
    p.ctx.putImageData(p.img, 0, 0);
    const tex = { canvas: p.canvas, tileX: p.lay.tileX, tileY: p.lay.tileY };
    cache.set(key, tex);
    return tex;
  }
  function floorTextureAsync(d, maxPx = defaultMaxPx()) {
    const key = `${d.id}|${maxPx}`;
    const hit = cache.get(key);
    if (hit) return Promise.resolve(hit);
    const run = pending.get(key);
    if (run) return run;
    const job = new Promise((resolve, reject) => {
      let p;
      try {
        p = prepare(d, maxPx);
      } catch (e) {
        reject(e);
        return;
      }
      const step = Math.max(8, Math.floor(16e4 / p.w));
      let y = 0;
      const next = () => {
        try {
          const y1 = Math.min(p.hgt, y + step);
          paintRows(d, p.scaled, p.shade, p.ppmY, p.img.data, p.w, y, y1);
          y = y1;
          if (y < p.hgt) {
            setTimeout(next, 0);
            return;
          }
          p.ctx.putImageData(p.img, 0, 0);
          const tex = { canvas: p.canvas, tileX: p.lay.tileX, tileY: p.lay.tileY };
          cache.set(key, tex);
          pending.delete(key);
          resolve(tex);
        } catch (e) {
          pending.delete(key);
          reject(e);
        }
      };
      setTimeout(next, 0);
    });
    pending.set(key, job);
    return job;
  }
  function floorSwatch(d, sizePx = 96, meters = 1.3) {
    const lay = layoutOf(d);
    const shade = lookShader(d, new Noise(hashStr(d.id) ^ 2654435769));
    const ppm = sizePx / meters;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = sizePx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    const img = ctx.createImageData(sizePx, sizePx);
    const wrap = { ...lay, at: (x, y, h) => lay.at(x % lay.tileX, y % lay.tileY, h) };
    paintRows(d, wrap, shade, ppm, img.data, sizePx, 0, sizePx);
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL("image/png");
  }
  function floorOrder(d, area) {
    const m2 = Math.ceil(area * (1 + d.waste) * 10) / 10;
    const pieces = Math.ceil(m2 / (d.len * d.wid));
    const unit = d.pattern === "herringbone" ? "St\xE4be" : d.group === "Fliesen" && d.pattern === "tiles" ? "Fliesen" : "Dielen";
    return { m2, pieces, unit };
  }
  return __toCommonJS(floors_exports);
})();

const $ = (id) => document.getElementById(id);
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const fmtM = (m) => m.toFixed(2).replace('.', ',') + ' m';
const fmtD = (m) => (m < 0 ? '−' : '') + (Math.abs(m) >= 1 ? Math.abs(m).toFixed(2).replace('.', ',') + ' m' : Math.round(Math.abs(m) * 100) + ' cm');

// ---------- Farben & Materialien ----------
const WOODS = { 'eiche-hell': '#d6b688', 'wildeiche': '#c49a64', 'asteiche': '#c39360', 'nussbaum': '#6d4b33', 'weiss': '#f1efeb', 'schwarz': '#2b2b2d', 'grau': '#8e9297' };
const FABRICS = ['#c9baa7', '#9a9690', '#4a4d55', '#5d6f86', '#6f7d5e', '#a8634a', '#d9d2c5'];
const texCache = new Map();
function woodTex(name) {
  if (texCache.has('w' + name)) return texCache.get('w' + name);
  const base = new THREE.Color(WOODS[name] || name);
  const c = document.createElement('canvas'); c.width = 512; c.height = 512;
  const x = c.getContext('2d'); x.fillStyle = '#' + base.getHexString(); x.fillRect(0, 0, 512, 512);
  let s = 11; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const plain = name === 'weiss' || name === 'schwarz' || name === 'grau';
  for (let i = 0; i < (plain ? 0 : 140); i++) {   // Maserung: wellige Längslinien
    const y0 = r() * 512, a = 2 + r() * 6, f = 0.004 + r() * 0.01, dark = r() < 0.6;
    x.strokeStyle = dark ? `rgba(70,45,20,${0.05 + r() * 0.12})` : `rgba(255,240,215,${0.04 + r() * 0.08})`;
    x.lineWidth = 0.6 + r() * 1.8; x.beginPath();
    for (let px = 0; px <= 512; px += 8) { const py = y0 + Math.sin(px * f + i) * a; px ? x.lineTo(px, py) : x.moveTo(px, py); }
    x.stroke();
  }
  if (name === 'asteiche' || name === 'wildeiche') for (let k = 0; k < (name === 'asteiche' ? 7 : 3); k++) {   // Äste
    const kx = r() * 512, ky = r() * 512, rad = 3 + r() * 6;
    const g = x.createRadialGradient(kx, ky, 0, kx, ky, rad * 3); g.addColorStop(0, 'rgba(50,30,12,0.85)'); g.addColorStop(0.35, 'rgba(80,50,22,0.45)'); g.addColorStop(1, 'rgba(80,50,22,0)');
    x.fillStyle = g; x.beginPath(); x.ellipse(kx, ky, rad * 3, rad * 1.6, 0, 0, Math.PI * 2); x.fill();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  texCache.set('w' + name, t); return t;
}
function fabricTex(color, mode = 'plain') {
  const key = 'f' + color + mode;
  if (texCache.has(key)) return texCache.get(key);
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d'); x.fillStyle = color; x.fillRect(0, 0, 128, 128);
  const img = x.getImageData(0, 0, 128, 128); let s = 7; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < img.data.length; i += 4) { const n = (r() - 0.5) * 12 + (((i / 4) % 2) ? 3 : -3); img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n; }
  x.putImageData(img, 0, 0);
  if (mode !== 'plain') {
    const g = x.createRadialGradient(64, 64, 10, 64, 64, 76); g.addColorStop(0, 'rgba(255,255,255,0.10)'); g.addColorStop(1, 'rgba(0,0,0,0.12)');
    x.fillStyle = g; x.fillRect(0, 0, 128, 128);
    x.strokeStyle = 'rgba(55,45,35,0.35)'; x.lineWidth = 2.5; x.beginPath();
    if (mode === 'grid') { x.moveTo(0, 1); x.lineTo(128, 1); } x.moveTo(1, 0); x.lineTo(1, 128); x.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  texCache.set(key, t); return t;
}
const matCache = new Map();
function fabricMat(color, mode, rx = 1, ry = 1) {
  const t = fabricTex(color, mode).clone(); t.needsUpdate = true; t.repeat.set(rx, ry);
  return new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 });
}
function woodMat(name, sizeX = 1, sizeY = 1) {
  const t = woodTex(name).clone(); t.needsUpdate = true; t.repeat.set(sizeX / 0.9, sizeY / 0.9);
  return new THREE.MeshStandardMaterial({ map: t, roughness: name === 'schwarz' || name === 'weiss' ? 0.5 : 0.62 });
}
const metal = new THREE.MeshStandardMaterial({ color: 0x1f2024, roughness: 0.42, metalness: 0.6 });
const white = new THREE.MeshStandardMaterial({ color: 0xf4f2ee, roughness: 0.9 });
const green = new THREE.MeshStandardMaterial({ color: 0x4f7a45, roughness: 0.85 });
const isWood = (c) => c in WOODS;

// ---------- Katalog ----------
const PHOTO_ITEMS = (window.__FOTO && window.__FOTO.items) || [];   // verschlüsselt im Repo, entschlüsselt in index.html

const PHOTO_GROUP = { group: 'Deine Fotomöbel (3D aus deinen Fotos)', intro: 'In echter Größe, Farben aus dem Foto. Geschätzte Maße kannst du unter „Ausgewählt“ ändern. Im Showroom stehen alle in einem großen Raum – mit „Rumlaufen“ gehst du durch und setzt dich hin.', action: { id: 'showBtn', run: () => showroomClick() }, items: PHOTO_ITEMS };
const CAT = [
  ...(PHOTO_ITEMS.length ? [PHOTO_GROUP] : []),
  { group: 'Deine Auswahl (Maße laut Segmüller)', items: [
    { type: 'avellino', name: 'Ecksofa Avellino', note: 'Longchair links · Kopfteile verstellbar', kind: 'sofaL', w: 2.66, d: 1.75, h: 0.85, color: '#c9baa7', opts: { side: 'links', Ds: 1.02, Wc: 1.10, high: false, headrest: true } },
    { type: 'charleston', name: 'Esstisch Charleston', note: 'Ø 120, ausgezogen 170 · Wildeiche-Optik', kind: 'table', shape: 'round', w: 1.2, d: 1.2, h: 0.75, color: 'wildeiche', opts: { ext: false, extLen: 1.7, base: 'cross', legs: 'round' } },
    { type: 'bigsystem', name: 'Esstisch Big System', note: 'Ø 110, ausgezogen ca. 150 · Asteiche-Optik', kind: 'table', shape: 'round', w: 1.1, d: 1.1, h: 0.775, color: 'asteiche', opts: { ext: false, extLen: 1.5, base: 'cross', legs: 'flat' } },
    { type: 'milazzo', name: 'Esstisch Milazzo', note: '130 × 100, ausgezogen ca. 190 · Eiche hell', kind: 'table', shape: 'boat', w: 1.3, d: 1.0, h: 0.76, color: 'eiche-hell', opts: { ext: false, extLen: 1.9, base: 'column', legs: 'flat', bulge: 0.2 } },
  ] },
  { group: 'Sofas & Sessel', items: [
    { type: 'sofa2', name: '2-Sitzer-Sofa', kind: 'sofa', w: 1.6, d: 0.9, h: 0.85, color: '#9a9690', opts: { seats: 2 } },
    { type: 'sofa3', name: '3-Sitzer-Sofa', kind: 'sofa', w: 2.2, d: 0.95, h: 0.85, color: '#5d6f86', opts: { seats: 3 } },
    { type: 'sofaL', name: 'Ecksofa (L-Form)', kind: 'sofaL', w: 2.7, d: 1.8, h: 0.85, color: '#9a9690', opts: { side: 'links', Ds: 0.95, Wc: 1.0, high: false, headrest: false } },
    { type: 'sessel', name: 'Sessel', kind: 'sofa', w: 0.85, d: 0.85, h: 0.9, color: '#6f7d5e', opts: { seats: 1 } },
  ] },
  { group: 'Tische & Stühle', items: [
    { type: 'esstisch', name: 'Esstisch eckig', kind: 'table', shape: 'rect', w: 1.6, d: 0.9, h: 0.75, color: 'eiche-hell', opts: { ext: false, extLen: 2.2, base: 'legs4', legs: 'flat' } },
    { type: 'esstischrund', name: 'Esstisch rund', kind: 'table', shape: 'round', w: 1.2, d: 1.2, h: 0.75, color: 'nussbaum', opts: { ext: false, extLen: 1.6, base: 'cross', legs: 'round' } },
    { type: 'couchtisch', name: 'Couchtisch', kind: 'table', shape: 'rect', w: 1.1, d: 0.6, h: 0.45, color: 'eiche-hell', opts: { base: 'legs4', legs: 'round' } },
    { type: 'couchtischrund', name: 'Couchtisch rund', kind: 'table', shape: 'round', w: 0.8, d: 0.8, h: 0.42, color: 'schwarz', opts: { base: 'cross', legs: 'round' } },
    { type: 'schreibtisch', name: 'Schreibtisch', kind: 'table', shape: 'rect', w: 1.4, d: 0.7, h: 0.75, color: 'weiss', opts: { base: 'legs4', legs: 'flat' } },
    { type: 'stuhl', name: 'Stuhl', kind: 'chair', w: 0.46, d: 0.54, h: 0.85, color: '#9a9690', opts: {} },
  ] },
  { group: 'Schlafen', items: [
    { type: 'bett140', name: 'Bett 140 × 200', kind: 'bed', w: 1.5, d: 2.1, h: 0.95, color: '#d9d2c5', opts: { mat: 1.4 } },
    { type: 'bett160', name: 'Bett 160 × 200', kind: 'bed', w: 1.7, d: 2.1, h: 0.95, color: '#9a9690', opts: { mat: 1.6 } },
    { type: 'bett180', name: 'Bett 180 × 200', kind: 'bed', w: 1.9, d: 2.1, h: 0.95, color: '#4a4d55', opts: { mat: 1.8 } },
    { type: 'bett90', name: 'Einzelbett 90 × 200', kind: 'bed', w: 1.0, d: 2.1, h: 0.85, color: '#d9d2c5', opts: { mat: 0.9 } },
    { type: 'nachttisch', name: 'Nachttisch', kind: 'cabinet', w: 0.45, d: 0.38, h: 0.5, color: 'eiche-hell', opts: { fronts: 1, legs: true } },
  ] },
  { group: 'Schränke & Regale', items: [
    { type: 'kleiderschrank', name: 'Kleiderschrank', kind: 'cabinet', w: 2.0, d: 0.6, h: 2.2, color: 'weiss', opts: { fronts: 4 } },
    { type: 'sideboard', name: 'Sideboard', kind: 'cabinet', w: 1.8, d: 0.45, h: 0.8, color: 'nussbaum', opts: { fronts: 3, legs: true } },
    { type: 'kommode', name: 'Kommode', kind: 'cabinet', w: 1.0, d: 0.45, h: 0.85, color: 'eiche-hell', opts: { fronts: 2, drawers: true } },
    { type: 'tvboard', name: 'TV-Board', kind: 'cabinet', w: 1.8, d: 0.4, h: 0.5, color: 'schwarz', opts: { fronts: 3, legs: true, tv: true } },
    { type: 'regal', name: 'Regal offen', kind: 'shelf', w: 0.8, d: 0.35, h: 2.0, color: 'eiche-hell', opts: {} },
    { type: 'fernseher', name: 'Fernseher', note: '43–85″ · stellt sich auf TV-Board, Sideboard oder Kommode', kind: 'tv', icon: 'tv', w: 1.439, d: 0.22, h: 0.88, color: '#111214', opts: { inch: 65, mount: 'stand' } },
  ] },
  { group: 'Sonstiges', items: [
    { type: 'teppich', name: 'Teppich eckig', kind: 'rug', shape: 'rect', w: 2.0, d: 3.0, h: 0.015, color: '#d9d2c5', opts: {} },
    { type: 'teppichrund', name: 'Teppich rund', kind: 'rug', shape: 'round', w: 2.0, d: 2.0, h: 0.015, color: '#9a9690', opts: {} },
    { type: 'pflanze', name: 'Pflanze', kind: 'plant', shape: 'round', w: 0.5, d: 0.5, h: 1.2, color: '#d9d2c5', opts: {} },
  ] },
];
const LIGHT_GROUP = { group: 'Licht & Lampen', intro: 'Lampen mit Lichtstrom in Lumen. „Lichtquelle markieren“ für vorhandene Leuchten oder Auslässe im Haus. Die Wirkung siehst du im Tab „Licht“.', items: [
  { type: 'deckenleuchte', name: 'Deckenleuchte', note: 'an der Decke · strahlt nach unten', kind: 'light', icon: 'light', shape: 'round', w: 0.4, d: 0.4, h: 0.08, color: '#f1efeb', opts: {}, L: { lm: 2000, mode: 'down', mount: 'ceiling', k: 3000 } },
  { type: 'pendel', name: 'Pendelleuchte', note: 'hängend, Höhe einstellbar – z. B. über dem Esstisch', kind: 'light', icon: 'light', shape: 'round', w: 0.45, d: 0.45, h: 0.3, color: '#2b2b2d', opts: {}, L: { lm: 1500, mode: 'down', mount: 'pendant', lz: 1.45, k: 2700 } },
  { type: 'spot', name: 'Einbauspot / Downlight', note: 'in der Decke · Abstrahlwinkel 36°', kind: 'light', icon: 'light', shape: 'round', w: 0.1, d: 0.1, h: 0.02, color: '#f1efeb', opts: {}, L: { lm: 500, mode: 'spot', beam: 36, mount: 'ceiling', k: 3000 } },
  { type: 'wandleuchte', name: 'Wandleuchte', note: 'an die Wand schieben · Höhe einstellbar', kind: 'light', icon: 'light', w: 0.3, d: 0.12, h: 0.15, color: '#f1efeb', opts: {}, L: { lm: 800, mode: 'omni', mount: 'wall', lz: 1.8, k: 2700 } },
  { type: 'lampe', name: 'Stehlampe', note: 'mit Schirm', kind: 'lamp', shape: 'round', w: 0.4, d: 0.4, h: 1.6, color: '#d9d2c5', opts: {}, L: { lm: 1800, mode: 'omni', mount: 'floor', k: 2700 } },
  { type: 'tischlampe', name: 'Tischlampe', note: 'stellt sich auf Tisch, Kommode oder Sideboard', kind: 'light', icon: 'light', shape: 'round', w: 0.3, d: 0.3, h: 0.45, color: '#d9d2c5', opts: {}, L: { lm: 400, mode: 'omni', mount: 'table', k: 2700 } },
  { type: 'lichtquelle', name: 'Lichtquelle markieren', note: 'vorhandene Leuchte oder Auslass · Lumen, Höhe, Art einstellbar', kind: 'light', icon: 'light', shape: 'round', w: 0.2, d: 0.2, h: 0.05, color: '#a8792a', opts: {}, L: { lm: 1000, mode: 'down', mount: 'marker', k: 3000 } },
] };
CAT.push(LIGHT_GROUP);
const BYTYPE = Object.fromEntries(CAT.flatMap((g) => g.items.map((i) => [i.type, i])));

// ---------- Zustand ----------
const KEY = PHOTO_ITEMS.length ? 'mycasa3-moebelplaner-v1' : 'mycasa3-moebelplaner-v1-ohne-fotos';   // ohne Passwort eigener Speicher, die Einrichtung mit Fotomöbeln bleibt unberührt
let uid = 1;
const newItem = (type, x, z, rot = 0, extra = {}) => {
  const c = BYTYPE[type];
  return { id: 'm' + uid++, type, x, z, rot, w: c.w, d: c.d, h: c.h, color: c.color, opts: JSON.parse(JSON.stringify(c.opts || {})), ...extra };
};
function example() {
  return {
    room: { w: 5.5, l: 4.5, h: 2.5, door: { wall: 'S', pos: 0.18, width: 0.9 }, win: { wall: 'N', pos: 0.62, width: 1.6 } },
    items: [
      newItem('teppich', -1.25, -0.9, Math.PI / 2, { w: 2.0, d: 2.8 }),
      newItem('avellino', -1.42, -1.37),
      newItem('couchtischrund', -1.0, -0.3),
      newItem('charleston', 1.4, 0.7),
      newItem('stuhl', 1.4, -0.02, 0), newItem('stuhl', 1.4, 1.42, Math.PI), newItem('stuhl', 0.68, 0.7, Math.PI / 2), newItem('stuhl', 2.12, 0.7, -Math.PI / 2),
      newItem('pflanze', 2.45, -1.95),
    ],
  };
}
function showroom() {   // großer Raum mit allen Foto-Möbeln, Rücken an der Wand, Stühle um den Tisch
  const P = Math.PI;
  const s = {
    v: 2,
    room: { w: 10, l: 8, h: 2.6, north: 0, door: { wall: 'S', pos: 0.18, width: 0.9 }, wins: [{ wall: 'N', pos: 0.5, width: 2.2, height: 1.4, sill: 0.8 }, { wall: 'S', pos: 0.85, width: 1.4, height: 1.3, sill: 0.9 }, { wall: 'W', pos: 0.22, width: 1.2, height: 1.3, sill: 0.9 }] },
    items: [
      newItem('teppich', -2.9, -1.55, P / 2, { w: 2.0, d: 3.0 }),
      newItem('f_52d5ed', -3.0, -3.06, 0),
      newItem('couchtischrund', -2.4, -1.45),
      newItem('f_fef2b0', 0.7, -3.09, 0),
      newItem('f_8c51ec', -4.13, 1.3, P / 2),
      newItem('lampe', -4.6, -0.6),
      newItem('f_0cf30f', 3.5, -1.6),
      newItem('f_0a7f80', 3.5, -2.45, 0), newItem('f_0a7f80', 3.5, -0.75, P), newItem('f_0a7f80', 2.65, -1.6, P / 2), newItem('f_0a7f80', 4.35, -1.6, -P / 2),
      newItem('f_adaa68', 3.94, 2.35, -P / 2),
      newItem('f_df84c9', 1.3, 3.72, P),
      newItem('f_53f6e7', -0.25, 3.78, P),
      newItem('f_92cb10', -1.6, 3.81, P),
      newItem('pflanze', 4.55, -3.55),
      newItem('f_460b66', 0.0, 0.95, 0),
      newItem('pendel', 3.5, -1.6), newItem('deckenleuchte', -2.6, -1.5), newItem('deckenleuchte', 1.9, 1.7),
      newItem('spot', 0.9, 3.2), newItem('spot', 1.7, 3.2), newItem('spot', -2.5, 3.0), newItem('tischlampe', -1.9, 3.8),
    ],
  };
  for (const it of s.items) if (stacks(it)) { const sp = supportOf(it, s.items); it.on = sp ? sp.id : null; }   // Tischlampe auf den Schuhschrank
  const W = s.room.w / 2 - 0.004, L = s.room.l / 2 - 0.004;
  for (const it of s.items) {   // Umrisse (Foto-Modelle sind unregelmäßig) sicher innerhalb der Wände
    const wf = worldFootprint(it), xs = wf.map((q) => q[0]), zs = wf.map((q) => q[1]);
    it.x += Math.max(0, -W - Math.min(...xs)) - Math.max(0, Math.max(...xs) - W);
    it.z += Math.max(0, -L - Math.min(...zs)) - Math.max(0, Math.max(...zs) - L);
  }
  return s;
}
const SEEN = 'mycasa3-moebelplaner-fotomoebel';
let beforeShow = null;   // vorherige Einrichtung (für „Zurück“)
let state = null;
try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.room && Array.isArray(s.items)) state = s; } catch (e) { /* kein Speicher */ }
if (state) state.items = state.items.filter((i) => BYTYPE[i.type]);   // unbekannte Typen überspringen
if (state) normRoom(state.room);
let firstShow = false;
if (PHOTO_ITEMS.length) try { firstShow = !localStorage.getItem(SEEN); localStorage.setItem(SEEN, '1'); } catch (e) { firstShow = false; }
if (!state) state = PHOTO_ITEMS.length ? showroom() : example();
else if (firstShow && !state.v) {   // einmalig: Showroom zeigen, alte Einrichtung bleibt zum Zurückholen
  beforeShow = state;
  try { localStorage.setItem(KEY + '-vorher', JSON.stringify(state)); } catch (e) { /* egal */ }
  state = showroom();
}
normRoom(state.room);   // altes Einzelfenster → Fensterliste
uid = 1 + Math.max(0, ...state.items.map((i) => +String(i.id).slice(1) || 0));
let selected = null;
let saveTimer = null;
function save() { clearTimeout(saveTimer); saveTimer = setTimeout(() => { state.v = 2; try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* egal */ } }, 300); }

// ---------- Geometrie / Umriss ----------
function shapeOf(it) {
  const c = BYTYPE[it.type];
  if (c.kind === 'sofaL') return 'L';
  return c.shape || 'rect';
}
function curLen(it) { return it.opts && it.opts.ext ? it.opts.extLen : it.w; }
function localFootprint(it) {
  const cc = BYTYPE[it.type];
  if (cc.kind === 'glb' && cc.fp && cc.shape !== 'round') { const fx = it.w / cc.w, fz = it.d / cc.d; return cc.fp.map(([x, z]) => [x * fx, z * fz]); }
  const sh = shapeOf(it), W = curLen(it), D = it.d;
  if (sh === 'L') {
    const o = it.opts, sx = o.side === 'rechts' ? -1 : 1, z0 = -D / 2;
    const p = [[-W / 2, z0], [W / 2, z0], [W / 2, z0 + o.Ds], [-W / 2 + o.Wc, z0 + o.Ds], [-W / 2 + o.Wc, D / 2], [-W / 2, D / 2]].map(([x, z]) => [x * sx, z]);
    return sx > 0 ? p : p.reverse();
  }
  if (sh === 'round') {
    const r = it.d / 2, half = Math.max(0, (W - it.d) / 2), pts = [];
    for (let k = 0; k <= 24; k++) { const a = -Math.PI / 2 + (k / 24) * Math.PI; pts.push([half + r * Math.cos(a), r * Math.sin(a)]); }
    for (let k = 0; k <= 24; k++) { const a = Math.PI / 2 + (k / 24) * Math.PI; pts.push([-half + r * Math.cos(a), r * Math.sin(a)]); }
    return pts;
  }
  if (sh === 'boat') {
    const h = D / 2, b = Math.min(it.opts.bulge || 0.2, W / 2 - 0.01), R = (b * b + h * h) / (2 * b), a = Math.asin(h / R), pts = [];
    for (let k = 0; k <= 16; k++) { const t = -a + (2 * a * k) / 16; pts.push([W / 2 - R + R * Math.cos(t), R * Math.sin(t)]); }
    for (let k = 0; k <= 16; k++) { const t = Math.PI - a + (2 * a * k) / 16; pts.push([-W / 2 + R + R * Math.cos(t), R * Math.sin(t)]); }
    return pts;
  }
  return [[-W / 2, -D / 2], [W / 2, -D / 2], [W / 2, D / 2], [-W / 2, D / 2]];
}
function worldFootprint(it) {
  const c = Math.cos(it.rot), s = Math.sin(it.rot);
  return localFootprint(it).map(([x, z]) => [it.x + c * x + s * z, it.z - s * x + c * z]);
}
function segDist(p, a, b) {
  const dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz;
  const t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / L)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dz);
}
function inside(p, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i], [xj, zj] = poly[j];
    if ((zi > p[1]) !== (zj > p[1]) && p[0] < ((xj - xi) * (p[1] - zi)) / (zj - zi) + xi) c = !c;
  }
  return c;
}
function segX(a, b, c, d) {
  const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}
function bbox(P) { let a = Infinity, b = -Infinity, c = Infinity, d = -Infinity; for (const [x, z] of P) { a = Math.min(a, x); b = Math.max(b, x); c = Math.min(c, z); d = Math.max(d, z); } return [a, b, c, d]; }
function polyDist(A, B) {
  const ba = bbox(A), bb = bbox(B), overlap = ba[0] <= bb[1] && bb[0] <= ba[1] && ba[2] <= bb[3] && bb[2] <= ba[3];
  if (!overlap) { const gx = Math.max(0, bb[0] - ba[1], ba[0] - bb[1]), gz = Math.max(0, bb[2] - ba[3], ba[2] - bb[3]); if (Math.hypot(gx, gz) > 1.5) return Math.hypot(gx, gz); }
  if (overlap) for (let i = 0; i < A.length; i++) for (let j = 0; j < B.length; j++) if (segX(A[i], A[(i + 1) % A.length], B[j], B[(j + 1) % B.length])) return -1;
  if (inside(A[0], B) || inside(B[0], A)) return -1;
  let d = Infinity;
  for (const p of A) for (let i = 0; i < B.length; i++) d = Math.min(d, segDist(p, B[i], B[(i + 1) % B.length]));
  for (const p of B) for (let i = 0; i < A.length; i++) d = Math.min(d, segDist(p, A[i], A[(i + 1) % A.length]));
  return d;
}
const isRug = (it) => BYTYPE[it.type].kind === 'rug';
function wallLen(wall) { return wall === 'N' || wall === 'S' ? state.room.w : state.room.l; }
function doorGeom() {   // Türöffnung + Schwenkbereich (nach innen)
  const { w, l } = state.room, d = state.room.door, L = wallLen(d.wall), half = d.width / 2;
  const c = Math.min(L / 2 - half - 0.05, Math.max(-L / 2 + half + 0.05, (d.pos - 0.5) * L));
  const map = { N: (t, n) => [t, -l / 2 + n], S: (t, n) => [t, l / 2 - n], W: (t, n) => [-w / 2 + n, t], E: (t, n) => [w / 2 - n, t] }[d.wall];
  const hinge = map(c - half, 0), sector = [hinge];
  for (let k = 0; k <= 12; k++) { const a = (k / 12) * Math.PI / 2; sector.push(map(c - half + d.width * Math.cos(a), d.width * Math.sin(a))); }
  return { a: map(c - half, 0), b: map(c + half, 0), hinge, sector, center: c };
}
function winGeom() {
  const { w, l } = state.room, wi = state.room.win; if (!wi || wi.wall === '-') return null;
  const L = wallLen(wi.wall), half = wi.width / 2;
  const c = Math.min(L / 2 - half - 0.05, Math.max(-L / 2 + half + 0.05, (wi.pos - 0.5) * L));
  const map = { N: (t) => [t, -l / 2], S: (t) => [t, l / 2], W: (t) => [-w / 2, t], E: (t) => [w / 2, t] }[wi.wall];
  return { a: map(c - half), b: map(c + half), center: c };
}

// ---------- 3D ----------
const host = $('view3d');
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.NeutralToneMapping;
host.appendChild(renderer.domElement);
renderer.domElement.style.display = 'block';
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.65;
const hemi = new THREE.HemisphereLight(0xffffff, 0xcfc6b8, 0.35); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(3, 7, 4); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9 }); scene.add(sun);
const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 100);
camera.position.set(4.4, 5.6, 6.8);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.4, 0); controls.maxPolarAngle = Math.PI / 2 - 0.03; controls.enableDamping = true;
const roomG = new THREE.Group(); scene.add(roomG);
const furnG = new THREE.Group(); scene.add(furnG);
const ringG = new THREE.Group(); scene.add(ringG);
let walls = [];
function applyBg() {
  if (LM.on && LUX.sun) { const a = LUX.sun.alt / DEG; scene.background = new THREE.Color(a < -4 ? 0x0c1220 : a < 2 ? 0x55647f : walk.on ? 0xcfe0f0 : (css('--paper') || '#f5f5f2')); return; }
  scene.background = new THREE.Color(walk.on ? 0xdde8f2 : (css('--paper') || '#f5f5f2'));
}

function buildRoom3D() {
  roomG.clear();
  const { w, l, h } = state.room, t = 0.12;
  roomG.add(buildFloorMesh(w, l));
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(w, l), new THREE.MeshStandardMaterial({ color: 0xf7f5f0, roughness: 0.95, emissive: 0xfffaf0, emissiveIntensity: 0.55 }));
  ceil.rotation.x = Math.PI / 2; ceil.position.y = h; roomG.add(ceil); ceil.material.shadowSide = THREE.DoubleSide; ceilMesh = ceil;   // zeigt nach unten: von oben unsichtbar, beim Rumlaufen Decke
  const dg = doorGeom(), wgs = winGeoms();
  walls = [];
  const mkWall = (wall, len, pos, rotY, n) => {
    // Wand mit Öffnungen (Tür bis 2,05 m, Fenster 0,9–2,2 m) als Form mit Löchern
    const shape = new THREE.Shape(); shape.moveTo(-len / 2, 0); shape.lineTo(len / 2, 0); shape.lineTo(len / 2, h); shape.lineTo(-len / 2, h); shape.lineTo(-len / 2, 0);
    // lokale x-Achse der Wand: N und E laufen mit der Wandkoordinate, S und W gegenläufig (Drehung um Y)
    const flip = wall === 'S' || wall === 'W' ? -1 : 1;
    if (state.room.door.wall === wall) { const c = dg.center * flip, hw = state.room.door.width / 2; const hole = new THREE.Path(); hole.moveTo(c - hw, 0.001); hole.lineTo(c + hw, 0.001); hole.lineTo(c + hw, 2.05); hole.lineTo(c - hw, 2.05); hole.lineTo(c - hw, 0.001); shape.holes.push(hole); }
    for (const g2 of wgs) if (g2.wall === wall) { const c = g2.center * flip, hw = g2.width / 2, y0 = Math.max(0.002, g2.sill); const hole = new THREE.Path(); hole.moveTo(c - hw, y0); hole.lineTo(c + hw, y0); hole.lineTo(c + hw, g2.top); hole.lineTo(c - hw, g2.top); hole.lineTo(c - hw, y0); shape.holes.push(hole); }
    const geo = new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: false });
    geo.translate(0, 0, -t / 2);
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: paintOf(wall), roughness: 0.95 }));
    m.position.set(...pos); m.rotation.y = rotY; m.receiveShadow = true; m.castShadow = LM.on; m.userData.n = new THREE.Vector3(...n); m.userData.wall = wall;
    roomG.add(m); walls.push(m);
  };
  mkWall('N', w + 2 * t, [0, 0, -l / 2 - t / 2], 0, [0, 0, 1]);
  mkWall('S', w + 2 * t, [0, 0, l / 2 + t / 2], Math.PI, [0, 0, -1]);
  mkWall('W', l, [-w / 2 - t / 2, 0, 0], Math.PI / 2, [1, 0, 0]);
  mkWall('E', l, [w / 2 + t / 2, 0, 0], -Math.PI / 2, [-1, 0, 0]);
  for (const g2 of wgs) {   // Glas
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(g2.width, g2.top - g2.sill), new THREE.MeshStandardMaterial({ color: 0xbfd6e6, transparent: true, opacity: 0.35, roughness: 0.1 }));
    glass.position.set((g2.a[0] + g2.b[0]) / 2, (g2.sill + g2.top) / 2, (g2.a[1] + g2.b[1]) / 2);
    glass.rotation.y = g2.wall === 'W' || g2.wall === 'E' ? Math.PI / 2 : 0; roomG.add(glass);
  }
  {   // geschlossene Tür als unsichtbarer Schattenwerfer (Sonne nur durch Fenster)
    const door = new THREE.Mesh(new THREE.BoxGeometry(state.room.door.width, 2.05, 0.05), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
    door.position.set((dg.a[0] + dg.b[0]) / 2, 1.025, (dg.a[1] + dg.b[1]) / 2); door.rotation.y = state.room.door.wall === 'W' || state.room.door.wall === 'E' ? Math.PI / 2 : 0;
    door.castShadow = true; door.visible = LM.on; roomG.add(door); doorCaster = door;
  }
  buildFloorLux(); setRoomCasters(LM.on);
}

function legMesh(from, to, kind, mat = metal) {
  const v = new THREE.Vector3().subVectors(to, from), len = v.length();
  const g = kind === 'round' ? new THREE.CylinderGeometry(0.017, 0.017, len, 12) : new THREE.BoxGeometry(0.065, len, 0.024);
  const m = new THREE.Mesh(g, mat); m.position.copy(from).addScaledVector(v, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize()); if (kind !== 'round') m.rotateY(Math.PI / 2);
  m.castShadow = true; return m;
}
function rbox(g, w, h, d, cx, y0, cz, mat, r = 0.03) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(Math.max(w, 0.01), Math.max(h, 0.01), Math.max(d, 0.01), 3, Math.max(0.001, Math.min(r, h / 2 - 0.001, w / 2 - 0.001, d / 2 - 0.001))), mat);
  m.position.set(cx, y0 + h / 2, cz); m.castShadow = true; m.receiveShadow = true; g.add(m); return m;
}

function buildTable(it) {
  const g = new THREE.Group(), o = it.opts || {}, c = BYTYPE[it.type], W = curLen(it), top = c.shape === 'boat' ? 0.02 : 0.035;
  const s = new THREE.Shape();
  localFootprint(it).forEach(([x, z], i) => (i ? s.lineTo(x, -z) : s.moveTo(x, -z)));
  const geo = new THREE.ExtrudeGeometry(s, { depth: top, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 2 });
  geo.rotateX(-Math.PI / 2);
  const mat = isWood(it.color) ? woodMat(it.color, 1, 1) : new THREE.MeshStandardMaterial({ color: it.color, roughness: 0.5 });
  if (mat.map) { const L = Math.max(W, it.d); mat.map.repeat.set(1 / L, 1 / L); mat.map.offset.set(0.5, 0.5); }
  const tm = new THREE.Mesh(geo, mat); tm.position.y = it.h - top; tm.castShadow = true; tm.receiveShadow = true; g.add(tm);
  const yTop = it.h - top - 0.02, rx = Math.min(0.75, W * 0.36), rz = Math.min(0.42, it.d * 0.36), corners = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  if (o.base === 'cross') corners.forEach(([sx, sz]) => g.add(legMesh(new THREE.Vector3(-sx * 0.12, yTop, -sz * 0.12), new THREE.Vector3(sx * rx, 0, sz * rz), o.legs)));
  else if (o.base === 'column') {
    const yLow = yTop - 0.15, col = new THREE.Mesh(new THREE.BoxGeometry(0.09, yTop - yLow, 0.09), metal); col.position.y = yLow + (yTop - yLow) / 2; col.castShadow = true; g.add(col);
    corners.forEach(([sx, sz]) => g.add(legMesh(new THREE.Vector3(sx * 0.03, yLow + 0.02, sz * 0.03), new THREE.Vector3(sx * rx, 0, sz * rz), o.legs)));
  } else {
    const ix = W / 2 - 0.06, iz = it.d / 2 - 0.06;
    corners.forEach(([sx, sz]) => g.add(legMesh(new THREE.Vector3(sx * ix, yTop, sz * iz), new THREE.Vector3(sx * ix, 0, sz * iz), o.legs)));
  }
  return g;
}
function buildSofaL(it) {
  const g = new THREE.Group(), o = it.opts, sx = o.side === 'rechts' ? -1 : 1, X = (v) => v * sx;
  const W = it.w, D = it.d, z0 = -D / 2, backD = 0.24, armW = 0.18, cushT = 0.13, seatH = 0.46, legH = 0.11, frameTop = seatH - cushT, cell = 0.115;
  const backH = o.high ? Math.max(it.h, 1.02) : it.h;
  const plain = fabricMat(it.color, 'plain', 2, 2);
  const add = (w, h, d, cx, y0, cz, m, r) => rbox(g, w, h, d, X(cx), y0, cz, m, r);
  const xL = -W / 2 + o.Wc, xR = W / 2 - armW;
  add(xR - xL, frameTop - legH, o.Ds - backD, (xL + xR) / 2, legH, z0 + backD + (o.Ds - backD) / 2, plain, 0.02);
  add(o.Wc, frameTop - legH, D - backD, -W / 2 + o.Wc / 2, legH, z0 + backD + (D - backD) / 2, plain, 0.02);
  const seatD = o.Ds - backD - 0.02, halfW = (xR - xL) / 2;
  for (let k = 0; k < 2; k++) add(halfW - 0.01, cushT, seatD, xL + halfW * (k + 0.5), frameTop, z0 + backD + 0.01 + seatD / 2, fabricMat(it.color, 'grid', halfW / cell, seatD / cell), 0.06);
  const chD = D - backD - 0.02;
  add(o.Wc - 0.02, cushT, chD, -W / 2 + o.Wc / 2, frameTop, z0 + backD + 0.01 + chD / 2, fabricMat(it.color, 'grid', o.Wc / cell, chD / cell), 0.06);
  add(W, 0.7 - legH, backD * 0.55, 0, legH, z0 + backD * 0.275, plain, 0.03);
  const segs = 4, bw = (W - armW - 0.18) / segs, bx0 = -W / 2 + 0.18;
  for (let k = 0; k < segs; k++) add(bw - 0.012, backH - frameTop, backD * 0.62, bx0 + bw * (k + 0.5), frameTop, z0 + backD * 0.55, fabricMat(it.color, 'ribs', bw / cell, 1), 0.08);
  add(armW, 0.64 - legH, o.Ds, W / 2 - armW / 2, legH, z0 + o.Ds / 2, plain, 0.06);
  add(0.18, 0.64 - legH, 0.78, -W / 2 + 0.09, legH, z0 + 0.39, plain, 0.06);
  [[-W / 2 + 0.12, z0 + 0.1], [W / 2 - 0.12, z0 + 0.1], [W / 2 - 0.12, z0 + o.Ds - 0.1], [-W / 2 + 0.12, D / 2 - 0.1], [-W / 2 + o.Wc - 0.12, D / 2 - 0.1], [0.2, z0 + 0.1]]
    .forEach(([fx, fz]) => g.add(legMesh(new THREE.Vector3(X(fx), legH, fz), new THREE.Vector3(X(fx) + Math.sign(fx) * 0.045 * sx, 0, fz + Math.sign(fz) * 0.045), 'round')));
  return g;
}
function buildSofa(it) {
  const g = new THREE.Group(), n = it.opts.seats || 3, W = it.w, D = it.d, z0 = -D / 2, armW = n === 1 ? 0.16 : 0.18, backD = 0.22, legH = 0.1, seatH = 0.45, cushT = 0.13;
  const plain = fabricMat(it.color, 'plain', 2, 2), frameTop = seatH - cushT;
  rbox(g, W - 2 * armW, frameTop - legH, D - backD, 0, legH, z0 + backD + (D - backD) / 2, plain, 0.02);
  const cw = (W - 2 * armW) / n;
  for (let k = 0; k < n; k++) rbox(g, cw - 0.012, cushT, D - backD - 0.02, -W / 2 + armW + cw * (k + 0.5), frameTop, z0 + backD + (D - backD) / 2, fabricMat(it.color, 'plain', 1, 1), 0.06);
  rbox(g, W, it.h - legH, backD, 0, legH, z0 + backD / 2, plain, 0.05);
  for (const s of [-1, 1]) rbox(g, armW, 0.62 - legH, D, s * (W / 2 - armW / 2), legH, 0, plain, 0.06);
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) g.add(legMesh(new THREE.Vector3(sx * (W / 2 - 0.08), legH, sz * (D / 2 - 0.08)), new THREE.Vector3(sx * (W / 2 - 0.05), 0, sz * (D / 2 - 0.05)), 'round'));
  return g;
}
function buildChair(it) {
  const g = new THREE.Group(), W = it.w, D = it.d, sh = 0.46, m = fabricMat(it.color, 'plain', 1, 1);
  rbox(g, W, 0.06, D * 0.9, 0, sh - 0.06, 0.02, m, 0.025);
  const back = rbox(g, W, it.h - sh, 0.05, 0, sh - 0.02, -D / 2 + 0.05, m, 0.02); back.rotation.x = -0.08;
  for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) g.add(legMesh(new THREE.Vector3(sx * (W / 2 - 0.05), sh - 0.06, sz * (D / 2 - 0.07)), new THREE.Vector3(sx * (W / 2 - 0.03), 0, sz * (D / 2 - 0.04)), 'round'));
  return g;
}
function buildBed(it) {
  const g = new THREE.Group(), W = it.w, D = it.d, frame = fabricMat(it.color, 'plain', 2, 2);
  rbox(g, W, 0.3, D, 0, 0.05, 0, frame, 0.03);
  rbox(g, (it.opts.mat || W - 0.1), 0.22, D - 0.12, 0, 0.33, 0.04, white, 0.06);
  rbox(g, W, it.h - 0.05, 0.1, 0, 0.05, -D / 2 + 0.05, fabricMat(it.color, 'ribs', W / 0.15, 1), 0.04);
  const pw = (it.opts.mat || W) / (W > 1.2 ? 2 : 1) - 0.08;
  for (let k = 0; k < (W > 1.2 ? 2 : 1); k++) rbox(g, pw, 0.12, 0.42, (W > 1.2 ? (k ? 1 : -1) * (pw / 2 + 0.03) : 0), 0.55, -D / 2 + 0.36, white, 0.05);
  rbox(g, (it.opts.mat || W) - 0.04, 0.05, D * 0.5, 0, 0.55, D * 0.18, fabricMat('#d9d2c5', 'plain', 3, 3), 0.02);
  return g;
}
function buildCabinet(it) {
  const g = new THREE.Group(), W = it.w, D = it.d, o = it.opts, legH = o.legs ? 0.1 : 0;
  const mat = isWood(it.color) ? woodMat(it.color, W, it.h) : new THREE.MeshStandardMaterial({ color: it.color, roughness: 0.5 });
  rbox(g, W, it.h - legH, D, 0, legH, 0, mat, 0.008);
  const line = new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }), n = o.fronts || 2, fh = it.h - legH;
  if (o.drawers) for (let k = 1; k < 4; k++) { const s = new THREE.Mesh(new THREE.BoxGeometry(W - 0.02, 0.004, 0.004), line); s.position.set(0, legH + (fh * k) / 4, D / 2 + 0.002); g.add(s); }
  else for (let k = 1; k < n; k++) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.004, fh - 0.02, 0.004), line); s.position.set(-W / 2 + (W * k) / n, legH + fh / 2, D / 2 + 0.002); g.add(s); }
  if (o.legs) for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) g.add(legMesh(new THREE.Vector3(sx * (W / 2 - 0.05), legH, sz * (D / 2 - 0.05)), new THREE.Vector3(sx * (W / 2 - 0.04), 0, sz * (D / 2 - 0.04)), 'round'));
  if (o.tv) { const tvW = Math.min(1.45, W * 0.8), tv = new THREE.Mesh(new THREE.BoxGeometry(tvW, tvW * 0.57, 0.04), new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.3 })); tv.position.set(0, it.h + 0.06 + tvW * 0.285, -0.02); tv.castShadow = true; g.add(tv); g.add(legMesh(new THREE.Vector3(0, it.h, -0.02), new THREE.Vector3(0, it.h + 0.08, -0.02), 'flat')); }
  return g;
}
function buildShelf(it) {
  const g = new THREE.Group(), W = it.w, D = it.d, mat = isWood(it.color) ? woodMat(it.color, W, it.h) : new THREE.MeshStandardMaterial({ color: it.color });
  for (const s of [-1, 1]) rbox(g, 0.02, it.h, D, s * (W / 2 - 0.01), 0, 0, mat, 0.003);
  const n = Math.max(2, Math.round(it.h / 0.38));
  for (let k = 0; k <= n; k++) rbox(g, W - 0.04, 0.02, D, 0, (k * (it.h - 0.02)) / n, 0, mat, 0.003);
  return g;
}
function buildRug(it) {
  const g = new THREE.Group(), mat = fabricMat(it.color, 'plain', it.w * 2, it.d * 2);
  const geo = BYTYPE[it.type].shape === 'round' ? new THREE.CylinderGeometry(it.w / 2, it.w / 2, it.h, 48) : new THREE.BoxGeometry(it.w, it.h, it.d);
  const m = new THREE.Mesh(geo, mat); m.position.y = it.h / 2; m.receiveShadow = true; g.add(m); return g;
}
function buildPlant(it) {
  const g = new THREE.Group(), r = it.w / 2, potH = Math.min(0.4, it.h * 0.3);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.75, r * 0.6, potH, 24), new THREE.MeshStandardMaterial({ color: it.color, roughness: 0.8 })); pot.position.y = potH / 2; pot.castShadow = true; g.add(pot);
  for (let k = 0; k < 7; k++) { const s = new THREE.Mesh(new THREE.IcosahedronGeometry(r * (0.55 + 0.1 * (k % 3)), 1), green); s.position.set(Math.cos(k * 1.7) * r * 0.35, potH + (it.h - potH) * (0.35 + 0.1 * k), Math.sin(k * 1.7) * r * 0.35); s.castShadow = true; g.add(s); }
  return g;
}
function buildLamp(it) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.03, 32), metal); base.position.y = 0.015; g.add(base);
  g.add(legMesh(new THREE.Vector3(0, 0.03, 0), new THREE.Vector3(0, it.h - 0.3, 0), 'round'));
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(it.w * 0.32, it.w / 2, 0.32, 32, 1, true), new THREE.MeshStandardMaterial({ color: it.color, roughness: 0.9, side: THREE.DoubleSide, emissive: 0x554433, emissiveIntensity: 0.25 }));
  shade.position.y = it.h - 0.16; shade.castShadow = true; g.add(shade); return g;
}
// Foto-Möbel: GLB (Punkte mit sRGB-Farben) einmal laden, alle Exemplare teilen sich die Geometrie
const glbReady = new Map(), glbFailed = new Set(), glbLoading = new Map(), glbHooked = new Set();
let gltfLoader = null;
const photoMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.97, metalness: 0, vertexColors: true });
const ghostMat = new THREE.MeshStandardMaterial({ color: 0xcfc6b8, roughness: 0.9, transparent: true, opacity: 0.45 });
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
async function fetchModel(file) {   // GitHub-Fassung: verschlüsselte Modelle entschlüsselt index.html
  if (window.__FOTO && window.__FOTO.load) return window.__FOTO.load(file);
  const r = await fetch(file); if (!r.ok) throw new Error('HTTP ' + r.status);
  if (!file.endsWith('.json')) return r.arrayBuffer();
  const j = await r.json(), s = atob(j.data), u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  if (!/gzip/.test(j.format)) return u.buffer;
  if (typeof DecompressionStream === 'undefined') throw new Error('Browser kann gzip nicht entpacken');
  return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
}
function loadGlb(file) {
  if (glbLoading.has(file)) return glbLoading.get(file);
  const p = (async () => {
    try {
      if (!gltfLoader) { const m = await import('three/addons/loaders/GLTFLoader.js'); gltfLoader = new m.GLTFLoader(); }
      const g = await gltfLoader.parseAsync(await fetchModel(file), '');
      g.scene.updateMatrixWorld(true);
      let mesh = null; g.scene.traverse((o) => { if (!mesh && o.isMesh) mesh = o; });
      if (!mesh) throw new Error('kein Mesh');
      const pos = mesh.geometry.attributes.position, col = mesh.geometry.attributes.color, n = pos.count;
      const P = new Float32Array(n * 3), C = new Float32Array(n * 3), v = new THREE.Vector3();
      for (let i = 0; i < n; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld); P[i * 3] = v.x; P[i * 3 + 1] = v.y; P[i * 3 + 2] = v.z;
        if (col) { C[i * 3] = toLin(col.getX(i)); C[i * 3 + 1] = toLin(col.getY(i)); C[i * 3 + 2] = toLin(col.getZ(i)); } else C.fill(0.6, i * 3, i * 3 + 3);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(P, 3)); geo.setAttribute('color', new THREE.BufferAttribute(C, 3));
      if (mesh.geometry.index) geo.setIndex(mesh.geometry.index.clone());
      geo.computeVertexNormals(); geo.computeBoundingBox(); geo.computeBoundingSphere();
      const size = new THREE.Vector3(), center = new THREE.Vector3(); geo.boundingBox.getSize(size); geo.boundingBox.getCenter(center);
      const e = { geo, size, center, minY: geo.boundingBox.min.y }; glbReady.set(file, e); return e;
    } catch (err) { console.warn('3D-Modell nicht geladen:', file, err); glbFailed.add(file); return null; }
  })();
  glbLoading.set(file, p); return p;
}
function updatePhase() {
  const files = new Set(state.items.map((i) => BYTYPE[i.type].file).filter(Boolean));
  const pending = [...files].some((f) => !glbReady.has(f) && !glbFailed.has(f));
  $('phase').dataset.tourPhase = pending ? 'loading' : 'ready';
}
function buildGlb(it) {
  const c = BYTYPE[it.type], g = new THREE.Group(), e = glbReady.get(c.file);
  if (e) {
    const m = new THREE.Mesh(e.geo, photoMat), sx = it.w / e.size.x, sy = it.h / e.size.y, sz = it.d / e.size.z;
    m.scale.set(sx, sy, sz); m.position.set(-e.center.x * sx, -e.minY * sy, -e.center.z * sz);
    m.castShadow = true; m.receiveShadow = true; g.add(m);
    return g;
  }
  // Platzhalter, bis das Modell geladen ist (oder falls es fehlt)
  const s = new THREE.Shape(); localFootprint(it).forEach(([x, z], i) => (i ? s.lineTo(x, -z) : s.moveTo(x, -z)));
  const geo = new THREE.ExtrudeGeometry(s, { depth: it.h, bevelEnabled: false }); geo.rotateX(-Math.PI / 2);
  g.add(new THREE.Mesh(geo, ghostMat));
  if (!glbFailed.has(c.file) && !glbHooked.has(c.file)) {
    glbHooked.add(c.file);
    loadGlb(c.file).then((r) => { if (r) { for (const i of state.items) if (BYTYPE[i.type].file === c.file) rebuild(i); drawRings(); } updatePhase(); });
  }
  return g;
}
const BUILD = { table: buildTable, sofaL: buildSofaL, sofa: buildSofa, chair: buildChair, bed: buildBed, cabinet: buildCabinet, shelf: buildShelf, rug: buildRug, plant: buildPlant, lamp: (it) => buildLampLit(it), glb: buildGlb, light: (it) => buildLight(it), tv: (it) => buildTv(it) };
const meshes = new Map();
function rebuild(it) {
  const old = meshes.get(it.id); if (old) furnG.remove(old);
  const g = BUILD[BYTYPE[it.type].kind](it);
  g.userData.id = it.id; g.position.set(it.x, elevOf(it), it.z); g.rotation.y = it.rot; lastPose.set(it.id, { x: it.x, z: it.z, rot: it.rot });
  furnG.add(g); meshes.set(it.id, g);
}
function rebuildAll() { furnG.clear(); meshes.clear(); state.items.forEach(rebuild); }
const lastPose = new Map();
function place(it) {
  if (stacks(it)) { const s = supportOf(it); it.on = s ? s.id : null; }   // Tischlampe/Fernseher rastet auf Möbeln ein
  const g = meshes.get(it.id); if (g) { g.position.set(it.x, elevOf(it), it.z); g.rotation.y = it.rot; }
  const lp = lastPose.get(it.id);
  lastPose.set(it.id, { x: it.x, z: it.z, rot: it.rot });
  if (lp && (lp.x !== it.x || lp.z !== it.z || lp.rot !== it.rot)) {   // daraufstehende Sachen wandern mit
    const dr = it.rot - lp.rot, c = Math.cos(dr), s = Math.sin(dr);
    for (const ch of state.items) if (ch.on === it.id && ch !== it) { const rx = ch.x - lp.x, rz = ch.z - lp.z; ch.x = it.x + c * rx + s * rz; ch.z = it.z - s * rx + c * rz; ch.rot += dr; place(ch); }
  }
  if (LM.on && isLight(it)) scheduleLux();
}

// ---------- Prüfungen ----------
function analyze(it) {
  const wf = worldFootprint(it), { w, l } = state.room;
  const xs = wf.map((p) => p[0]), zs = wf.map((p) => p[1]);
  const d = { l: Math.min(...xs) + w / 2, r: w / 2 - Math.max(...xs), b: Math.min(...zs) + l / 2, f: l / 2 - Math.max(...zs) };
  let near = null;
  const roleOf = (x) => BYTYPE[x.type].role || BYTYPE[x.type].kind, k1 = roleOf(it);
  if (!noCollide(it)) for (const o of state.items) {
    if (o.id === it.id || noCollide(o) || o.on === it.id || it.on === o.id) continue;
    const k2 = roleOf(o);
    if ((k1 === 'chair' && k2 === 'table') || (k1 === 'table' && k2 === 'chair')) continue;   // Stühle dürfen unter den Tisch
    const dd = polyDist(wf, worldFootprint(o));
    if (!near || dd < near.d) near = { d: dd, name: BYTYPE[o.type].name };
  }
  const inWall = Object.values(d).some((v) => v < -0.005);
  const door = !noCollide(it) && polyDist(wf, doorGeom().sector) < 0;
  return { d, near, inWall, door };
}
function problem(it) { const a = analyze(it); return a.inWall || a.door || (a.near && a.near.d < 0); }

// ---------- Einrasten / Verschieben ----------
function clamp(it, snap = true) {
  const wf = worldFootprint(it), { w, l } = state.room, xs = wf.map((p) => p[0]), zs = wf.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minZ = Math.min(...zs), maxZ = Math.max(...zs);
  let dx = 0, dz = 0;
  if (maxX - minX <= w) { if (minX < -w / 2) dx = -w / 2 - minX; if (maxX > w / 2) dx = w / 2 - maxX; }
  if (maxZ - minZ <= l) { if (minZ < -l / 2) dz = -l / 2 - minZ; if (maxZ > l / 2) dz = l / 2 - maxZ; }
  if (snap) {
    const S = 0.06;
    if (!dx && Math.abs(minX + w / 2) < S) dx = -w / 2 - minX; else if (!dx && Math.abs(w / 2 - maxX) < S) dx = w / 2 - maxX;
    if (!dz && Math.abs(minZ + l / 2) < S) dz = -l / 2 - minZ; else if (!dz && Math.abs(l / 2 - maxZ) < S) dz = l / 2 - maxZ;
  }
  it.x += dx; it.z += dz;
}

// ---------- Grundriss (2D) ----------
const plan = $('plan'), pctx = plan.getContext('2d');
let view = { s: 60, ox: 0, oy: 0 };
function planSize() {
  const r = plan.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2);
  plan.width = Math.max(1, Math.round(r.width * dpr)); plan.height = Math.max(1, Math.round(r.height * dpr));
  pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const m = 46, { w, l } = state.room;
  view.s = Math.min((r.width - 2 * m) / w, (r.height - 2 * m) / l);
  view.ox = r.width / 2; view.oy = r.height / 2 + 6;
}
const P = ([x, z]) => [view.ox + x * view.s, view.oy + z * view.s];
const W2 = (px, py) => [(px - view.ox) / view.s, (py - view.oy) / view.s];
function dimLine(a, b, off, label, color) {
  const [ax, ay] = P(a), [bx, by] = P(b), dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L * off, ny = dx / L * off;
  pctx.strokeStyle = color; pctx.fillStyle = color; pctx.lineWidth = 1;
  pctx.beginPath(); pctx.moveTo(ax + nx, ay + ny); pctx.lineTo(bx + nx, by + ny); pctx.stroke();
  for (const [x, y] of [[ax + nx, ay + ny], [bx + nx, by + ny]]) { pctx.beginPath(); pctx.moveTo(x - 4, y + 4); pctx.lineTo(x + 4, y - 4); pctx.stroke(); }
  pctx.save(); pctx.translate((ax + bx) / 2 + nx * 1.6, (ay + by) / 2 + ny * 1.6);
  let ang = Math.atan2(dy, dx); if (ang > Math.PI / 2 || ang < -Math.PI / 2) ang += Math.PI; pctx.rotate(ang);
  pctx.font = '500 11px "IBM Plex Mono", Menlo, monospace'; pctx.textAlign = 'center'; pctx.textBaseline = 'middle';
  const tw = pctx.measureText(label).width + 8; pctx.fillStyle = css('--paper'); pctx.fillRect(-tw / 2, -8, tw, 16); pctx.fillStyle = color; pctx.fillText(label, 0, 0); pctx.restore();
}
function drawPlan() {
  const r = plan.getBoundingClientRect(); if (!r.width) return;
  pctx.clearRect(0, 0, r.width, r.height);
  const { w, l } = state.room, t = 0.12, ink = css('--plan-wall'), mute = css('--mute'), brass = css('--brass'), bad = css('--bad');
  const [x0, y0] = P([-w / 2, -l / 2]), [x1, y1] = P([w / 2, l / 2]);
  pctx.fillStyle = css('--plan-fill'); pctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  { const fd = MC3Boden.floorDecor(state.room.floor.id); if (fd) { pctx.globalAlpha = matchMedia('(prefers-color-scheme: dark)').matches ? 0.2 : 0.3; pctx.fillStyle = fd.base; pctx.fillRect(x0, y0, x1 - x0, y1 - y0); pctx.globalAlpha = 1; } }
  pctx.strokeStyle = css('--line'); pctx.lineWidth = 1; pctx.beginPath();   // Raster 50 cm
  for (let x = -w / 2 + 0.5; x < w / 2 - 0.01; x += 0.5) { const [px] = P([x, 0]); pctx.moveTo(px, y0); pctx.lineTo(px, y1); }
  for (let z = -l / 2 + 0.5; z < l / 2 - 0.01; z += 0.5) { const [, py] = P([0, z]); pctx.moveTo(x0, py); pctx.lineTo(x1, py); }
  pctx.stroke();
  drawLightLayer();
  const ts = t * view.s; pctx.fillStyle = ink;   // Wände
  pctx.fillRect(x0 - ts, y0 - ts, x1 - x0 + 2 * ts, ts); pctx.fillRect(x0 - ts, y1, x1 - x0 + 2 * ts, ts);
  pctx.fillRect(x0 - ts, y0, ts, y1 - y0); pctx.fillRect(x1, y0, ts, y1 - y0);
  { const sw = Math.max(2.5, Math.min(5, ts * 0.45)), R = { N: [x0, y0 - sw, x1 - x0, sw], S: [x0, y1, x1 - x0, sw], W: [x0 - sw, y0, sw, y1 - y0], E: [x1, y0, sw, y1 - y0] };   // Wandfarbe innen
    for (const k of WALL_KEYS) { const c = paintOf(k); if (c === WALL_WHITE) continue; pctx.fillStyle = c; pctx.fillRect(...R[k]); } }
  const dg = doorGeom(), wgs = winGeoms(), off = (wall) => ({ N: [0, -ts / 2], S: [0, ts / 2], W: [-ts / 2, 0], E: [ts / 2, 0] }[wall]);
  const opening = (a, b, wall, fill) => {
    const [ax, ay] = P(a), [bx, by] = P(b), [ox, oy] = off(wall);
    pctx.save(); pctx.lineCap = 'butt'; pctx.strokeStyle = fill; pctx.lineWidth = ts + 2; pctx.beginPath(); pctx.moveTo(ax + ox, ay + oy); pctx.lineTo(bx + ox, by + oy); pctx.stroke(); pctx.restore();
  };
  opening(dg.a, dg.b, state.room.door.wall, css('--paper'));
  pctx.strokeStyle = ink; pctx.lineWidth = 1.2; pctx.beginPath();   // Türblatt + Schwenkbogen
  const [hx, hy] = P(dg.hinge); const last = P(dg.sector[dg.sector.length - 1]); pctx.moveTo(hx, hy); pctx.lineTo(last[0], last[1]); pctx.stroke();
  pctx.setLineDash([4, 3]); pctx.beginPath(); dg.sector.slice(1).forEach((p, i) => { const [px, py] = P(p); i ? pctx.lineTo(px, py) : pctx.moveTo(px, py); }); pctx.stroke(); pctx.setLineDash([]);
  for (const wg of wgs) { opening(wg.a, wg.b, wg.wall, css('--paper')); const [ox, oy] = off(wg.wall); const [ax, ay] = P(wg.a), [bx, by] = P(wg.b);
    pctx.strokeStyle = ink; pctx.lineWidth = 1; for (const k of [-0.25, 0.25]) { pctx.beginPath(); pctx.moveTo(ax + ox + (oy ? 0 : k * ts), ay + oy + (ox ? 0 : k * ts)); pctx.lineTo(bx + ox + (oy ? 0 : k * ts), by + oy + (ox ? 0 : k * ts)); pctx.stroke(); } }
  if (!$('pDeco').hidden && paintTarget !== 'all') {   // im Tab „Farbe“: gewählte Wand
    const E = { N: [[x0, y0], [x1, y0]], S: [[x0, y1], [x1, y1]], W: [[x0, y0], [x0, y1]], E: [[x1, y0], [x1, y1]] }[paintTarget];
    pctx.save(); pctx.strokeStyle = brass; pctx.lineWidth = 3; pctx.beginPath(); pctx.moveTo(...E[0]); pctx.lineTo(...E[1]); pctx.stroke(); pctx.restore();
  }
  dimLine([-w / 2, -l / 2], [w / 2, -l / 2], -(ts + 16), fmtM(w), mute);   // Raummaße
  dimLine([-w / 2, l / 2], [-w / 2, -l / 2], -(ts + 16), fmtM(l), mute);
  const lay = (i) => (isRug(i) ? 0 : isLight(i) ? 3 : i.on ? 2 : 1), order = [...state.items].sort((a, b) => lay(a) - lay(b));
  for (const it of order) {
    const wf = worldFootprint(it), sel = it.id === selected, bad1 = problem(it);
    if (BYTYPE[it.type].kind === 'light') { drawLightSym(it, sel); continue; }
    pctx.beginPath(); wf.forEach((p, i) => { const [px, py] = P(p); i ? pctx.lineTo(px, py) : pctx.moveTo(px, py); }); pctx.closePath();
    pctx.fillStyle = isRug(it) ? 'rgba(160,150,135,0.18)' : (bad1 ? 'rgba(196,50,31,0.18)' : css('--furn'));
    pctx.globalAlpha = isRug(it) ? 1 : 0.92; pctx.fill(); pctx.globalAlpha = 1;
    pctx.strokeStyle = bad1 ? bad : sel ? brass : ink; pctx.lineWidth = sel ? 2.2 : 1; if (isRug(it)) pctx.setLineDash([3, 3]); pctx.stroke(); pctx.setLineDash([]);
    const cx = wf.reduce((s, p) => s + p[0], 0) / wf.length, cz = wf.reduce((s, p) => s + p[1], 0) / wf.length, [px, py] = P([cx, cz]);
    const name = BYTYPE[it.type].short || BYTYPE[it.type].name.replace('Esstisch ', '').replace('Ecksofa ', ''), dims = shapeOf(it) === 'round' && !it.opts.ext ? 'Ø' + Math.round(it.d * 100) : Math.round(curLen(it) * 100) + '×' + Math.round(it.d * 100);
    if (Math.min(curLen(it), it.d) * view.s > 34 && (!isRug(it) || sel)) { pctx.fillStyle = ink; pctx.textAlign = 'center'; pctx.font = '500 11px "IBM Plex Sans", Arial, sans-serif'; pctx.fillText(name, px, py - 2); pctx.font = '10px "IBM Plex Mono", Menlo, monospace'; pctx.fillStyle = mute; pctx.fillText(dims, px, py + 11); }
    if (isLight(it)) drawLightSym(it, sel);
  }
  const it = state.items.find((i) => i.id === selected);   // Abstände des ausgewählten Möbels zu den Wänden
  if (it) {
    const a = analyze(it), wf = worldFootprint(it), xs = wf.map((p) => p[0]), zs = wf.map((p) => p[1]);
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, mz = (Math.min(...zs) + Math.max(...zs)) / 2;
    const show = (p, q, v) => { if (v > 0.02) dimLine(p, q, 0, fmtD(v), brass); };
    show([-w / 2, mz], [Math.min(...xs), mz], a.d.l); show([Math.max(...xs), mz], [w / 2, mz], a.d.r);
    show([mx, -l / 2], [mx, Math.min(...zs)], a.d.b); show([mx, Math.max(...zs)], [mx, l / 2], a.d.f);
  }
  drawCompassAndSun();
  drawPlayer();
}

// ---------- Auswahl & Panel ----------
function setTab(t) {
  for (const [b, p] of [['tRoom', 'pRoom'], ['tAdd', 'pAdd'], ['tSel', 'pSel'], ['tLight', 'pLight'], ['tDeco', 'pDeco']]) { $(b).setAttribute('aria-selected', b === t); $(p).hidden = b !== t; }
  if (t === 'tDeco') renderDeco(); if (typeof drawPlan === 'function' && plan) drawPlan();
}
function select(id, openTab = true) {
  selected = id;
  const it = state.items.find((i) => i.id === id);
  $('selEmpty').hidden = !!it; $('selBox').hidden = !it;
  if (it) {
    const c = BYTYPE[it.type];
    $('sName').textContent = c.name; $('sNote').textContent = c.note || '';
    const photo = c.kind === 'glb' || c.kind === 'light' || c.kind === 'tv'; $('hFarbe').hidden = photo; $('swatches').hidden = photo; fillLightPanel(it);
    const round = shapeOf(it) === 'round';
    $('lW').firstChild.textContent = round ? 'Durchm. cm' : 'Breite cm'; $('lD').hidden = round;
    $('sW').value = Math.round((round ? it.d : it.w) * 100); $('sD').value = Math.round(it.d * 100); $('sH').value = Math.round(it.h * 100);
    const o1 = $('opt1'), o2 = $('opt2'); o1.hidden = o2.hidden = true;
    if (c.kind === 'table' && it.opts.extLen) { o1.hidden = false; o1.textContent = it.opts.ext ? 'Zusammenschieben' : 'Ausziehen'; o1.classList.toggle('on', !!it.opts.ext); }
    if (c.kind === 'sofaL') { o1.hidden = false; o1.textContent = 'Ecke ' + (it.opts.side === 'links' ? 'rechts' : 'links'); o1.classList.remove('on');
      if (it.opts.headrest) { o2.hidden = false; o2.textContent = it.opts.high ? 'Kopfteile runter' : 'Kopfteile hoch'; o2.classList.toggle('on', !!it.opts.high); } }
    if (c.kind === 'tv') { o1.hidden = o2.hidden = false; o1.classList.remove('on'); o2.classList.remove('on'); o1.textContent = it.opts.mount === 'wall' ? 'Auf Standfuß stellen' : 'An die Wand hängen'; o2.textContent = `${it.opts.inch}″ · Größe ändern`; }
    const sw = $('swatches'); sw.innerHTML = '';
    const opts = (c.kind === 'table' || c.kind === 'cabinet' || c.kind === 'shelf') ? Object.keys(WOODS) : FABRICS;
    for (const col of opts) { const b = document.createElement('button'); b.style.background = WOODS[col] || col; b.title = col; b.setAttribute('aria-pressed', col === it.color); b.onclick = () => { it.color = col; rebuild(it); select(it.id, false); changed(); }; sw.appendChild(b); }
    if (openTab) setTab('tSel');
  }
  refreshInfo(); drawPlan(); drawRings();
}
function refreshInfo() {
  const it = state.items.find((i) => i.id === selected); if (!it) return;
  const a = analyze(it);
  $('dl').textContent = fmtD(a.d.l); $('dr').textContent = fmtD(a.d.r); $('db').textContent = fmtD(a.d.b); $('df').textContent = fmtD(a.d.f);
  $('dn').textContent = !a.near ? '–' : a.near.d < 0 ? 'überschneidet' : fmtD(a.near.d);
  const m = $('sMsg'); m.className = 'msg';
  if (a.inWall) { m.textContent = 'Steht in der Wand. Verschieben oder drehen.'; m.classList.add('bad'); }
  else if (a.near && a.near.d < 0) { m.textContent = `Überschneidet sich mit ${a.near.name}.`; m.classList.add('bad'); }
  else if (a.door) { m.textContent = 'Steht im Schwenkbereich der Tür.'; m.classList.add('warn'); }
  else if (a.near && a.near.d < 0.6 && !isRug(it)) { m.textContent = `${fmtD(a.near.d)} bis ${a.near.name}. Für einen Durchgang sind 60–90 cm angenehm.`; m.classList.add('warn'); }
  else { m.textContent = 'Passt.'; m.classList.add('ok'); }
}
function drawRings() {
  ringG.clear();
  for (const it of state.items) {
    const sel = it.id === selected, bad = problem(it); if (!sel && !bad) continue;
    const pts = worldFootprint(it).map(([x, z]) => new THREE.Vector3(x, 0.006, z));
    ringG.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: bad ? 0xc4321f : 0xa8792a })));
  }
}
function changed() { save(); refreshInfo(); drawPlan(); drawRings(); if (LM.on) scheduleLux(); else if (!$('pLight').hidden) renderLightUi(); if (!$('pDeco').hidden) renderDecoAmounts(); }

function catIcon(kind) {
  const p = { light: 'M17 13m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0 M11.5 7.5l11 11 M22.5 7.5l-11 11', tv: 'M4 4h26v15H4z M12 23h10', sofaL: 'M3 6h28v8H15v9H3z', sofa: 'M3 8h28v10H3z M3 8v10 M31 8v10', table: 'M17 13m-10 0a10 7 0 1 0 20 0a10 7 0 1 0 -20 0', chair: 'M11 4h12v18H11z', bed: 'M5 3h24v21H5z M5 8h24', cabinet: 'M3 7h28v12H3z M12 7v12 M22 7v12', shelf: 'M5 4h24v18H5z M5 10h24 M5 16h24', rug: 'M4 5h26v16H4z', plant: 'M17 13m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0', lamp: 'M17 13m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0' }[kind] || 'M4 5h26v16H4z';
  return `<svg viewBox="0 0 34 26" aria-hidden="true"><path d="${p}" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;
}
function buildCatalog() {
  const root = $('catalog'); root.innerHTML = '';
  for (const g of CAT) {
    const h = document.createElement('h2'); h.textContent = g.group; root.appendChild(h);
    if (g.intro) { const p = document.createElement('p'); p.className = 'note cat-intro'; p.textContent = g.intro; root.appendChild(p); }
    if (g.action) { const b = document.createElement('button'); b.className = 'btn primary'; b.id = g.action.id; b.textContent = beforeShow ? 'Zurück zur vorherigen Einrichtung' : 'Showroom einrichten'; b.onclick = g.action.run; root.appendChild(b); }
    const box = document.createElement('div'); box.className = 'cat';
    for (const c of g.items) {
      const b = document.createElement('button');
      const dims = c.shape === 'round' && c.kind !== 'rug' ? `Ø ${Math.round(c.d * 100)}` : `${Math.round(c.w * 100)} × ${Math.round(c.d * 100)}`;
      b.innerHTML = `${catIcon(c.icon || c.kind)}<span><b>${c.name}</b>${c.note ? `<small>${c.note}</small>` : ''}</span><span class="dim">${dims}</span>`;
      b.onclick = () => { const it = newItem(c.type, 0, 0); state.items.push(it); clamp(it, false); rebuild(it); select(it.id); changed(); };
      box.appendChild(b);
    }
    root.appendChild(box);
  }
}

// ---------- Eingaben ----------
function itemSel() { return state.items.find((i) => i.id === selected); }
$('sW').onchange = () => { const it = itemSel(); if (!it) return; const v = Math.max(0.1, +$('sW').value / 100); if (shapeOf(it) === 'round') { it.w = it.d = v; } else it.w = v; clamp(it, false); rebuild(it); changed(); };
$('sD').onchange = () => { const it = itemSel(); if (!it) return; it.d = Math.max(0.1, +$('sD').value / 100); clamp(it, false); rebuild(it); changed(); };
$('sH').onchange = () => { const it = itemSel(); if (!it) return; it.h = Math.max(0.01, +$('sH').value / 100); rebuild(it); changed(); };
function rotate(deg) { const it = itemSel(); if (!it) return; it.rot += THREE.MathUtils.degToRad(deg); clamp(it); place(it); changed(); }
$('rotL').onclick = () => rotate(15); $('rotR').onclick = () => rotate(-15); $('rot90').onclick = () => rotate(-90);
$('opt1').onclick = () => { const it = itemSel(); if (!it) return; const k = BYTYPE[it.type].kind; if (k === 'table') it.opts.ext = !it.opts.ext; else if (k === 'sofaL') it.opts.side = it.opts.side === 'links' ? 'rechts' : 'links'; else if (k === 'tv') { it.opts.mount = it.opts.mount === 'wall' ? 'stand' : 'wall'; it.on = null; setTvSize(it); } clamp(it, false); rebuild(it); select(it.id, false); changed(); };
$('opt2').onclick = () => { const it = itemSel(); if (!it) return; if (BYTYPE[it.type].kind === 'tv') { const S = [43, 50, 55, 65, 75, 85]; it.opts.inch = S[(S.indexOf(it.opts.inch) + 1) % S.length]; setTvSize(it); } else it.opts.high = !it.opts.high; rebuild(it); select(it.id, false); changed(); };
$('dup').onclick = () => { const it = itemSel(); if (!it) return; const n = { ...JSON.parse(JSON.stringify(it)), id: 'm' + uid++, x: it.x + 0.3, z: it.z + 0.3 }; state.items.push(n); clamp(n, false); rebuild(n); select(n.id); changed(); };
$('del').onclick = () => { const it = itemSel(); if (!it) return; state.items = state.items.filter((i) => i !== it); const g = meshes.get(it.id); if (g) furnG.remove(g); meshes.delete(it.id); for (const ch of state.items) if (ch.on === it.id) { ch.on = null; place(ch); } select(null); setTab('tAdd'); changed(); };
function roomInputs() {
  const r = state.room; $('rw').value = r.w.toFixed(2); $('rl').value = r.l.toFixed(2); $('rh').value = r.h.toFixed(2);
  $('dWall').value = r.door.wall; $('dWidth').value = r.door.width.toFixed(2); $('dPos').value = r.door.pos;
  renderWinList(); $('lNorth').value = Math.round(r.north || 0);
}
function roomChanged() { buildRoom3D(); state.items.forEach((it) => { clamp(it, false); if (isLight(it)) rebuild(it); else place(it); }); planSize(); if (!walk.on) fitCamera(); changed(); }
for (const id of ['rw', 'rl', 'rh']) $(id).onchange = () => { const r = state.room; r.w = Math.min(15, Math.max(1.5, +$('rw').value || r.w)); r.l = Math.min(15, Math.max(1.5, +$('rl').value || r.l)); r.h = Math.min(4.5, Math.max(2, +$('rh').value || r.h)); roomInputs(); roomChanged(); };
$('dWall').onchange = () => { state.room.door.wall = $('dWall').value; roomChanged(); };
$('dWidth').onchange = () => { state.room.door.width = Math.min(2, Math.max(0.6, +$('dWidth').value || 0.9)); roomChanged(); };
$('dPos').oninput = () => { state.room.door.pos = +$('dPos').value; roomChanged(); };
let clearArmed = false;
$('clearAll').onclick = () => {
  if (!clearArmed) { clearArmed = true; $('clearAll').textContent = 'Wirklich alle entfernen?'; $('clearNote').hidden = false; $('clearNote').textContent = 'Noch einmal tippen zum Bestätigen.'; setTimeout(() => { clearArmed = false; $('clearAll').textContent = 'Alle Möbel entfernen'; $('clearNote').hidden = true; }, 4000); return; }
  clearArmed = false; state.items = []; rebuildAll(); select(null); $('clearAll').textContent = 'Alle Möbel entfernen'; $('clearNote').hidden = true; changed();
};
$('resetEx').onclick = () => { state = example(); normRoom(state.room); beforeShow = null; const sb = $('showBtn'); if (sb) sb.textContent = 'Showroom einrichten'; roomInputs(); buildRoom3D(); rebuildAll(); planSize(); select(null); changed(); updatePhase(); };
$('tRoom').onclick = () => setTab('tRoom'); $('tAdd').onclick = () => setTab('tAdd'); $('tSel').onclick = () => setTab('tSel');
addEventListener('keydown', (e) => {
  if (walk.on) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
  const it = itemSel(); if (!it) return;
  if (e.key === 'r' || e.key === 'R') rotate(e.shiftKey ? 15 : -15);
  else if (e.key === 'Delete' || e.key === 'Backspace') $('del').click();
  else if (e.key.startsWith('Arrow')) { const s = e.shiftKey ? 0.1 : 0.01; if (e.key === 'ArrowLeft') it.x -= s; if (e.key === 'ArrowRight') it.x += s; if (e.key === 'ArrowUp') it.z -= s; if (e.key === 'ArrowDown') it.z += s; clamp(it, false); place(it); changed(); e.preventDefault(); }
});

// ---------- Ziehen: 3D ----------
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(), floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let drag3 = null;
function ptr3(e) { const r = renderer.domElement.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ptr, camera); }
renderer.domElement.addEventListener('pointerdown', (e) => {
  if (walk.on) return;
  ptr3(e);
  if (decoWallDown(e)) return;
  const hits = ray.intersectObjects(furnG.children, true);
  const itemOf = (h) => { let o = h.object; while (o && !o.userData.id) o = o.parent; return o && state.items.find((i) => i.id === o.userData.id); };
  let hit = hits.find((h) => { const i = itemOf(h); return i && !isRug(i) && !overhead(i); }) || hits.find((h) => { const i = itemOf(h); return i && !isRug(i); }) || hits[0];
  if (!hit) return;
  let o = hit.object; while (o && !o.userData.id) o = o.parent; if (!o) return;
  const it = state.items.find((i) => i.id === o.userData.id); select(it.id);
  const p = new THREE.Vector3(); ray.ray.intersectPlane(floorPlane, p);
  drag3 = { it, dx: it.x - p.x, dz: it.z - p.z }; controls.enabled = false; renderer.domElement.setPointerCapture(e.pointerId);
});
renderer.domElement.addEventListener('pointermove', (e) => {
  if (!drag3) return; ptr3(e); const p = new THREE.Vector3();
  if (ray.ray.intersectPlane(floorPlane, p)) { drag3.it.x = p.x + drag3.dx; drag3.it.z = p.z + drag3.dz; clamp(drag3.it, !e.altKey); place(drag3.it); refreshInfo(); drawPlan(); drawRings(); }
});
const end3 = () => { if (drag3) { drag3 = null; controls.enabled = true; save(); } };
renderer.domElement.addEventListener('pointerup', end3); renderer.domElement.addEventListener('pointercancel', end3);

// ---------- Ziehen: Grundriss ----------
let drag2 = null;
plan.addEventListener('pointerdown', (e) => {
  const r = plan.getBoundingClientRect(), p = W2(e.clientX - r.left, e.clientY - r.top);
  if (decoPlanDown(p)) return;
  const lay = (i) => (BYTYPE[i.type].kind === 'light' ? 0 : i.on ? 1 : isRug(i) ? 3 : 2), order = [...state.items].sort((a, b) => lay(a) - lay(b));
  const it = order.find((i) => (BYTYPE[i.type].kind === 'light' ? Math.hypot(p[0] - i.x, p[1] - i.z) <= Math.max(0.12, 11 / view.s) : inside(p, worldFootprint(i))));
  if (!it) { select(null, false); return; }
  select(it.id); drag2 = { it, dx: it.x - p[0], dz: it.z - p[1] }; plan.setPointerCapture(e.pointerId);
});
plan.addEventListener('pointermove', (e) => {
  if (!drag2) return; const r = plan.getBoundingClientRect(), p = W2(e.clientX - r.left, e.clientY - r.top);
  drag2.it.x = p[0] + drag2.dx; drag2.it.z = p[1] + drag2.dz; clamp(drag2.it, !e.altKey); place(drag2.it); refreshInfo(); drawPlan(); drawRings();
});
const end2 = () => { if (drag2) { drag2 = null; save(); } };
plan.addEventListener('pointerup', end2); plan.addEventListener('pointercancel', end2);

// ---------- Showroom-Knopf ----------
let showArmed = false;
function applyState() {
  normRoom(state.room);
  uid = Math.max(uid, 1 + Math.max(0, ...state.items.map((i) => +String(i.id).slice(1) || 0)));
  roomInputs(); buildRoom3D(); rebuildAll(); planSize(); if (!walk.on) fitCamera(); select(null); changed(); updatePhase();
  if (walk.on) { const s = startPose(); walk.seat = null; walk.anim = null; walk.pos.set(s.x, EYE, s.z); walk.yaw = s.yaw; }
}
function showroomClick() {
  const b = $('showBtn');
  if (beforeShow) { state = beforeShow; beforeShow = null; applyState(); b.textContent = 'Showroom einrichten'; return; }
  if (!showArmed && state.items.length) {
    showArmed = true; b.textContent = 'Ersetzt deine Einrichtung – nochmal tippen';
    setTimeout(() => { showArmed = false; if (!beforeShow) b.textContent = 'Showroom einrichten'; }, 4000); return;
  }
  showArmed = false; beforeShow = JSON.parse(JSON.stringify(state)); state = showroom(); applyState();
  b.textContent = 'Zurück zur vorherigen Einrichtung';
}

// ---------- Rumlaufen: Ich-Perspektive wie im Spiel, mit Hinsetzen ----------
const EYE = 1.65, RADIUS = 0.25, SPEED = 1.4, RUN = 2.8;
const qs = new URLSearchParams(location.search);
const walk = { on: false, pos: new THREE.Vector3(), yaw: 0, pitch: 0, vx: 0, vz: 0, keys: new Set(), seat: null, anim: null, bob: 0, touch: false, joy: null, look: null, drag: null, target: null, pickT: 0, planT: 0, lockFailed: false, hintKey: '' };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = () => qs.has('touch') || matchMedia('(pointer: coarse)').matches;
const wrapPi = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const ease = (t) => t * t * (3 - 2 * t);
const camEuler = new THREE.Euler(0, 0, 0, 'YXZ');
const downRay = new THREE.Raycaster();
const centerNdc = new THREE.Vector2(0, 0);
const shortName = (it) => BYTYPE[it.type].short || BYTYPE[it.type].name;
function sitKind(it) { const c = BYTYPE[it.type]; return c.sit || ({ sofa: 'sofa', sofaL: 'sofa', chair: 'chair', bed: 'bed' })[c.kind] || null; }

function free(x, z, r = RADIUS + 0.02) {   // Kreis frei von Wänden und Möbeln?
  const { w, l } = state.room;
  if (Math.abs(x) > w / 2 - r || Math.abs(z) > l / 2 - r) return false;
  for (const it of state.items) {
    if (noCollide(it)) continue;
    const poly = worldFootprint(it);
    if (inside([x, z], poly)) return false;
    for (let i = 0; i < poly.length; i++) if (segDist([x, z], poly[i], poly[(i + 1) % poly.length]) < r) return false;
  }
  return true;
}
function startPose() {   // 0,8 m hinter der Tür, Blick zur Raummitte
  const dg = doorGeom(), n = { N: [0, 1], S: [0, -1], W: [1, 0], E: [-1, 0] }[state.room.door.wall];
  let x = (dg.a[0] + dg.b[0]) / 2 + n[0] * 0.8, z = (dg.a[1] + dg.b[1]) / 2 + n[1] * 0.8;
  if (!free(x, z)) {
    let best = null;
    for (let r = 0; r < 5 && !best; r += 0.25) for (let a = 0; a < 16 && !best; a++) { const px = x + Math.cos(a * Math.PI / 8) * r, pz = z + Math.sin(a * Math.PI / 8) * r; if (free(px, pz)) best = [px, pz]; }
    if (best) [x, z] = best;
  }
  return { x, z, yaw: Math.atan2(x, z) };
}
function closestOnSeg(p, a, b) {
  const dx = b[0] - a[0], dz = b[1] - a[1], L = dx * dx + dz * dz;
  const t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dz) / L)) : 0;
  return [a[0] + t * dx, a[1] + t * dz];
}
function collide(p) {   // Kreis (Radius 25 cm) aus Möbel-Umrissen und Wänden schieben → man gleitet an Kanten entlang
  const { w, l } = state.room, r = RADIUS;
  const polys = state.items.filter((it) => !noCollide(it)).map((it) => worldFootprint(it));
  for (let iter = 0; iter < 3; iter++) {
    for (const poly of polys) {
      const q = [p.x, p.z]; let best = null, bd = Infinity;
      for (let i = 0; i < poly.length; i++) { const c = closestOnSeg(q, poly[i], poly[(i + 1) % poly.length]), d = Math.hypot(c[0] - q[0], c[1] - q[1]); if (d < bd) { bd = d; best = c; } }
      if (!best) continue;
      if (inside(q, poly)) { const dx = best[0] - q[0], dz = best[1] - q[1], L = Math.hypot(dx, dz) || 1e-6; p.x = best[0] + (dx / L) * r; p.z = best[1] + (dz / L) * r; }
      else if (bd < r) { const L = bd || 1e-6; p.x = best[0] + ((q[0] - best[0]) / L) * r; p.z = best[1] + ((q[1] - best[1]) / L) * r; }
    }
    p.x = Math.min(w / 2 - r, Math.max(-w / 2 + r, p.x)); p.z = Math.min(l / 2 - r, Math.max(-l / 2 + r, p.z));
  }
}
function surfaceY(it, lx, lz, lo, hi, def) {   // Höhe der Sitz-/Liegefläche per Strahl von oben (Foto-Möbel)
  const g = meshes.get(it.id); if (!g) return def;
  const cr = Math.cos(it.rot), sr = Math.sin(it.rot);
  downRay.set(new THREE.Vector3(it.x + cr * lx + sr * lz, it.h + 1, it.z - sr * lx + cr * lz), new THREE.Vector3(0, -1, 0));
  for (const h of downRay.intersectObject(g, true)) if (h.point.y >= lo && h.point.y <= hi) return h.point.y;
  return def;
}
function seatPose(t) {   // Augenpunkt beim Sitzen/Liegen (lokal: Rücken bei −z, Blick nach +z)
  const it = t.it, c = BYTYPE[it.type], W = curLen(it), D = it.d, cr = Math.cos(it.rot), sr = Math.sin(it.rot);
  const dx = t.point.x - it.x, dz = t.point.z - it.z, lx = cr * dx - sr * dz;
  const cl = (v, a, b) => (a > b ? (a + b) / 2 : Math.min(b, Math.max(a, v)));
  let ex = 0, ey = 1.17, ez = 0, pitch = -0.12;
  if (c.kind === 'sofa') { const arm = (it.opts.seats || 3) === 1 ? 0.16 : 0.18; ex = cl(lx, -W / 2 + arm + 0.22, W / 2 - arm - 0.22); ey = 0.45 + 0.72; ez = -D / 2 + 0.42; }
  else if (c.kind === 'sofaL') { const a = -W / 2 + 0.35, b = W / 2 - 0.46; ex = it.opts.side === 'rechts' ? cl(lx, -b, -a) : cl(lx, a, b); ey = 0.46 + 0.72; ez = -D / 2 + 0.44; }
  else if (c.kind === 'chair') { ey = 0.46 + 0.72; ez = -D / 2 + 0.2; }
  else if (c.kind === 'bed') { const m = it.opts.mat || W - 0.1; ex = cl(lx, -m / 2 + 0.3, m / 2 - 0.3); ey = 0.55 + 0.24; ez = -D / 2 + 0.42; pitch = 0.3; }
  else if (t.kind === 'sofa') { ex = cl(lx, -W / 2 + 0.42, W / 2 - 0.42); ey = surfaceY(it, ex, -D / 2 + 0.62, 0.3, 0.62, 0.45) + 0.72; ez = -D / 2 + 0.45; }
  else if (t.kind === 'chair') { ey = surfaceY(it, 0, 0.05 * D, 0.32, 0.62, 0.47) + 0.72; ez = -D / 2 + 0.2; }
  else if (t.kind === 'bed') { ex = cl(lx, -W / 2 + 0.65, W / 2 - 0.65); ey = surfaceY(it, 0, 0, 0.25, 0.85, 0.5) + 0.24; ez = -D / 2 + 0.42; pitch = 0.3; }
  return { x: it.x + cr * ex + sr * ez, y: ey, z: it.z - sr * ex + cr * ez, yaw: it.rot + Math.PI, pitch };
}
function pickSeat() {   // Möbel in der Bildmitte, höchstens 2,2 m entfernt
  const near = [];
  for (const it of state.items) {
    if (isRug(it) || overhead(it)) continue;
    const g = meshes.get(it.id); if (!g) continue;
    const bb = bbox(worldFootprint(it)), gx = Math.max(bb[0] - walk.pos.x, 0, walk.pos.x - bb[1]), gz = Math.max(bb[2] - walk.pos.z, 0, walk.pos.z - bb[3]);
    if (Math.hypot(gx, gz) < 2.2) near.push(g);
  }
  if (!near.length) return null;
  ray.setFromCamera(centerNdc, camera);
  const hit = ray.intersectObjects(near, true)[0]; if (!hit) return null;
  let o = hit.object; while (o && !o.userData.id) o = o.parent; if (!o) return null;
  const it = state.items.find((i) => i.id === o.userData.id), kind = it && sitKind(it);
  if (!kind || Math.hypot(hit.point.x - walk.pos.x, hit.point.z - walk.pos.z) > 2.2) return null;
  return { it, point: hit.point.clone(), kind };
}
function pickTarget() {   // Sitzmöbel (pickSeat) oder Lampe in der Bildmitte – das nähere gewinnt
  const seat = pickSeat();
  const seatDist = seat ? seat.point.distanceTo(camera.position) : Infinity;
  const lamps = state.items.filter(isLight);
  if (!lamps.length) return seat;
  ray.setFromCamera(centerNdc, camera);
  let lamp = null, lampDist = Infinity;
  const o = ray.ray.origin, d = ray.ray.direction, v = new THREE.Vector3();
  for (const it of lamps) {   // Leuchte knapp verfehlt zählt auch (Deckenleuchten sind kleine Ziele)
    v.set(it.x, lightY(it), it.z).sub(o);
    const dist = v.length();
    if (dist > 4.5 || dist < 0.05) continue;
    const ang = Math.acos(Math.max(-1, Math.min(1, v.dot(d) / dist)));
    if (ang < Math.max(0.06, Math.atan(0.32 / dist)) && dist < lampDist) { lamp = it; lampDist = dist; }
  }
  const objs = lamps.map((it) => meshes.get(it.id)).filter(Boolean);
  const hit = objs.length ? ray.intersectObjects(objs, true)[0] : null;
  if (hit && hit.distance < 4.5 && hit.distance < lampDist) {
    let g = hit.object; while (g && !g.userData.id) g = g.parent;
    const it = g && lamps.find((i) => i.id === g.userData.id);
    if (it) { lamp = it; lampDist = hit.distance; }
  }
  return lamp && lampDist < seatDist ? { light: true, it: lamp } : seat;
}
function lightsVisible() { if (!LM.on) { LM.on = true; saveLM(); setLightMode(true); } }
function toggleLamp(it) {
  it.off = it.off ? undefined : true;
  lightsVisible(); rebuild(it); changed(); renderLightUi();
  walk.hintKey = ''; updateWalkHint();
}
function toggleAllLamps() {
  const ls = state.items.filter(isLight); if (!ls.length) return;
  const anyOn = ls.some((it) => !it.off);
  for (const it of ls) { it.off = anyOn ? true : undefined; rebuild(it); }
  lightsVisible(); changed(); renderLightUi();
  walk.hintKey = ''; updateWalkHint();
}
function animTo(x, y, z, yaw, pitch, dur) {
  walk.anim = { t: 0, dur, from: { x: walk.pos.x, y: walk.pos.y, z: walk.pos.z, yaw: walk.yaw, pitch: walk.pitch }, to: { x, y, z, yaw: walk.yaw + wrapPi(yaw - walk.yaw), pitch } };
}
function sitDown(t) {
  const p = seatPose(t);
  walk.seat = { it: t.it, kind: t.kind }; walk.target = null; walk.vx = walk.vz = 0;
  animTo(p.x, p.y, p.z, p.yaw, p.pitch, t.kind === 'bed' ? 1.1 : 0.85);
  updateWalkHint();
}
function standUp() {   // nächster freier Platz: bevorzugt vorn, sonst hinten (Stuhl am Tisch) oder seitlich (Bett)
  const s = walk.seat; if (!s) return;
  const f = [Math.sin(s.it.rot), Math.cos(s.it.rot)], rr = [f[1], -f[0]];
  const dirs = [[f, 0.8], [[-f[0], -f[1]], 1], [rr, 1], [[-rr[0], -rr[1]], 1], [[f[0] + rr[0], f[1] + rr[1]], 1.1], [[f[0] - rr[0], f[1] - rr[1]], 1.1]];
  let best = null;
  for (const [d, wgt] of dirs) {
    const L = Math.hypot(d[0], d[1]), dx = d[0] / L, dz = d[1] / L;
    for (let t = 0.15; t <= 1.6; t += 0.05) { const px = walk.pos.x + dx * t, pz = walk.pos.z + dz * t; if (free(px, pz)) { if (!best || t * wgt < best.c) best = { x: px, z: pz, c: t * wgt }; break; } }
  }
  if (!best) for (let t = 1.6; t < 3.5 && !best; t += 0.05) { const px = walk.pos.x + f[0] * t, pz = walk.pos.z + f[1] * t; if (free(px, pz)) best = { x: px, z: pz }; }
  const tx = best ? best.x : walk.pos.x, tz = best ? best.z : walk.pos.z;
  walk.seat = null;
  animTo(tx, EYE, tz, walk.yaw, Math.max(-0.3, Math.min(0.2, walk.pitch)), 0.7);
  updateWalkHint();
}
function toggleSit() { if (walk.anim) return; if (walk.seat) standUp(); else if (walk.target && walk.target.light) toggleLamp(walk.target.it); else if (walk.target) sitDown(walk.target); }
function look(dx, dy, k) {
  const t = walk.anim ? walk.anim.to : walk;
  t.yaw -= dx * k; t.pitch = Math.max(-1.45, Math.min(1.45, t.pitch - dy * k));
}
function updateWalkHint() {
  if (!walk.on) return;
  const t = walk.target, locked = document.pointerLockElement === renderer.domElement;
  let text;
  if (walk.seat) text = walk.touch ? '' : 'E oder WASD – aufstehen';
  else if (t && t.light) text = (walk.touch ? '' : 'E – ') + (t.it.off ? 'Licht an: ' : 'Licht aus: ') + shortName(t.it);
  else if (t) text = (walk.touch ? '' : 'E – ') + (t.kind === 'bed' ? 'Hinlegen: ' : 'Hinsetzen: ') + shortName(t.it);
  else if (walk.touch) text = 'Links ziehen: gehen · rechts wischen: umsehen';
  else if (walk.lockFailed) text = 'Ziehen: umsehen · WASD: gehen · Shift: rennen · E: hinsetzen / Licht · L: alle Lichter';
  else text = locked ? 'WASD gehen · Maus umsehen · Shift rennen · E hinsetzen / Licht · L alle Lichter · Esc Pause' : '';
  const lamps = state.items.filter(isLight), lampsOn = lamps.filter((it) => !it.off).length;
  const key = text + '|' + !!t + '|' + !!walk.seat + '|' + walk.touch + '|' + lamps.length + '|' + lampsOn;
  if (key === walk.hintKey) return;
  walk.hintKey = key;
  $('walkHint').textContent = text;
  $('crosshair').classList.toggle('on', !!t);
  const b = $('sitBtn'); b.hidden = !walk.touch || (!t && !walk.seat);
  b.textContent = walk.seat ? 'Aufstehen' : t && t.light ? (t.it.off ? 'Licht an' : 'Licht aus') : t && t.kind === 'bed' ? 'Hinlegen' : 'Hinsetzen';
  const ab = $('allBtn'); ab.hidden = !walk.touch || !lamps.length; ab.textContent = lampsOn ? 'Alle Lichter aus' : 'Alle Lichter an';
}
function drawPlayer() {   // Minikarte im Grundriss
  if (!walk.on) return;
  const [px, py] = P([walk.pos.x, walk.pos.z]), fx = -Math.sin(walk.yaw), fz = -Math.cos(walk.yaw), half = 0.6, L = 1.1 * view.s;
  pctx.fillStyle = 'rgba(168,121,42,0.18)'; pctx.beginPath(); pctx.moveTo(px, py);
  for (const s of [-half, half]) { const c = Math.cos(s), si = Math.sin(s); pctx.lineTo(px + (fx * c - fz * si) * L, py + (fx * si + fz * c) * L); }
  pctx.closePath(); pctx.fill();
  pctx.fillStyle = css('--brass'); pctx.strokeStyle = '#fff'; pctx.lineWidth = 2; pctx.beginPath(); pctx.arc(px, py, 6, 0, Math.PI * 2); pctx.fill(); pctx.stroke();
}
function updateWalk(dt) {
  const k = walk.keys;
  let f = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
  let s = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
  if (walk.joy) { f = -walk.joy.y; s = walk.joy.x; }
  const mag = Math.min(1, Math.hypot(f, s));
  if (walk.seat && !walk.anim && mag > 0.35) standUp();
  let speed = 0;
  if (!walk.seat && !walk.anim) {
    const run = k.has('ShiftLeft') || k.has('ShiftRight'), L = Math.hypot(f, s) || 1, sp = (run ? RUN : SPEED) * mag;
    const sy = Math.sin(walk.yaw), cy = Math.cos(walk.yaw), fx = f / L, sx = s / L, a = 1 - Math.exp(-10 * dt);
    walk.vx += ((-sy * fx + cy * sx) * sp - walk.vx) * a; walk.vz += ((-cy * fx - sy * sx) * sp - walk.vz) * a;
    if (!mag && Math.hypot(walk.vx, walk.vz) < 0.01) walk.vx = walk.vz = 0;
    walk.pos.x += walk.vx * dt; walk.pos.z += walk.vz * dt; walk.pos.y = EYE;
    collide(walk.pos);
    speed = Math.hypot(walk.vx, walk.vz);
  }
  if (walk.anim) {
    const A = walk.anim; A.t = Math.min(1, A.t + dt / A.dur); const e = ease(A.t);
    walk.pos.set(A.from.x + (A.to.x - A.from.x) * e, A.from.y + (A.to.y - A.from.y) * e, A.from.z + (A.to.z - A.from.z) * e);
    walk.yaw = A.from.yaw + (A.to.yaw - A.from.yaw) * e; walk.pitch = A.from.pitch + (A.to.pitch - A.from.pitch) * e;
    if (A.t >= 1) walk.anim = null;
  }
  let bobY = 0;   // leichtes Kopfwippen beim Gehen
  if (!reduceMotion && speed > 0.05) { walk.bob += dt * speed * 5.2; bobY = (Math.abs(Math.sin(walk.bob)) - 0.5) * 0.04 * Math.min(1, speed / SPEED); } else walk.bob = 0;
  camera.position.set(walk.pos.x, walk.pos.y + bobY, walk.pos.z);
  camera.quaternion.setFromEuler(camEuler.set(walk.pitch, walk.yaw, 0, 'YXZ'));
  camera.updateMatrixWorld();
  walk.pickT -= dt;
  if (walk.pickT <= 0) { walk.pickT = 0.1; walk.target = walk.seat || walk.anim ? null : pickTarget(); updateWalkHint(); }
  walk.planT -= dt;
  if (walk.planT <= 0) { walk.planT = 0.1; drawPlan(); }
}
function lockPointer() {
  const el = renderer.domElement;
  if (walk.lockFailed || !el.requestPointerLock) { walk.lockFailed = true; updateWalkHint(); return; }
  try { const p = el.requestPointerLock(); if (p && p.catch) p.catch(() => { walk.lockFailed = true; $('walkPause').hidden = true; updateWalkHint(); }); }
  catch (e) { walk.lockFailed = true; updateWalkHint(); }
}
function enterWalk() {
  if (walk.on) return;
  select(null, false);
  const s = startPose();
  Object.assign(walk, { on: true, yaw: s.yaw, pitch: -0.08, vx: 0, vz: 0, seat: null, anim: null, target: null, joy: null, look: null, drag: null, hintKey: '', touch: isTouch() });
  walk.pos.set(s.x, EYE, s.z);
  document.body.classList.add('walking'); document.body.classList.toggle('touchwalk', walk.touch);
  $('walkUi').hidden = false; $('joy').hidden = !walk.touch; $('walkPause').hidden = true; $('walkBtn').textContent = 'Beenden';
  controls.enabled = false; applyBg(); $('walkBtn').blur();   // Leertaste soll nicht den Knopf auslösen
  requestAnimationFrame(resize);
  if (!walk.touch) lockPointer();
  updateWalkHint();
}
function exitWalk() {
  if (!walk.on) return;
  walk.on = false; walk.keys.clear(); walk.joy = walk.look = walk.drag = null; walk.seat = walk.anim = walk.target = null;
  if (document.pointerLockElement) document.exitPointerLock();
  document.body.classList.remove('walking', 'touchwalk');
  $('walkUi').hidden = true; $('sitBtn').hidden = true; $('allBtn').hidden = true; $('walkBtn').textContent = 'Rumlaufen';
  controls.enabled = true; applyBg();
  requestAnimationFrame(() => { resize(); fitCamera(); drawPlan(); });
}
$('walkBtn').onclick = () => (walk.on ? exitWalk() : enterWalk());
$('sitBtn').onclick = () => toggleSit();
$('allBtn').onclick = () => toggleAllLamps();
$('walkPause').addEventListener('click', () => lockPointer());
document.addEventListener('pointerlockchange', () => {
  const locked = document.pointerLockElement === renderer.domElement;
  if (walk.on && !walk.touch) $('walkPause').hidden = locked || walk.lockFailed;
  walk.hintKey = ''; updateWalkHint();
});
document.addEventListener('pointerlockerror', () => { walk.lockFailed = true; if (walk.on) { $('walkPause').hidden = true; walk.hintKey = ''; updateWalkHint(); } });
document.addEventListener('mousemove', (e) => { if (walk.on && document.pointerLockElement === renderer.domElement) look(e.movementX, e.movementY, 0.0022); });
addEventListener('keydown', (e) => {
  if (!walk.on || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
  if (e.code === 'KeyL') { e.preventDefault(); if (!e.repeat) toggleAllLamps(); return; }
  if (e.code === 'KeyE' || e.code === 'Space') { e.preventDefault(); if (!e.repeat) toggleSit(); return; }
  if (e.code === 'Escape' && (walk.lockFailed || walk.touch)) { exitWalk(); return; }
  if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft', 'ShiftRight'].includes(e.code)) { walk.keys.add(e.code); e.preventDefault(); }
});
addEventListener('keyup', (e) => walk.keys.delete(e.code));
addEventListener('blur', () => walk.keys.clear());
{
  const el = renderer.domElement, joy = $('joy'), knob = $('joyKnob');
  const resetJoy = () => { joy.style.left = joy.style.top = joy.style.bottom = ''; knob.style.transform = ''; };
  el.addEventListener('pointerdown', (e) => {
    if (!walk.on) return;
    if (e.pointerType === 'touch' && !walk.touch) { walk.touch = true; document.body.classList.add('touchwalk'); joy.hidden = false; $('walkPause').hidden = true; walk.hintKey = ''; updateWalkHint(); }
    if (e.pointerType === 'touch') {
      const r = host.getBoundingClientRect();
      if (e.clientX - r.left < r.width * 0.45 && !walk.joy) {
        walk.joy = { id: e.pointerId, cx: e.clientX, cy: e.clientY, x: 0, y: 0 };
        joy.style.left = (e.clientX - r.left - 58) + 'px'; joy.style.top = (e.clientY - r.top - 58) + 'px'; joy.style.bottom = 'auto';
      } else if (!walk.look) walk.look = { id: e.pointerId, x: e.clientX, y: e.clientY };
      try { el.setPointerCapture(e.pointerId); } catch (err) { /* egal */ }
      e.preventDefault(); return;
    }
    if (walk.lockFailed) { walk.drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; try { el.setPointerCapture(e.pointerId); } catch (err) { /* egal */ } }
    else if (document.pointerLockElement !== el) lockPointer();
    else if (e.button === 0 && (walk.target || walk.seat)) toggleSit();   // Klick bei gefangener Maus = E
  });
  el.addEventListener('pointermove', (e) => {
    if (!walk.on) return;
    if (walk.joy && e.pointerId === walk.joy.id) {
      const dx = e.clientX - walk.joy.cx, dy = e.clientY - walk.joy.cy, R = 50, L = Math.hypot(dx, dy), k = L > R ? R / L : 1;
      walk.joy.x = (dx * k) / R; walk.joy.y = (dy * k) / R; knob.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
    } else if (walk.look && e.pointerId === walk.look.id) { look(e.clientX - walk.look.x, e.clientY - walk.look.y, 0.0055); walk.look.x = e.clientX; walk.look.y = e.clientY; }
    else if (walk.drag && e.pointerId === walk.drag.id) { look(e.clientX - walk.drag.x, e.clientY - walk.drag.y, 0.004); walk.drag.x = e.clientX; walk.drag.y = e.clientY; }
  });
  const endPtr = (e) => {
    if (walk.joy && e.pointerId === walk.joy.id) { walk.joy = null; resetJoy(); }
    if (walk.look && e.pointerId === walk.look.id) walk.look = null;
    if (walk.drag && e.pointerId === walk.drag.id) walk.drag = null;
  };
  el.addEventListener('pointerup', endPtr); el.addEventListener('pointercancel', endPtr);
}
if (qs.has('test')) window.__plan = {   // nur für automatische Tests (?test)
  enterWalk, exitWalk, standUp,
  pose(x, z, yawDeg, pitchDeg = 0) { walk.pos.set(x, EYE, z); walk.yaw = (yawDeg * Math.PI) / 180; walk.pitch = (pitchDeg * Math.PI) / 180; walk.anim = walk.seat = null; walk.vx = walk.vz = 0; walk.pickT = 0; return 'ok'; },
  sitOn(name, lx = 0) {
    const it = state.items.find((i) => shortName(i).includes(name)); if (!it) return 'nicht gefunden';
    const cr = Math.cos(it.rot), sr = Math.sin(it.rot);
    sitDown({ it, kind: sitKind(it), point: new THREE.Vector3(it.x + cr * lx, 0.5, it.z - sr * lx) }); return 'sitzt: ' + shortName(it);
  },
  target: () => (walk.target ? (walk.target.light ? 'Licht: ' + shortName(walk.target.it) + (walk.target.it.off ? ' (aus)' : ' (an)') : shortName(walk.target.it) + ' / ' + walk.target.kind) : null),
  act: () => { toggleSit(); return 'ok'; },
  lampsOn: () => state.items.filter(isLight).filter((it) => !it.off).length + ' / ' + state.items.filter(isLight).length,
  where: () => [walk.pos.x.toFixed(2), walk.pos.y.toFixed(2), walk.pos.z.toFixed(2), ((walk.yaw * 180) / Math.PI).toFixed(0)].join(' '),
  keys(codes, ms) { codes.forEach((c) => walk.keys.add(c)); setTimeout(() => codes.forEach((c) => walk.keys.delete(c)), ms); return 'ok'; },
  joy(x, y, ms) { walk.joy = { id: -99, cx: 0, cy: 0, x, y }; $('joyKnob').style.transform = `translate(${x * 50}px, ${y * 50}px)`; setTimeout(() => { walk.joy = null; $('joyKnob').style.transform = ''; }, ms); return 'ok'; },
  showroom() { beforeShow = null; state = showroom(); applyState(); return state.items.length; },
  example() { $('resetEx').click(); return state.items.length; },
  light(o) { Object.assign(LM, o); saveLM(); setLightMode(LM.on); return `Ø ${Math.round(LUX.avg)} lx, min ${Math.round(LUX.min)} lx, Sonne ${LUX.sunArea.toFixed(2)} m², Höhe ${(LUX.sun.alt / DEG).toFixed(1)}°, Azimut ${(LUX.sun.az / DEG).toFixed(0)}°, Belichtung ${LUX.expo.toFixed(4)}`; },
  luxAt: (x, z) => Math.round(luxAt(x, z, LUX.D, LUX.lamps)),
  tab: (t) => { $(t).click(); return t; },
  add(type, x, z, rot = 0) { const it = newItem(type, x, z, rot); state.items.push(it); clamp(it, false); rebuild(it); place(it); changed(); return it.id; },
  move(id, x, z, rot) { const it = state.items.find((i) => i.id === id); it.x = x; it.z = z; if (rot != null) it.rot = rot; place(it); changed(); return 'ok'; },
  info(id) { const it = state.items.find((i) => i.id === id); return [it.type, it.x.toFixed(2), it.z.toFixed(2), 'auf=' + (it.on || '-'), 'höhe=' + elevOf(it).toFixed(2)].join(' '); },
  sel(id) { select(id); return id; },
  paint(k, hex) { paintTarget = k; setPaint(hex); return WALL_KEYS.map((w) => w + '=' + paintOf(w)).join(' '); },
  floor(id, dir) { if (dir != null) setFloorDir(dir); setFloor(id); return curDecor().id + ' ' + state.room.floor.dir; },
  tapWall(k) {   // Mitte der Wandinnenseite antippen: echte Zeigerereignisse auf der 3D-Fläche
    const wl = walls.find((m) => m.userData.wall === k); if (!wl) return 'keine Wand';
    const p = wl.position.clone().addScaledVector(wl.userData.n, 0.07); p.y = state.room.h * 0.6; p.project(camera);
    const r = renderer.domElement.getBoundingClientRect(), x = r.left + ((p.x + 1) / 2) * r.width, y = r.top + ((1 - p.y) / 2) * r.height;
    const o = { clientX: x, clientY: y, pointerId: 7, pointerType: 'touch', isPrimary: true, bubbles: true, button: 0 };
    renderer.domElement.dispatchEvent(new PointerEvent('pointerdown', o)); renderer.domElement.dispatchEvent(new PointerEvent('pointerup', o));
    return Math.round(x) + ',' + Math.round(y) + ' → ' + $('paintNow').textContent;
  },
  floorReady: () => !!(floorMesh && floorMesh.material.map && floorMesh.material.map === floorTexs.get(curDecor().id)),
  deco: () => [`REFL Wand ${REFL.wall.toFixed(2)} Boden ${REFL.floor.toFixed(2)}`, $('paintAmt').innerText.replace(/\n/g, ' | '), $('floorAmt').innerText.replace(/\n/g, ' | ')].join(' || '),
  count: () => state.items.length + ' Möbel, Raum ' + state.room.w + '×' + state.room.l + ', Knopf: ' + ($('showBtn') || {}).textContent,
};

// ---------- Licht: Sonne, Lampen, Helligkeit (Lux) – Schätzung, keine echte Lichtberechnung ----------
const LKEY = 'mycasa3-licht-v1';
const PLACES = { augsburg: { name: 'Augsburg', lat: 48.3705, lon: 10.8978 }, muenchen: { name: 'München', lat: 48.1374, lon: 11.5755 } };
const REFL = { wall: 0.7, ceil: 0.8, floor: 0.3 }, TAU = 0.65, RHO_G = 0.2, DEG = Math.PI / 180;
const RF_LOW = 0.4, RF_HIGH = 0.75, FURN = 0.85;   // erste Reflexion unten (Boden + untere Wände) / oben (Decke + obere Wände); Verlust durch Möbel und Fenster
const pad2 = (n) => String(n).padStart(2, '0');
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };
const LM = Object.assign({ on: false, lux: false, place: 'augsburg', lat: 48.3705, lon: 10.8978, date: '', min: 14 * 60, sky: 'klar', plane: 0.8, seen: false },
  (() => { try { return JSON.parse(localStorage.getItem(LKEY) || '{}'); } catch (e) { return {}; } })());
if (!/^\d{4}-\d\d-\d\d$/.test(LM.date)) LM.date = todayStr();
function saveLM() { try { localStorage.setItem(LKEY, JSON.stringify(LM)); } catch (e) { /* egal */ } }
const fmtLux = (E) => (E >= 10000 ? (E / 1000).toFixed(0).replace('.', ',') + ' klx' : E >= 1000 ? (E / 1000).toFixed(1).replace('.', ',') + ' klx' : Math.round(E) + ' lx');
const fmtMin = (m) => `${pad2(Math.floor(m / 60) % 24)}:${pad2(Math.round(m % 60))}`;
function simDate(min = LM.min) { const [y, m, d] = LM.date.split('-').map(Number); return new Date(y, m - 1, d, 0, min); }   // Zeitzone des Geräts

// Sonnenstand (Näherung des Astronomical Almanac, ca. 0,1° genau): Höhe und Azimut (ab Nord, im Uhrzeigersinn)
function sunPos(t, lat, lon) {
  const n = t.getTime() / 86400000 + 2440587.5 - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360, g = ((357.528 + 0.9856003 * n) % 360) * DEG;
  const lam = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * DEG, eps = (23.439 - 0.0000004 * n) * DEG;
  const ra = Math.atan2(Math.cos(eps) * Math.sin(lam), Math.cos(lam)), dec = Math.asin(Math.sin(eps) * Math.sin(lam));
  const H = ((18.697374558 + 24.06570982441908 * n) * 15 + lon) * DEG - ra, la = lat * DEG;
  let alt = Math.asin(Math.sin(la) * Math.sin(dec) + Math.cos(la) * Math.cos(dec) * Math.cos(H));
  const az = Math.atan2(-Math.sin(H), Math.tan(dec) * Math.cos(la) - Math.sin(la) * Math.cos(H));
  const ad = alt / DEG; if (ad > -1.5) alt += (1.02 / Math.tan((ad + 10.3 / (ad + 5.11)) * DEG)) / 60 * DEG;   // Lichtbrechung am Horizont
  return { alt, az: (az + 2 * Math.PI) % (2 * Math.PI) };
}
function sunTimes() {   // Auf-/Untergang (Oberrand, −0,833°) per Abtasten in 2-min-Schritten
  let rise = null, set = null, prev = null, noon = 0, best = -9;
  for (let mi = 0; mi <= 1440; mi += 2) {
    const a = sunPos(simDate(mi), LM.lat, LM.lon).alt / DEG;
    if (prev !== null) { if (prev < -0.833 && a >= -0.833 && rise === null) rise = mi; if (prev >= -0.833 && a < -0.833) set = mi; }
    if (a > best) { best = a; noon = mi; }
    prev = a;
  }
  return { rise, set, noon, maxAlt: best };
}
function compassDirs() {   // Osten/Norden als Richtungen im Grundriss (x, z); Norden = state.room.north Grad im Uhrzeigersinn von „oben“
  const th = (state.room.north || 0) * DEG;
  return { E: [Math.cos(th), Math.sin(th)], N: [Math.sin(th), -Math.cos(th)] };
}
function sunDirW(alt, az) {   // Richtung zur Sonne in Weltkoordinaten
  const { E, N } = compassDirs(), ce = Math.sin(az) * Math.cos(alt), cn = Math.cos(az) * Math.cos(alt);
  return new THREE.Vector3(E[0] * ce + N[0] * cn, Math.sin(alt), E[1] * ce + N[1] * cn);
}
const azName = (az) => ['Nord', 'Nordost', 'Ost', 'Südost', 'Süd', 'Südwest', 'West', 'Nordwest'][Math.round(az / DEG / 45) % 8];
function outdoor(alt) {   // Außenbeleuchtungsstärken in lx: dn = Direktsonne senkrecht, dh = Himmel horizontal, gh = gesamt horizontal
  const s = Math.sin(alt), hd = alt / DEG;
  if (hd <= -6) { const dh = hd > -18 ? 2 * Math.pow(10, (hd + 6) / 3) : 0.001; return { dn: 0, dh, gh: dh }; }
  if (hd <= 0) { const dh = 400 * Math.pow(10, hd / 2.6); return { dn: 0, dh, gh: dh }; }   // Dämmerung
  if (LM.sky === 'bedeckt') { const dh = 400 + 21000 * s; return { dn: 0, dh, gh: dh }; }   // CIE-bedeckter Himmel
  const dn = 127500 * Math.exp(-0.21 / Math.max(s, 0.02)), dh = 400 + 13000 * Math.pow(s, 0.65);
  return { dn, dh, gh: dh + dn * s };
}
const K_COL = { 2700: 0xffd3a8, 3000: 0xffdcb8, 4000: 0xffeedd };
const kColor = (k) => K_COL[k] || K_COL[3000];

// ---------- Lichtquellen ----------
// (Funktionsdeklarationen: showroom() braucht sie schon beim Laden)
function isLight(it) { return !!BYTYPE[it.type].L; }
function mountOf(it) { return (BYTYPE[it.type].L || {}).mount; }
function overhead(it) { return ['ceiling', 'pendant', 'wall', 'marker'].includes(mountOf(it)); }
function isTv(it) { return BYTYPE[it.type].kind === 'tv'; }
function stacks(it) { return mountOf(it) === 'table' || (isTv(it) && it.opts.mount !== 'wall'); }
function noCollide(it) { return BYTYPE[it.type].kind === 'rug' || overhead(it) || (stacks(it) && !!it.on) || (isTv(it) && it.opts.mount === 'wall'); }
function tvDims(it) { const dg = (it.opts.inch || 65) * 0.0254; return { sw: dg * 0.8716, sh: dg * 0.4903 }; }
function supportOf(it, items = state.items) {   // höchstes Möbel mit ebener Oberseite unter der Mitte (Tischlampe, Fernseher)
  let best = null;
  for (const o of items) {
    if (o === it || o.on === it.id || noCollide(o) || isLight(o) || isTv(o)) continue;
    const c = BYTYPE[o.type], k = c.role || c.kind;
    if (!(k === 'table' || k === 'cabinet' || k === 'shelf' || (c.kind === 'glb' && /schrank|sideboard|kommode/i.test(c.name)))) continue;
    if (!inside([it.x, it.z], worldFootprint(o))) continue;
    if (!best || o.h > best.h) best = o;
  }
  return best;
}
function elevOf(it) {
  if (isTv(it) && it.opts.mount === 'wall') return Math.max(0, 1.15 - tvDims(it).sh / 2);   // Bildmitte auf 1,15 m
  if (!stacks(it) || !it.on) return 0;
  const s = state.items.find((o) => o.id === it.on);
  return s ? s.h : 0;
}
function lightY(it) {   // Höhe der Lichtquelle über dem Boden
  const L = BYTYPE[it.type].L, h = state.room.h;
  if (L.mount === 'ceiling') return it.lz != null ? it.lz : h - (L.mode === 'spot' ? 0.02 : 0.07);
  if (L.mount === 'pendant') return it.lz != null ? it.lz : L.lz;
  if (L.mount === 'wall') return it.lz != null ? it.lz : L.lz;
  if (L.mount === 'floor') return it.lz != null ? it.lz : Math.max(0.3, it.h - 0.18);
  if (L.mount === 'table') return it.lz != null ? it.lz : elevOf(it) + Math.max(0.15, it.h - 0.12);
  return it.lz != null ? it.lz : h - 0.05;   // markiert: an der Decke
}
function lightOf(it) {
  const c = BYTYPE[it.type], L = c.L, mode = it.mode || L.mode, beam = it.beam || L.beam || 36, lm = it.lm != null ? it.lm : L.lm;
  const o = { it, x: it.x, z: it.z, y: lightY(it), lm, k: it.k || L.k, on: !it.off, mode, beam };
  if (mode === 'spot') { o.m = Math.log(0.5) / Math.log(Math.cos((beam / 2) * DEG)); o.I0 = (lm * (o.m + 1)) / (2 * Math.PI); }
  return o;
}
function lampE(L, x, y, z) {   // direkte Beleuchtungsstärke auf waagrechter Fläche (lx), Punktquelle
  const dx = x - L.x, dy = L.y - y, dz = z - L.z;
  if (dy <= 0.02) return 0;   // Lampe liegt unter der Messfläche
  const d2 = dx * dx + dy * dy + dz * dz, c = dy / Math.sqrt(d2);
  const I = L.mode === 'omni' ? L.lm / (4 * Math.PI) : L.mode === 'down' ? (L.lm / Math.PI) * c : L.I0 * Math.pow(c, L.m);
  return (I * c) / d2;
}
function lampRadius(L, y) {   // Abstand, bis zu dem die Lampe allein ≥ 100 lx bringt (für den Ring im Grundriss)
  if (lampE(L, L.x, y, L.z) < 100) return 0;
  let lo = 0, hi = 8;
  for (let i = 0; i < 24; i++) { const m = (lo + hi) / 2; if (lampE(L, L.x + m, y, L.z) >= 100) lo = m; else hi = m; }
  return lo;
}

// ---------- Fenster (mehrere) ----------
function normRoom(r) {
  if (!r) return r;
  if (!Array.isArray(r.wins)) r.wins = r.win && r.win.wall && r.win.wall !== '-' ? [{ wall: r.win.wall, pos: r.win.pos != null ? r.win.pos : 0.5, width: r.win.width || 1.2, height: 1.3, sill: 0.9 }] : [];
  delete r.win;
  for (const wi of r.wins) { if (wi.height == null) wi.height = 1.3; if (wi.sill == null) wi.sill = 0.9; }
  if (r.north == null) r.north = 0;
  normDeco(r);
  return r;
}
function winGeoms() {
  const { w, l, h } = state.room;
  return (state.room.wins || []).map((wi, i) => {
    const L = wallLen(wi.wall), width = Math.min(wi.width, L - 0.1), half = width / 2;
    const c = Math.min(L / 2 - half - 0.05, Math.max(-L / 2 + half + 0.05, (wi.pos - 0.5) * L));
    const map = { N: (t) => [t, -l / 2], S: (t) => [t, l / 2], W: (t) => [-w / 2, t], E: (t) => [w / 2, t] }[wi.wall];
    const sill = Math.max(0, Math.min(h - 0.3, wi.sill)), top = Math.max(sill + 0.2, Math.min(h - 0.05, sill + wi.height));
    const nOut = { N: [0, -1], S: [0, 1], W: [-1, 0], E: [1, 0] }[wi.wall];
    return { i, wall: wi.wall, a: map(c - half), b: map(c + half), center: c, width, sill, top, nOut };
  });
}

// ---------- Helligkeit berechnen (Raster 10 cm) ----------
const LUX = { nx: 0, nz: 0, vals: null, sunm: null, avg: 0, min: 0, avgAmb: 0, expo: 1, sun: null, out: null, sunPolys: [], sunArea: 0, ir: 0, t: null, night: false };
const luxCanvas = document.createElement('canvas');
function clipPoly(poly, w, l) {   // Sutherland–Hodgman am Raumrechteck
  const edges = [[(p) => p[0] >= -w / 2, (a, b) => { const t = (-w / 2 - a[0]) / (b[0] - a[0]); return [-w / 2, a[1] + t * (b[1] - a[1])]; }],
    [(p) => p[0] <= w / 2, (a, b) => { const t = (w / 2 - a[0]) / (b[0] - a[0]); return [w / 2, a[1] + t * (b[1] - a[1])]; }],
    [(p) => p[1] >= -l / 2, (a, b) => { const t = (-l / 2 - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), -l / 2]; }],
    [(p) => p[1] <= l / 2, (a, b) => { const t = (l / 2 - a[1]) / (b[1] - a[1]); return [a[0] + t * (b[0] - a[0]), l / 2]; }]];
  let out = poly;
  for (const [inn, cut] of edges) {
    const src = out; out = [];
    for (let i = 0; i < src.length; i++) {
      const a = src[i], b = src[(i + 1) % src.length], ia = inn(a), ib = inn(b);
      if (ia) out.push(a); if (ia !== ib) out.push(cut(a, b));
    }
    if (!out.length) break;
  }
  return out;
}
function polyArea(p) { let s = 0; for (let i = 0; i < p.length; i++) { const a = p[i], b = p[(i + 1) % p.length]; s += a[0] * b[1] - b[0] * a[1]; } return Math.abs(s) / 2; }
function projSA(pts, rx, ry, rz) {   // projizierter Raumwinkel eines Polygons für eine waagrechte Fläche (Lambert)
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    const ax = a[0] - rx, ay = a[1] - ry, az = a[2] - rz, bx = b[0] - rx, by = b[1] - ry, bz = b[2] - rz;
    const cos = (ax * bx + ay * by + az * bz) / (Math.hypot(ax, ay, az) * Math.hypot(bx, by, bz));
    const cx = ay * bz - az * by, cy = az * bx - ax * bz, cz = ax * by - ay * bx, lc = Math.hypot(cx, cy, cz) || 1e-12;
    s += Math.acos(Math.max(-1, Math.min(1, cos))) * (cy / lc);
  }
  return Math.abs(s) / 2;
}
function daylightSetup() {   // Fenster-Rechtecke, Himmelsleuchtdichte, Sonnenflecken, Tageslicht-Lichtstrom
  const { w, l } = state.room, yP = LM.plane, t = simDate(), sp = sunPos(t, LM.lat, LM.lon), dir = sunDirW(sp.alt, sp.az), out = outdoor(sp.alt);
  const sh = Math.hypot(dir.x, dir.z) > 1e-6 ? [dir.x / Math.hypot(dir.x, dir.z), dir.z / Math.hypot(dir.x, dir.z)] : [0, 0];
  const rects = [], polys = []; let flux = 0;
  for (const g of winGeoms()) {
    const facing = g.nOut[0] * sh[0] + g.nOut[1] * sh[1];   // cos des Winkels Fensternormale ↔ Sonne (waagrecht)
    const f = LM.sky === 'bedeckt' ? 0.7 : 0.45 + 0.5 * Math.max(0, facing) ** 2;   // Himmelsleuchtdichte im Fenster relativ zu E_h/π
    const lo = Math.max(g.sill, yP + 0.001);
    if (g.top > lo) rects.push({ L: (TAU * f * out.dh) / Math.PI, pts: [[g.a[0], lo, g.a[1]], [g.b[0], lo, g.b[1]], [g.b[0], g.top, g.b[1]], [g.a[0], g.top, g.a[1]]] });
    const area = g.width * (g.top - g.sill), cosInc = Math.cos(sp.alt) * Math.max(0, facing);
    const vSky = (LM.sky === 'bedeckt' ? 0.4 : 0.5 * (0.6 + 0.8 * Math.max(0, facing))) * out.dh;
    flux += TAU * area * (vSky * RF_LOW + 0.5 * RHO_G * out.gh * RF_HIGH + out.dn * cosInc * REFL.floor);   // erstmals reflektierter Lichtstrom
    if (out.dn > 0 && sp.alt > 0 && facing > 0.01 && dir.y > 0.01) {   // Sonnenfleck: Fensterecken entlang der Sonnenstrahlen auf die Messfläche
      const proj = (x, y, z) => { const k = (y - yP) / dir.y; return [x - dir.x * k, z - dir.z * k]; };
      const hiY = g.top, loY = Math.max(g.sill, yP);
      if (hiY > loY) {
        const p = clipPoly([proj(g.a[0], loY, g.a[1]), proj(g.b[0], loY, g.b[1]), proj(g.b[0], hiY, g.b[1]), proj(g.a[0], hiY, g.a[1])], w, l);
        if (p.length >= 3) polys.push(p);
      }
    }
  }
  return { sp, dir, out, rects, polys, flux, t };
}
function luxAt(x, z, D, lamps) {   // ohne Direktsonne
  const yP = LM.plane; let E = LUX.ir;
  for (const L of lamps) E += lampE(L, x, yP, z);
  for (const r of D.rects) E += r.L * projSA(r.pts, x, yP, z);
  return E;
}
function computeLux() {
  applyRefl();
  const { w, l, h } = state.room, cell = 0.1, nx = Math.max(2, Math.round(w / cell)), nz = Math.max(2, Math.round(l / cell));
  const D = daylightSetup(), lamps = state.items.filter(isLight).map(lightOf).filter((L) => L.on);
  const As = 2 * w * l + 2 * (w + l) * h, rho = (w * l * (REFL.floor + REFL.ceil) + 2 * (w + l) * h * REFL.wall) / As;
  const lampFirst = lamps.reduce((s, L) => s + L.lm * (L.mode === 'omni' ? rho : RF_LOW), 0);
  LUX.ir = (D.flux + lampFirst) / (As * (1 - FURN * rho));   // gemittelte Reflexionen (Split-Flux-Ansatz, grob)
  const vals = new Float32Array(nx * nz), sunm = new Uint8Array(nx * nz);
  let sum = 0, mn = Infinity, sumAmb = 0;
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const x = -w / 2 + (i + 0.5) * cell, z = -l / 2 + (j + 0.5) * cell, k = j * nx + i;
    let Esky = 0; for (const r of D.rects) Esky += r.L * projSA(r.pts, x, LM.plane, z);
    let Elamp = 0; for (const L of lamps) Elamp += lampE(L, x, LM.plane, z);
    const E = LUX.ir + Esky + Elamp; vals[k] = E; sum += E; sumAmb += LUX.ir + Esky; if (E < mn) mn = E;
    for (const p of D.polys) if (inside([x, z], p)) { sunm[k] = 1; break; }
  }
  Object.assign(LUX, { nx, nz, vals, sunm, avg: sum / (nx * nz), min: mn, avgAmb: sumAmb / (nx * nz), sun: D.sp, dir: D.dir, out: D.out, sunPolys: D.polys, D, lamps, t: D.t,
    sunArea: D.polys.reduce((s, p) => s + polyArea(p), 0), sunE: D.out.dn * TAU * Math.max(0, Math.sin(D.sp.alt)), night: D.sp.alt < -3 * DEG });
  LUX.expo = 1.15 / Math.max(LUX.avg, 25);   // „Augenanpassung“ für die 3D-Ansicht
  // Bild der Helligkeit (1 Pixel = 10 cm)
  luxCanvas.width = nx; luxCanvas.height = nz;
  const cx = luxCanvas.getContext('2d'), img = cx.createImageData(nx, nz);
  for (let k = 0; k < nx * nz; k++) {
    const c = sunm[k] ? [255, 246, 196] : luxColor(vals[k]);
    img.data[k * 4] = c[0]; img.data[k * 4 + 1] = c[1]; img.data[k * 4 + 2] = c[2]; img.data[k * 4 + 3] = 255;
  }
  cx.putImageData(img, 0, 0);
  if (floorLux) { floorLux.material.map.needsUpdate = true; }
}
const LUX_STOPS = [[5, [34, 30, 74]], [50, [66, 52, 150]], [100, [40, 110, 205]], [200, [32, 165, 175]], [300, [88, 185, 95]], [500, [236, 210, 64]], [1000, [245, 150, 45]], [3000, [228, 82, 50]]];
function luxColor(E) {
  const v = Math.log10(Math.max(E, 1));
  if (v <= Math.log10(LUX_STOPS[0][0])) return LUX_STOPS[0][1];
  for (let i = 1; i < LUX_STOPS.length; i++) {
    const a = Math.log10(LUX_STOPS[i - 1][0]), b = Math.log10(LUX_STOPS[i][0]);
    if (v <= b) { const t = (v - a) / (b - a), A = LUX_STOPS[i - 1][1], B = LUX_STOPS[i][1]; return [0, 1, 2].map((q) => Math.round(A[q] + (B[q] - A[q]) * t)); }
  }
  return LUX_STOPS[LUX_STOPS.length - 1][1];
}
let luxPending = false;
function scheduleLux() {
  if (!LM.on || luxPending) return;
  luxPending = true;
  requestAnimationFrame(() => { luxPending = false; if (!LM.on) return; computeLux(); updateLightScene(); drawPlan(); renderLightUi(); });
}

// ---------- 3D: Sonne, Grundhelligkeit, echte Lampenlichter ----------
const lampG = new THREE.Group(); scene.add(lampG);
const MAX_LAMPS = 12;
let floorLux = null, ceilMesh = null, doorCaster = null;
function setRoomCasters(on) {
  for (const wl of walls) wl.castShadow = on;
  if (ceilMesh) ceilMesh.castShadow = on;
  if (doorCaster) doorCaster.visible = on;
}
function sunColor(alt) { const t = Math.min(1, Math.max(0, alt / (25 * DEG))); return new THREE.Color().setRGB(1, 0.78 + 0.2 * t, 0.58 + 0.38 * t); }
function syncLights() {
  lampG.clear();
  if (!LM.on) return;
  const ls = state.items.filter(isLight).map(lightOf).filter((L) => L.on).sort((a, b) => b.lm - a.lm).slice(0, MAX_LAMPS);
  const ex = LUX.expo;
  for (const L of ls) {
    let li;
    if (L.mode === 'omni') li = new THREE.PointLight(kColor(L.k), (L.lm / (4 * Math.PI)) * ex, 0, 2);
    else {
      const spot = L.mode === 'spot';
      li = new THREE.SpotLight(kColor(L.k), spot ? L.I0 * ex : (L.lm / Math.PI) * ex, 0, spot ? Math.min(1.4, (L.beam / 2) * 1.6 * DEG) : 1.45, spot ? 0.55 : 1, 2);
      li.target.position.set(L.x, 0, L.z); lampG.add(li.target);
    }
    li.position.set(L.x, L.y, L.z); li.castShadow = false; lampG.add(li);
  }
}
function updateGlow() {
  for (const it of state.items) {
    const g = meshes.get(it.id); if (!g || !g.userData.glow) continue;
    const on = !it.off, I = !on ? 0 : !LM.on ? 0.7 : LUX.night ? 2.6 : 1.1;
    for (const m of g.userData.glow) m.emissiveIntensity = I;
  }
}
function updateLightScene() {
  if (!LM.on) {   // normale Planer-Beleuchtung
    sun.position.set(3, 7, 4); sun.intensity = 1.5; sun.color.set(0xffffff);
    Object.assign(sun.shadow.camera, { left: -9, right: 9, top: 9, bottom: -9 }); sun.shadow.camera.updateProjectionMatrix();
    hemi.intensity = 0.35; scene.environmentIntensity = 0.65;
    setRoomCasters(false); lampG.clear(); if (floorLux) floorLux.visible = false; updateGlow(); applyBg();
    return;
  }
  const { w, l } = state.room, ex = LUX.expo, sp = LUX.sun, R = Math.hypot(w, l) / 2 + 1.2;
  if (sp && sp.alt > 0) {
    sun.intensity = Math.min(6, LUX.out.dn * TAU * ex); sun.color.copy(sunColor(sp.alt));
    sun.position.copy(LUX.dir).multiplyScalar(18);
  } else sun.intensity = 0;
  Object.assign(sun.shadow.camera, { left: -R, right: R, top: R, bottom: -R, near: 1, far: 45 }); sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  const amb = Math.max(0.03, LUX.avgAmb * ex);   // diffuses Tageslicht + Reflexionen, gleichmäßig verteilt
  hemi.intensity = 0.55 * amb; scene.environmentIntensity = 0.5 * amb;
  setRoomCasters(true); syncLights(); updateGlow();
  if (floorLux) floorLux.visible = LM.lux;
  applyBg();
}
function buildFloorLux() {   // Helligkeitskarte auf dem 3D-Boden
  if (floorLux) { floorLux.geometry.dispose(); roomG.remove(floorLux); }
  const { w, l } = state.room, tex = new THREE.CanvasTexture(luxCanvas);
  tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = THREE.LinearFilter;
  floorLux = new THREE.Mesh(new THREE.PlaneGeometry(w, l), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.82, depthWrite: false, toneMapped: false }));
  floorLux.rotation.x = -Math.PI / 2; floorLux.position.y = 0.02; floorLux.renderOrder = 1; floorLux.visible = LM.on && LM.lux;
  roomG.add(floorLux);
}

// ---------- 3D-Körper der Leuchten und des Fernsehers ----------
function glowMat(it) { return new THREE.MeshStandardMaterial({ color: 0xfffaf0, emissive: new THREE.Color(kColor(lightOf(it).k)), emissiveIntensity: it.off ? 0 : 0.7, roughness: 0.5 }); }
function buildLight(it) {
  const c = BYTYPE[it.type], L = c.L, g = new THREE.Group(), y = lightY(it), H = state.room.h, glow = glowMat(it), glows = [glow];
  const body = new THREE.MeshStandardMaterial({ color: it.color || '#f1efeb', roughness: 0.55, metalness: 0.15 });
  const add = (geo, mat, px, py, pz, rx = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(px, py, pz); m.rotation.x = rx; m.castShadow = false; g.add(m); return m; };
  const r = Math.max(0.04, it.w / 2), mode = it.mode || L.mode;
  if (L.mount === 'ceiling' && mode !== 'spot') {
    add(new THREE.CylinderGeometry(r, r * 0.94, 0.06, 40), body, 0, y + 0.04, 0);
    add(new THREE.CircleGeometry(r * 0.86, 40), glow, 0, y + 0.009, 0, Math.PI / 2);
  } else if (L.mount === 'ceiling') {
    add(new THREE.CylinderGeometry(r, r, 0.012, 28), body, 0, H - 0.006, 0);
    add(new THREE.CircleGeometry(r * 0.62, 28), glow, 0, H - 0.0135, 0, Math.PI / 2);
  } else if (L.mount === 'pendant') {
    add(new THREE.CylinderGeometry(0.004, 0.004, Math.max(0.05, H - y - 0.25), 6), metal, 0, (H + y + 0.25) / 2, 0);
    add(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 20), body, 0, H - 0.015, 0);
    const shade = add(new THREE.CylinderGeometry(r * 0.25, r, 0.25, 36, 1, true), new THREE.MeshStandardMaterial({ color: it.color || '#2b2b2d', roughness: 0.5, metalness: 0.2, side: THREE.DoubleSide }), 0, y + 0.125, 0);
    shade.castShadow = false;
    add(new THREE.CircleGeometry(r * 0.9, 36), glow, 0, y + 0.02, 0, Math.PI / 2);
  } else if (L.mount === 'wall') {
    add(new THREE.BoxGeometry(it.w * 0.5, 0.12, 0.02), body, 0, y, -it.d / 2 + 0.01);
    const shell = add(new THREE.CylinderGeometry(it.w / 2, it.w / 2, 0.12, 24, 1, false, -Math.PI / 2, Math.PI), glow, 0, y, -it.d / 2 + 0.02);
    shell.scale.z = (it.d - 0.02) / (it.w / 2);
  } else if (L.mount === 'table') {   // Höhe kommt über die Gruppe (steht ggf. auf einem Möbel)
    const e = 0, hh = it.h;
    add(new THREE.CylinderGeometry(r * 0.45, r * 0.5, 0.025, 24), body, 0, e + 0.0125, 0);
    add(new THREE.CylinderGeometry(0.008, 0.008, hh * 0.6, 8), metal, 0, e + hh * 0.3, 0);
    add(new THREE.CylinderGeometry(r * 0.6, r, hh * 0.42, 32, 1, true), glow, 0, e + hh * 0.79, 0).material.side = THREE.DoubleSide;
  } else {   // markierte Lichtquelle: leuchtende Kugel + Lot zum Boden
    add(new THREE.SphereGeometry(0.06, 20, 14), glow, 0, y, 0);
    const pts = [new THREE.Vector3(0, 0.01, 0), new THREE.Vector3(0, y - 0.07, 0)];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineDashedMaterial({ color: 0xa8792a, dashSize: 0.06, gapSize: 0.05 }));
    line.computeLineDistances(); g.add(line);
    const ring = add(new THREE.RingGeometry(0.08, 0.1, 32), new THREE.MeshBasicMaterial({ color: 0xa8792a, side: THREE.DoubleSide }), 0, 0.012, 0, -Math.PI / 2);
    ring.castShadow = false;
  }
  g.userData.glow = glows;
  return g;
}
function buildLampLit(it) {   // vorhandene Stehlampe: Schirm leuchtet in der Lichtfarbe
  const g = buildLamp(it), glows = [];
  g.traverse((o) => { if (o.isMesh && o.material && o.material.emissive && o.material.emissiveIntensity > 0) { o.material = o.material.clone(); o.material.emissive = new THREE.Color(kColor(lightOf(it).k)); glows.push(o.material); } });
  g.userData.glow = glows; return g;
}
function buildTv(it) {
  const g = new THREE.Group(), { sw, sh } = tvDims(it), wall = it.opts.mount === 'wall', foot = wall ? 0 : 0.07, z0 = wall ? -it.d / 2 + 0.02 : 0;
  const frame = new THREE.MeshStandardMaterial({ color: 0x1a1b1e, roughness: 0.45 }), screen = new THREE.MeshStandardMaterial({ color: 0x07080a, roughness: 0.18, metalness: 0.2 });
  const b = new THREE.Mesh(new THREE.BoxGeometry(sw, sh, 0.035), frame); b.position.set(0, foot + sh / 2, z0); b.castShadow = true; g.add(b);
  const s = new THREE.Mesh(new THREE.PlaneGeometry(sw - 0.016, sh - 0.016), screen); s.position.set(0, foot + sh / 2, z0 + 0.0181); g.add(s);
  if (!wall) for (const k of [-1, 1]) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.05, foot, it.d), frame); f.position.set(k * sw * 0.36, foot / 2, 0); f.castShadow = true; g.add(f); }
  return g;
}
function setTvSize(it) { const { sw, sh } = tvDims(it), wall = it.opts.mount === 'wall'; it.w = +sw.toFixed(3); it.h = +(sh + (wall ? 0 : 0.07)).toFixed(3); it.d = wall ? 0.06 : 0.22; }

// ---------- Grundriss: Helligkeit, Sonnenflecken, Lampen, Nordpfeil ----------
let hatch = null;
function hatchPattern() {
  if (hatch) return hatch;
  const c = document.createElement('canvas'); c.width = c.height = 10; const x = c.getContext('2d');
  x.fillStyle = 'rgba(255,214,90,0.55)'; x.fillRect(0, 0, 10, 10); x.strokeStyle = 'rgba(205,120,20,0.85)'; x.lineWidth = 1.6;
  x.beginPath(); x.moveTo(-2, 12); x.lineTo(12, -2); x.moveTo(-2, 2); x.lineTo(2, -2); x.moveTo(8, 12); x.lineTo(12, 8); x.stroke();
  return (hatch = pctx.createPattern(c, 'repeat'));
}
function drawLightLayer() {   // nach dem Raster, unter Wänden und Möbeln
  if (!LM.on || !LUX.vals) return;
  const { w, l } = state.room, [x0, y0] = P([-w / 2, -l / 2]), [x1, y1] = P([w / 2, l / 2]);
  if (LM.lux) { pctx.save(); pctx.globalAlpha = 0.86; pctx.imageSmoothingEnabled = true; pctx.drawImage(luxCanvas, x0, y0, x1 - x0, y1 - y0); pctx.restore(); }
  for (const p of LUX.sunPolys) {   // Sonnenflecken (exakt projiziert)
    pctx.beginPath(); p.forEach((q, i) => { const [px, py] = P(q); i ? pctx.lineTo(px, py) : pctx.moveTo(px, py); }); pctx.closePath();
    pctx.fillStyle = hatchPattern(); pctx.fill(); pctx.strokeStyle = 'rgba(200,110,10,0.95)'; pctx.lineWidth = 1.4; pctx.stroke();
  }
}
function drawLightSym(it, sel) {
  const L = lightOf(it), [px, py] = P([it.x, it.z]), on = L.on, m = mountOf(it), R = m === 'ceiling' && L.mode === 'spot' ? 5 : 8;
  if (LM.on && on) {   // Ring: hier bringt die Lampe allein ≥ 100 lx
    const rr = lampRadius(L, LM.plane) * view.s;
    if (rr > R + 2) { pctx.beginPath(); pctx.arc(px, py, rr, 0, Math.PI * 2); pctx.fillStyle = 'rgba(255,205,90,0.08)'; pctx.fill(); pctx.setLineDash([4, 4]); pctx.strokeStyle = 'rgba(214,150,30,0.75)'; pctx.lineWidth = 1; pctx.stroke(); pctx.setLineDash([]); }
  }
  pctx.beginPath(); pctx.arc(px, py, R, 0, Math.PI * 2);
  pctx.fillStyle = on ? '#f6c544' : '#b9bcc2'; pctx.fill();
  pctx.strokeStyle = sel ? css('--brass') : '#1d2230'; pctx.lineWidth = sel ? 2.4 : 1.2; pctx.stroke();
  pctx.beginPath();
  if (m === 'marker') { pctx.arc(px, py, 2.5, 0, Math.PI * 2); pctx.fillStyle = '#1d2230'; pctx.fill(); }
  else if (R > 6) { const k = R * 0.62; pctx.moveTo(px - k, py - k); pctx.lineTo(px + k, py + k); pctx.moveTo(px + k, py - k); pctx.lineTo(px - k, py + k); pctx.strokeStyle = '#1d2230'; pctx.lineWidth = 1.2; pctx.stroke(); }
  pctx.textAlign = 'left';   // Beschriftung knapp halten: Name nur bei Auswahl
  if (sel) {
    pctx.font = '600 11px "IBM Plex Sans", Arial, sans-serif'; const txt = `${BYTYPE[it.type].name} · ${L.lm} lm${on ? '' : ' (aus)'}`, tw = pctx.measureText(txt).width;
    const tx = px + R + 4 + tw > plan.getBoundingClientRect().width - 6 ? px - R - 4 - tw : px + R + 4;   // am rechten Rand nach links
    pctx.fillStyle = css('--panel'); pctx.globalAlpha = 0.85; pctx.fillRect(tx - 3, py - 8, tw + 6, 16); pctx.globalAlpha = 1; pctx.fillStyle = css('--plan-wall'); pctx.fillText(txt, tx, py + 4);
  }
  else if (view.s > 34) { pctx.font = '500 10px "IBM Plex Mono", Menlo, monospace'; pctx.fillStyle = css('--mute'); pctx.fillText(on ? String(L.lm) : 'aus', px + R + 3, py + 3.5); }
}
const COMPASS = { r: 22 };
function compassPos() { const r = plan.getBoundingClientRect(); return [r.width - 38, 38]; }
function drawCompassAndSun() {
  if (!LM.on) return;
  const [cx, cy] = compassPos(), { N } = compassDirs();
  pctx.save();
  pctx.beginPath(); pctx.arc(cx, cy, COMPASS.r, 0, Math.PI * 2); pctx.fillStyle = css('--panel'); pctx.globalAlpha = 0.92; pctx.fill(); pctx.globalAlpha = 1;
  pctx.strokeStyle = css('--line'); pctx.lineWidth = 1; pctx.stroke();
  const ang = Math.atan2(N[0], -N[1]);
  pctx.translate(cx, cy); pctx.rotate(ang);
  pctx.beginPath(); pctx.moveTo(0, -17); pctx.lineTo(6, 4); pctx.lineTo(0, 0); pctx.lineTo(-6, 4); pctx.closePath(); pctx.fillStyle = '#c4321f'; pctx.fill();
  pctx.beginPath(); pctx.moveTo(0, 17); pctx.lineTo(6, -4); pctx.lineTo(0, 0); pctx.lineTo(-6, -4); pctx.closePath(); pctx.fillStyle = css('--mute'); pctx.fill();
  pctx.font = '600 10px "IBM Plex Sans", Arial, sans-serif'; pctx.textAlign = 'center'; pctx.fillStyle = css('--plan-wall'); pctx.fillText('N', 0, -20 - 2);
  pctx.restore();
  const sp = LUX.sun;   // Sonne am Raumrand in ihrer Himmelsrichtung
  if (sp && sp.alt > 0) {
    const { w, l } = state.room, d = LUX.dir, hl = Math.hypot(d.x, d.z) || 1, ux = d.x / hl, uz = d.z / hl;
    const k = Math.min((w / 2 + 0.55) / Math.max(Math.abs(ux), 1e-6), (l / 2 + 0.55) / Math.max(Math.abs(uz), 1e-6));
    const [sx, sy] = P([ux * k, uz * k]);
    pctx.save(); pctx.setLineDash([3, 4]); pctx.strokeStyle = 'rgba(214,150,30,0.8)'; pctx.beginPath(); const [mx, my] = P([0, 0]); pctx.moveTo(sx, sy); pctx.lineTo(mx + (sx - mx) * 0.7, my + (sy - my) * 0.7); pctx.stroke(); pctx.setLineDash([]);
    pctx.fillStyle = '#f6b72c'; pctx.beginPath(); pctx.arc(sx, sy, 7, 0, Math.PI * 2); pctx.fill();
    pctx.strokeStyle = '#f6b72c'; pctx.lineWidth = 1.6; for (let a = 0; a < 8; a++) { const c = Math.cos(a * Math.PI / 4), s = Math.sin(a * Math.PI / 4); pctx.beginPath(); pctx.moveTo(sx + c * 9.5, sy + s * 9.5); pctx.lineTo(sx + c * 13, sy + s * 13); pctx.stroke(); }
    pctx.restore();
  }
}

// ---------- Licht-Tab ----------
function renderLightUi() {
  const pl = $('pLight'); if (!pl) return;
  $('lightOn').textContent = LM.on ? 'Lichtsimulation aus' : 'Lichtsimulation an'; $('lightOn').classList.toggle('on', LM.on);
  $('luxBtn').textContent = LM.lux ? 'Helligkeit ausblenden' : 'Helligkeit (Lux) zeigen'; $('luxBtn').classList.toggle('on', LM.lux);
  $('lDate').value = LM.date; $('lTime').value = LM.min; $('lTimeTxt').textContent = fmtMin(LM.min) + ' Uhr';
  $('lPlace').value = LM.place; $('lLat').value = LM.lat; $('lLon').value = LM.lon; $('lNorth').value = Math.round(state.room.north || 0);
  $('lLatLon').hidden = LM.place !== 'manuell' && LM.place !== 'geo'; $('lPlane').value = String(LM.plane); $('lSky').value = LM.sky;
  const st = sunTimes(), sp = sunPos(simDate(), LM.lat, LM.lon), alt = sp.alt / DEG;
  $('lSun').textContent = (alt > 0 ? `Sonne ${alt.toFixed(0)}° hoch, aus ${azName(sp.az)} (${Math.round(sp.az / DEG)}°)` : alt > -6 ? 'Dämmerung' : 'Nacht – nur Lampen')
    + ` · Aufgang ${st.rise != null ? fmtMin(st.rise) : '–'} · Untergang ${st.set != null ? fmtMin(st.set) : '–'} · mittags max. ${st.maxAlt.toFixed(0)}°`;
  const on = LM.on && LUX.vals;
  $('lAvg').textContent = on ? fmtLux(LUX.avg) : '–'; $('lMin').textContent = on ? fmtLux(LUX.min) : '–';
  $('lSunA').textContent = on ? (LUX.sunArea > 0.01 ? `${LUX.sunArea.toFixed(1).replace('.', ',')} m² · ~${fmtLux(LUX.sunE)}` : 'keine') : '–';
  $('lLegend').hidden = !LM.lux;
  const ls = state.items.filter(isLight), box = $('lList'); box.innerHTML = '';
  if (!ls.length) box.innerHTML = '<div class="empty">Noch keine Lichtquelle im Raum. Unten eine hinzufügen.</div>';
  for (const it of ls) {
    const L = lightOf(it), row = document.createElement('div'); row.className = 'lrow';
    row.innerHTML = `<button class="lname"><b></b><small></small></button><button class="btn sm"></button>`;
    row.querySelector('b').textContent = BYTYPE[it.type].short || BYTYPE[it.type].name;
    row.querySelector('small').textContent = `${L.lm} lm · ${L.k} K · ${(L.y * 100).toFixed(0)} cm hoch`;
    const tb = row.querySelector('.btn'); tb.textContent = L.on ? 'an' : 'aus'; tb.classList.toggle('on', L.on);
    tb.onclick = () => { it.off = L.on ? true : undefined; rebuild(it); changed(); renderLightUi(); };
    row.querySelector('.lname').onclick = () => select(it.id);
    box.appendChild(row);
  }
  const night = LM.on && LUX.night && !ls.some((it) => !it.off);
  $('lNightNote').hidden = !night;
}
function setLightMode(on) {
  LM.on = on; saveLM();
  if (on) { computeLux(); updateLightScene(); } else updateLightScene();
  drawPlan(); renderLightUi(); updateTag();
}
function updateTag() {
  const tg = document.querySelector('#view3d > .tag'); if (!tg) return;
  tg.textContent = LM.on ? `3D · ${new Date(LM.date + 'T12:00').toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })} · ${fmtMin(LM.min)} Uhr` : '3D';
}
function lightChanged() { saveLM(); renderLightUi(); updateTag(); scheduleLux(); }
function renderWinList() {
  const box = $('winList'); if (!box) return; box.innerHTML = '';
  if (!state.room.wins.length) box.innerHTML = '<div class="empty">Kein Fenster.</div>';
  state.room.wins.forEach((wi, i) => {
    const d = document.createElement('div'); d.className = 'winrow';
    d.innerHTML = `<div class="grid3"><label class="f">Wand<select data-k="wall"><option value="N">hinten</option><option value="S">vorn</option><option value="W">links</option><option value="E">rechts</option></select></label>`
      + `<label class="f">Breite m<input data-k="width" type="number" step="0.05" min="0.3" max="8"></label><label class="f">Höhe m<input data-k="height" type="number" step="0.05" min="0.3" max="4"></label></div>`
      + `<div class="grid3" style="margin-top:6px"><label class="f">Brüstung m<input data-k="sill" type="number" step="0.05" min="0" max="3"></label><label class="f" style="grid-column:span 2">Lage an der Wand<input data-k="pos" type="range" min="0" max="1" step="0.01"></label></div>`
      + `<button class="btn sm" data-del>Fenster ${i + 1} entfernen</button>`;
    for (const el of d.querySelectorAll('[data-k]')) {
      const k = el.dataset.k; el.value = k === 'wall' ? wi.wall : k === 'pos' ? wi.pos : (+wi[k]).toFixed(2);
      el.addEventListener(k === 'pos' ? 'input' : 'change', () => { wi[k] = k === 'wall' ? el.value : +el.value; if (k !== 'wall' && k !== 'pos') wi[k] = Math.max(k === 'sill' ? 0 : 0.3, wi[k] || 0); roomChanged(); });
    }
    d.querySelector('[data-del]').onclick = () => { state.room.wins.splice(i, 1); renderWinList(); roomChanged(); };
    box.appendChild(d);
  });
}
$('addWin').onclick = () => { state.room.wins.push({ wall: 'S', pos: 0.5, width: 1.2, height: 1.3, sill: 0.9 }); renderWinList(); roomChanged(); };
$('tLight').onclick = () => { setTab('tLight'); if (!LM.seen) { LM.seen = true; setLightMode(true); } else renderLightUi(); };
$('lightOn').onclick = () => setLightMode(!LM.on);
$('luxBtn').onclick = () => { LM.lux = !LM.lux; if (LM.lux && !LM.on) LM.on = true; saveLM(); setLightMode(LM.on); };
$('lDate').onchange = () => { if (/^\d{4}-\d\d-\d\d$/.test($('lDate').value)) { LM.date = $('lDate').value; lightChanged(); } };
$('lTime').oninput = () => { LM.min = +$('lTime').value; lightChanged(); };
for (const b of document.querySelectorAll('[data-q]')) b.onclick = () => {
  const q = b.dataset.q, y = new Date().getFullYear();
  if (q === 'jun') LM.date = `${y}-06-21`; else if (q === 'dec') LM.date = `${y}-12-21`; else if (q === 'mar') LM.date = `${y}-03-20`;
  else if (q === 'now') { const d = new Date(); LM.date = todayStr(); LM.min = d.getHours() * 60 + d.getMinutes(); }
  else if (q === 'day') LM.min = 13 * 60; else if (q === 'night') LM.min = 23 * 60;
  if (!LM.on) { LM.on = true; saveLM(); setLightMode(true); }
  lightChanged();
};
$('lPlace').onchange = () => {
  const v = $('lPlace').value; LM.place = v;
  if (PLACES[v]) { LM.lat = PLACES[v].lat; LM.lon = PLACES[v].lon; lightChanged(); }
  else if (v === 'geo') {
    $('lGeoNote').textContent = 'Standort wird abgefragt …';
    if (!navigator.geolocation) { $('lGeoNote').textContent = 'Standort nicht verfügbar – bitte Breite/Länge eintragen.'; lightChanged(); return; }
    navigator.geolocation.getCurrentPosition((p) => { LM.lat = +p.coords.latitude.toFixed(4); LM.lon = +p.coords.longitude.toFixed(4); $('lGeoNote').textContent = 'Standort übernommen.'; lightChanged(); },
      () => { $('lGeoNote').textContent = 'Standort nicht freigegeben – bitte Breite/Länge eintragen.'; LM.place = 'manuell'; lightChanged(); }, { timeout: 10000, maximumAge: 600000 });
  } else lightChanged();
};
$('lLat').onchange = () => { const v = +$('lLat').value; if (Math.abs(v) <= 90) { LM.lat = v; LM.place = 'manuell'; lightChanged(); } };
$('lLon').onchange = () => { const v = +$('lLon').value; if (Math.abs(v) <= 180) { LM.lon = v; LM.place = 'manuell'; lightChanged(); } };
$('lNorth').onchange = () => { state.room.north = ((+$('lNorth').value % 360) + 360) % 360; changed(); lightChanged(); };
$('lPlane').onchange = () => { LM.plane = +$('lPlane').value; lightChanged(); };
$('lSky').onchange = () => { LM.sky = $('lSky').value; lightChanged(); };
{   // Legende
  const g = $('lGrad'), stops = LUX_STOPS.map(([E, c], i) => `rgb(${c.join(',')}) ${((Math.log10(E) - Math.log10(5)) / (Math.log10(3000) - Math.log10(5)) * 100).toFixed(1)}%`);
  g.style.background = `linear-gradient(90deg, ${stops.join(', ')})`;
  for (const E of [50, 100, 300, 500, 1000]) { const s = document.createElement('span'); s.textContent = E; s.style.left = ((Math.log10(E) - Math.log10(5)) / (Math.log10(3000) - Math.log10(5)) * 100) + '%'; $('lTicks').appendChild(s); }
}
// Lichtquellen direkt im Licht-Tab hinzufügen
{
  const box = $('lCat');
  for (const c of LIGHT_GROUP.items) {
    const b = document.createElement('button');
    b.innerHTML = `${catIcon(c.icon || c.kind)}<span><b>${c.name}</b>${c.note ? `<small>${c.note}</small>` : ''}</span><span class="dim">${c.L ? c.L.lm + ' lm' : ''}</span>`;
    b.onclick = () => { const it = newItem(c.type, 0, 0); state.items.push(it); clamp(it, false); rebuild(it); select(it.id); changed(); };
    box.appendChild(b);
  }
}
// Auswahl-Panel: Licht-Eigenschaften
function fillLightPanel(it) {
  const box = $('selLight'), light = isLight(it); box.hidden = !light; if (!light) return;
  const L = lightOf(it), m = mountOf(it);
  $('sLm').value = L.lm; $('sK').value = String(L.k); $('sLz').value = Math.round(L.y * 100);
  $('sModeRow').hidden = m !== 'marker' && L.mode !== 'spot'; $('sMode').value = L.mode; $('lBeam').hidden = L.mode !== 'spot'; $('sBeam').value = L.beam;
  $('sOn').textContent = L.on ? 'Ausschalten' : 'Einschalten'; $('sOn').classList.toggle('on', !L.on);
  $('lLzTxt').textContent = m === 'ceiling' ? 'Höhe cm (Decke)' : m === 'table' ? 'Höhe cm (auf Möbel)' : 'Höhe cm';
  $('sLux').textContent = LM.on ? `direkt darunter: ${fmtLux(lampE(L, L.x, LM.plane, L.z))} auf ${LM.plane ? '0,8 m' : 'Boden'}` : 'Lichtsimulation im Tab „Licht“ einschalten für Lux-Werte.';
}
const lightEdit = (fn) => () => { const it = itemSel(); if (!it || !isLight(it)) return; fn(it); rebuild(it); fillLightPanel(it); changed(); renderLightUi(); };
$('sLm').onchange = lightEdit((it) => { it.lm = Math.max(0, Math.min(30000, Math.round(+$('sLm').value || 0))); });
$('sK').onchange = lightEdit((it) => { it.k = +$('sK').value; });
$('sLz').onchange = lightEdit((it) => { const v = +$('sLz').value / 100; it.lz = Math.max(0.05, Math.min(state.room.h, v || 0)); });
$('sMode').onchange = lightEdit((it) => { it.mode = $('sMode').value; });
$('sBeam').onchange = lightEdit((it) => { it.beam = Math.max(10, Math.min(120, +$('sBeam').value || 36)); });
$('sOn').onclick = lightEdit((it) => { it.off = it.off ? undefined : true; });
// Grundriss: Lux unter dem Zeiger, Nordpfeil drehen
let northDrag = false;
function showLuxAt(clientX, clientY) {
  const tip = $('luxTip'); if (!LM.on || !LUX.vals) { tip.hidden = true; return; }
  const r = plan.getBoundingClientRect(), [x, z] = W2(clientX - r.left, clientY - r.top), { w, l } = state.room;
  if (Math.abs(x) > w / 2 || Math.abs(z) > l / 2) { tip.hidden = true; $('lPtr').textContent = '–'; return; }
  const E = luxAt(x, z, LUX.D, LUX.lamps), sunHit = LUX.sunPolys.some((p) => inside([x, z], p));
  const txt = sunHit ? `Sonne · ~${fmtLux(LUX.sunE + E)}` : fmtLux(E);
  tip.textContent = txt; tip.hidden = false; tip.style.left = (clientX - r.left + 14) + 'px'; tip.style.top = (clientY - r.top - 10) + 'px';
  $('lPtr').textContent = txt;
}
const pw = $('planWrap');   // Abfangen auf dem Elternelement (Capture), bevor der Grundriss Möbel auswählt
pw.addEventListener('pointerdown', (e) => {
  if (!LM.on || e.target !== plan) return;
  const r = plan.getBoundingClientRect(), [cx, cy] = compassPos(), dx = e.clientX - r.left - cx, dy = e.clientY - r.top - cy;
  if (Math.hypot(dx, dy) <= COMPASS.r + 6) { northDrag = true; e.stopPropagation(); plan.setPointerCapture(e.pointerId); return; }
  showLuxAt(e.clientX, e.clientY);
}, true);
pw.addEventListener('pointermove', (e) => {
  if (northDrag) {
    const r = plan.getBoundingClientRect(), [cx, cy] = compassPos(), a = Math.atan2(e.clientX - r.left - cx, -(e.clientY - r.top - cy)) / DEG;
    state.room.north = (Math.round(a / 5) * 5 + 360) % 360; $('lNorth').value = state.room.north; scheduleLux(); drawPlan(); e.stopPropagation(); return;
  }
  if (LM.on && e.pointerType === 'mouse' && e.target === plan) showLuxAt(e.clientX, e.clientY);
}, true);
const endNorth = (e) => { if (northDrag) { northDrag = false; changed(); lightChanged(); e.stopPropagation(); } };
pw.addEventListener('pointerup', endNorth, true); pw.addEventListener('pointercancel', endNorth, true);
plan.addEventListener('pointerleave', () => { $('luxTip').hidden = true; });

// ---------- Wände & Boden: Wandfarben je Wand, Bodenbelag mit echtem Stückmaß, Mengen ----------
const PAINTS = [   // gängige Wandfarbtöne (ungefähr, keine Herstellerfarben) – wie „Wände streichen“ in der Tour
  { name: 'Weiß', hex: '#f7f7f4' }, { name: 'Altweiß', hex: '#efe9dc' }, { name: 'Sand', hex: '#e2d4ba' }, { name: 'Greige', hex: '#cdc4b5' },
  { name: 'Hellgrau', hex: '#d2d4d2' }, { name: 'Salbei', hex: '#b7c3aa' }, { name: 'Taubenblau', hex: '#a8b8c6' }, { name: 'Altrosa', hex: '#d8b1a8' },
  { name: 'Terrakotta', hex: '#c88a6a' }, { name: 'Ocker', hex: '#d2a85c' }, { name: 'Petrol', hex: '#41696e' }, { name: 'Anthrazit', hex: '#55595c' },
];
const WALL_WHITE = '#f7f7f4', WALL_KEYS = ['N', 'S', 'W', 'E'], WALL_NAMES = { N: 'hinten', S: 'vorn', W: 'links', E: 'rechts' };
const M2_PER_L = 7, COATS = 2;
let paintTarget = 'all', decoGroup = null, decoFlash = null, wallTap = null, floorMesh = null, floorJob = 0;
const floorTexs = new Map();   // Dekor-ID → CanvasTexture (UV in Metern, repeat = 1 / Kachelgröße)
const swatchUrls = new Map();
const fmt1 = (v, d = 1) => v.toFixed(d).replace('.', ',');
function normDeco(r) {   // nur Literale: läuft schon beim Laden des Speicherstands
  const p = r.paint && typeof r.paint === 'object' ? r.paint : {};
  r.paint = {};
  for (const k of ['N', 'S', 'W', 'E']) r.paint[k] = typeof p[k] === 'string' && /^#[0-9a-f]{6}$/i.test(p[k]) ? p[k].toLowerCase() : '#f7f7f4';
  const f = r.floor && typeof r.floor === 'object' ? r.floor : {};
  r.floor = { id: MC3Boden.floorDecor(f.id) ? f.id : 'vinyl-eiche-hell', dir: f.dir === 90 ? 90 : 0 };
}
function paintOf(k) { return (state.room.paint && state.room.paint[k]) || WALL_WHITE; }
function colorName(hex) { const c = PAINTS.find((p) => p.hex === hex); return c ? c.name : hex.toUpperCase(); }
function curDecor() { return MC3Boden.floorDecor(state.room.floor && state.room.floor.id) || MC3Boden.FLOOR_DECORS[0]; }
function floorAlongX() { const longX = state.room.w >= state.room.l; return state.room.floor.dir === 90 ? !longX : longX; }   // Dielen entlang x?

// Boden: UV in Metern (Kachel = tileX × tileY), damit „quer“ nur die Achsen tauscht und nichts verzerrt
function buildFloorMesh(w, l) {
  const g = new THREE.PlaneGeometry(w, l), uv = g.attributes.uv, pos = g.attributes.position, alongX = floorAlongX();
  for (let i = 0; i < uv.count; i++) { const x = pos.getX(i) + w / 2, y = pos.getY(i) + l / 2; if (alongX) uv.setXY(i, x, y); else uv.setXY(i, y, x); }
  const d = curDecor(), tex = floorTexs.get(d.id);
  const mat = new THREE.MeshStandardMaterial({ color: tex ? 0xffffff : d.base, map: tex || null, roughness: d.rough, metalness: 0 });
  const m = new THREE.Mesh(g, mat); m.rotation.x = -Math.PI / 2; m.receiveShadow = true;
  floorMesh = m;
  if (!tex) loadFloorTex(d);
  return m;
}
function loadFloorTex(d) {
  const job = ++floorJob; setFloorBusy(true);
  MC3Boden.floorTextureAsync(d).then((ft) => {
    let tex = floorTexs.get(d.id);
    if (!tex) {
      tex = new THREE.CanvasTexture(ft.canvas); tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy(); tex.repeat.set(1 / ft.tileX, 1 / ft.tileY); floorTexs.set(d.id, tex);
    }
    if (floorMesh && curDecor().id === d.id) { floorMesh.material.map = tex; floorMesh.material.color.set(0xffffff); floorMesh.material.needsUpdate = true; }
    if (job === floorJob) setFloorBusy(false);
  }).catch((e) => { console.warn('Bodenmuster:', e); if (job === floorJob) setFloorBusy(false); });
}
function setFloorBusy(on) { const b = $('floorBusy'); if (b) b.hidden = !on; }
function rebuildFloor() {
  if (!floorMesh) return;
  const old = floorMesh, m = buildFloorMesh(state.room.w, state.room.l);
  roomG.remove(old); old.geometry.dispose(); old.material.dispose(); roomG.add(m);
}

// Flächen und Mengen
function wallAreas() {   // Wandflächen ohne Tür und Fenster (m²)
  const { w, l, h } = state.room, A = { N: w * h, S: w * h, W: l * h, E: l * h }, d = state.room.door;
  A[d.wall] -= Math.min(d.width, wallLen(d.wall)) * Math.min(2.05, h);
  for (const g of winGeoms()) A[g.wall] -= g.width * (g.top - g.sill);
  for (const k of WALL_KEYS) A[k] = Math.max(0, A[k]);
  return A;
}
const litersFor = (a) => Math.ceil(((a * COATS) / M2_PER_L) * 2) / 2;
function applyRefl() {   // Lichtsimulation: Reflexionsgrad aus Wandfarben (flächengewichtet) und Bodendekor
  const A = wallAreas(); let s = 0, a = 0;
  for (const k of WALL_KEYS) { s += A[k] * MC3Boden.reflectance(paintOf(k)); a += A[k]; }
  REFL.wall = a > 0 ? s / a : 0.7;
  REFL.floor = MC3Boden.reflectance(curDecor().base);
  const el = $('lRefl'); if (el) el.textContent = `Wände ${Math.round(REFL.wall * 100)} %, Decke ${Math.round(REFL.ceil * 100)} %, Boden ${Math.round(REFL.floor * 100)} %`;
}
function renderDecoAmounts() {
  const A = wallAreas(), by = new Map();
  for (const k of WALL_KEYS) { const c = paintOf(k); by.set(c, (by.get(c) || 0) + A[k]); }
  let html = '';
  for (const [c, a] of by) html += `<div class="wide"><span><i class="dot" style="background:${c}"></i>${colorName(c)}</span><b>${fmt1(a)} m² · ${fmt1(litersFor(a), litersFor(a) % 1 ? 1 : 0)} L</b></div>`;
  $('paintAmt').innerHTML = html;
  const d = curDecor(), { w, l } = state.room, area = w * l, o = MC3Boden.floorOrder(d, area);
  const skirting = Math.max(0, 2 * (w + l) - Math.min(state.room.door.width, wallLen(state.room.door.wall)));
  $('floorAmt').innerHTML = `<div class="wide">Bodenfläche <b>${fmt1(area, 2)} m²</b></div>`
    + `<div class="wide"><span title="inkl. Verschnitt">Bestellen (+${Math.round(d.waste * 100)} %)</span> <b>≈ ${fmt1(o.m2)} m² · ${o.pieces} ${o.unit}</b></div>`
    + `<div class="wide">Sockelleiste (ohne Tür) <b>≈ ${fmt1(skirting)} m</b></div>`;
  applyRefl();
}

// Bedienung
function buildDecoUi() {
  $('wallPick').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; paintTarget = b.dataset.w; decoFlash = { k: paintTarget, t0: performance.now() }; renderDeco(); drawPlan(); };
  const pb = $('paints');
  for (const p of PAINTS) { const b = document.createElement('button'); b.style.background = p.hex; b.title = p.name; b.setAttribute('aria-label', p.name); b.dataset.hex = p.hex; b.onclick = () => setPaint(p.hex); pb.appendChild(b); }
  $('paintCustom').oninput = (e) => setPaint(e.target.value.toLowerCase());
  const gb = $('floorGroups');
  for (const g of MC3Boden.FLOOR_GROUPS) { const b = document.createElement('button'); b.textContent = g; b.dataset.g = g; b.onclick = () => { decoGroup = g; renderDeco(); }; gb.appendChild(b); }
  $('dirL').onclick = () => setFloorDir(0); $('dirQ').onclick = () => setFloorDir(90);
  $('tDeco').onclick = () => setTab('tDeco'); $('toDeco').onclick = () => setTab('tDeco');
}
function setPaint(hex) {
  const keys = paintTarget === 'all' ? WALL_KEYS : [paintTarget];
  for (const k of keys) state.room.paint[k] = hex;
  for (const wl of walls) if (keys.includes(wl.userData.wall)) wl.material.color.set(hex);
  renderDeco(); changed();
}
function setFloor(id) { if (state.room.floor.id === id) return; state.room.floor.id = id; rebuildFloor(); renderDeco(); changed(); }
function setFloorDir(dir) { if (state.room.floor.dir === dir) return; state.room.floor.dir = dir; rebuildFloor(); renderDeco(); changed(); }
function renderDeco() {
  for (const b of $('wallPick').children) b.setAttribute('aria-pressed', b.dataset.w === paintTarget);
  const same = WALL_KEYS.every((k) => paintOf(k) === paintOf('N')), cur = paintTarget === 'all' ? (same ? paintOf('N') : null) : paintOf(paintTarget);
  for (const b of $('paints').children) b.setAttribute('aria-pressed', b.dataset.hex === cur);
  $('paintCustom').value = cur || WALL_WHITE;
  $('paintNow').textContent = (paintTarget === 'all' ? 'Alle Wände' : 'Wand ' + WALL_NAMES[paintTarget]) + ': ' + (cur ? colorName(cur) : 'verschiedene Farben');
  const d = curDecor(); if (!decoGroup) decoGroup = d.group;
  for (const b of $('floorGroups').children) b.setAttribute('aria-pressed', b.dataset.g === decoGroup);
  const box = $('decors'), list = MC3Boden.FLOOR_DECORS.filter((x) => x.group === decoGroup);
  if (box.dataset.g !== decoGroup) {
    box.dataset.g = decoGroup; box.innerHTML = '';
    for (const x of list) {
      const b = document.createElement('button'); b.dataset.id = x.id; b.title = `${x.group} · ${x.name} · ${x.size}`;
      const img = document.createElement('img'); img.alt = ''; img.style.background = x.base; if (swatchUrls.has(x.id)) img.src = swatchUrls.get(x.id);
      const t = document.createElement('span'); t.innerHTML = `${x.name}<br><small>${x.size}</small>`;
      b.append(img, t); b.onclick = () => setFloor(x.id); box.appendChild(b);
    }
    makeSwatches(list);
  }
  for (const b of box.children) b.setAttribute('aria-pressed', b.dataset.id === d.id);
  $('decorName').textContent = `${d.group} · ${d.name}`; $('decorSize').textContent = d.size;
  $('dirL').classList.toggle('on', state.room.floor.dir !== 90); $('dirQ').classList.toggle('on', state.room.floor.dir === 90);
  renderDecoAmounts();
}
function makeSwatches(list) {   // Vorschaubilder nacheinander (Handy bleibt bedienbar)
  const todo = list.filter((x) => !swatchUrls.has(x.id));
  const step = () => {
    const x = todo.shift(); if (!x) return;
    try { swatchUrls.set(x.id, MC3Boden.floorSwatch(x, 168, 1.5)); } catch (e) { console.warn('Vorschau:', e); }
    const img = document.querySelector(`#decors button[data-id="${x.id}"] img`); if (img && swatchUrls.has(x.id)) img.src = swatchUrls.get(x.id);
    setTimeout(step, 0);
  };
  setTimeout(step, 0);
}
function decoWallDown(e) {   // im Tab „Farbe“: Antippen einer Wand wählt sie (Möbel davor gehen vor)
  if ($('pDeco').hidden) return false;
  const wh = ray.intersectObjects(walls.filter((wl) => !wl.material.transparent), false)[0];
  if (!wh) return false;
  const fh = ray.intersectObjects(furnG.children, true)[0];
  if (fh && fh.distance < wh.distance) return false;
  wallTap = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), k: wh.object.userData.wall };
  return true;
}
function decoWallUp(e) {   // nur bei echtem Tippen (kein Drehen der Ansicht)
  const t = wallTap; wallTap = null;
  if (!t || t.id !== e.pointerId || Math.hypot(e.clientX - t.x, e.clientY - t.y) > 8 || performance.now() - t.t > 700) return;
  pickWall(t.k);
}
function decoPlanDown(p) {   // Grundriss: Tippen auf/an eine Wand
  if ($('pDeco').hidden) return false;
  if (state.items.some((i) => inside(p, worldFootprint(i)))) return false;
  const { w, l } = state.room, tol = 0.12 + 14 / view.s, [x, z] = p;
  const cand = [['N', Math.abs(z + l / 2), Math.abs(x) <= w / 2 + tol], ['S', Math.abs(z - l / 2), Math.abs(x) <= w / 2 + tol], ['W', Math.abs(x + w / 2), Math.abs(z) <= l / 2 + tol], ['E', Math.abs(x - w / 2), Math.abs(z) <= l / 2 + tol]]
    .filter((c) => c[2] && c[1] <= tol).sort((a, b) => a[1] - b[1]);
  if (!cand.length) return false;
  pickWall(cand[0][0]); return true;
}
function pickWall(k) { paintTarget = k; decoFlash = { k, t0: performance.now() }; renderDeco(); drawPlan(); }
function tickDeco() {
  if (!decoFlash) return;
  const a = Math.max(0, 1 - (performance.now() - decoFlash.t0) / 900);
  for (const wl of walls) { const on = decoFlash.k === 'all' || wl.userData.wall === decoFlash.k; wl.material.emissive.set(0xa8792a); wl.material.emissiveIntensity = on ? 0.5 * a : 0; }
  if (a <= 0) decoFlash = null;
}
renderer.domElement.addEventListener('pointerup', decoWallUp);
renderer.domElement.addEventListener('pointercancel', () => { wallTap = null; });
function initDeco() { buildDecoUi(); applyRefl(); }

// ---------- Ansichten ----------
function setView(v) {
  const el = $('views'); el.className = 'views ' + (v === '3d' ? 'only3d' : v === 'plan' ? 'onlyplan' : 'both');
  $('v3d').setAttribute('aria-pressed', v === '3d'); $('vplan').setAttribute('aria-pressed', v === 'plan'); $('vboth').setAttribute('aria-pressed', v === 'both');
  requestAnimationFrame(() => { resize(); fitCamera(); });
}
$('v3d').onclick = () => setView('3d'); $('vplan').onclick = () => setView('plan'); $('vboth').onclick = () => setView('both');
function resize() {
  const r = host.getBoundingClientRect();
  if (r.width && r.height) { renderer.setSize(r.width, r.height, false); renderer.domElement.style.width = r.width + 'px'; renderer.domElement.style.height = r.height + 'px'; camera.aspect = r.width / r.height; camera.fov = walk.on ? (camera.aspect < 0.8 ? 80 : 70) : 45; camera.updateProjectionMatrix(); }
  planSize(); drawPlan();
}
function fitCamera() {   // ganzen Raum schräg von vorn oben zeigen, passend zum Seitenverhältnis der Ansicht
  const { w, l } = state.room, dir = new THREE.Vector3(0.5, 0.72, 0.72).normalize();
  const d = (Math.max(w, l * 0.9) * 1.32) / Math.min(1, camera.aspect * 1.05) + 1.2;
  controls.target.set(0, 0.3, 0); camera.position.copy(dir.multiplyScalar(d)); controls.update();
}
addEventListener('resize', resize);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { applyBg(); drawPlan(); });
new MutationObserver(() => { applyBg(); drawPlan(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

// ---------- Start ----------
applyBg(); buildCatalog(); roomInputs(); buildRoom3D(); rebuildAll();
const fromHash = () => ({ '#grundriss': 'plan', '#3d': '3d', '#beides': 'both' }[location.hash]);
setView(fromHash() || (matchMedia('(max-width: 760px)').matches ? '3d' : 'both'));
addEventListener('hashchange', () => { const v = fromHash(); if (v) setView(v); });
initDeco(); select(null, false); setTab('tAdd'); updatePhase(); renderLightUi(); updateTag(); if (LM.on) setLightMode(true);
const camDir = new THREE.Vector3();
const clock = new THREE.Clock();
(function loop() {
  const dt = Math.min(0.05, clock.getDelta());
  if (walk.on) updateWalk(dt); else controls.update();
  tickDeco();
  for (const wl of walls) {
    camDir.copy(camera.position).sub(wl.position); const facing = camDir.dot(wl.userData.n) < 0;
    if (wl.material.transparent !== facing) { wl.material.transparent = facing; wl.material.opacity = facing ? 0.1 : 1; wl.material.depthWrite = !facing; wl.material.needsUpdate = true; }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
})();
