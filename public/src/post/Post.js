import React, { Component } from 'react';
import Content from './Content'
import Single from './Single'
const axios = require('axios');

export default class Post extends Component {
  constructor(){
    super();
    this.state = { 
      initialized: false,
      posts: []
    }
    this.slug = this.getSlug();
    this.fetchPosts = this.fetchPosts.bind(this); 
  }
  componentDidMount() {
    // this.slug = 
    this.fetchPosts(this.slug); 
  }
  getSlug() {
    let sluggyPath = window.location.pathname;
    let sluggyReg = /^\/(posts\/)([\w-]*)$/; 
    // console.log('sluggyPath', sluggyPath)
    // console.log('sluggyReg', sluggyReg)
    if (!(sluggyPath.match(sluggyReg))) {  // not a valid posts URL
      
      if (window.location.pathname !== '/posts') {
        window.location.replace("/posts");
      } 
    } else {
      var found = sluggyPath.match(sluggyReg)[2];
      this.slug = found; // dont use state cuz it won't set
      // console.log('found', found)
      return found;
    }
  }


  fetchPosts(slug) { 
    var url = '/posts';
    if (slug) { url = '/posts/' + slug; }
    axios.get(url, { 
    }).then((PostsObj) => { 
      console.log('slug')
      console.log(PostsObj.data)
      if (PostsObj.data !== undefined) { 
        this.setState({ 
          initialized: true,
          posts: PostsObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render() {

    let postList = []; 
    if (this.state.initialized) { 
      if (this.state.posts.length === 1) { 
        var post = this.state.posts[0];
        console.log(post)
        return (
         <div>
           <Single key='item0' 
            id={post.sys.id}
            title={post.fields.title} 
            date={post.fields.date} 
            slug={post.fields.slug} 
            metaDescription={post.fields.metaDescription} 
            entryContent={post.fields.entry.content}             
            />
           
         </div>
        ) 
      } // end single
  
      // let post = this.state.posts.post[0]; 
       else  if (this.state.posts.length > 1) {
        this.state.posts.forEach((post, i) => {
          postList.push(
            <Content key={i} 
            id={post.sys.id}
            title={post.fields.title} 
            date={post.fields.date} 
            slug={post.fields.slug} 
            metaDescription={post.fields.metaDescription} />
          );
        }); 
            console.log(postList)
        return (
          <div> 
          
          {postList}
          
          </div>
        );
        } // end multi 
      } // initialized 
      
      else {
      return(
      <div>
        Loading...
        
        </div>
      )
    }
  }
}