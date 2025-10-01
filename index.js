'use strict'
let express = require('express');
let app = express();
const contentful = require('contentful')
const chalk = require('chalk')
const Table = require('cli-table2')
const path = require('path')
const fs = require('fs')

require('dotenv').config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN

// Determine the correct build directory based on environment
let buildDir;
const localBuildPath = path.join(__dirname, 'public', 'build');
const serverBuildPath = path.join(__dirname, '..', 'html');

if (fs.existsSync(localBuildPath)) {
  buildDir = localBuildPath;
  console.log('Using local development build directory:', buildDir);
} else if (fs.existsSync(serverBuildPath)) {
  buildDir = serverBuildPath;
  console.log('Using server build directory:', buildDir);
} else {
  console.error('Neither build directory found. Please ensure build files exist.');
  buildDir = localBuildPath; // fallback
}

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
})

// console.log(chalk.green.bold('\nWelcome to the Contentful JS Boilerplate\n'))
// console.log('This is a simplified example to demonstrate the usage of the Contentful CDA\n')

// Entry point of the boilerplate, called at the end.
// function runBoilerplate () {
//   displayContentTypes()
//   .then(displayEntries)
//   .then(() => {
//     console.log('Want to go further? Feel free to check out this guide:')
//     console.log(chalk.cyan('https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/\n'))
//   })
//   .catch((error) => {
//     console.log(chalk.red('\nError occurred:'))
//     if (error.stack) {
//       console.error(error.stack)
//       return
//     }
//     console.error(error)
//   })
// }

// function displayContentTypes () {
//   console.log(chalk.green('Fetching and displaying Content Types ...'))

//   return fetchContentTypes()
//   .then((contentTypes) => {
//     // Display a table with Content Type information
//     const table = new Table({
//       head: ['Id', 'Title', 'Fields']
//     })
//     contentTypes.forEach((contentType) => {
//       const fieldNames = contentType.fields
//         .map((field) => field.name)
//         .sort()
//       table.push([contentType.sys.id, contentType.name, fieldNames.join(', ')])
//     })
//     console.log(table.toString())

//     return contentTypes
//   })
// }

// function displayEntries (contentTypes) {
//   console.log(chalk.green('Fetching and displaying Entries ...'))

//   return Promise.all(contentTypes.map((contentType) => {
//     return fetchEntriesForContentType(contentType)
//     .then((entries) => {
//       console.log(entries)
 
//     })
//   }))
// }

// Serve static files from the React build
app.use(express.static(buildDir));

// Serve the React app for the root route
app.get("/", function(req, res, next) {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.get('/api/posts', function(req, res, next) {
  console.log('all posts')
  var reqtype = { 
    sys: {
      id: 'post'
    }
  }
  fetchEntriesForContentType(reqtype)
  
  .then((entries) => {
    // console.log(entries)
    // entries.sort()
    res.json(entries);
  });
});

// Load all Content Types in your space from Contentful
// function fetchContentTypes () {
//   return client.getContentTypes()
//   .then((response) => response.items)
//   .catch((error) => {
//     console.log(chalk.red('\nError occurred while fetching Content Types:'))
//     console.error(error)
//   })
// }

// Load all entries for a given Content Type from Contentful
function fetchEntriesForContentType (contentType) {
  console.log(contentType);
  return client.getEntries({
      content_type: contentType.sys.id,
      skip: 0,
      limit: 50,
      order: '-fields.date'
    })
  .then((response) => response.items)
  .catch((error) => {
    console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`))
    console.error(error)
  })
}

// Load all entries for a given Content Type from Contentful
function fetchEntriesForSlug (contentType) {
  console.log('slug',contentType.fields.slug);
  return client.getEntries({
      // content_type: contentType.sys.id,
      skip: 0,
      limit: 1,
      'content_type': contentType.sys.id,
      // 'fields.slug': 'event-schema'
      'fields.slug': contentType.fields.slug
      // 'fields.slug[in]': contentType.fields.slug
      // ,
      // order: '-fields.date'

    })
  .then((response) => response.items)
  .catch((error) => {
    console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`))
    console.error(error)
  })
}

// this.contentfulClient.getEntries({
//   content_type: 'YOUR_CONTENT_KEY',
//   'fields.slug[in]': 'THE_SLUG_YOU_ARE_LOOKING_FOR',
// })
 
 
// Return content for single post
app.get("/api/posts/:slug", function(req, res, next){
  console.log(req.params.slug)
  var reqtype = { 
    sys: {
      id: 'post'
      // limit fields in res
    },
    fields: {
      slug: req.params.slug
    }
  }
  fetchEntriesForSlug(reqtype)
  .then((entries) => {
    // console.log(entries)
    // entries.sort()
    res.json(entries);
  });
})

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

var port = process.env.PORT || 5000;

//app.listen(port, '165.227.114.90', function(){
app.listen(port, function(){
  console.log('TIL server is listening on ' + port);
  console.log(`${__dirname}`);
});