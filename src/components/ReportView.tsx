
import React from 'react';
import { cn } from '@/lib/utils';
import { Scale } from './transitions';

interface ReportViewProps {
  className?: string;
}

const ReportView: React.FC<ReportViewProps> = ({ className }) => {
  return (
    <Scale show={true} className={cn("p-4", className)}>
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Report</h3>
        <p className="text-muted-foreground text-sm mb-6">
          This is the report view. Reports will be displayed here when available.
        </p>
        
        <div className="space-y-4">
          <div className="h-2 bg-app-light-gray rounded animate-pulse w-3/4" />
          <div className="h-2 bg-app-light-gray rounded animate-pulse w-1/2" />
          <div className="h-2 bg-app-light-gray rounded animate-pulse w-5/6" />
          <div className="h-2 bg-app-light-gray rounded animate-pulse w-2/3" />
        </div>
      </div>
    </Scale>
  );
};

export default ReportView;
