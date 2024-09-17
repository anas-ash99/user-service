pipeline {
    agent any
    environment {
        // Replace these with your Docker Hub credentials and repository info
        DOCKER_HUB_CREDENTIALS = 'aba091eb-3857-489f-8115-2993e248f42c'
        DOCKER_HUB_REPO = 'aashraf756/user-service'
        IMAGE_TAG = "v1.0.7" // or use env.BUILD_NUMBER or another unique identifier
        MANIFEST_REPO = "https://github.com/anas-ash99/manifest"
        MANIFEST_REPO_NAME = "manifest"
        DEPLOYMENT_FILE_PATH = "overlys\\dev\\user-service"
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
                    docker.withRegistry('', DOCKER_HUB_CREDENTIALS) { // login into dockerhub
                        echo 'Pushing docker image...'
                        bat "docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Update Kubernetes Manifest') {
            steps {
                echo 'Updating manifest ...'
                script {
                    // Apply Kubernetes manifests
                    bat """
                       git pull
                       cd ${MANIFEST_REPO_NAME}
                       (Get-Content -Path "${DEPLOYMENT_FILE_PATH}\\deployment.yaml") -replace '${DOCKER_HUB_REPO}:.*', "${DOCKER_HUB_REPO}:${IMAGE_TAG}" | Set-Content -Path "${DEPLOYMENT_FILE_PATH }\\deployment.yaml"
                    """
                }
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
