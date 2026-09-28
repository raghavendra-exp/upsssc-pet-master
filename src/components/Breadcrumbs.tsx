import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

interface Props {
  items: BreadcrumbItem[];
  onNavigate: (route: string) => void;
}

export const Breadcrumbs: React.FC<Props> = ({ items, onNavigate }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full overflow-x-auto no-scrollbar py-2.5 px-3 sm:px-4 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs mb-4"
    >
      <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap min-w-max">
        <li className="inline-flex items-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer py-1"
            title="Go to Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.route ? (
                <span className="font-semibold text-slate-900 dark:text-white max-w-[200px] truncate" title={item.label}>
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.route!)}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors cursor-pointer max-w-[180px] truncate py-1"
                  title={item.label}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
