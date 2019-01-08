const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path'); //node module that provides utilities for working with file and directory paths
app.use(bodyParser.urlencoded({ //bodyParser = middleware
    extended: false
}));

app.get('/', (request, response) => response.sendFile(`${path.join(__dirname, '../form-post-ddb.html')}`)); //(__dirname, '../) goes one folder up from current location 

app.post('/api/data', (request, response) => {
    const postBody = request.body;

    //the following puts 'postBody' json into dynamodb database/////////////////////////////////////////
    var AWS = require('aws-sdk');
    //var dyn = new AWS.DynamoDB.DocumentClient({
        var dyn = new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    });

    var params = {
        TableName: "teamster-application-database",
        Item: { // a map of attribute name to AttributeValue
            blahblah: postBody,
            ssn: { //'ssn' is primary key for 'teamster-application-database' table; must always be included in 'putItem' method
                'S': 'putToDB[22]' //todo: change 'putToDB[20]' to form data input from client-side for 'social security' field
            },
        }

    };

    dyn.putItem(params, function (err, data) {
        if (err) console.log(err); // an error occurred
        else console.log(data); // successful response
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    console.log(postBody);
});

app.listen(3000, () => console.info('Application running on port 3000'));