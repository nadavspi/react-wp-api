import React from 'react';
import xhr from 'xhr';
import API from '../helpers/API';
import Router from 'react-router';

export default React.createClass({
  mixins: [ Router.State ],
  getInitialState () {
    return {
      post: {},
      isLoaded: false
    };
  },

  componentDidMount () {
    this.getPost();
  },

  componentWillReceiveProps () {
    this.getPost();
  },

  getPost () {
    let { slug, type } = this.getParams();

    xhr({
      url: `${API}/${type}?filter[name]=${slug}`,
      responseType: 'json'
    }, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          post: body[0],
          isLoaded: true
        });
      }
    });
  },

  render () {
    const { post } = this.state;

    return (
      <div>
        {this.state.isLoaded ? (
          <article>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={ {__html: post.content} } />
          </article>
         ) : (
           <h2>Loading</h2>
         )}
      </div>
    );
  }
});
