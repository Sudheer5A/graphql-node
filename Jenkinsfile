pipeline {
    agent any	
    tools {nodejs "nodejs"}
	environment {
        NVM_DIR = "/home/ec2-user/.nvm"  // Adjust based on your user directory
        PATH = "${NVM_DIR}/versions/node/v16.20.2/bin:${env.PATH}"
        IMAGE_NAME = "node:16.0.0-appline"  // Replace with your image name
        CONTAINER_NAME = "books-app"  // Container name for running your app
    }
    stages {
        stage('Build') {
            steps {
	      dir('server'){
                sh 'npm install'
                 sh '''
                    docker build -t ${IMAGE_NAME} -f Dockerfile .
                    '''
		 }
            }
        }
        stage('Deploy') {
            steps {
                // Copy files to the deployment directory
		sh 'sudo cp -r ./client/* /usr/share/nginx/html'
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