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
  userInfo: {
    $id: "",
    name: "",
    avatarURL: "",
  },
  projectModalForm: false,
  projectModalFormEdit: false,
  projectModal: false,
  activeProject: -1,
  activeUserId: null,
  activeFilter: "All",
  deletingProject: false,
});

export default state;
