//@ts-check
import { writeFileSync } from 'fs';
import path from 'path';
import config from '../plugin.config.mjs';

const envName = process.argv[2] ?? 'dev';

const base = config.manifest.base;
const env = config.manifest[envName];

const merged = (src, dst) => {
  return Object.entries(src).reduce((acc, [key, value]) => {
    if (!dst[key]) {
      return { ...acc, [key]: value };
    }

    if (typeof dst[key] === 'string') {
      return { ...acc, [key]: dst[key] };
    }

    if (Array.isArray(value) && Array.isArray(dst[key])) {
      return { ...acc, [key]: [...value, ...dst[key]] };
    }

    return { ...acc, [key]: merged(src[key], dst[key]) };
  }, {});
};

const manifestPath = path.join(process.cwd(), 'plugin', 'manifest.json');

writeFileSync(manifestPath, JSON.stringify(merged(base, env)));
