 var AWS = require('aws-sdk');
 //var dyn = new AWS.DynamoDB.DocumentClient({
 var dyn = new AWS.DynamoDB({
     region: 'localhost',
     endpoint: 'http://localhost:8000',
     accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
     secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
 });

 var params = {
     TableName: 'teamster-application-database',
     Item: { // a map of attribute name to AttributeValue
        blahblah: {
            'S': 'blahblahblahblah'
        },
         ssn: {
             'S': 'putToDB[20]'
         },
         unionNumber: {
             'S': 'putToDB[0]'
         },
         lastName: {
             'S': 'putToDB[1]'
         },
         firstName: {
             'S': 'putToDB[2]'
         },
         middleInitial: {
             'S': 'putToDB[3]'
         },
         occu: {
             'S': 'putToDB[4]'
         },
         addr: {
             'S': 'putToDB[5]'
         },
         phoneNumber: {
             'S': 'putToDB[6]'
         },
         cty: {
             'S': 'putToDB[7]'
         },
         st: {
             'S': 'putToDB[8]'
         },
         zipCode: {
             'S': 'putToDB[9]'
         },
         emplr: {
             'S': 'putToDB[10]'
         },
         emplDate: {
             'S': 'putToDB[11]'
         },
         emplrAdd: {
             'S': 'putToDB[12]'
         },
         emplrPhone: {
             'S': 'putToDB[13]'
         },
         emplrCity: {
             'S': 'putToDB[14]'
         },
         emplrState: {
             'S': 'putToDB[15]'
         },
         emplrZip: {
             'S': 'putToDB[16]'
         },
         mbrFee: {
             'S': 'putToDB[17]'
         },
         feePaidTo: {
             'S': 'putToDB[18]'
         },
         dateOfBirth: {
             'S': 'putToDB[19]'
         },
         mbrshp: {
             'S': 'putToDB[21]'
         },
         prevUnionMbr: {
             'S': 'putToDB[22]'
         },

         //ReturnValues: 'NONE', // optional (NONE | ALL_OLD)
         //ReturnConsumedCapacity: 'NONE', // optional (NONE | TOTAL | INDEXES)
         //ReturnItemCollectionMetrics: 'NONE', // optional (NONE | SIZE)
     }
 };
 dyn.putItem(params, function (err, data) {
     if (err) console.log(err); // an error occurred
     else console.log(data); // successful response
 });

 //////////////////////////////////////////////////////////////


 /*
         dyn.put({
             TableName: 'tmstr_application6', //dynamodb table name for data filled out in J's application form
             Item: {
                 //input data from J's form here, in the form of key:value pairs
                 unionNumber: putToDB[0],
                 lastName: putToDB[1],
                 firstName: putToDB[2],
                 middleInitial: putToDB[3],
                 occu: putToDB[4],
                 addr: putToDB[5],
                 phoneNumber: putToDB[6],
                 cty: putToDB[7],
                 st: putToDB[8],
                 zipCode: putToDB[9],
                 emplr: putToDB[10],
                 emplDate: putToDB[11],
                 emplrAdd: putToDB[12],
                 emplrPhone: putToDB[13],
                 emplrCity: putToDB[14],
                 emplrState: putToDB[15],
                 emplrZip: putToDB[16],
                 mbrFee: putToDB[17],
                 feePaidTo: putToDB[18],
                 dateOfBirth: putToDB[19],
                 socialSec: putToDB[20],
                 mbrshp: putToDB[21],
                 prevUnionMbr: putToDB[22]
             }
         }, (err, data) => {
             if (err) {
                 console.log(err);
             } else {
                 console.log(data);
             }
         })

 */

 //ts////////////////////////////////////////////////////////////////////////////
 // Initialize the Amazon Cognito credentials provider
 /*
 AWS.config.region = 'us-east-2'; // Region
 AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'us-east-2:f29516bf-d6eb-4752-b41a-e943f744b14f',
 });

 const docClient = new AWS.DynamoDB.DocumentClient();

 docClient.put({
     TableName: 'tmstr_application', //dynamodb table name for data filled out in J's application form
     Item: {
         //input data from J's form here, in the form of key:value pairs
         unionNumber: putToDB[0],
         lastName: putToDB[1],
         firstName: putToDB[2],
         middleInitial: putToDB[3],
         occu: putToDB[4],
         addr: putToDB[5],
         phoneNumber: putToDB[6],
         cty: putToDB[7],
         st: putToDB[8],
         zipCode: putToDB[9],
         emplr: putToDB[10],
         emplDate: putToDB[11],
         emplrAdd: putToDB[12],
         emplrPhone: putToDB[13],
         emplrCity: putToDB[14],
         emplrState: putToDB[15],
         emplrZip: putToDB[16],
         mbrFee: putToDB[17],
         feePaidTo: putToDB[18],
         dateOfBirth: putToDB[19],
         socialSec: putToDB[20],
         mbrshp: putToDB[21],
         prevUnionMbr: putToDB[22]
     }
 }, (err, data) => {
     if (err) {
         console.log(err);
     } else {
         console.log(data);
     }
 })
 */
 ////////////////////////////////////////////////////////////////////////////////