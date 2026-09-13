import os
import sys
import uvicorn

# Ensure stdin doesn't terminate background processes on Windows
try:
    if sys.platform == "win32":
        sys.stdin = open(os.devnull, "r")
except Exception:
    pass

if __name__ == "__main__":
    config = uvicorn.Config(
        "backend.app.main:app",
        host="127.0.0.1",
        port=8001,
        reload=True,
        log_level="info",
        access_log=True
    )
    server = uvicorn.Server(config)
    server.run()
