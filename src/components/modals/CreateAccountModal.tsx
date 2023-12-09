import { toast } from "sonner";
import { appWriteCreateUser } from "../../libs/appwrite/api";
import FormField from "../FormField";
import ButtonMotion from "../framerMotion/ButtonMotion";
import ModalMotion from "../framerMotion/ModalMotion";
import { useSnapshot } from "valtio";
import state from "../../store";

const CreateAccountModal = () => {
  const snap = useSnapshot(state);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (snap.loading.createAccount) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("RESULTADO DA FUNÇÃO FORMAT FORM:", data);

    toast.promise(appWriteCreateUser(data), {
      loading: "Creating your account...",
      success: () => {
        state.createAccountModal = false;
        return `Your account has been created successfully`;
      },
      error: "Something went wrong, please try again later",
    });
  };

  return (
    <ModalMotion isOpen={snap.createAccountModal}>
      <h3 className="modal-head-text">Sign Up</h3>
      <form onSubmit={handleFormSubmit} className="flexStart form">
        <FormField
          title="Username"
          type="text"
          name="name"
          placeholder="Enter your Username"
        />
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
          <ButtonMotion type="submit" leftIcon="/plus.svg">
            Create Account
          </ButtonMotion>
        </div>
      </form>
    </ModalMotion>
  );
};

export default CreateAccountModal;
