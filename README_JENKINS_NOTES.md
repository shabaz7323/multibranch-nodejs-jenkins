## Jenkins Notes & Tips

- Use a Jenkins agent that has Docker installed if you want to build Docker images.
- To run Docker inside Jenkins safely, prefer using a dedicated Docker agent or cloud agent with Docker preinstalled.
- For private Docker registries, create Jenkins credentials of type "Username with password" and set `credentialsId` in the Jenkinsfile.
- If you use GitHub App integration, Jenkins can automatically receive repository events and trigger Multibranch scans.
- To add branch-specific behavior, you can create `Jenkinsfile` variations in branches or use `when { branch 'feature/*' }`.
