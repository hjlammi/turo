import { connect } from 'react-redux';
import Home from '../components/Home';
import createPost from '../actions/createPost';
import fetchPosts from '../actions/fetchPosts';

const mapStateToProps = state => ({
  isLoggedIn: state.global.user != null,
  user: state.global.user,
  posts: state.home.posts,
  postError: state.home.postError,
});

const mapDispatchToProps = dispatch => ({
  onSubmitPost: (post, userId) => dispatch(createPost(post, userId)),
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
