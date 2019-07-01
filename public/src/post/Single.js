import React, { Component } from 'react';

export default class Single extends Component {
  render() {
    var entryContent = [];
    this.props.entryContent.forEach((ec, i) => {
      entryContent.push(ec)
    });
    return (
      <div>
        <p><a href="/posts">Return to all</a></p>
      <article> 
          <h1>{this.props.title}</h1>
          <p className="timestamp">{this.props.date}</p>
     {/* How to get meta description in post head */}

          
          
      </article>
      </div>
    );
  }
}