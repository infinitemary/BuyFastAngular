const fs = require('fs');
const path = require('path');

// Extract the component path from the command line arguments
const componentPath = process.argv[2];
const componentPathSegments = componentPath.split('.');
let componentName = componentPathSegments.pop();

// Function to capitalize the first letter of the component name
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

componentName = capitalizeFirstLetter(componentName);

const componentDirPath = path.join(__dirname, '..', 'src', 'components', ...componentPathSegments.map(segment => capitalizeFirstLetter(segment)));
const componentFilePath = path.join(componentDirPath, `${componentName}Component.tsx`);

// Component template
const componentTemplate = `import React from 'react';

export const ${componentName}Component: React.FC = () => {
  return (
    <div></div>
  );
};`;

// Ensure the directory exists
fs.mkdirSync(componentDirPath, { recursive: true });

// Write the component file
fs.writeFileSync(componentFilePath, componentTemplate, 'utf8');

console.log(`${componentName} component created at ${componentFilePath}`);
