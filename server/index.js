// ./server/index.js

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import App from '../client/components/App';

const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000;
const cdnHost =
  process.env.NODE_ENV === 'production'
    ? `https://storage.googleapis.com/react-ssr-blog/build/client`
    : `http://localhost:8080`;

app.get('/', (req, res) => {
  const jsx = ReactDOMServer.renderToString(<App />);

  const clientBundleStyle = `<link rel="stylesheet" href="${cdnHost}/styles/bundle.css">`;
  const clientBundleScript = `<script src="${cdnHost}/scripts/bundle.js"></script>`;

  res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>SSR Blog</title>
                ${clientBundleStyle} 
            </head>
            <body>
                <div id='ssr-app'>${jsx}</div> 
                ${clientBundleScript}
            </body>
        </html>
    `);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
