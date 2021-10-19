(async ([_, __, envName]) => {
  const fs = require('fs');

  const root = __dirname.replace('\\scripts', '');

  const baseText = await fs.readFileSync(`${root}\\src\\manifest\\common.json`, 'utf-8');
  const envText = await fs.readFileSync(`${root}\\src\\manifest\\${envName}.json`, 'utf-8');

  const base = JSON.parse(baseText);
  const env = JSON.parse(envText);

  const merged = (src: any, dst: any): Record<string, any> => {
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

  fs.writeFileSync(`${root}\\plugin\\manifest.json`, JSON.stringify(merged(base, env)));
})(process.argv);
