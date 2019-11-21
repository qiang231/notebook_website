pipeline {
    agent {
        docker {
            image 'node'
            args '-p 3000:3000'
        }
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }

      stage("Clean") {
        steps {
          sh "rm -rf ${WORKSPACE}/public"
              
          sh "rm -rf ${WORKSPACE}/.cache"

        }
      }
      
        stage("Prepare") {
            steps {
                sh "rm -rf /home/wwwroot/notebook/*"

                sh "npm install --registry https://registry.npm.taobao.org"
              
                sh "npm rebuild node-sass"
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }

        stage("Archive") {
            // sh "tar -cvf ./archive/release:${BUILD_ID}.tar ./notebook/public"
            steps {
                sh "mv ./public/*  /home/wwwroot/notebook"
            }
        }
    }
}
