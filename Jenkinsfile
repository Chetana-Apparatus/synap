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
                // Secret file credential ID: synap-env
                // Upload a .env file in Jenkins → Credentials with these keys:
                //   CMS_BASE_URL=
                //   CMS_API_KEY=
                //   CMS_WEBSITE_ID=
                //   CMS_MEDIA_BASE_URL=
                withCredentials([file(credentialsId: 'synap-env', variable: 'ENV_FILE')]) {
                    sh '''
                      docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:${APP_PORT} \
                        --env-file "${ENV_FILE}" \
                        --restart always \
                        ${IMAGE_NAME}:latest
                    '''
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
