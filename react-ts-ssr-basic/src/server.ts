import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as express from 'express';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import App from './App';

const app = express();

const staticFiles = [
    '/static/*',
    '/asset-manifest.json',
    '/manifest.json',
    '/service-worker.js',
    '/favicon.ico',
    '/logo.svg',
];

staticFiles.forEach(file => {
    app.get(file, (req, res) => {
        const filePath = path.join(__dirname, '../build', req.url);
        res.sendFile(filePath);
    });
});

app.use('*', (req, res) => {
    const html = path.join(__dirname, '../build/index.html');
    const htmlData = fs.readFileSync(html).toString();

    const ReactApp = ReactDOMServer.renderToString(React.createElement(App, {}, req.baseUrl));
    const renderedHtml = htmlData.replace('<div id="root">{{SSR}}</div>', '<div id="root">'+ ReactApp +'<script id="initial-data" type="text/plain" data-json="'+ req.baseUrl +'"></script>');

    res.status(200).send(renderedHtml);


    // const ReactApp = ReactDOMServer.renderToString(React.createElement);
    // const renderedHtml = htmlData.replace('{{SSR}}', ReactApp);
    // res.status(200).send(renderedHtml);
});

const server = http.createServer(app);
server.listen(3000);