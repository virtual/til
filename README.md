# Today I Learned

A project for pulling latest posts using Contentful

## Prerequisites

-   **Node** v4.7.2 or greater

## Start the project

### :one: Clone the project using the following command:

```bash
git clone https://github.com/contentful/boilerplate-javascript.git
```
### :two: Install dependencies and start it:

```shell
npm install && npm start
```

## Dev

.env file:
```
CONTENTFUL_SPACE_ID=<spaceid>
CONTENTFUL_ACCESS_TOKEN=<accesstoken>
```

`npm install` from root

`npm install` from public/

`nodemon index.js` from root

`npm start` from public/


## Contentful notes

Contentful's Rich Text field has an official React renderer specifically for this purpose that handles all the different node types (paragraphs, blockquotes, headings, links, etc.) 

For detailed implementation guide, see: [Contentful Reference](./CONTENTFUL_RICH_TEXT_SOLUTION.md)

