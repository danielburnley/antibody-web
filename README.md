# NHSx Covid-19 Antibody Test at Home Web Service

**This is a currently a Trial Service NOT a Live Service**

> Covid-19 Antibody Test at Home Web Service is a web based service that will allow registered users to take an at home Covid-19 Antibody test and get a result of whether they test positive or negative for Covid-19 antibodies.

## Quick start

Prerequisites:
- AWS cli (with a configured user)
- Node
- Yarn
- Serverless (**Note**: must be globally installed)

Run the following:

```bash
yarn install
yarn setup-env
```

After this, replace the environment variables inside `reviewer-app/.env` and `take-test-app/.env` with the correct values.

Once this is done, run the following:

```bash
yarn run dev
```

It will start 3 applications:

- `api` in offline mode on [`http://localhost:4000`](http://localhost:4000)
- `take-test-app` on [`http://localhost:3000`](http://localhost:3000)
- `reviewer-app` on [`http://localhost:3001`](http://localhost:3001)

## User guide

### Running through the application (as of 23/09/2020)

**Note: Ensure the whole stack is running with the correct environment variables**

**Prerequisites**

- `reviewer-app`
  - Cognito user with `reviewer` role in the user pool

**Take the test app**

- Login to the application with a valid user ID (E.g. valid_yourname_thetime)
- Progress through the user flow up to the timer step
- Skip the timer by clicking on it 3 times
- Open your webcam and submit a photo
  - Additionally you can refuse permissions and upload a photo

**Reviewer app**

- Login as a `reviewer`
  - If this is your first time logging in, set a password that conforms to the password policy (for example `Password1!`)
- See the image you submitted from the test taking app
- Submit a review of the image
  - **Note:** There is no confirmation message at the moment, to check this has worked check the `network` tab in your browser

## Technical documentation

Each folder of the project has its own specific README describing its intended purpose, technical documenation, and any relevant information:

- [`api/`](api/README.md)
  - The API which serves as the connection between all the parts of our service.
- [`lib/`](lib/README.md)
  - Code & types shared between mutliple applications
- [`ml/`](ml/README.md)
  - Docuementation for the machine learning API & instructions for building the docker images
- [`reviewer-app/`](reviewer-app/README.md)
  - The application for reviewing samples of the results generated by the machine learning for quality assurance.
- [`take-test-app/`](take-test-app/README.md)
  - The application for the person taking the test to use to take a picture and submit their results.
- [`terraform/`](terraform/README.md)
  - The terraform for all applications aside from the `api`, which is a Serverless application.

### Install Dependencies

To install dependent modules.

```bash
yarn install
```

This will also postinstall dependencies in all the other applications.

If you only want to install root dependencies:

```bash
yarn install --ignore-scripts
```

### Running the service locally

**Ensure you have all the required `.env` files for each application**

```bash
yarn dev
```

This will run the following:

- `api` in offline mode on [`http://localhost:4000`](http://localhost:4000)
- `take-test-app` on [`http://localhost:3000`](http://localhost:3000)
- `reviewer-app` on [`http://localhost:3001`](http://localhost:3001)

The page will reload if you make edits.

You will also see any lint errors in the console.

### Running Tests

To run the tests on all applications at once you can run

```bash
yarn test
```

To run them individually, run this from within each project directory.

### CI/CD Pipelines

The test & deployment pipeline uses Github Actions [(https://github.com/features/actions)](https://github.com/features/actions) to build out pipelines, the files for these can be found in [`.github/workflows/`](.github/workflows/).

**Run against pull requests**

There is a build & test pipeline that is run against pull requests, this ensures all the applications can build, and that all tests pass.

**Run against master**

The pipeline that runs on merges to master includes building & testing the repos, once these all pass it subsequently runs the E2E tests on the repos (by deploying to dev) and once these pass it deploys all the applications.
