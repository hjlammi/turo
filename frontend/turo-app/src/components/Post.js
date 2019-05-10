import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../css/post.css';


const Post = (props) => {
  Post.propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };

  const {
    username, date, content,
  } = props;

  const parsedDate = moment(date).format('MMMM Do YYYY HH:mm');

  return (
    <div className="post">
      <div>
        <div className="username">{username}</div>
        <div className="date">{parsedDate}</div>
      </div>
      <div className="content">{content}</div>
    </div>
  );
};

export default Post;
