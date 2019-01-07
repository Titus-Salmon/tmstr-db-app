const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (request, response) => response.sendFile(`${__dirname}/form-post-ddb.html`));

app.post('/api/data', (request, response) => {
    const postBody = request.body;

    //need code here to put postBody json into dynamodb database
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
            ssn: {
                'S': 'putToDB[20]'
            },
        }

    };

    dyn.putItem(params, function (err, data) {
        if (err) console.log(err); // an error occurred
        else console.log(data); // successful response
    });

    ///////////////////////////////////////////////////////////////

    console.log(postBody);
});

app.listen(3000, () => console.info('Application running on port 3000'));