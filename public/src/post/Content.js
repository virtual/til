import React, { Component } from 'react';

export default class Content extends Component {
  render() {
    return (
      <article>
        <h2>Title: {this.props.title}</h2>
        <p>{this.props.date}</p>
        <p>{this.props.metaDescription}</p>
      </article>
    );
  }
}