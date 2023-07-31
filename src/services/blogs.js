import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return (response.data);
}

const addNewBlog = async (blog, user) => {
  const response = await axios.post(
    baseUrl, blog, {
      headers: {
        "authorization": `Bearer ${user.token}`,
        "content-type": "application/json"
      }
    }
  );
  return (response.data);
};

const updateLikes = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return (response.data)
};

const deleteBlog = async (blog, user) => {
  const response = await axios.delete(
    `${baseUrl}/${blog.id}`, {
      headers: {
        "authorization": `Bearer ${user.token}`,
        "content-type": "application/json"
      }
    }
  );
  return (response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNewBlog, deleteBlog, updateLikes };
