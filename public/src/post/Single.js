import React, { Component } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

export default class Single extends Component {
  render() {
    // Basic debugging
    console.log('=== DEBUGGING RICH TEXT ===');
    console.log('entryContent:', this.props.entryContent);
    console.log('nodeType:', this.props.entryContent && this.props.entryContent.nodeType);

    // Helper function to extract text from nested React objects
    const extractText = (children) => {
      if (typeof children === 'string') return children;
      if (Array.isArray(children)) {
        return children.map(child => extractText(child)).join('');
      }
      if (children && children.props && children.props.children) {
        return extractText(children.props.children);
      }
      return '';
    };

    const RICH_TEXT_OPTIONS = {
      renderMark: {
        [MARKS.BOLD]: text => <b>{text}</b>,
        [MARKS.ITALIC]: text => <i>{text}</i>,
        [MARKS.CODE]: text => <code>{text}</code>,
      },
      renderNode: {
        [BLOCKS.HEADING_1]: (node, children) => <h1>{extractText(children)}</h1>,
        [BLOCKS.HEADING_2]: (node, children) => <h2>{extractText(children)}</h2>,
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // Handle paragraphs with mixed content (text, links, etc.)
          const processedChildren = Array.isArray(children) ? 
            children.map((child, index) => {
              if (typeof child === 'string') return child;
              // If it's a React element, render it properly
              if (child && child.type) {
                return React.cloneElement(child, { key: index });
              }
              return extractText(child);
            }) : extractText(children);
          
          return <p>{processedChildren}</p>;
        },
        [BLOCKS.QUOTE]: (node, children) => <blockquote>{extractText(children)}</blockquote>,
        [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,  
        [BLOCKS.LIST_ITEM]: (node, children) => <li>{extractText(children)}</li>,
        [BLOCKS.HR]: () => <hr />,
        // Handle hyperlinks properly
        'hyperlink': (node, children) => {
          const { uri } = node.data;
          return <a href={uri} key={Math.random()}>{extractText(children)}</a>;
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const { file, title } = node.data.target.fields;
          const url = file.url;
          const alt = title || 'Embedded Asset';
          return <img src={url} alt={alt} />;
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          const { title, description } = node.data.target.fields;
          return (
            <div className="embedded-entry">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          );
        },
      }
    };
    
    // Since Post.js now passes post.fields.entry (the complete Rich Text document)
    // we can use it directly with documentToReactComponents
    
    return (
      <div>
        <p><a href="/posts">Return to all</a></p>
        <article>
          <h1>{this.props.title}</h1>
          <p className="timestamp">{this.props.date}</p>
          {/* How to get meta description in post head */}
          
          {this.props.entryContent && documentToReactComponents(this.props.entryContent, RICH_TEXT_OPTIONS)}
        </article>
      </div>
    );
  }
}