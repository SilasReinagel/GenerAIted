// @ts-check
import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Function to convert image to data URL
async function imageToDataURL(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = 'image/jpeg'; // Assuming all images are JPEGs
  return `data:${mimeType};base64,${base64Image}`;
}

// Function to check if an image is ordinary
async function isOrdinaryImage(imagePath) {
  try {
    const dataURL = await imageToDataURL(imagePath);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Is this image an ordinary photo or a unique, highly-original art piece? Please respond with either 'ordinary' or 'unique' without any additional explanation." },
            {
              type: "image_url",
              image_url: {
                url: dataURL,
              },
            },
          ],
        },
      ],
    });

    const result = response.choices[0].message.content?.toLowerCase().trim();
    return result === 'ordinary';
  } catch (error) {
    console.error(`Error processing image ${imagePath}:`, error);
    throw error;
  }
}

// Main function to process all images
async function processImages() {
  try {
    // Read the cards database
    const dbPath = path.join('..', 'assets', 'cards.db.json');
    const dbContent = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(dbContent);

    // Process each card
    for (const card of db.artCards) {
      if (!card.hasOwnProperty('isOrdinary')) {
        const imagePath = path.join('..', card.imagePath);
        const isOrdinary = await isOrdinaryImage(imagePath);
        
        if (isOrdinary !== null) {
          card.isOrdinary = isOrdinary;
          console.log(`Processed ${card.id}: ${isOrdinary ? 'Ordinary' : 'Unique'}`);
          // Update the cards.db.json file
          const updatedDbContent = JSON.stringify(db, null, 2);
          await fs.writeFile(dbPath, updatedDbContent, 'utf8');
          console.log(`Updated cards.db.json with isOrdinary status for card ${card.id}`);
        }
      }
    }

    // Save the updated database
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    console.log('Database updated successfully');
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the main function
processImages();
