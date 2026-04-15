
import { RemovalPolicy, Stage, StageProps, CfnOutput, StackProps, Stack } from 'aws-cdk-lib';
import {BucketStackProps, BucketStack} from './cdk-bucket-stack';
import { Construct } from 'constructs';


export class BucketStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const bucketProps = {
      bucketName: 'stage-bucket-ss23j3232',
    }
    const bucket = new BucketStack(this, 'bucket', bucketProps);
      
  }
}