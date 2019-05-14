"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
app.use('*', (req, res) => {
    const html = path.join(__dirname, '../build/index.html');
    const htmlData = fs.readFileSync(html).toString();
    res.send(htmlData);
    // const ReactApp = ReactDOMServer.renderToString(React.createElement);
    // const renderedHtml = htmlData.replace('{{SSR}}', ReactApp);
    // res.status(200).send(renderedHtml);
});
const server = http.createServer(app);
server.listen(3000);
//# sourceMappingURL=server.js.map