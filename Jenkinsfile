pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = 'aashraf756'
        IMAGE_NAME = 'user-service'
        IMAGE_TAG = 'latest'
        KUBE_CONFIG = credentials('kubeconfig') // If using Jenkins credentials plugin
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
                     dockerImage = docker.build("your-image-name:latest")
                 }
             }
         }
         stage('Push Docker Image') {
             steps {
                 script {
                     docker.withRegistry('https://index.docker.io/v1/', 'docker-credentials-id') {
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
            cleanWs()
        }
        success {
            echo 'Build and deployment succeeded!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
