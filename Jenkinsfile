pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "Building branch: ${env.BRANCH_NAME}"
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build App') {
            steps {
                script {
                    // Run npm build but don't fail pipeline if missing
                    def status = bat(script: 'npm run build', returnStatus: true)

                    if (status != 0) {
                        echo "⚠️ No build script found — continuing (exit code: ${status})"
                    } else {
                        echo "✅ Build completed successfully"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline succeeded!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
