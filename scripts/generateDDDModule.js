const fs = require('fs');
const path = require('path');

const moduleNameCapitalized = process.argv[2].charAt(0).toUpperCase() + process.argv[2].slice(1).toLocaleLowerCase();

const moduleName = moduleNameCapitalized;
if (!moduleName) {
  console.error('Please specify a module name');
  process.exit(1);
}

const lowerCaseModuleName = moduleName.toLowerCase(); // Corrected toLowerCase
const baseDir = path.join(__dirname, '..', 'src', 'ddd', lowerCaseModuleName);

// Correctly defining necessary subdirectories
const necessarySubdirectories = [
  path.join(baseDir, 'application'),
  path.join(baseDir, 'domain', 'model'),
  path.join(baseDir, 'domain', 'repository'),
  path.join(baseDir, 'infrastructure')
];

// Ensure base directories and necessary subdirectories exist
necessarySubdirectories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// File paths
const applicationFilePath = path.join(baseDir, "application", `${moduleName}Service.ts`);
const applicationTestFilePath = path.join(baseDir, "application", `${moduleName}Service.test.ts`);
const domainModelFilePath = path.join(baseDir, "domain", "model", `${moduleName}.ts`);
const domainModelTestFilePath = path.join(baseDir, "domain", "model", `${moduleName}.test.ts`);
const domainRepositoryFilePath = path.join(baseDir, "domain", "repository", `${moduleName}Repository.ts`);
const domainRepositoryTestFilePath = path.join(baseDir, "domain", "repository", `${moduleName}Repository.test.ts`);
const infrastructureFilePath = path.join(baseDir, "infrastructure", `Fake${moduleName}Repository.ts`);
const infrastructureTestFilePath = path.join(baseDir, "infrastructure", `Fake${moduleName}Repository.test.ts`);

// Application Service file content
const applicationServiceContent = `import { ${moduleName}Repository } from "../domain/repository/${moduleName}Repository";

export class ${moduleName}Service {
  constructor(private ${lowerCaseModuleName}Repository: ${moduleName}Repository) {}

  async execute(page: number) {
    return await this.${lowerCaseModuleName}Repository.findAll(page);
  }
}
`;

const applicationServiceTestContent = `
import { describe, it, expect, vi } from "vitest";
import { ${moduleName}Service } from "./${moduleName}Service";

// Mock ${moduleName}Repository implementation
const mock${moduleName}Repository = {
  findAll: vi
    .fn()
    .mockImplementation((page: number) =>
      Promise.resolve([{ id: 1 }, { id: 2 }])
    ),
};

describe("${moduleName}Service", () => {
  it("execute should call ${lowerCaseModuleName}Repository.findAll with the correct page number", async () => {
    // Create an instance of ${moduleName}Service with the mocked ${moduleName}Repository
    const ${lowerCaseModuleName}Service = new ${moduleName}Service(mock${moduleName}Repository);

    // Call the execute method
    const page = 1;
    const ${lowerCaseModuleName}s = await ${lowerCaseModuleName}Service.execute(page);

    // Verify that ${lowerCaseModuleName}Repository.findAll was called once with the correct page number
    expect(mock${moduleName}Repository.findAll).toHaveBeenCalledWith(page);
    expect(mock${moduleName}Repository.findAll).toHaveBeenCalledTimes(1);

    // Verify that the result is as expected
    expect(${lowerCaseModuleName}s).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

`;


// Domain Model file content
const domainModelContent = `export class ${moduleName} {
  constructor(public readonly id: number) {}
}
`;

const domainModelTestContent = `import { describe, it, expect } from "vitest";
import { ${moduleName} } from "./${moduleName}";

describe("${moduleName} class", () => {
  it("should correctly assign and expose the id property", () => {
    const ${lowerCaseModuleName}Id = 123;
    const ${lowerCaseModuleName} = new ${moduleName}(${lowerCaseModuleName}Id);

    expect(${lowerCaseModuleName}.id).toBe(${lowerCaseModuleName}Id);
  });
});


`;

// Domain Repository interface content
const domainRepositoryContent = `import { ${moduleName} } from "../model/${moduleName}";

export interface ${moduleName}Repository {
  findAll(page: number): Promise<${moduleName}[]>;
}
`;

const domainRepositoryTestContent = `
import { ${moduleName} } from "../model/${moduleName}";
import { ${moduleName}Repository } from "./${moduleName}Repository";
import { describe, it, expect } from 'vitest';
export class InMemory${moduleName}Repository implements ${moduleName}Repository {
  private ${lowerCaseModuleName}s: ${moduleName}[] = [new ${moduleName}(1), new ${moduleName}(2)];

  async findAll(page: number): Promise<${moduleName}[]> {
    // Simple example: return all ${lowerCaseModuleName}s ignoring pagination
    return Promise.resolve(this.${lowerCaseModuleName}s);
  }
}


describe('InMemory${moduleName}Repository', () => {
  it('findAll should return all ${lowerCaseModuleName}s', async () => {
    const ${lowerCaseModuleName}Repository = new InMemory${moduleName}Repository();
    const ${lowerCaseModuleName}s = await ${lowerCaseModuleName}Repository.findAll(1); 
    expect(${lowerCaseModuleName}s.length).toBe(2);
    expect(${lowerCaseModuleName}s[0].id).toBeDefined();
    expect(${lowerCaseModuleName}s[1].id).toBeDefined();
  });
});

`;

// Infrastructure Repository file content
const infrastructureRepositoryContent = `import { ${moduleName} } from "../domain/model/${moduleName}";
import { ${moduleName}Repository } from "../domain/repository/${moduleName}Repository";

export class Fake${moduleName}Repository implements ${moduleName}Repository {
  async findAll(page: number): Promise<${moduleName}[]> {
    const response = await fetch(\`api?page=\${page}\`);
    const data = await response.json();
    return data.map((item: any) => new ${moduleName}(item.id));
  }
}
`;

const infrastructureRepositoryTestContent = `import { describe, it, expect, beforeEach, vi } from "vitest";

import { ${moduleName} } from "../domain/model/${moduleName}";
import { Fake${moduleName}Repository } from "./Fake${moduleName}Repository";

// Mock the global fetch function
global.fetch = vi.fn();

describe("Fake${moduleName}Repository", () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    vi.resetAllMocks();
  });

  it("findAll should fetch data from the API and return ${moduleName} instances", async () => {
    // Mocked response data
    const mock${moduleName}s = [{ id: 1 }, { id: 2 }];

    // Mock fetch to return a response with the mocked data
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mock${moduleName}s),
    });

    const ${lowerCaseModuleName}Repository = new Fake${moduleName}Repository();
    const page = 1;
    const ${lowerCaseModuleName}s = await ${lowerCaseModuleName}Repository.findAll(page);

    // Assert fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(`+"`"+"api?page=${page}"+"`"+`);

    // Assert the correct number of ${lowerCaseModuleName}s are returned
    expect(${lowerCaseModuleName}s.length).toBe(mock${moduleName}s.length);

    // Assert instances of ${moduleName} are returned
    ${lowerCaseModuleName}s.forEach((${lowerCaseModuleName}, index) => {
      expect(${lowerCaseModuleName}).toBeInstanceOf(${moduleName});
      expect(${lowerCaseModuleName}.id).toBe(mock${moduleName}s[index].id);
    });
  });

  // You can add more tests here to cover different scenarios,
  // such as handling fetch errors or empty responses.
});

`;

// Write files
fs.writeFileSync(applicationFilePath, applicationServiceContent, 'utf8');
fs.writeFileSync(applicationTestFilePath, applicationServiceTestContent, 'utf8');
fs.writeFileSync(domainModelFilePath, domainModelContent, 'utf8');
fs.writeFileSync(domainModelTestFilePath, domainModelTestContent, 'utf8');
fs.writeFileSync(domainRepositoryFilePath, domainRepositoryContent, 'utf8');
fs.writeFileSync(domainRepositoryTestFilePath, domainRepositoryTestContent, 'utf8');
fs.writeFileSync(infrastructureFilePath, infrastructureRepositoryContent, 'utf8');
fs.writeFileSync(infrastructureTestFilePath, infrastructureRepositoryTestContent, 'utf8');

console.log(`${moduleName} DDD module structure has been created.`);
