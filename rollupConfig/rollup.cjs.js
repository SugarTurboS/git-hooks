import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import pkg from '../package.json';
import common from './rollup.common';
import copy from 'rollup-plugin-copy';

export default [
  // CommonJS
  {
    ...common,
    output: { file: `dist/${pkg.name}.js`, format: 'cjs', indent: false },
    plugins: [
      ...common.plugins,
      typescript({ useTsconfigDeclarationDir: true }),
      babel({
        runtimeHelpers: true,
        extensions: ['.js', '.ts'],
      }),
      copy({
        targets: [{ src: ['assets/*'], dest: 'dist/' }],
      }),
    ],
  },
];
