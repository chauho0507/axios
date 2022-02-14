import requester from "./requester";

const user = {
  login: (user) => requester.post("staff-login", user),
  getPolicy: () => requester.get("user-policy"),
  getProfile: (token) => requester.get("staff-profile", token),
};

export default user;
