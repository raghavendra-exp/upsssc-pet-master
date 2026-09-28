import { UserProgress, Theme } from '../types';

const STORAGE_KEY = 'upsssc_pet_master_progress_v1';
const THEME_KEY = 'upsssc_pet_theme_v1';

const defaultProgress: UserProgress = {
  attemptedQuestions: {},
  bookmarkedQuestionIds: [],
  mistakeIds: [],
  revisionTopics: {},
  mockScores: [],
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0]
};

export function getStoredProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function recordQuestionAttempt(questionId: string, selectedOption: number, isCorrect: boolean): void {
  const p = getStoredProgress();
  p.attemptedQuestions[questionId] = {
    selected: selectedOption,
    correct: isCorrect,
    timestamp: Date.now()
  };

  if (!isCorrect) {
    if (!p.mistakeIds.includes(questionId)) {
      p.mistakeIds.push(questionId);
    }
  } else {
    // If answered correctly in practice, don't auto-remove unless explicitly cleared
  }

  // Update study streak
  const today = new Date().toISOString().split('T')[0];
  if (p.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (p.lastStudyDate === yesterday) {
      p.streakDays += 1;
    } else {
      p.streakDays = 1;
    }
    p.lastStudyDate = today;
  }

  saveProgress(p);
}

export function toggleBookmark(questionId: string): boolean {
  const p = getStoredProgress();
  const idx = p.bookmarkedQuestionIds.indexOf(questionId);
  let isBookmarked = false;
  if (idx >= 0) {
    p.bookmarkedQuestionIds.splice(idx, 1);
  } else {
    p.bookmarkedQuestionIds.push(questionId);
    isBookmarked = true;
  }
  saveProgress(p);
  return isBookmarked;
}

export function removeMistake(questionId: string): void {
  const p = getStoredProgress();
  p.mistakeIds = p.mistakeIds.filter(id => id !== questionId);
  saveProgress(p);
}

export function addTopicToRevision(topicId: string, daysAhead: number = 1): void {
  const p = getStoredProgress();
  const nextDate = new Date(Date.now() + daysAhead * 86400000).toISOString().split('T')[0];
  p.revisionTopics[topicId] = {
    nextReviewDate: nextDate,
    stage: p.revisionTopics[topicId]?.stage ? p.revisionTopics[topicId].stage + 1 : 1
  };
  saveProgress(p);
}

export function recordMockScore(score: number, total: number, accuracy: number, durationSeconds: number): void {
  const p = getStoredProgress();
  p.mockScores.push({
    date: new Date().toISOString().split('T')[0],
    score,
    total,
    accuracy,
    durationSeconds
  });
  saveProgress(p);
}

export function getStoredLanguage(): 'en' | 'hi' {
  try {
    return (localStorage.getItem('upsssc_pet_lang') as 'en' | 'hi') || 'hi';
  } catch {
    return 'hi';
  }
}

export function saveStoredLanguage(lang: 'en' | 'hi'): void {
  try {
    localStorage.setItem('upsssc_pet_lang', lang);
  } catch {}
}

export function getStoredTheme(): Theme {
  try {
    return (localStorage.getItem(THEME_KEY) as Theme) || 'light';
  } catch {
    return 'light';
  }
}

export function saveStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
