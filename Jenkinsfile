pipeline {
    agent any

    environment {
        IMAGE_NAME     = "synap-app"
        CONTAINER_NAME = "synap-app"
        APP_PORT       = "7001"

        // Jenkins Credentials (Secret text) — create these IDs in Jenkins → Manage Credentials
        CMS_BASE_URL       = credentials('CMS_BASE_URL')
        CMS_API_KEY        = credentials('CMS_API_KEY')
        CMS_WEBSITE_ID     = credentials('CMS_WEBSITE_ID')
        CMS_MEDIA_BASE_URL = credentials('CMS_MEDIA_BASE_URL')
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
                sh '''
                  docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p ${APP_PORT}:${APP_PORT} \
                    -e CMS_BASE_URL="${CMS_BASE_URL}" \
                    -e CMS_API_KEY="${CMS_API_KEY}" \
                    -e CMS_WEBSITE_ID="${CMS_WEBSITE_ID}" \
                    -e CMS_MEDIA_BASE_URL="${CMS_MEDIA_BASE_URL}" \
                    --restart always \
                    ${IMAGE_NAME}:latest
                '''
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
