#!/bin/bash
echo "Deploying HEAD version from github to AWS instance..."

ssh -i ~/AWS/DA-AWS-Key.pem.txt ubuntu@ec2-35-160-123-29.us-west-2.compute.amazonaws.com "cd VideoMonitor && git pull && npm start"
#"cd VideoMonitor && git pull"
