//const express = require( 'express' );
import express from 'express';
import App from '../src/App';
import flow from './flow';

const fs = require( 'fs' );
const path = require( 'path' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const app = express();


// serve static assets
app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../build' ) ) );

// for any other requests, send `index.html` as a response
app.use( '*', ( req, res ) => {

    // read `index.html` file
    let indexHTML = fs.readFileSync( path.resolve( __dirname, '../build/index.html' ), {
        encoding: 'utf8',
    } );

    // Render App to string and replace root-node, add serverside-vars
    let appHTML = ReactDOMServer.renderToString( React.createElement(App) );
    indexHTML = indexHTML.replace(
      `<script id="serverside-vars"></script>`,
      `
        <script id="serverside-vars">
           window.serversideVars = {
            flow: ${flow}
           }
        </script>
      `
    );
    indexHTML = indexHTML.replace(
      `<div id="root"></div>`,
      `<div id="root">${ appHTML }</div>`
    );

    res.contentType( 'text/html' );
    res.status( 200 );

    return res.send( indexHTML );
} );

// run express server on port 9000
app.listen( '9000', () => {
    console.log( 'Express server started at http://localhost:9000' );
} );
