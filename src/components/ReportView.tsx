
import React from 'react';
import { cn } from '@/lib/utils';
import { Scale } from './transitions';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

interface ReportViewProps {
  className?: string;
}

const ReportView: React.FC<ReportViewProps> = ({ className }) => {
  // Mock test results data
  const testResults = [
    { id: 'test1', name: 'Test 1', status: 'passed', duration: '1.2s', url: 'https://example.com' },
    { id: 'test2', name: 'Test 2', status: 'failed', duration: '0.8s', url: 'https://google.com', error: 'Expected element to be visible but it was not found' },
    { id: 'test3', name: 'Test 3', status: 'passed', duration: '2.1s', url: 'https://bing.com' },
  ];

  // Calculate summary statistics
  const totalTests = testResults.length;
  const passedTests = testResults.filter(test => test.status === 'passed').length;
  const failedTests = testResults.filter(test => test.status === 'failed').length;
  const passRate = Math.round((passedTests / totalTests) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <Scale show={true} className={cn("p-4", className)}>
      <div className="bg-white rounded-lg p-6 shadow-sm border space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Test Report</h3>
          <p className="text-muted-foreground text-sm">
            Run completed on {new Date().toLocaleString()}
          </p>
        </div>
        
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-muted-foreground text-xs uppercase font-medium">Total Tests</p>
            <p className="text-2xl font-bold">{totalTests}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-muted-foreground text-xs uppercase font-medium">Passed</p>
            <p className="text-2xl font-bold text-green-600">{passedTests}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-muted-foreground text-xs uppercase font-medium">Failed</p>
            <p className="text-2xl font-bold text-red-600">{failedTests}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-muted-foreground text-xs uppercase font-medium">Pass Rate</p>
            <p className="text-2xl font-bold">{passRate}%</p>
          </div>
        </div>
        
        {/* Test details */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testResults.map((test) => (
                <TableRow key={test.id} className={test.status === 'failed' ? 'bg-red-50/50' : undefined}>
                  <TableCell>{getStatusIcon(test.status)}</TableCell>
                  <TableCell className="font-medium">
                    {test.name}
                    {test.status === 'failed' && (
                      <p className="text-xs text-red-500 mt-1">{test.error}</p>
                    )}
                  </TableCell>
                  <TableCell>{test.duration}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{test.url}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Scale>
  );
};

export default ReportView;
