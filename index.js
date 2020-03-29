const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const SHORT_REQUEST_TIME_IN_MS = 1000;
const LONG_REQUEST_TIME_IN_MS = 5000;

function longAsync() {
    return new Promise(res => {
        setTimeout(() => res(LONG_REQUEST_TIME_IN_MS), LONG_REQUEST_TIME_IN_MS);
    });
}

function shortAsync() {
    return new Promise(res => {
        setTimeout(() => res(SHORT_REQUEST_TIME_IN_MS), SHORT_REQUEST_TIME_IN_MS);
    });
}
 
async function requestHandler() {
    return [await longAsync(), await shortAsync()];
}

async function requestConcurrentHandler() {
    const returnValue = await Promise.all([longAsync(), shortAsync()]);
    return returnValue; 
}

app.get('/test', async function(req, res) {
    res.send(await requestConcurrentHandler());
});

app.get('/', async function(req, res) {
    res.send(await requestHandler());
});

app.listen(port);
console.log('Server started! At http://localhost:' + port);
