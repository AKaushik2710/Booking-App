import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1', // or your region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
export default dynamodb;

