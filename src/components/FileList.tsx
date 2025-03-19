
import React from 'react';
import { File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slide } from './transitions';

interface FileListProps {
  files: Array<{ id: string; name: string }>;
  selectedFileId: string | null;
  onFileSelect: (fileId: string) => void;
  className?: string;
}

const FileList: React.FC<FileListProps> = ({
  files,
  selectedFileId,
  onFileSelect,
  className,
}) => {
  return (
    <div className={cn("space-y-1 animate-fade-in", className)}>
      {files.length === 0 ? (
        <div className="text-muted-foreground text-sm py-4 px-2 text-center">
          No files uploaded yet
        </div>
      ) : (
        <ul className="space-y-1">
          {files.map((file, index) => (
            <Slide 
              key={file.id}
              show={true}
              direction="left"
              duration={300 + index * 50}
            >
              <li
                onClick={() => onFileSelect(file.id)}
                className={cn(
                  "file-item group flex items-center gap-2 py-2 px-3 rounded-md text-sm",
                  selectedFileId === file.id
                    ? "bg-app-light-gray text-app-blue"
                    : "hover:bg-app-light-gray/50"
                )}
              >
                <File className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="truncate">{file.name}</span>
              </li>
            </Slide>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
