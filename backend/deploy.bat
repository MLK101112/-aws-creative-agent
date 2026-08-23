@echo off
echo ============================================================
echo   Deploying NovaChronicles to AWS via AWS SAM CLI
echo ============================================================

REM Check if AWS SAM CLI is installed
sam --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] AWS SAM CLI is not installed or not in PATH.
    echo Please install AWS SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
    exit /b 1
)

echo [1/3] Validating SAM template...
sam validate --template template.yaml

echo [2/3] Building serverless artifacts...
sam build --template template.yaml

echo [3/3] Deploying CloudFormation stack to AWS...
sam deploy --guided

echo ============================================================
echo   NovaChronicles Autonomous Agent Deployed Successfully!
echo ============================================================
