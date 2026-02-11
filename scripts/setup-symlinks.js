import { symlinkSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const rootDir = join(import.meta.dirname, '..');
const frontendDir = join(rootDir, 'frontend');

const links = ['app', 'components', 'lib', 'public'];

for (const dir of links) {
  const target = join(frontendDir, dir);
  const linkPath = join(rootDir, dir);
  
  if (existsSync(linkPath)) {
    console.log(`[v0] Skipping ${dir} - already exists at root`);
    continue;
  }
  
  if (!existsSync(target)) {
    console.log(`[v0] Skipping ${dir} - source doesn't exist in frontend/`);
    continue;
  }
  
  try {
    symlinkSync(target, linkPath, 'dir');
    console.log(`[v0] Created symlink: ${dir} -> frontend/${dir}`);
  } catch (err) {
    console.error(`[v0] Failed to create symlink for ${dir}:`, err.message);
  }
}

console.log('[v0] Symlink setup complete');
