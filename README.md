# AWS Microservice Labs - Week 4

This project demonstrates how to build and push a Docker image to Amazon Elastic Container Registry (ECR) using GitHub Actions. The Docker image is built from a Node.js application and is automatically pushed to ECR whenever changes are pushed to the `main` branch.

## Prerequisites

-   AWS Account
-   AWS CLI installed and configured
-   Docker installed
-   GitHub repository with the following secrets configured:
    -   `AWS_ACCESS_KEY_ID`
    -   `AWS_SECRET_ACCESS_KEY`
    -   `AWS_REGION`
    -   `AWS_ACCOUNT_ID`

## Project Structure

```
/week4
├── .github
│   └── workflows
│       └── upload-to-s3.yml
├── .gitignore
├── src
│   └── index.js
│   └── /confg
│       └── db.ts
|   |__ /controllers
|   .
|   .
|   .
├── Dockerfile
├── package.json
└── README.md
```

## Dockerfile

The `Dockerfile` defines the steps to build the Docker image for the Node.js application.

```dockerfile
# filepath: /Users/watchmker/Library/CloudStorage/OneDrive-AmaliTechgGmbH/Amalitech/Labs/aws-micorservice-labs/week4/Dockerfile
FROM node:14.15.4

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## GitHub Actions Workflow

The GitHub Actions workflow is defined in `.github/workflows/upload-to-s3.yml`. It performs the following steps:

1. **Checkout Repository**: Checks out the repository code.
2. **Install or Update AWS CLI**: Installs or updates the AWS CLI.
3. **Configure AWS Credentials**: Configures AWS CLI with the necessary credentials and region.
4. **Login to Amazon ECR**: Logs in to Amazon ECR using the AWS CLI.
5. **Build Docker Image**: Builds the Docker image using the `Dockerfile`.
6. **Tag Docker Image**: Tags the Docker image with the appropriate ECR repository URL and tag name.
7. **Push Docker Image to ECR**: Pushes the tagged Docker image to the specified ECR repository.

```github-actions-workflow
// filepath: /Users/watchmker/Library/CloudStorage/OneDrive-AmaliTechgGmbH/Amalitech/Labs/aws-micorservice-labs/week4/.github/workflows/upload-to-s3.yml
name: Build and Push Docker Image

on:
    push:
        branches:
            - main

jobs:
    build-and-push:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout Repository
              uses: actions/checkout@v4

            - name: Install or Update AWS CLI
              run: |
                  curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
                  unzip awscliv2.zip
                  sudo ./aws/install --update
                  aws --version

            - name: Configure AWS Credentials
              run: |
                  aws configure set aws_access_key_id ${{ secrets.AWS_ACCESS_KEY_ID }}
                  aws configure set aws_secret_access_key ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  aws configure set region ${{ secrets.AWS_REGION }}

            - name: Login to Amazon ECR
              run: |
                  aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com

            - name: Build Docker Image
              run: |
                  docker build -t juliusmarkwei_ecommerce .

            - name: Tag Docker Image
              run: |
                  docker tag juliusmarkwei_ecommerce:latest ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/week4lab:juliusmarkwei_ecommerce_api

            - name: Push Docker Image to ECR
              run: |
                  docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/week4lab:juliusmarkwei_ecommerce_api
```

## How to Use

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/juliusmarkwei/node-image-ECR.git
    cd node-image-ECR/
    ```

2. **Build and Run Locally**:

    ```sh
    docker build -t juliusmarkwei_ecommerce .
    docker run -p 3000:3000 juliusmarkwei_ecommerce
    ```

3. **Push Changes to GitHub**:
    - Make changes to the code and push to the `main` branch.
    - The GitHub Actions workflow will automatically build and push the Docker image to ECR.

## Conclusion

This project demonstrates how to automate the process of building and pushing Docker images to Amazon ECR using GitHub Actions. By following the steps outlined in this README, you can set up a similar workflow for your own projects.
