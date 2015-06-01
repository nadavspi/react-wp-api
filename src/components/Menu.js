import React from 'react';
import xhr from 'xhr';
import API from '../helpers/API';
import Router from 'react-router';
const { Link } = Router;

export default React.createClass({
  propTypes: {
    location: React.PropTypes.string.isRequired
  },

  getInitialState () {
    return {
      menuItems: []
    };
  },

  componentDidMount () {
    const { location } = this.props;

    xhr({
      url: `${API}/menu-locations/${location}`,
      responseType: 'json'
    }, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
	  menuItems: body
        });
      }
    });
  },

  render () {
    const menuItems = this.state.menuItems.map((post) => {
      // hacky. Need to get API to return slug instead of URL
      const url = post.url.split('/');
      const slug = url[url.length - 2];

      return (
	<li key={post.ID}>
	  <Link to="post" params={{ type: post.object + 's', slug }}>
	    {post.title}
	  </Link>
	</li>
      );
    });

    return (
      <nav>
	<ul>
	  {menuItems}
	</ul>
      </nav>
    );
  }
});
