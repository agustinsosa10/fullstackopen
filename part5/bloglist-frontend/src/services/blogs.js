import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  console.log(newToken)
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {

  const config = {
    headers: {
      Authorization: token,
    },
  };

  console.log(token)
  
  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    console.error(
      "error al crear el blog",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default { getAll, create, setToken };
