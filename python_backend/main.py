
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uuid
from datetime import datetime
from pydantic import BaseModel
import time
import random

app = FastAPI(title="Test Runner API")

# Configure CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TestBase(BaseModel):
    id: str
    name: str

class Test(TestBase):
    description: Optional[str] = None
    url: str

class TestStatus(BaseModel):
    id: str
    test_id: str
    status: str  # "running", "completed", "failed"
    started_at: datetime
    completed_at: Optional[datetime] = None

class TestResult(BaseModel):
    id: str
    test_id: str
    status: str  # "passed", "failed"
    duration: str
    url: str
    error: Optional[str] = None
    created_at: datetime

class Report(BaseModel):
    id: str
    total_tests: int
    passed_tests: int
    pass_rate: int
    run_date: datetime
    results: List[TestResult]

# In-memory data store (would be replaced by a database in production)
tests = [
    Test(id="test1", name="Test 1", description="Homepage test", url="https://example.com"),
    Test(id="test2", name="Test 2", description="Login test", url="https://google.com"),
    Test(id="test3", name="Test 3", description="Checkout test", url="https://bing.com"),
]

test_statuses = []
test_results = []
reports = []

@app.get("/")
def read_root():
    return {"message": "Welcome to Test Runner API"}

@app.get("/api/tests", response_model=List[Test])
def get_tests():
    return tests

@app.get("/api/tests/{test_id}", response_model=Test)
def get_test(test_id: str):
    for test in tests:
        if test.id == test_id:
            return test
    raise HTTPException(status_code=404, detail="Test not found")

@app.post("/api/tests/{test_id}/run", response_model=TestStatus)
def run_test(test_id: str):
    # Find the test
    test = None
    for t in tests:
        if t.id == test_id:
            test = t
            break
    if test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    
    # Create a new test status
    status_id = str(uuid.uuid4())
    status = TestStatus(
        id=status_id,
        test_id=test_id,
        status="running",
        started_at=datetime.now()
    )
    test_statuses.append(status)
    
    # Simulate running a test in the background
    # Note: In a real app, you'd use background tasks or Celery
    # For now, we'll just pretend it takes a few seconds
    
    # Return the status immediately (the test is "running")
    return status

@app.get("/api/tests/{test_id}/status", response_model=TestStatus)
def get_test_status(test_id: str):
    # Find the latest status for this test
    for status in reversed(test_statuses):
        if status.test_id == test_id:
            return status
    raise HTTPException(status_code=404, detail="Test status not found")

@app.get("/api/reports", response_model=List[Report])
def get_reports():
    return reports

@app.get("/api/reports/{report_id}", response_model=Report)
def get_report(report_id: str):
    for report in reports:
        if report.id == report_id:
            return report
    raise HTTPException(status_code=404, detail="Report not found")

@app.post("/api/reports/generate")
def generate_report():
    # Simulate generating a report from test results
    report_id = str(uuid.uuid4())
    now = datetime.now()
    
    # For demonstration, we'll create mock results if none exist
    if not test_results:
        test_results.extend([
            TestResult(
                id=str(uuid.uuid4()),
                test_id="test1",
                status="passed",
                duration="1.2s",
                url="https://example.com",
                created_at=now
            ),
            TestResult(
                id=str(uuid.uuid4()),
                test_id="test2",
                status="failed",
                duration="0.8s",
                url="https://google.com",
                error="Expected element to be visible but it was not found",
                created_at=now
            ),
            TestResult(
                id=str(uuid.uuid4()),
                test_id="test3",
                status="passed",
                duration="2.1s",
                url="https://bing.com",
                created_at=now
            )
        ])
    
    # Create a report from the results
    total = len(test_results)
    passed = sum(1 for r in test_results if r.status == "passed")
    pass_rate = int((passed / total) * 100) if total > 0 else 0
    
    report = Report(
        id=report_id,
        total_tests=total,
        passed_tests=passed,
        pass_rate=pass_rate,
        run_date=now,
        results=test_results
    )
    
    reports.append(report)
    return {"report_id": report_id}

# Helper endpoint to simulate completing a test (for demo purposes)
@app.post("/api/tests/{test_id}/complete")
def complete_test(test_id: str):
    # Find the running status
    status = None
    for s in reversed(test_statuses):
        if s.test_id == test_id and s.status == "running":
            status = s
            break
    
    if status is None:
        raise HTTPException(status_code=404, detail="No running test found")
    
    # Randomly decide if the test passed or failed
    passed = random.choice([True, True, False])  # 2/3 chance of passing
    status.status = "completed"
    status.completed_at = datetime.now()
    
    # Create a test result
    result_id = str(uuid.uuid4())
    test = None
    for t in tests:
        if t.id == test_id:
            test = t
            break
    
    if test is None:
        raise HTTPException(status_code=404, detail="Test not found")
    
    duration = f"{random.uniform(0.5, 3.0):.1f}s"
    result = TestResult(
        id=result_id,
        test_id=test_id,
        status="passed" if passed else "failed",
        duration=duration,
        url=test.url,
        error="Expected element to be visible but it was not found" if not passed else None,
        created_at=datetime.now()
    )
    
    test_results.append(result)
    return {"result_id": result_id, "status": "passed" if passed else "failed"}
