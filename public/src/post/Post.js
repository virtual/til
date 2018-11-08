import React, { Component } from 'react';
import Content from './Content'
const axios = require('axios');

export default class Post extends Component {
  constructor(){
    super();
    this.state = { 
      initialized: false,
      posts: []
    }
    this.slug = undefined;
    this.fetchPosts = this.fetchPosts.bind(this); 
  }
  componentDidMount() {
    // this.getSlug();
    this.fetchPosts(); 
  }
  getSlug() {
    let sluggyPath = window.location.pathname;
    let sluggyReg = /(post\/)([\w\-]+)/; 

    if (!(sluggyPath.match(sluggyReg))) {  
      window.location.replace("/posts");
    }

    var found = sluggyPath.match(sluggyReg)[2];
    this.slug = found; // dont use state cuz it won't set
  }


  fetchPosts() {
    // var url = '/posts/'+this.slug;
    var url = '/posts/';
    axios.get(url, { 
    }).then((PostsObj) => { 
      console.log(PostsObj)
      if (PostsObj.data !== undefined) { 
        this.setState({ 
          initialized: true,
          Posts: PostsObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render() {
    if (this.state.initialized) { 
      // let post = this.state.posts.post[0]; 
      return (
        <div> 
         POSTY
         <Content/>
        </div>
      );
    } else {
      return(
      <div>Loading...</div>
      )
    }
  }
}