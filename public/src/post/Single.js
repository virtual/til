import React, { Component } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

// Component to render a single blog post with rich text content
export default class Single extends Component {
  render() {
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

    // Helper function to generate unique keys for React elements
    const generateKey = (nodeType, suffix = '') => {
      return `${nodeType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}${suffix ? '_' + suffix : ''}`;
    };

    // Define how to render different node types and marks based on what is 
    // expected in the rich text content
    const RICH_TEXT_OPTIONS = {
      renderMark: {
        [MARKS.BOLD]: text => <strong>{text}</strong>,
        [MARKS.ITALIC]: text => <em>{text}</em>,
        [MARKS.CODE]: text => <code>{text}</code>,
      },
      renderNode: {
        [BLOCKS.HEADING_1]: (node, children) => <h1 key={generateKey('h1')}>{extractText(children)}</h1>,
        [BLOCKS.HEADING_2]: (node, children) => <h2 key={generateKey('h2')}>{extractText(children)}</h2>,
        [BLOCKS.HEADING_3]: (node, children) => <h3 key={generateKey('h3')}>{extractText(children)}</h3>,
        [BLOCKS.HEADING_4]: (node, children) => <h4 key={generateKey('h4')}>{extractText(children)}</h4>,
        [BLOCKS.PARAGRAPH]: (node, children) => {
          // Handle paragraphs with mixed content (text, links, etc.)
          const processedChildren = Array.isArray(children) ? 
            children.map((child, index) => {
              if (typeof child === 'string') return child;
              // If it's a React element, render it properly
              if (child && child.type) {
                return React.cloneElement(child, { key: generateKey('para_child', index) });
              }
              return extractText(child);
            }) : extractText(children);
          
          return <p key={generateKey('paragraph')}>{processedChildren}</p>;
        },
        [BLOCKS.QUOTE]: (node, children) => <blockquote key={generateKey('quote')}>{extractText(children)}</blockquote>,
        [BLOCKS.OL_LIST]: (node, children) => <ol key={generateKey('ol')}>{children}</ol>,
        [BLOCKS.UL_LIST]: (node, children) => <ul key={generateKey('ul')}>{children}</ul>,  
        [BLOCKS.LIST_ITEM]: (node, children) => <li key={generateKey('li')}>{extractText(children)}</li>,
        [BLOCKS.HR]: () => <hr key={generateKey('hr')} />,
        // Handle hyperlinks properly
        'hyperlink': (node, children) => {
          const { uri } = node.data;
          return <a href={uri} key={generateKey('link')}>{extractText(children)}</a>;
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const { file, title } = node.data.target.fields;
          const url = file.url;
          const alt = title || 'Embedded Asset';
          return <img src={url} alt={alt} key={generateKey('asset')} />;
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          const { title, description } = node.data.target.fields;
          return (
            <div className="embedded-entry" key={generateKey('entry')}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          );
        },
      }
    };

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