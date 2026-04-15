import { BucketStage } from './cdk-pipeline-stages';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { PipelineType } from "aws-cdk-lib/aws-codepipeline";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Access the CommitId of a GitHub source in the synth
    const source = pipelines.CodePipelineSource.gitHub('egafossojm/CDK', 'main', {
      authentication: cdk.SecretValue.secretsManager('github-token', {
        jsonField: 'token'
      }),
    });

    // Create pipeline with S3 source
    const pipeline = new pipelines.CodePipeline(this, "Pipeline", {
      pipelineName: "WorkshopPipeline",
      pipelineType: PipelineType.V2,
      synth: new pipelines.CodeBuildStep("SynthStep", {
        input: source,
        commands: [
          "npm ci",
          "npm run build",
          "npx cdk synth"
        ],
      }),
    });

        // Add deployment stage

        const bucketStage = new BucketStage(this, 'bucket');
        pipeline.addStage(bucketStage);
  }
}
