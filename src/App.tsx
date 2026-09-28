import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Breadcrumbs, BreadcrumbItem } from './components/Breadcrumbs';
import { SearchModal } from './components/SearchModal';
import { StudyPlanModal } from './components/StudyPlanModal';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { SyllabusView } from './views/SyllabusView';
import { SubjectDetailView } from './views/SubjectDetailView';
import { TopicDetailView } from './views/TopicDetailView';
import { BooksView } from './views/BooksView';
import { PracticeView } from './views/PracticeView';
import { MockView } from './views/MockView';
import { PYQView } from './views/PYQView';
import { PassageViewer } from './components/PassageViewer';
import { DataInterpretationViewer } from './components/DataInterpretationViewer';
import { CurrentAffairsView } from './views/CurrentAffairsView';
import { UPGKView } from './views/UPGKView';
import { FlashcardViewer } from './components/FlashcardViewer';
import { OneLinersView } from './views/OneLinersView';
import { RevisionView } from './views/RevisionView';
import { MistakesView } from './views/MistakesView';
import { ProgressView } from './views/ProgressView';

import { Language, Theme } from './types';
import { getStoredLanguage, saveStoredLanguage, getStoredTheme, saveStoredTheme, getStoredProgress } from './utils/storage';
import syllabusData from './data/pet-syllabus.json';
import topicsData from './data/topics.json';

export function App() {
  const [lang, setLang] = useState<Language>(getStoredLanguage());
  const [theme, setTheme] = useState<Theme>(getStoredTheme());
  const [route, setRoute] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudyPlanOpen, setIsStudyPlanOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progressState, setProgressState] = useState(getStoredProgress());

  // Synchronize theme with HTML document and meta theme-color
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (t: Theme) => {
      const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0b1120');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#1e3a8a');
      }
    };

    applyTheme(theme);
    saveStoredTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Listen to hash changes for robust GitHub Pages routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      setRoute(hash || 'home');
      window.scrollTo(0, 0);
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Register PWA service worker with auto-update
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        reg.update();
      }).catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
    }
  }, []);

  const navigateTo = (newRoute: string) => {
    window.location.hash = `#/${newRoute}`;
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
    setProgressState(getStoredProgress());
  };

  const toggleLanguage = () => {
    const nextLang: Language = lang === 'hi' ? 'en' : 'hi';
    setLang(nextLang);
    saveStoredLanguage(nextLang);
  };

  // Compute breadcrumbs dynamically based on route
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const parts = route.split('/');
    const main = parts[0];
    const sub = parts[1];

    const trail: BreadcrumbItem[] = [
      { label: 'UPSSSC', route: 'home' },
      { label: 'PET 2026', route: 'dashboard' }
    ];

    if (main === 'home') {
      return [{ label: 'Dashboard', route: 'home' }];
    } else if (main === 'dashboard') {
      trail.push({ label: 'Exam Dashboard' });
    } else if (main === 'syllabus') {
      trail.push({ label: 'Syllabus (15 Subjects)' });
    } else if (main === 'subject') {
      const foundSubject = syllabusData.subjects.find((s) => s.code === sub);
      trail.push({ label: 'Syllabus', route: 'syllabus' });
      trail.push({ label: foundSubject ? (lang === 'hi' ? foundSubject.nameHi : foundSubject.name) : 'Subject' });
    } else if (main === 'topic') {
      const foundTopic = topicsData.find((t) => t.id === sub);
      trail.push({ label: 'Syllabus', route: 'syllabus' });
      if (foundTopic) {
        trail.push({ label: foundTopic.subject, route: 'syllabus' });
        trail.push({ label: lang === 'hi' ? foundTopic.nameHi : foundTopic.name });
      } else {
        trail.push({ label: 'Topic Notes' });
      }
    } else if (main === 'books') {
      trail.push({ label: 'Recommended Books & Resources' });
    } else if (main === 'practice') {
      trail.push({ label: 'Practice Question Bank' });
    } else if (main === 'mock') {
      trail.push({ label: 'Full Mock Test (100 Questions)' });
    } else if (main === 'pyq') {
      trail.push({ label: 'Previous Year Papers (2021–2025)' });
    } else if (main === 'passages') {
      trail.push({ label: 'General Hindi', route: 'syllabus' });
      trail.push({ label: 'Unseen Passage Analysis' });
    } else if (main === 'di') {
      trail.push({ label: 'Data Interpretation (Graphs & Tables)' });
    } else if (main === 'current-affairs') {
      trail.push({ label: 'Current Affairs (National & UP)' });
    } else if (main === 'up-gk') {
      trail.push({ label: 'Uttar Pradesh Special GK & Map' });
    } else if (main === 'flashcards') {
      trail.push({ label: 'Revision', route: 'revision' });
      trail.push({ label: 'Rapid Flashcards' });
    } else if (main === 'one-liners') {
      trail.push({ label: 'Revision', route: 'revision' });
      trail.push({ label: 'One-Liner GK Facts' });
    } else if (main === 'revision') {
      trail.push({ label: 'Today\'s Spaced Revision' });
    } else if (main === 'my-mistakes') {
      trail.push({ label: 'Practice', route: 'practice' });
      trail.push({ label: 'My Mistakes (Error Notebook)' });
    } else if (main === 'progress') {
      trail.push({ label: 'My Performance Analytics' });
    } else {
      trail.push({ label: main });
    }

    return trail;
  };

  // Route Dispatcher
  const renderActiveView = () => {
    const parts = route.split('/');
    const main = parts[0];
    const param = parts[1];

    switch (main) {
      case 'home':
        return <HomeView lang={lang} onNavigate={navigateTo} onOpenStudyPlan={() => setIsStudyPlanOpen(true)} />;
      case 'dashboard':
        return <DashboardView lang={lang} onNavigate={navigateTo} />;
      case 'syllabus':
        return <SyllabusView lang={lang} onNavigate={navigateTo} />;
      case 'subject':
        return <SubjectDetailView subjectCode={param || 'history'} lang={lang} onNavigate={navigateTo} />;
      case 'topic':
        return <TopicDetailView topicId={param || 'TOPIC-HIST-INDUS'} lang={lang} onNavigate={navigateTo} />;
      case 'books':
        return <BooksView lang={lang} onNavigate={navigateTo} />;
      case 'practice':
        return <PracticeView lang={lang} onNavigate={navigateTo} />;
      case 'mock':
        return <MockView lang={lang} onNavigate={navigateTo} />;
      case 'pyq':
        return <PYQView lang={lang} />;
      case 'passages':
        return <PassageViewer lang={lang} />;
      case 'di':
        return <DataInterpretationViewer lang={lang} />;
      case 'current-affairs':
        return <CurrentAffairsView lang={lang} />;
      case 'up-gk':
        return <UPGKView lang={lang} />;
      case 'flashcards':
        return <FlashcardViewer lang={lang} />;
      case 'one-liners':
        return <OneLinersView lang={lang} />;
      case 'revision':
        return <RevisionView lang={lang} onNavigate={navigateTo} />;
      case 'my-mistakes':
        return <MistakesView lang={lang} onNavigate={navigateTo} />;
      case 'progress':
        return <ProgressView lang={lang} onNavigate={navigateTo} />;
      default:
        return <HomeView lang={lang} onNavigate={navigateTo} onOpenStudyPlan={() => setIsStudyPlanOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        activeRoute={route}
        onNavigate={navigateTo}
      />

      {/* Main Container: Sidebar + Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex gap-6 pt-4">
        {/* Persistent Sidebar on Desktop, Drawer on Mobile */}
        <Sidebar
          activeRoute={route}
          onNavigate={navigateTo}
          lang={lang}
          isOpenOnMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          mistakesCount={progressState.mistakeIds.length}
        />

        {/* Main Learning Canvas */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb Navigation on every page */}
          <Breadcrumbs items={getBreadcrumbs()} onNavigate={navigateTo} />

          {/* Active View Content */}
          <div className="min-h-[70vh]">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Fixed Mobile Bottom Navigation */}
      <MobileBottomNav
        activeRoute={route}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        lang={lang}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
        lang={lang}
      />

      {/* Study Plan Generator Modal */}
      <StudyPlanModal
        isOpen={isStudyPlanOpen}
        onClose={() => setIsStudyPlanOpen(false)}
        lang={lang}
      />

      {/* Global Footer */}
      <Footer lang={lang} onNavigate={navigateTo} />
    </div>
  );
}

export default App;
