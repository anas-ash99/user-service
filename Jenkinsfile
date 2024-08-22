pipeline {
    agent any
    environment {
        // Replace these with your Docker Hub credentials and repository info
        DOCKER_HUB_CREDENTIALS = 'aba091eb-3857-489f-8115-2993e248f42c'
        DOCKER_HUB_REPO = 'aashraf756/user-service'
        IMAGE_TAG = "latest" // or use env.BUILD_NUMBER or another unique identifier
        AWS_REGION = 'eu-central-1'
        EKS_CLUSTER_NAME = 'meal-movers'
        AWS_CREDENTIALS_ID = 'fffabdc8-71cd-4530-9477-2eb9d487dc70'
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
        stage('Deploy to AWS EKS') {
            steps {
                echo 'Deploying application...'
                script {
                    // Configure AWS credentials
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                                    credentialsId: AWS_CREDENTIALS_ID]]) {

                        // Update kubeconfig to use the EKS cluster
                        bat """
                            aws eks --region ${AWS_REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}
                        """

                        // Apply Kubernetes manifests
                        bat """
                            kubectl apply -f k8s/deployment.yaml
                            kubectl apply -f k8s/service.yaml
                        """
                   }
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
