/**
 * This is a copy of the pathsToModuleNameMapper function from ts-jest
 *
 * https://github.com/kulshekhar/ts-jest/blob/eeb787d1e13930be1b84401cae9ff08c21503739/src/config/paths-to-module-name-mapper.ts#L17
 */
const escapeRegex = (str) => str.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

const pathsToModuleNameMapper = (
  mapping,
  { prefix = '', useESM = false } = {},
) => {
  const jestMap = {};
  for (const fromPath of Object.keys(mapping)) {
    const toPaths = mapping[fromPath];
    if (toPaths.length === 0) {
      console.warn(`Path '${fromPath}' has no target.`);
      continue;
    }
    const segments = fromPath.split(/\*/g);
    if (segments.length === 1) {
      const paths = toPaths.map((target) => {
        const enrichedPrefix =
          prefix !== '' && !prefix.endsWith('/') ? `${prefix}/` : prefix;
        return `${enrichedPrefix}${target}`;
      });
      const cjsPattern = `^${escapeRegex(fromPath)}$`;
      jestMap[cjsPattern] = paths.length === 1 ? paths[0] : paths;
    } else if (segments.length === 2) {
      const paths = toPaths.map((target) => {
        const enrichedTarget =
          target.startsWith('./') && prefix !== ''
            ? target.substring(target.indexOf('/') + 1)
            : target;
        const enrichedPrefix =
          prefix !== '' && !prefix.endsWith('/') ? `${prefix}/` : prefix;
        return `${enrichedPrefix}${enrichedTarget.replace(/\*/g, '$1')}`;
      });
      if (useESM) {
        const esmPattern = `^${escapeRegex(segments[0])}(.*)${escapeRegex(
          segments[1],
        )}\\.js$`;
        jestMap[esmPattern] = paths.length === 1 ? paths[0] : paths;
      }
      const cjsPattern = `^${escapeRegex(segments[0])}(.*)${escapeRegex(
        segments[1],
      )}$`;
      jestMap[cjsPattern] = paths.length === 1 ? paths[0] : paths;
    } else {
      console.warn(`Path '${fromPath}' is not supported.`);
    }
  }

  if (useESM) {
    jestMap['^(\\.{1,2}/.*)\\.js$'] = '$1';
  }
  return jestMap;
};

module.exports = { pathsToModuleNameMapper };
