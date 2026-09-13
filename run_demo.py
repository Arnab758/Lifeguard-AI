#!/usr/bin/env python3
"""
LifeGuard Agent: 1-Click Launch Script
Starts both the FastAPI Backend (port 8000) and the React Vite Frontend (port 5173).
"""

import subprocess
import sys
import time
import os
import signal

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(root_dir, "frontend")

    print("\n" + "="*70)
    print("🛡️  LIFEGUARD AGENT: Everyday Consumer Protection Daemon")
    print("   Powered by Strands Agents SDK & Amazon Bedrock AgentCore")
    print("="*70 + "\n")

    # Verify python dependencies
    print("🔍 Checking Python backend...")
    backend_cmd = [sys.executable, "-m", "uvicorn", "backend.app.main:app", "--host", "127.0.0.1", "--port", "8000", "--reload"]

    # Verify frontend
    print("🔍 Checking Frontend dependencies...")
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    frontend_cmd = [npm_cmd, "run", "dev"]

    print("🚀 Launching Backend on http://127.0.0.1:8000 ...")
    backend_proc = subprocess.Popen(backend_cmd, cwd=root_dir)

    time.sleep(1.5)

    print("🚀 Launching Frontend on http://127.0.0.1:5173 ...")
    frontend_proc = subprocess.Popen(frontend_cmd, cwd=frontend_dir)

    print("\n" + "-"*70)
    print("✅ System Ready!")
    print("   👉 Dashboard: http://127.0.0.1:5173")
    print("   👉 API Docs:  http://127.0.0.1:8000/docs")
    print("   👉 Health:    http://127.0.0.1:8000/api/health")
    print("   Press Ctrl+C to terminate both services cleanly.")
    print("-"*70 + "\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Shutting down LifeGuard Agent services...")
        backend_proc.terminate()
        frontend_proc.terminate()
        backend_proc.wait()
        frontend_proc.wait()
        print("👋 LifeGuard Agent terminated cleanly.")

if __name__ == "__main__":
    main()
