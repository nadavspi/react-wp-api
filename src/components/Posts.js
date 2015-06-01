import React from 'react';
import xhr from 'xhr';
import API from '../helpers/API';
import Router from 'react-router';
const { Link } = Router;

export default React.createClass({
  getInitialState () {
    return {
      posts: [],
      isLoaded: false
    };
  },

  componentDidMount () {
    xhr({
      url: `${API}/posts`,
      responseType: 'json'
    }, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          posts: body,
          isLoaded: true
        });
      }
    });
  },

  render () {
    const posts = this.state.posts.map((post) => {
      return (
        <li key={post.ID}>
          <h2>
            <Link to="post" params={{ type: post.type + 's', slug: post.slug }}>
              {post.title}
            </Link>
          </h2>
          <time>{post.date}</time>
        </li>
      );
    });


    return (
      <div>
        {this.state.isLoaded ? (
          <ol>
          {posts}
          </ol>
         ) : (
           <h2>Loading</h2>
         )}
      </div>
    );
  }
});
