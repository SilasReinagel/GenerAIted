// @ts-check
import fs from 'fs/promises';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'server', 'assets');
const CARDS_DB_PATH = path.join(ASSETS_DIR, 'cards.db.json');

async function updateCardsDb() {
  try {
    // Read the contents of the assets directory
    const files = await fs.readdir(ASSETS_DIR);

    // Filter for image files (assuming jpg format)
    const imageFiles = files.filter(file => file.endsWith('.jpg'));

    // Generate art cards based on image files
    const artCards = imageFiles.map((file, index) => ({
      id: index + 1,
      imagePath: `/assets/${file}`,  // This should match the static file serving path
      title: `Generated Art ${index + 1}`,
      description: `AI-generated artwork number ${index + 1}`
    }));

    // Create the content for cards.db.json
    const dbContent = JSON.stringify({ artCards }, null, 2);

    console.log('Writing the following content to cards.db.json:');
    console.log(dbContent);

    // Write the content to cards.db.json
    await fs.writeFile(CARDS_DB_PATH, dbContent, 'utf8');

    console.log(`Successfully updated ${CARDS_DB_PATH} with ${artCards.length} art cards.`);
  } catch (error) {
    console.error('Error updating cards.db:', error);
  }
}

updateCardsDb();