import axios from "axios";

const sendFriendRequest = async (friendId) => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const { data } = await axiosInstance.post(`/notifications/${friendId}`, {
    action: "friendRequest",
  });
  return data;
};

export default sendFriendRequest;
