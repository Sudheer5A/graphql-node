pipeline {
    agent any	
    tools {nodejs "nodejs"}
    stages {
        stage('Build') {
            steps {
	      dir('server'){
                sh 'npm install'
		 }
            }
        }
        stage('Deploy') {
            steps {
                // Copy files to the deployment directory
		sh 'sudo cp -r ./client/* /usr/share/nginx/html'
                sh 'sudo cp -r ./server/* /home/ec2-user/app'
		sh 'ls -l /home/ec2-user/app'  // Add this line to check contents
                // Use PM2 to restart the app
                // If app is not running, start it; if running, restart it
                sh '''
                cd /home/ec2-user/app
                '''
            }
        }
    }
}
