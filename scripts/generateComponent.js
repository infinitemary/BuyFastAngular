// scripts/generateComponent.js
const fs = require('fs');
const path = require('path');

// Retrieve component path from command line arguments
const componentPath = process.argv[2];

// Split the path into folders
const folders = componentPath.split('.');

// Define the base path
const basePath = path.join(__dirname, '..', 'src', 'app', ...folders);

// Ensure the directory exists
fs.mkdirSync(basePath, { recursive: true });

// Component content
const content = `export default function Page() {
    return <h1>Hello, Next.js!</h1>
}`;

// File path (always Page.tsx)
const filePath = path.join(basePath, `page.tsx`);

// Write the file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`Component Page created at ${filePath}`);
