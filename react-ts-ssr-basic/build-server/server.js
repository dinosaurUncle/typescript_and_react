"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App_1 = require("./App");
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
    const ReactApp = ReactDOMServer.renderToString(React.createElement(App_1.default, {}, req.baseUrl));
    const renderedHtml = htmlData.replace('<div id="root">{{SSR}}</div>', '<div id="root">' + ReactApp + '<script id="initial-data" type="text/plain" data-json="' + req.baseUrl + '"></script>');
    res.status(200).send(renderedHtml);
    // const ReactApp = ReactDOMServer.renderToString(React.createElement);
    // const renderedHtml = htmlData.replace('{{SSR}}', ReactApp);
    // res.status(200).send(renderedHtml);
});
const server = http.createServer(app);
server.listen(3000);
//# sourceMappingURL=server.js.map