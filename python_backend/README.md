
# Test Runner Backend

This is the Python backend for the Test Runner application. It provides APIs for running tests and generating test reports.

## Setup

1. Install requirements:
```
pip install -r requirements.txt
```

2. Run the server:
```
uvicorn main:app --reload
```

## API Endpoints

- `GET /api/tests` - Get all available tests
- `GET /api/tests/{test_id}` - Get a specific test
- `POST /api/tests/{test_id}/run` - Run a specific test
- `GET /api/reports` - Get all test reports
- `GET /api/reports/{report_id}` - Get a specific test report
