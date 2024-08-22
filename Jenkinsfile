pipeline {
    agent any
    environment {
        // Replace these with your Docker Hub credentials and repository info
        DOCKER_HUB_CREDENTIALS = 'aba091eb-3857-489f-8115-2993e248f42c'
        DOCKER_HUB_REPO = 'aashraf756/user-service'
        IMAGE_TAG = "latest" // or use env.BUILD_NUMBER or another unique identifier
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
             steps {
                 script {
                     bat "docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} ."
                 }
             }
         }
         stage('Push Docker Image') {
             steps {
                 script {
                     docker.withRegistry('', DOCKER_HUB_CREDENTIALS) {
                         dockerImage.push()
                     }
                 }
             }
         }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'

            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'

        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
