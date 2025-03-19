
import React, { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';
import EmbeddedWindow from '@/components/EmbeddedWindow';
import TabNavigation from '@/components/TabNavigation';
import TestList from '@/components/TestList';
import ReportView from '@/components/ReportView';
import { Scale, Fade } from '@/components/transitions';
import { useIsMobile } from '@/hooks/use-mobile';

const tabs = [
  { id: 'tests', label: 'Tests' },
  { id: 'report', label: 'Report' },
];

const sampleTests = [
  { id: 'test1', name: 'Test 1' },
  { id: 'test2', name: 'Test 2' },
  { id: 'test3', name: 'Test 3' },
];

// This would be replaced with actual Playwright test URLs
const testUrls = {
  test1: 'https://example.com/test1',
  test2: 'https://example.com/test2',
  test3: 'https://example.com/test3',
};

const Index = () => {
  const [files, setFiles] = useState<Array<{ id: string; name: string; content?: string }>>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('tests');
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [testRunning, setTestRunning] = useState(false);
  const [testUrl, setTestUrl] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleFileUpload = (file: File) => {
    const fileId = Date.now().toString();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFiles((prev) => [
        ...prev,
        { 
          id: fileId, 
          name: file.name,
          content,
        },
      ]);
      
      // Auto-select the uploaded file
      setSelectedFileId(fileId);
    };
    
    reader.readAsText(file);
  };

  const handleFileSelect = (fileId: string) => {
    // Only allow file selection when no test is running
    if (!testRunning) {
      setSelectedFileId(fileId);
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTestSelect = (testId: string) => {
    setSelectedTestId(testId);
  };

  const handleTestRun = (testId: string) => {
    // This would be replaced with actual Playwright test execution logic
    setTestRunning(true);
    setTestUrl(testUrls[testId as keyof typeof testUrls]);
    
    // Clear selected file when running a test
    setSelectedFileId(null);
    
    // For demo purposes, we'll stop the "test" after 30 seconds
    setTimeout(() => {
      setTestRunning(false);
      setTestUrl(null);
    }, 30000);
  };

  // Layout adjustments based on screen size
  const containerClasses = isMobile
    ? "flex flex-col space-y-6 p-4"
    : "grid grid-cols-[250px_1fr_250px] gap-6 p-6 h-screen";

  const fileListClasses = isMobile
    ? "mt-4"
    : "h-[calc(100vh-130px)] overflow-y-auto pr-2";

  const embeddedWindowClasses = isMobile
    ? "h-[400px]"
    : "h-[calc(100vh-40px)]";

  return (
    <Scale show={true} duration={500} className="antialiased">
      <div className={containerClasses}>
        {/* Left Panel - File Upload & List */}
        <div className="flex flex-col">
          <FileUpload onFileUpload={handleFileUpload} className="mb-4" />
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Files</h3>
          <FileList
            files={files}
            selectedFileId={selectedFileId}
            onFileSelect={handleFileSelect}
            className={fileListClasses}
          />
        </div>

        {/* Middle Panel - Embedded Window */}
        <EmbeddedWindow 
          selectedFile={selectedFile}
          testRunning={testRunning}
          testUrl={testUrl || undefined}
          className={embeddedWindowClasses}
        />

        {/* Right Panel - Tabs */}
        <div className="flex flex-col">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            className="mb-4 border-b"
          />
          
          <div className="flex-1 overflow-hidden">
            <Fade show={activeTab === 'tests'} className="h-full">
              {activeTab === 'tests' && (
                <TestList
                  tests={sampleTests}
                  selectedTestId={selectedTestId}
                  onTestSelect={handleTestSelect}
                  onTestRun={handleTestRun}
                  className="h-full overflow-y-auto pr-2"
                />
              )}
            </Fade>
            
            <Fade show={activeTab === 'report'} className="h-full">
              {activeTab === 'report' && (
                <ReportView className="h-full overflow-y-auto pr-2" />
              )}
            </Fade>
          </div>
        </div>
      </div>
    </Scale>
  );
};

export default Index;
