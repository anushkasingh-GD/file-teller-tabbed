
import React from 'react';
import { cn } from '@/lib/utils';
import { Scale } from './transitions';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';

interface EmbeddedWindowProps {
  selectedFile: { id: string; name: string; content?: string } | null;
  className?: string;
  testRunning?: boolean;
  testUrl?: string;
}

const EmbeddedWindow: React.FC<EmbeddedWindowProps> = ({
  selectedFile,
  className,
  testRunning = false,
  testUrl,
}) => {
  const [showContent, setShowContent] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    setShowContent(false);
    setLoading(true);
    
    const timer = setTimeout(() => {
      if (selectedFile || testRunning) {
        setShowContent(true);
        setLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedFile, testRunning]);

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300",
        className
      )}
    >
      <div className="h-full flex flex-col">
        <div className="bg-app-light-gray/50 px-4 py-2.5 border-b flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            {testRunning 
              ? 'Test Browser' 
              : (selectedFile ? selectedFile.name : 'Loading Preview...')}
          </h3>
        </div>
        
        <div className="flex-1 p-0 overflow-auto relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Progress value={45} className="w-4/5 h-2 mt-4" />
              <p className="text-sm text-muted-foreground mt-4">
                Loading preview...
              </p>
            </div>
          ) : testRunning && testUrl ? (
            <Scale show={showContent}>
              <iframe 
                src={testUrl}
                className="w-full h-full border-0"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                title="Test Browser"
              />
            </Scale>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground">
                {selectedFile ? 'Preview not available' : 'Select a file or run a test to see preview'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmbeddedWindow;
