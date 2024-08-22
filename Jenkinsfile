pipeline {
    agent any


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
                     docker.withRegistry('https://index.docker.io/v1/', 'aba091eb-3857-489f-8115-2993e248f42c') {
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
