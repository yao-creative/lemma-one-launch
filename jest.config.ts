import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Ensure ts-jest is used for TypeScript files
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Specify the path to your tsconfig
    },
  },
  reporters: [
    "default", // This keeps the default console output
    ["jest-html-reporter", {
      pageTitle: "Test Report",
      outputPath: "./test-report.html",  // Path where the HTML file will be generated
      includeFailureMsg: true, // Include detailed error messages
      includeConsoleLog: true // Include console.log statement
    }]
  ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)