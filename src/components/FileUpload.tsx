
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, className }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
      toast.success('File uploaded successfully');
      
      // Reset input value to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
      toast.success('File uploaded successfully');
    }
  };

  return (
    <div
      className={className}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Button
        onClick={handleClick}
        className={`transition-all duration-300 ease-in-out flex items-center gap-2 py-2 px-4 rounded-md ${
          isDragging 
            ? 'bg-opacity-80 shadow-lg' 
            : 'hover:bg-opacity-90 hover:shadow-md'
        }`}
      >
        <Upload className="h-5 w-5" />
        <span>File Upload</span>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
