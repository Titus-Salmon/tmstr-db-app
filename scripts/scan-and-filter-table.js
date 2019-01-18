const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const path = require('path'); //node module that provides utilities for working with file and directory paths


app.set('views', '../views-t0d');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ //bodyParser = middleware
    extended: false
}));


//try to wrap app.get in function that figures out if
app.get('/', (request, response) => response.sendFile(`${path.join(__dirname, '../scan-filter.html')}`, function () {
    console.log('you can have a function here');
})); //(__dirname, '../) goes one folder up from current location 
//response.sendFile() sends the file ('scan-filter.html') to THIS file (scan-and-filter-table.js), thus we are able to see the
//scan-filter.html page in our browser when running scan-and-filter-table.js from command line (presumably)
//res.sendFile(path [, options] [, fn])

app.post('/scanResults', (request, response) => { //request takes POST data from client form
    //then I take this data, and scan the database
    //then I generate scan results
    //response sends the scan results back to client-side
    //I need to return these results client-side on the same page they searched from


    //response.header('Access-Control-Allow-Origin', '*');
    //response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    //response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    const postBody = request.body;

    console.log(postBody);
    console.log(postBody["lname"]);
    console.log(postBody["fname"]);

    /**scan and filter table******************************************************************************** */
    var AWS = require('aws-sdk');
    var dyn = new AWS.DynamoDB({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
        secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    });

    var filterExpArray = []; // base array that holds POST data (input from html form) for FilterExpression

    var filterExpString = []; //one element array that holds string for FilterExpression

    var lname_exp;
    var fname_exp;


    if (postBody["lname"] !== '') { //if data input in html form not empty, push string for FilterExpression to filterExpArray
        lname_exp = "#last_name = :lname";
        filterExpArray.push(lname_exp);
    };
    if (postBody["fname"] !== '') {
        fname_exp = "#first_name = :fname";
        filterExpArray.push(fname_exp);
    };

    console.log('filterExpArray.length =' + filterExpArray.length)

    if (filterExpArray.length > 1) {
        for (n = 0; n < (filterExpArray.length - 1); n++) {
            //add " AND " to each element in array, exept last
            filterExpArray.splice(n, 1, (filterExpArray[n] + " AND "));
        }
    }

    console.log('filterExpArray = ' + filterExpArray);

    function filterExpFunc() {
        if (filterExpArray.length == 1) {
            var fE = filterExpArray[0];
            filterExpString.push(fE);
        } else {
            if (filterExpArray.length > 1) {
                for (m = 0; m < filterExpArray.length - 1; m++) {
                    var fE = filterExpArray[m] += filterExpArray[m + 1];
                    filterExpString.push(fE)
                }
            }
        }

        console.log('fE = ' + fE);
        console.log('filterExpString = ' + filterExpString);
    }

    filterExpFunc();
    //console.log('filterExp = '+fE);

    {
        var params = {
            TableName: 'teamster-application-database',
            /* required */
            ExpressionAttributeNames: {
                //"#last_name": Object.keys(postBody)[0], //lname
                //"#first_name": Object.keys(postBody)[1] //fname
            },
            ExpressionAttributeValues: {
                //":lname": {
                //  "S": Object.values(postBody)[0] //Smith
                //},
                //":fname": {
                //  "S": Object.values(postBody)[1] //John
                //},
            },
            FilterExpression: filterExpString[0]
        };

        if (postBody["lname"] !== '') {
            params["ExpressionAttributeNames"]["#last_name"] = Object.keys(postBody)[0]
        };
        if (postBody["fname"] !== '') {
            params["ExpressionAttributeNames"]["#first_name"] = Object.keys(postBody)[1]
        };
        if (postBody["lname"] !== '') {
            params["ExpressionAttributeValues"][":lname"] = {
                "S": Object.values(postBody)[0]
            }
        };
        if (postBody["fname"] !== '') {
            params["ExpressionAttributeValues"][":fname"] = {
                "S": Object.values(postBody)[1]
            }
        };

        console.log('params["ExpressionAttributeValues"] = ' + params["ExpressionAttributeValues"]); //{ ':lname': { S: 'Smith' }, ':fname': { S: 'John' } }
        console.log('params["ExpressionAttributeNames"] = ' + params["ExpressionAttributeNames"]); //{ '#last_name': 'lname', '#first_name': 'fname' }
        console.log('params["FilterExpression"] = ' + params["FilterExpression"]);
        console.log('params = ' + params); //{ '#last_name': 'lname', '#first_name': 'fname' }


        dyn.scan(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            //else console.log(data); // successful response --logs entire data object
            console.log(data.Items);
            response.send(data); //sends results of scan & filter back to client (scan-filter.html)
            //response.render('scan-filter.pug');
            //response.json(data.Items);
        });
        /**scan and filter table******************************************************************************** */
    }
});






app.listen(3000, () => console.info('Application running on port 3000'));