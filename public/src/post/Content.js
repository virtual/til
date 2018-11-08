import React, { Component } from 'react';

export default class Content extends Component {
  render() {
    return (
      <article>
        <h2><a href={"posts/"+this.props.id+"/"+this.props.slug}>{this.props.title}</a></h2>
        <p>{this.props.date}</p>
        <p>{this.props.metaDescription}</p>
      </article>
    );
  }
}