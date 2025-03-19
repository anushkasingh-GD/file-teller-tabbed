
import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface Test {
  id: string;
  name: string;
}

interface TestListProps {
  tests: Test[];
  selectedTestId: string | null;
  onTestSelect: (testId: string) => void;
  onTestRun?: (testId: string) => void;
  className?: string;
}

const TestList: React.FC<TestListProps> = ({
  tests,
  selectedTestId,
  onTestSelect,
  onTestRun,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {tests.map((test) => (
        <div
          key={test.id}
          className={cn(
            "group flex items-center justify-between p-2 rounded-md transition-colors duration-200 hover:bg-muted test-item",
            selectedTestId === test.id
              ? "bg-muted"
              : "bg-transparent"
          )}
        >
          <button
            onClick={() => onTestSelect(test.id)}
            className="flex-1 text-left text-sm"
          >
            {test.name}
          </button>
          
          {onTestRun && (
            <button
              onClick={() => onTestRun(test.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-muted-foreground/10"
              title="Run test"
            >
              <Play className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TestList;
