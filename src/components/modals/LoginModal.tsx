import { toast } from "sonner";
import ButtonMotion from "../framerMotion/ButtonMotion";
import { appWriteLogin } from "../../libs/appwrite/api";
import ModalMotion from "../framerMotion/ModalMotion";
import FormField from "../FormField";
import { useSnapshot } from "valtio";
import state from "../../store";

const LoginModal = () => {
  const snap = useSnapshot(state);
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    toast.promise(appWriteLogin(data), {
      loading: "Logging in...",
      success: () => {
        state.loginModal = false;
        return `Logged in successfully`;
      },
      error: (data) => {
        console.log(data);
        return "error";
      },
    });
  };

  return (
    <ModalMotion isOpen={snap.loginModal}>
      <h3 className="modal-head-text">Sign in</h3>
      <form onSubmit={handleFormSubmit} className="flexStart form">
        <FormField
          title="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
        />
        <FormField
          title="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <div className="flexStart w-full">
          <ButtonMotion type="submit">Login in</ButtonMotion>
        </div>
      </form>
    </ModalMotion>
  );
};

export default LoginModal;
