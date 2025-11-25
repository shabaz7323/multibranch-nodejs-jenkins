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

        stage('Lint (Optional)') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit '**/test-results/**/*.xml' // if using Jest junit
                }
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

