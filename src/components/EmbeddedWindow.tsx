
import React from 'react';
import { cn } from '@/lib/utils';
import { Scale } from './transitions';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';
import { Loader } from 'lucide-react';

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

  console.log("Test running:", testRunning);
  console.log("Test URL:", testUrl);
  console.log("Show content:", showContent);
  console.log("Loading:", loading);

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300 flex flex-col",
        className
      )}
    >
      <div className="bg-app-light-gray/50 px-4 py-2.5 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          {testRunning 
            ? 'Test Browser' 
            : (selectedFile ? selectedFile.name : 'Loading Preview...')}
        </h3>
      </div>
      
      <div className="flex-1 p-0 relative w-full h-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
            <div className="animate-spin">
              <Loader className="h-10 w-10 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Planner agent is working, or generating queries...
            </p>
          </div>
        ) : testRunning && testUrl ? (
          <div className="w-full h-full absolute inset-0">
            <iframe 
              src={testUrl}
              className="w-full h-full border-0"
              style={{ 
                width: '100%', 
                height: '100%', 
                display: 'block'
              }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              title="Test Browser"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-muted-foreground">
              {selectedFile ? 'Preview not available' : 'Select a file or run a test to see preview'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbeddedWindow;
