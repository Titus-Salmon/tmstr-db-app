const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path'); //node module that provides utilities for working with file and directory paths
app.use(bodyParser.urlencoded({ //bodyParser = middleware
    extended: false
}));

app.get('/', (request, response) => response.sendFile(`${path.join(__dirname, '../index-form-post-ddb.html')}`)); //(__dirname, '../) goes one folder up from current location 

app.post('/api/data', (request, response) => {
    const postBody = request.body;
    console.log(postBody);

    //the following puts 'postBody' json into dynamodb database/////////////////////////////////////////
    //can/should this be made more modular? <--maybe not...
    var AWS = require('aws-sdk');
    var dyn = new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    });

    var params = {
        TableName: "teamster-application-database",
        Item: { // a map of attribute name to AttributeValue
            union_number: {
                'S': Object.values(postBody)[0][0]
            },
            lname: {
                'S': Object.values(postBody)[0][1]
            },
            fname: {
                'S': Object.values(postBody)[0][2]
            },
            mi: {
                'S': Object.values(postBody)[0][3]
            },
            occupation: {
                'S': Object.values(postBody)[0][4]
            },
            address: {
                'S': Object.values(postBody)[0][5]
            },
            phone: {
                'S': Object.values(postBody)[0][6]
            },
            city: {
                'S': Object.values(postBody)[0][7]
            },
            state: {
                'S': Object.values(postBody)[0][8]
            },
            zip: {
                'S': Object.values(postBody)[0][9]
            },
            employer: {
                'S': Object.values(postBody)[0][10]
            },
            employment_date: {
                'S': Object.values(postBody)[0][11]
            },
            employer_address: {
                'S': Object.values(postBody)[0][12]
            },
            employer_phone: {
                'S': Object.values(postBody)[0][13]
            },
            employer_city: {
                'S': Object.values(postBody)[0][14]
            },
            employer_state: {
                'S': Object.values(postBody)[0][15]
            },
            employer_zip: {
                'S': Object.values(postBody)[0][16]
            },
            fee: {
                'S': Object.values(postBody)[0][17]
            },
            paid_to: {
                'S': Object.values(postBody)[0][18]
            },
            dob: {
                'S': Object.values(postBody)[0][19]
            },

            membership: {
                'S': Object.values(postBody)[0][21]
            },
            previous_union_number: {
                'S': Object.values(postBody)[0][22]
            },

            ssn: { //'ssn' is primary key for 'teamster-application-database' table; must always be included in 'putItem' method
                'S': Object.values(postBody)[0][20]
            },
        }
    };

    dyn.putItem(params, function (err, data) {
        if (err) console.log(err); // an error occurred
        else console.log(data); // successful response
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (n = 0; n < 23; n++) {
        console.log(Object.values(postBody)[0][n]);
    }

    console.log(postBody);
    console.log(Object.values(postBody)[0]);
    

});

app.listen(3000, () => console.info('Application running on port 3000'));