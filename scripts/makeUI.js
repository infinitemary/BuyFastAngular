// File: makeUI.js
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const arg = args[0];

if (!arg) {
  console.error('Usage: npm run make:ui folder1.folder2.moduleName');
  process.exit(1);
}

const parts = arg.split('.');
const _moduleName = parts.pop();
const moduleNameCapitalized = _moduleName.charAt(0).toUpperCase() + _moduleName.slice(1).toLocaleLowerCase();
const moduleNameLowerCase = moduleNameCapitalized.toLocaleLowerCase();

const moduleName = moduleNameCapitalized;
const baseDir = path.join('src', ...parts,'_ui', moduleNameLowerCase);

// Ensure the base directory exists
fs.mkdirSync(baseDir, { recursive: true });

// Create React component
const componentContent = `import React from 'react';

export const ${moduleNameCapitalized}UI: React.FC = () => {
  return <div>${moduleNameCapitalized} Component</div>;
};
`;

// Create hooks
const useUIContent = `import React from 'react';

export const use${moduleNameCapitalized}UI = () => {
  return {};
};
`;

const useReducerUIContent = `import { useReducer } from 'react';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const use${moduleNameCapitalized}ReducerUI = () => {
  const [state, dispatch] = useReducer(reducer, {});
  return { state, dispatch };
};
`;

const useActionsContent = `export const use${moduleNameCapitalized}Actions = () => {
  return {};
};
`;

// Write files
fs.writeFileSync(path.join(baseDir, `${moduleNameCapitalized}UI.tsx`), componentContent, 'utf8');
fs.writeFileSync(path.join(baseDir, `use${moduleNameCapitalized}UI.ts`), useUIContent, 'utf8');
fs.writeFileSync(path.join(baseDir, `use${moduleNameCapitalized}ReducerUI.ts`), useReducerUIContent, 'utf8');
fs.writeFileSync(path.join(baseDir, `use${moduleNameCapitalized}Actions.ts`), useActionsContent, 'utf8');

console.log(`UI module ${moduleName} created successfully.`);