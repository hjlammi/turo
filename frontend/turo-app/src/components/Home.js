import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Field from './Field';
import CustomButton from './CustomButton';
import '../css/container.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
    };
  }

  handlePost = (event) => {
    this.setState({
      post: event.target.value,
    });
  }

  render() {
    const { isLoggedIn, onSubmitPost } = this.props;
    const { post } = this.state;

    if (!isLoggedIn) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    const buttonDisabled = post === '';

    return (
      <div className="home container">
        <div>
          <Field fieldLabel="Write something" id="post" type="text" onChange={(e) => { this.handlePost(e); }} />
          <CustomButton
            buttonText="Post"
            id="postButton"
            disabled={buttonDisabled}
            onClick={(e) => {
              e.preventDefault();
              onSubmitPost(post);
            }}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
};
