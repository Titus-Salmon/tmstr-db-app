var AWS = require('aws-sdk');

var dyn = new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
});

dyn.listTables({Limit: 10}, function(err, data) {
    if (err) {
      console.log("Error", err.code);
    } else {
      console.log("Table names are ", data.TableNames);
    }
  });