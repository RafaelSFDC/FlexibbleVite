import { proxy } from "valtio";

const state = proxy({
  logged: true,
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
  projectModalForm: true,
  activeUserId: null,
  activeFilter: "All",
  chatCrated: false,
  deletingProject: false,
});

export default state;
