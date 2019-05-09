const createPost = (post, userId) => ({
  type: 'CREATE_POST',
  post,
  userId,
});

export default createPost;
