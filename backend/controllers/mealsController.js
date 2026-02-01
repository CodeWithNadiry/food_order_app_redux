import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getMeals(req, res) {
  try {
    const mealsPath = path.join(__dirname, '../data/available-meals.json'); // correct absolute path
    const meals = await fs.readFile(mealsPath, 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    console.error(error); // log the error to console
    res.status(500).json({ message: error.message });
  }
}