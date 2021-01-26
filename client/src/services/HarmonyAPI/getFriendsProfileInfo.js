import axios from "axios";

const getFriendsProfileInfo = async (id) => {
  const instance = axios.create({
    withCredentials: true,
  });
  const { data } = await instance.get(`/api/users/${id})`;
  return data;
};

export default getFriendsProfileInfo;

