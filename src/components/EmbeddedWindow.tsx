
import React from 'react';
import { cn } from '@/lib/utils';
import { Scale } from './transitions';

interface EmbeddedWindowProps {
  selectedFile: { id: string; name: string; content?: string } | null;
  className?: string;
}

const EmbeddedWindow: React.FC<EmbeddedWindowProps> = ({
  selectedFile,
  className,
}) => {
  const [showContent, setShowContent] = React.useState(false);
  
  React.useEffect(() => {
    setShowContent(false);
    const timer = setTimeout(() => {
      if (selectedFile) {
        setShowContent(true);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedFile]);

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
            {selectedFile ? selectedFile.name : 'Embedded Window'}
          </h3>
        </div>
        
        <div className="flex-1 p-6 overflow-auto relative">
          {selectedFile ? (
            <Scale show={showContent}>
              <div className="prose prose-sm max-w-none">
                {selectedFile.content || (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-muted-foreground text-center">
                      No content to display for this file.
                    </p>
                  </div>
                )}
              </div>
            </Scale>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground">
                Select a file to view its content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmbeddedWindow;
