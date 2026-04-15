
import { RemovalPolicy, Stage, StageProps, CfnOutput, StackProps, Stack } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface BucketStackProps extends StackProps {
    readonly bucketName: string;
}

export class BucketStack extends Stack {
  constructor(scope: Construct, id: string, props: BucketStackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'Bucket', {
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        encryption: s3.BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        versioned: true,
        removalPolicy: RemovalPolicy.RETAIN,
        bucketName: props.bucketName,
      });
      
  }
}