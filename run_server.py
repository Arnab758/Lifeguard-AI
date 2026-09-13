import uvicorn
import sys

if __name__ == "__main__":
    # Run uvicorn without stdin dependency
    uvicorn.run(
        "backend.app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=False,
        log_level="info"
    )
