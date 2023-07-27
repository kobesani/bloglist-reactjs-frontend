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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addNewBlog };
