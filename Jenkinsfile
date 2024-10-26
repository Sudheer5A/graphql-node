pipeline {
    agent any	
    tools {nodejs "nodejs"}
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                // Copy files to the deployment directory
				sh 'cp -r ./client/* /usr/share/nginx/html'
                sh 'cp -r ./server/* /app'

                // Use PM2 to restart the app
                // If app is not running, start it; if running, restart it
                sh '''
                cd /app
                pm2 start server.js --name "books-app" || pm2 restart "books-app"
                '''
            }
        }
    }
}
