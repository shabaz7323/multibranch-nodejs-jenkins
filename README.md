# Multi-Branch CI/CD for GitHub — Node.js Sample (Express + Jest)

This repository is a ready-to-run sample for **Project 6: Multi-Branch Pipeline for GitHub** using Jenkins.
It includes:
- Simple Express app
- Jest unit tests
- Dockerfile
- `Jenkinsfile` for Jenkins Multibranch Pipeline (declarative)
- `.github/workflows` example (optional)
- README, .gitignore, and setup instructions

## Branch behavior
The `Jenkinsfile` uses the `BRANCH_NAME` environment variable to vary behavior:
- `main` or `master`: run tests, build Docker image, (optionally) push to registry, and tag as `latest`
- `develop`: run tests and build image with `develop` tag
- `feature/*` branches: run tests only

## Quick start (local)
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Start app:
   ```bash
   npm start
   ```
5. Build Docker image:
   ```bash
   docker build -t sample-nodejs-app:local .
   ```

## Jenkins Multibranch Pipeline setup
1. Create a new **Multibranch Pipeline** job in Jenkins.
2. Point the repository to this GitHub repo URL.
3. Configure credentials (if private repo).
4. Under *Scan Multibranch Pipeline Triggers* enable periodic scan or use GitHub webhooks.
5. Ensure Jenkins has Docker (or Docker-in-Docker) available if you plan to build images.

### GitHub webhook (recommended)
- Go to your GitHub repo → Settings → Webhooks → Add webhook
- Payload URL: `https://<jenkins-host>/github-webhook/` (or use GitHub App integration)
- Content type: `application/json`
- Select events: `Push` and `Pull requests`

## Files of interest
- `Jenkinsfile` — pipeline (branch-aware)
- `Dockerfile` — containerize sample app
- `app/` — Express app
- `test/` — Jest tests

## Notes
- This sample does not push to a Docker registry by default. Edit the Jenkins credentials and registry step if you want to push images.
- For production-ready pipelines, add security, artifact storage (Nexus/Artifactory), and proper credential handling.

Enjoy — you can download the ZIP from this session and push it to a GitHub repository to test with Jenkins.
