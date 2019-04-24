#!/bin/groovy
def getRepo(String branch) {
    return branch.endsWith('master') ? 'node-releases' : 'node-desenv'
}

pipeline {
    agent any

    environment {
        PKG = readJSON file: 'package.json'
        PKG_NAME = "${PKG['name']}"
        PKG_VERSION = "${PKG['version']}"
        REPOSITORY = getRepo("${GIT_BRANCH}")
        ROCKET_TOKEN = 'us9nRmnbwdgkENRYX/8WzbpdHarMaooQt8QgjQ4qup8jfacSvzyteQvTMT5XiPWkPe'
    }
    tools {
        nodejs 'Node 11.14.0'
    }
    stages {
        stage('Startup') {
            steps {
                rocketSend message: "Build iniciada", attachments: [[title: "#${env.BUILD_NUMBER}", titleLink: "${env.BUILD_URL}", text: "${env.JOB_NAME} - ${GIT_BRANCH}"]], rawMessage: true, webhookToken: "${ROCKET_TOKEN}"
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    sh 'npm run testCoverage'
                }
            }
            post {
                always {
                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml'])
                }
            }
        }
        stage('Sonarqube') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }

            steps {
                withSonarQubeEnv('SonarQubeScanner') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }

                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm run build'
                    sh 'cp package.json dist/'
                    sh 'cp -r src/config dist/'
                    sh 'tar -czvf dist.tar.gz dist/*'
                }
            }
        }
        stage('Publish') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                nexusPublisher nexusInstanceId: 'Nexus_Local', nexusRepositoryId: "${REPOSITORY}", packages: [[$class: 'MavenPackage', mavenAssetList: [[classifier: '', extension: '', filePath: "dist.tar.gz"]], mavenCoordinate: [artifactId: "${PKG_NAME}", groupId: "br.com.pemaza", packaging: 'tar.gz', version: "${PKG_VERSION}"]]]
            }
        }
        stage('Deploy') {
            when {
                expression { GIT_BRANCH ==~/.*(desenvolvimento)$/ }
            }
            steps {
                ansibleTower(
                    towerServer: 'AWX Local',
                    jobTemplate: 'Deploy_front|node',
                    inventory: 'Desenvolvimento',
                    extraVars: '''---
                      projeto: b2b
                      artifact_id: ${PKG_NAME}
                      group_id: br.com.pemaza
                      version: ${PKG_VERSION}
                      ext: tar.gz
                      repository: ${REPOSITORY}
                    '''
                )
            }
        }
    }

    post {
        success {
            rocketSend message: "Build Finalizada", attachments: [[title: "#${env.BUILD_NUMBER}", titleLink: "${env.BUILD_URL}", text: "${env.JOB_NAME} - ${GIT_BRANCH}", color: "green"]], rawMessage: true, webhookToken: "${ROCKET_TOKEN}"
        }
        failure {
            rocketSend message: "Falha na build", attachments: [[title: "#${env.BUILD_NUMBER}", titleLink: "${env.BUILD_URL}", text: "${env.JOB_NAME} - ${GIT_BRANCH}", color: "red"]], rawMessage: true, webhookToken: "${ROCKET_TOKEN}"
        }
    }
}