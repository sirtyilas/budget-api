import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';

export class BudgetApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiGateway = new apigateway.RestApi(this, "BudgetAPIGateway", {    
    })
   
    const budgetLambda = new lambda.Function(this, "BudgetLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, "../","assets","/lambda","/budget")),
    })

    apiGateway.root.addResource('budgets')
      .addMethod('GET', new apigateway.LambdaIntegration(budgetLambda));
    
    new dynamodb.Table(this, "BudgetsTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
    
    
   

  }
}
