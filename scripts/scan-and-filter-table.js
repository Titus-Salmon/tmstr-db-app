const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path'); //node module that provides utilities for working with file and directory paths
app.use(bodyParser.urlencoded({ //bodyParser = middleware
    extended: false
}));

//var categoryFilterArray = [];

app.get('/', (request, response) => response.sendFile(`${path.join(__dirname, '../scan-filter.html')}`)); //(__dirname, '../) goes one folder up from current location 

app.post('/api/data', (request, response) => {
    const postBody = request.body;

    console.log(postBody);
    console.log(postBody["lname"]);
    console.log(postBody["fname"]);

    //console.log(Object.values(postBody)[0]);

    /**scan and filter table******************************************************************************** */
    var AWS = require('aws-sdk');
    var dyn = new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    });
/*
    for (n = 0; n < 2; n++) {
        if (Object.values(postBody)[n] == null) {
            return ;
        } else {
            scanFilter();
        }
    }
*/
/*

var obj = {
    key1: value1,
    key2: value2
};

var getProperty = function (propertyName) {
    return obj[propertyName];
};

obj["key3"] = "value3";

getProperty("key1");
getProperty("key2");
getProperty("key3");
*/

/*

var obj = {
    key1: value1,
    key2: value2
};

var getProperty = function (propertyName) {
    return obj[propertyName];
};

obj["key3"] = "value3";

getProperty("key1");
getProperty("key2");
getProperty("key3");
*/

/*
params["ExpressionAttributeNames"] = {}
*/
    {
        var params = {
            TableName: 'teamster-application-database',
            /* required */
            ExpressionAttributeNames: {
                "#last_name": Object.keys(postBody)[0], //lname
                "#first_name": Object.keys(postBody)[1] //fname
            },
            ExpressionAttributeValues: {
                ":lname": {
                    "S": Object.values(postBody)[0] //Smith
                },
                ":fname": {
                    "S": Object.values(postBody)[1] //John
                },
            },
            FilterExpression: "#last_name = :lname AND #first_name = :fname" // lname: { S: 'Smith' }
        }; 

        console.log(postBody); //{ lname: 'Smith', fname: 'John' }

        console.log(Object.keys(postBody)[0]); //lname
        console.log(Object.keys(postBody)[1]); //fname
        console.log(Object.values(postBody)[0]); //Smith
        console.log(Object.values(postBody)[1]); //John

        console.log(params["ExpressionAttributeValues"][":lname"]); //{ S: 'Smith' }
        console.log(params["ExpressionAttributeValues"][":fname"]); //{ S: 'John' }
        console.log(params["ExpressionAttributeValues"]); //{ ':lname': { S: 'Smith' }, ':fname': { S: 'John' } }
        //to add something to params["ExpressionAttributeValues"] -- params["ExpressionAttributeValues"][":lname"] = {"S": Object.values(postBody)[0]}
        //thus, if (postBody["lname"] !== void) { params["ExpressionAttributeValues"][":lname"] = {"S": Object.values(postBody)[0]} }

        console.log(params["ExpressionAttributeNames"]["#last_name"]); //lname
        console.log(params["ExpressionAttributeNames"]["#first_name"]); //fname
        console.log(params["ExpressionAttributeNames"]); //{ '#last_name': 'lname', '#first_name': 'fname' }
        console.log(params); //{ '#last_name': 'lname', '#first_name': 'fname' }


        dyn.scan(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            //else console.log(data); // successful response --logs entire data object
            console.log(data.Items);
        });
        /**scan and table******************************************************************************** */
    }
});











/*
app.get('/', (request, response) => response.sendFile(`${path.join(__dirname, '../index-query-post-ddb.html')}`)); //(__dirname, '../) goes one folder up from current location 

app.post('/api/data', (request, response) => {
    const postBody = request.body;

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
        KeyConditionExpression: "ssn = :ssn",
        ExpressionAttributeValues: {
            ":ssn": {
                'S': (data.Items[0].ssn.S)
            },
            ":zip": {
                'S': Object.values(postBody)[0]
            },
        },
    };

    dyn.query(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response --logs entire data object
        console.log(data.Items); // --logs entire Items object of the data object
        console.log(data.Items[0]); // --logs 1st index of Items object, which is an array of applicant data objects
        console.log(data.Items[0].zip); // --logs 'zip' applicant data object, which is an object of this nature: {'S' : 'some string value'}
        console.log(data.Items[0].zip.S); // --logs the string value of the 'zip' applicant data object. this is what you'll want to provide for the query result.
        //and so-on, for the rest of the applicant data objects, as shown below:
        console.log(data.Items[0].union_number.S);
        console.log(data.Items[0].lname.S);
        console.log(data.Items[0].fname.S);
        console.log(data.Items[0].mi.S);
        console.log(data.Items[0].occupation.S);
        console.log(data.Items[0].address.S);
        console.log(data.Items[0].phone.S);
        console.log(data.Items[0].city.S);
        console.log(data.Items[0].state.S);
        console.log(data.Items[0].employer.S);
        console.log(data.Items[0].employment_date.S);
        console.log(data.Items[0].employer_address.S);
        console.log(data.Items[0].employer_phone.S);
        console.log(data.Items[0].employer_state.S);
        console.log(data.Items[0].employer_zip.S);
        console.log(data.Items[0].paid_to.S);
        console.log(data.Items[0].dob.S);
        console.log(data.Items[0].membership.S);
        console.log(data.Items[0].previous_union_number.S);
        console.log(data.Items[0].ssn.S);
    });
});
*/

app.listen(3000, () => console.info('Application running on port 3000'));