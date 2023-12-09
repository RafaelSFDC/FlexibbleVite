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
  projectModalForm: false,
  projectModalFormEdit: false,
  activeProject: 0,
  activeUserId: null,
  activeFilter: "All",
  deletingProject: false,
});

export default state;
