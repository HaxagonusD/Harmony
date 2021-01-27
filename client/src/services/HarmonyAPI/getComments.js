import axios from "axios";
async function getComments(id) {
  const instance = axios.create({
    withCredentials: true,
  });

  const { data } = await instance.get(`/api/comment/${id}`);

  return data;
}

export default getComments;
