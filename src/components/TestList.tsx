
import React from 'react';
import { cn } from '@/lib/utils';
import { Slide } from './transitions';

interface Test {
  id: string;
  name: string;
}

interface TestListProps {
  tests: Test[];
  selectedTestId: string | null;
  onTestSelect: (testId: string) => void;
  className?: string;
}

const TestList: React.FC<TestListProps> = ({
  tests,
  selectedTestId,
  onTestSelect,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {tests.length === 0 ? (
        <div className="text-muted-foreground text-sm py-4 px-2 text-center">
          No tests available
        </div>
      ) : (
        <ul className="space-y-1.5">
          {tests.map((test, index) => (
            <Slide
              key={test.id}
              show={true}
              direction="right"
              duration={300 + index * 50}
            >
              <li
                onClick={() => onTestSelect(test.id)}
                className={cn(
                  "test-item group flex items-center py-1.5 px-3 rounded-md text-sm cursor-pointer",
                  selectedTestId === test.id
                    ? "bg-app-light-gray text-app-blue pl-6"
                    : "hover:bg-app-light-gray/50 pl-6 hover:pl-6"
                )}
              >
                <span className="truncate">{test.name}</span>
              </li>
            </Slide>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestList;
