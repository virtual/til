import React, { Component } from 'react';

export default class Single extends Component {
  render() {
    var entryContent = [];
    
    this.props.entryContent.forEach((ec, i) => {
      console.log( ec)
      var val= [];
      if (ec.nodeType === 'paragraph') {
        ec.content.forEach((elData, key) => {
          if (elData.nodeType === 'text') {
            // console.log(elData.value)
            val.push(elData.value);
          } else if (elData.nodeType === 'hyperlink') {
            var href = elData.data.uri;
            val.push(<a key={'key' + key + i} href={href}>{elData.content[0].value.toString()}</a>);
          }
          
        });
        entryContent.push(<p key={'key' + i}>{val}</p>)
      } // end p
      
    });
    console.log(entryContent)
    return (
      <div>
        <p><a href="/posts">Return to all</a></p>
      <article> 
          <h1>{this.props.title}</h1>
          <p className="timestamp">{this.props.date}</p>
     {/* How to get meta description in post head */}

          {entryContent}
          
      </article>
      </div>
    );
  }
}