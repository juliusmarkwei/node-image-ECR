# Express + Elastic Beanstalk Deployment

This project demonstrates how to deploy an Express application to AWS Elastic Beanstalk.

## Project Structure

```
/src
  └── index.js
```

## Prerequisites

-   Node.js
-   AWS CLI

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/juliusmarkwei/elb-lab.git
    cd elb-lab/
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the application locally:**

    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:3000`.

## GitHub Workflow for S3 Deployment

This project uses a GitHub workflow to deploy the application to an S3 bucket. Follow these steps to set up the workflow:

1. **Create an S3 bucket:**

    ```bash
    aws s3 mb s3://your-bucket-name
    ```

2. **Add the GitHub workflow file:**

    Create a new file at `.github/workflows/deploy.yml` with the following content:

    ```yaml
    name: Deploy to S3

    on:
        push:
            branches:
                - main

    jobs:
        deploy:
            runs-on: ubuntu-latest

            steps:
                - name: Checkout code
                  uses: actions/checkout@v2

                - name: Install dependencies
                  run: npm install

                - name: Build project
                  run: npm run build

                - name: Zip files
                  run: zip -r app-package.zip .

                - name: Deploy to S3
                  env:
                      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
                      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                  run: |
                      aws s3 cp app-package.zip s3://your-bucket-name/
    ```

3. **Set up GitHub secrets:**

    Go to your GitHub repository settings and add the following secrets:

    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`

4. **Trigger the workflow:**

    Push changes to the `main` branch to trigger the workflow. The application package will be uploaded to the specified S3 bucket.

## Deployment from AWS Management Console

1. **Upload the application package to S3:**

    ```bash
    aws s3 cp ./app-package.zip s3://your-bucket-name/
    ```

2. **Deploy from the AWS Management Console:**

    - Go to the [Elastic Beanstalk Management Console](https://console.aws.amazon.com/elasticbeanstalk).
    - Select your application.
    - Click on "Upload and Deploy".
    - Choose the application package from your S3 bucket.
    - Click "Deploy".

## License

This project is licensed under the MIT License.
