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
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build || echo "No build script defined"'
            }
        }
    }

    post {
        success {
            echo "Build completed successfully on branch ${env.BRANCH_NAME}"
        }
        failure {
            echo "Build FAILED on branch ${env.BRANCH_NAME}"
        }
    }
}
