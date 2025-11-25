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
                bat 'npm run build || echo No build script found'
            }
        }
    }

    post {
        success {
            echo "Build completed successfully"
        }
        failure {
            echo "Build failed!"
        }
    }
}
