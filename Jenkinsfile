pipeline {
  agent any
  environment {
    IMAGE_NAME = "sample-nodejs-app"
    DOCKER_REGISTRY = "" // set if you plan to push, e.g. "docker.io/youruser"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
        echo "Running on branch: ${env.BRANCH_NAME}"
      }
    }
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
        junit '**/coverage/junit.xml' // optional if you produce junit reports
      }
    }
    stage('Build Docker') {
      when {
        anyOf {
          branch 'main'
          branch 'master'
          branch 'develop'
        }
      }
      steps {
        script {
          def tag = env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master' ? 'latest' : env.BRANCH_NAME
          sh "docker build -t ${IMAGE_NAME}:${tag} ."
        }
      }
    }
    stage('Push Docker') {
      when {
        expression { return env.DOCKER_REGISTRY?.trim() }
      }
      steps {
        script {
          def tag = env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master' ? 'latest' : env.BRANCH_NAME
          sh "docker tag ${IMAGE_NAME}:${tag} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${tag}"
          withCredentials([usernamePassword(credentialsId: 'docker-registry-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh "echo $DOCKER_PASS | docker login ${DOCKER_REGISTRY} -u $DOCKER_USER --password-stdin"
            sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${tag}"
          }
        }
      }
    }
  }
  post {
    always {
      sh 'docker images || true'
      archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
    }
    success {
      echo 'Build succeeded'
    }
    failure {
      echo 'Build failed'
    }
  }
}
