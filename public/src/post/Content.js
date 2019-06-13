import React, { Component } from 'react';
import { Divider, Segment } from 'semantic-ui-react'

export default class Content extends Component {
  render() {
    return (
      <article>
        <Segment>
        <Divider horizontal>
        {this.props.date}
    </Divider>
    {/* <h2><a href={"posts/"+this.props.id+"/"+this.props.slug}>{this.props.title}</a></h2> */}
     
        <h2><a href={"/posts/"+this.props.slug}>{this.props.title}</a></h2>
        <p>{this.props.metaDescription}</p>
  </Segment>
      </article>
    );
  }
}