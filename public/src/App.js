import React, { Component } from 'react';
// import logo from './logo.svg';
import Post from './post/Post'
import './App.css';

import { Container } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

         
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TIL
          </a>
        </header>
        <main>
        <Container>
        <Post/>
        </Container>
        </main>
        <footer>Today I learned...</footer>
      </div>
    );
  }
}

export default App;
