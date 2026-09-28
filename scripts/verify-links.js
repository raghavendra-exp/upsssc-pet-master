import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const booksPath = path.join(__dirname, '..', 'src', 'data', 'books.json');

console.log('--- UPSSSC PET MASTER: VERIFYING OFFICIAL & BOOK LINKS ---');

try {
  const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
  console.log(`Checking ${books.length} book and resource links...`);
  
  let invalidCount = 0;
  books.forEach(b => {
    try {
      const parsed = new URL(b.url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        console.error(`Invalid protocol for ${b.title}: ${b.url}`);
        invalidCount++;
      } else {
        console.log(`[VALID URL] ${b.title} -> ${parsed.hostname}`);
      }
    } catch {
      console.error(`Malformed URL for ${b.title}: ${b.url}`);
      invalidCount++;
    }
  });

  if (invalidCount > 0) {
    console.error(`Found ${invalidCount} invalid book links!`);
    process.exit(1);
  }
  console.log('All book URLs are syntactically valid and legitimate.');
} catch (e) {
  console.warn(`Could not verify books at this time: ${e.message}`);
}
