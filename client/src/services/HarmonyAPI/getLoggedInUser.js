import axios from "axios";

const getLoggedInUser = async () => {
  const instance = axios.create({
    withCredentials: true,
  });
  const { data } = await instance.get("/api/users/me");
  return data;
};

export default getLoggedInUser;
