import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Field from './Field';
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
      isLoggedIn, userId, onSubmitPost,
    } = this.props;
    const { post } = this.state;
    const { posts } = this.props;
    const buttonDisabled = post === '';

    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
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
      <div className="home container">
        <div>
          <Field fieldLabel="Write something" id="post" type="text" value={post} onChange={(e) => { this.handlePost(e); }} />
          <CustomButton
            buttonText="Post"
            id="postButton"
            disabled={buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              onSubmitPost(post, userId);
              this.resetInput();
            }}
          />
        </div>
        <div className="posts">
          <h1>Latest posts:</h1>
          <ul>{postItems}</ul>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
  userId: PropTypes.number,
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
  userId: null,
  posts: [],
};
