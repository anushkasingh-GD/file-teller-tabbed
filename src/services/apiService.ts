
// API Service for communicating with the Python backend

export interface Test {
  id: string;
  name: string;
  description?: string;
  url: string;
}

export interface TestResult {
  id: string;
  test_id: string;
  status: string;
  duration: string;
  url: string;
  error?: string;
  created_at: string;
}

export interface Report {
  id: string;
  total_tests: number;
  passed_tests: number;
  pass_rate: number;
  run_date: string;
  results: TestResult[];
}

const API_URL = 'http://localhost:8000/api';

class ApiService {
  // Tests
  async getTests(): Promise<Test[]> {
    const response = await fetch(`${API_URL}/tests`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tests: ${response.statusText}`);
    }
    return response.json();
  }

  async getTest(testId: string): Promise<Test> {
    const response = await fetch(`${API_URL}/tests/${testId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch test: ${response.statusText}`);
    }
    return response.json();
  }

  async runTest(testId: string): Promise<{ id: string; status: string }> {
    const response = await fetch(`${API_URL}/tests/${testId}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to run test: ${response.statusText}`);
    }
    
    return response.json();
  }

  async completeTest(testId: string): Promise<{ result_id: string; status: string }> {
    const response = await fetch(`${API_URL}/tests/${testId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to complete test: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Reports
  async getReports(): Promise<Report[]> {
    const response = await fetch(`${API_URL}/reports`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reports: ${response.statusText}`);
    }
    return response.json();
  }

  async getReport(reportId: string): Promise<Report> {
    const response = await fetch(`${API_URL}/reports/${reportId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch report: ${response.statusText}`);
    }
    return response.json();
  }

  async generateReport(): Promise<{ report_id: string }> {
    const response = await fetch(`${API_URL}/reports/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to generate report: ${response.statusText}`);
    }
    
    return response.json();
  }
}

export const apiService = new ApiService();
export default apiService;
