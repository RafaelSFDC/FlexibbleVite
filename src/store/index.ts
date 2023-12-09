import { proxy } from "valtio";

const state = proxy({
  logged: false,
  loading: {
    start: true,
    chats: true,
  },
  userId: "",
  userCollection: "",
  chats: [],
  projects: [],
  user: {
    image: "",
    $id: "",
  },
  activeChat: null,
  users: [],
  activeUser: null,
  activeUserInfo: null,
  activeUserId: null,
  activeFilter: "All",
  chatCrated: false,
  deletingProject: false,
});

export default state;
