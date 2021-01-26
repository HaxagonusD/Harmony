import axios from "axios"
function getComments(id) {
  const instance = axios.create({
    withCredentials: true,
  });

  const { data } = await instance.get(`/api/users/${id}`);

  return data;
}

export default getComments;
