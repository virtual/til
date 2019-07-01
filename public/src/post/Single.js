import React, { Component } from 'react';

export default class Single extends Component {
  render() {
    var entryContent = [];

    this.props.entryContent.forEach((ec, i) => {
      console.log(ec)
      var val = [];

      ec.content.forEach((elData, key) => {
        // console.log( elData.marks[0])
        if (elData.nodeType === 'paragraph') {
          // console.log(elData.value)
          val.push(<p key={'key' + key + i}>{elData.content[0].value.toString()}</p>);
        } else if (elData.nodeType === 'hyperlink') {
          var href = elData.data.uri;
          val.push(<a key={'key' + key + i} href={href}>{elData.content[0].value.toString()}</a>);
        } else if (elData.nodeType === 'text' && (elData.marks.length > 0)) {
          if (elData.marks[0].type === "code") {
            // var href = elData.data.uri;
            val.push(<code key={'key' + key + i}>{elData.value.toString()}</code>);
          } else {
            val.push(elData.value);
          }
        }
        else {
          val.push(elData.value);
        }
      });


      if (ec.nodeType === 'paragraph') {

        entryContent.push(<p key={'key' + i}>{val}</p>)
      } // end p
      else if (ec.nodeType === 'blockquote') {

        entryContent.push(<blockquote key={'key' + i}>{val}</blockquote>)
      }

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