import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as express from 'express';

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