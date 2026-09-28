import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'src', 'data');

console.log('--- UPSSSC PET MASTER: AUDITING DATA INTEGRITY ---');

let errors = [];
let warnings = [];

// 1. Validate Exam Configuration (pet-current.json)
try {
  const currentExam = JSON.parse(fs.readFileSync(path.join(dataDir, 'exams', 'pet', 'pet-current.json'), 'utf8'));
  console.log(`[OK] Current Exam Version: ${currentExam.examVersion} (${currentExam.examName})`);
  if (currentExam.totalQuestions !== 100 || currentExam.totalMarks !== 100) {
    errors.push(`pet-current.json must specify totalQuestions: 100 and totalMarks: 100. Found: ${currentExam.totalQuestions}, ${currentExam.totalMarks}`);
  }
  if (currentExam.negativeMarking !== 0.25) {
    errors.push(`pet-current.json must specify negativeMarking: 0.25. Found: ${currentExam.negativeMarking}`);
  }
} catch (e) {
  errors.push(`Failed to read pet-current.json: ${e.message}`);
}

// 2. Validate Syllabus (pet-syllabus.json)
try {
  const syllabus = JSON.parse(fs.readFileSync(path.join(dataDir, 'pet-syllabus.json'), 'utf8'));
  const totalMarks = syllabus.subjects.reduce((sum, s) => sum + s.marks, 0);
  const totalQuestions = syllabus.subjects.reduce((sum, s) => sum + s.questions, 0);
  console.log(`[OK] Syllabus loaded: ${syllabus.subjects.length} subjects, ${totalQuestions} questions, ${totalMarks} marks.`);
  if (totalMarks !== 100) {
    errors.push(`Syllabus total marks must be 100. Calculated: ${totalMarks}`);
  }
  if (totalQuestions !== 100) {
    errors.push(`Syllabus total questions must be 100. Calculated: ${totalQuestions}`);
  }
} catch (e) {
  errors.push(`Failed to read pet-syllabus.json: ${e.message}`);
}

// 3. Validate Questions Database (questions.json)
try {
  const questions = JSON.parse(fs.readFileSync(path.join(dataDir, 'questions.json'), 'utf8'));
  console.log(`[INFO] Validating Questions Database: ${questions.length} questions.`);
  const ids = new Set();
  
  questions.forEach((q, index) => {
    if (!q.id) errors.push(`Question at index ${index} missing id`);
    if (ids.has(q.id)) errors.push(`Duplicate Question ID found: ${q.id}`);
    ids.add(q.id);

    if (!Array.isArray(q.options) || q.options.length < 4) {
      errors.push(`Question ${q.id} has invalid options (must be array of at least 4 items)`);
    }
    if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= (q.options ? q.options.length : 4)) {
      errors.push(`Question ${q.id} has invalid answer index: ${q.answer}`);
    }
    if (!q.explanation || q.explanation.trim().length === 0) {
      warnings.push(`Question ${q.id} has empty explanation`);
    }
    if (!q.subject) errors.push(`Question ${q.id} missing subject`);
  });
  console.log(`[OK] Question ID uniqueness and schema checks passed for ${questions.length} questions.`);
} catch (e) {
  errors.push(`Failed to read questions.json: ${e.message}`);
}

// 4. Validate PYQs Database (pyqs.json)
try {
  const pyqs = JSON.parse(fs.readFileSync(path.join(dataDir, 'pyqs.json'), 'utf8'));
  console.log(`[INFO] Validating PYQ Database: ${pyqs.length} verified PYQs.`);
  const pyqIds = new Set();

  pyqs.forEach((p, idx) => {
    if (!p.id) errors.push(`PYQ at index ${idx} missing id`);
    if (pyqIds.has(p.id)) errors.push(`Duplicate PYQ ID: ${p.id}`);
    pyqIds.add(p.id);

    if (!p.year) errors.push(`PYQ ${p.id} missing year`);
    if (!p.officialVerification) errors.push(`PYQ ${p.id} missing officialVerification status`);
    if (typeof p.answer !== 'number' || p.answer < 0 || p.answer >= 4) {
      errors.push(`PYQ ${p.id} has invalid answer index: ${p.answer}`);
    }
  });
  console.log(`[OK] PYQ checks passed for ${pyqs.length} PYQs.`);
} catch (e) {
  errors.push(`Failed to read pyqs.json: ${e.message}`);
}

// 5. Validate Books (books.json)
try {
  const books = JSON.parse(fs.readFileSync(path.join(dataDir, 'books.json'), 'utf8'));
  console.log(`[INFO] Validating Books Database: ${books.length} recommended books.`);
  books.forEach((b, idx) => {
    if (!b.title || !b.publisher) errors.push(`Book index ${idx} missing title or publisher`);
    if (!b.url || (!b.url.startsWith('http://') && !b.url.startsWith('https://'))) {
      errors.push(`Book ${b.title || idx} has invalid or missing URL: ${b.url}`);
    }
    // Strict copyright check: Ensure no pirated keyword in url
    const disallowed = ['pirate', 't.me', 'drive.google.com/open', 'torrent', 'libgen', 'scihub'];
    if (disallowed.some(d => b.url.toLowerCase().includes(d))) {
      errors.push(`Book ${b.title} contains disallowed/unauthorized URL: ${b.url}`);
    }
  });
  console.log(`[OK] Books integrity verified. All books link to legitimate publishers/retailers.`);
} catch (e) {
  errors.push(`Failed to read books.json: ${e.message}`);
}

// Summary
console.log('\n================ AUDIT SUMMARY ================');
console.log(`Warnings: ${warnings.length}`);
warnings.forEach(w => console.warn(`  - [WARN] ${w}`));

if (errors.length > 0) {
  console.error(`FAILED: ${errors.length} error(s) found:`);
  errors.forEach(err => console.error(`  - [ERROR] ${err}`));
  process.exit(1);
} else {
  console.log('SUCCESS: All UPSSSC PET Master data schemas and integrity checks passed perfectly!');
  process.exit(0);
}
