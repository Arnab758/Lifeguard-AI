import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "LifeGuard Agent"
    VERSION: str = "1.0.0"
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    # AWS Bedrock Configuration (Primary Hackathon Provider)
    AWS_REGION: str = os.getenv("AWS_DEFAULT_REGION", os.getenv("AWS_REGION", "us-east-1"))
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    BEDROCK_MODEL_ID: str = os.getenv("BEDROCK_MODEL_ID", "anthropic.claude-3-5-sonnet-20241022-v2:0")

    # Fallback model keys
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

    # Execution Mode: "BEDROCK", "GEMINI", "OPENAI", or "HIGH_FIDELITY_SANDBOX"
    EXECUTION_MODE: str = os.getenv("EXECUTION_MODE", "HIGH_FIDELITY_SANDBOX")

    # HITL Guardrails
    MANDATORY_HITL_THRESHOLD_USD: float = float(os.getenv("MANDATORY_HITL_THRESHOLD_USD", "10.0"))

settings = Settings()
