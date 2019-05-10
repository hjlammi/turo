import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
      {username}
      {parsedDate}
      {content}
    </div>
  );
};

export default Post;
