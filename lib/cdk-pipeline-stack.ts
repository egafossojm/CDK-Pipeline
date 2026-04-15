import { BucketStage } from './cdk-pipeline-stages';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { PipelineType } from "aws-cdk-lib/aws-codepipeline";

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* Access the CommitId of a GitHub source in the synth

    The Personal access tokens (classic) is created in the GiHub Account.
    It has the permissions :
         - repo: Full control of private repositories
         - admin:repo_hook: Full control of repository hooks
    The secret name in Secret Manager is "github-token"
    The Plaintext token Key/Value is like {"token":"ghp_abcdefghismEit1NYgJ8rnIvYO3gMP4w"}
    */
    const source = pipelines.CodePipelineSource.gitHub('egafossojm/CDK-Pipeline', 'main', {
      authentication: cdk.SecretValue.secretsManager('github-token', {
        jsonField: 'token'
      }),
    });

    // Create pipeline with S3 source
    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      pipelineName: "CDKPipeline",
      pipelineType: PipelineType.V2,
      synth: new pipelines.CodeBuildStep("SynthStep", {
        input: source,
        installCommands: [
          "npm install -g aws-cdk",   // Install CDK CLI
        ],
        commands: [
          "npm ci", //Install dependencies listed in package-lock.json. Clean install, faster, consistent . Instead of npm install that could upgrade packages and resolv version differently
          "npm run build", // Compile your TypeScript into JavaScript. Runs the "build" script from your package.json
          "npx cdk synth" // Generate the CloudFormation templatess, after this codepipeline will deploy them
        ],
      }),
    });

        // Add deployment stage

        const bucketStage = new BucketStage(this, 'bucket');
        pipeline.addStage(bucketStage);
  }
}
