/* eslint-env node */
const nextJest = require('next/jest');

const createJestConfig = nextJest({dir: './'});

module.exports = async () => ({
  ...(await createJestConfig({
    testEnvironment: 'jsdom',
    rootDir: 'src',
    // Phase 0 deleted the only Jest spec (Navigation.spec.tsx) along with its
    // dead component. Allow `pnpm run test:jest` to succeed until proper
    // unit tests are added in Phase 4.
    passWithNoTests: true
  })()),
  transformIgnorePatterns: ['node_modules/(?!next-intl)/']
});
