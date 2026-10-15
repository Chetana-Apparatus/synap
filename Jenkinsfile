pipeline {
    agent any

    environment {
        IMAGE_NAME     = "synap-app"
        CONTAINER_NAME = "7060_frontend_synapcare"
        APP_PORT       = "7060"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                  docker stop ${CONTAINER_NAME} synap-app || true
                  docker rm ${CONTAINER_NAME} synap-app || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                withCredentials([file(credentialsId: 'synap-env', variable: 'ENV_FILE')]) {
                    sh '''
                      docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:${APP_PORT} \
                        -e PORT=${APP_PORT} \
                        -e HOSTNAME=0.0.0.0 \
                        --env-file "${ENV_FILE}" \
                        --restart always \
                        ${IMAGE_NAME}:latest
                    '''
                }
            }
        }
    }
}
