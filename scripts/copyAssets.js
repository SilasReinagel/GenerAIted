import fs from 'fs-extra';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'assets');
const clientDestDir = path.join(process.cwd(), 'client', 'assets');
const serverDestDir = path.join(process.cwd(), 'server', 'assets');

async function copyAssets() {
  try {
    await fs.copy(sourceDir, clientDestDir);
    console.log('Assets copied to client directory');

    await fs.copy(sourceDir, serverDestDir);
    console.log('Assets copied to server directory');
  } catch (err) {
    console.error('Error copying assets:', err);
  }
}

copyAssets();