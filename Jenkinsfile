pipeline {
    agent any

    environment {
        IMAGE_NAME     = "synap-app"
        CONTAINER_NAME = "synap-app"
        APP_PORT       = "7001"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  docker build -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                  docker stop ${CONTAINER_NAME} || true
                  docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'email-user', variable: 'EMAIL_USER'),
                        string(credentialsId: 'email-pass', variable: 'EMAIL_PASS')
                    ]) {
                        sh '''
                          docker run -d \
                            --name ${CONTAINER_NAME} \
                            -p ${APP_PORT}:${APP_PORT} \
                            -e EMAIL_USER=${EMAIL_USER} \
                            -e EMAIL_PASS=${EMAIL_PASS} \
                            --restart always \
                            ${IMAGE_NAME}:latest
                        '''
                    }
                }
            }
        }

        stage('Restart Nginx') {
            steps {
                sh '''
                  sudo systemctl restart nginx
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
