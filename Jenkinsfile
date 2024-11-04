pipeline {
    agent any
    tools{
        nodejs 'nodejs_20.18.0'
    }
    stages{
        stage('Clone repository'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/arinabilan/Frontend_Tingeso']])
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App'){
            steps{
                bat 'npm run build'
            }
        }

        stage('Build docker image'){
            steps{
                script{
                    bat 'docker build -t aribakan/frontend-bankservice:latest .'
                }
            }
        }

        stage('Push image to Docker Hub'){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'dhpswid') {
                        bat 'docker push aribakan/frontend-bankservice:latest'
                   }
                }
            }
        }
    }
}