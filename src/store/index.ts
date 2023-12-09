import { proxy } from "valtio";

const state = proxy({
  logged: false,
  loading: {
    start: true,
    chats: true,
    createAccount: true,
    projects: true,
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
  createAccountModal: false,
  loginModal: false,
  activeProject: -1,
  activeUserId: null,
  activeFilter: "All",
  deletingProject: false,
});

export default state;
