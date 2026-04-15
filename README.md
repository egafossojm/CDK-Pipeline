# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

> **_NOTE_**
>
> Do not use :
>
> * `cdk deploy`
> * `cdk diff`
> * `cdk synth`

Because these run the cdk version installed on your local terminal/computer instead of the cdk binary in the **node_modules** folders.

The generated **cdk.out** could differs between team members.

> Always use :
>
> * `npx cdk deploy`
> *  `npx cdk diff`
> * `npx cdk synth`
