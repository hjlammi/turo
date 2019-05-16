import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CustomButton from './CustomButton';
import Post from './Post';
import '../css/container.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
    };
  }

  componentDidMount() {
    const { fetchPosts } = this.props;
    fetchPosts();
  }

  handlePost = (event) => {
    this.setState({
      post: event.target.value,
    });
  }

  resetInput = () => {
    this.setState({
      post: '',
    });
  }

  render() {
    const {
      isLoggedIn, user, onSubmitPost,
    } = this.props;
    const { post } = this.state;
    const { posts } = this.props;
    const buttonDisabled = post === '' || post.length > 500;

    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    // Error message if the post is too long.
    let errorMsg = <div className="error" />;
    if (post.length > 500) {
      errorMsg = <div className="error">The maximum length of a post is 500 characters.</div>;
    }

    let postItems = <p />;
    if (posts && posts.length > 0) {
      postItems = posts.map(postItem => (
        <li key={`${postItem.username}_${postItem.created}`}>
          <Post username={postItem.username} date={postItem.created} content={postItem.content} />
        </li>
      ));
    }

    return (
      <div className="container">
        <div className="home">
          {errorMsg}
          <div className="form">
            <label type="label" htmlFor="post" className="label">
              Write something
              <textarea id="post" type="text" value={post} onChange={(e) => { this.handlePost(e); }} />
            </label>
            <CustomButton
              buttonText="Post"
              id="postButton"
              disabled={buttonDisabled}
              onClick={(e) => {
                e.preventDefault();
                onSubmitPost(post, user.id);
                this.resetInput();
              }}
            />
          </div>
          <div className="posts">
            <h1>Latest posts:</h1>
            <ul>{postItems}</ul>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ),
};

Home.defaultProps = {
  user: null,
  posts: [],
};
