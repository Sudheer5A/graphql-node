pipeline {
    agent any
    
    environment {
        // Define your Docker image name
        IMAGE_NAME = "node:16.0.0-alpine"  // Replace with your image name
        CONTAINER_NAME = "books-app"  // Container name for running your app
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh '''
                    docker build -t ${IMAGE_NAME} -f Dockerfile .
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove the existing container if it's running
                    sh '''
                    if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                    fi
                    '''

                    // Run a new container from the built image using PM2
                    sh '''
                    docker run -d --name ${CONTAINER_NAME} -p 3000:3000 -p 5001:5001 ${IMAGE_NAME}
                    '''
                }
            }
        }
    }
}
