// scripts/createTest.js
const fs = require('fs');
const path = require('path');

// Function to create directories recursively
function createDirectoriesRecursively(directoryPath) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

// Function to generate the test file with a default template
function generateTestFile(filePath) {
  const testTemplate = `import { describe, it, expect } from 'vitest';

describe('Default Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
`;

  fs.writeFileSync(filePath, testTemplate);
}

// Main function to process the input and create the test file
function main() {
  const [,, inputPath] = process.argv;
  if (!inputPath) {
    console.error('Please provide a file path in the format folder1.folder2.filename');
    process.exit(1);
  }

  // Convert the input path to a directory structure
  const filePath = inputPath.replace(/\./g, '/');
  const fullPath = path.join(__dirname, '..',  `${filePath}.test.ts`);

  // Create the directory structure
  createDirectoriesRecursively(path.dirname(fullPath));

  // Generate the test file
  generateTestFile(fullPath);

  console.log(`Test file created at: ${fullPath}`);
}

main();
