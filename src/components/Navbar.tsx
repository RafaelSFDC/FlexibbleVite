import { useSnapshot } from "valtio";
import ButtonMotion from "./framerMotion/ButtonMotion";
import { NavLinks } from "../constants";
import state from "../store/index";
import { appWriteLogout } from "../libs/appwrite/api";

const Navbar = () => {
  const snap = useSnapshot(state);

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <a href={"/"}>
          <img src="logo.svg" alt="Flexibble" width={115} height={43} />
        </a>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <a href={link.href} key={link.key}>
              {link.text}
            </a>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {snap.logged ? (
          <>
            <button>
              <img
                src={
                  snap.userInfo.avatarURL
                    ? state.userInfo.avatarURL
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="user"
                width={40}
                height={40}
              />
            </button>

            <ButtonMotion
              onClick={() => (state.projectModalForm = true)}
              className="text-sm bg-transparent"
            >
              Share Work
            </ButtonMotion>
            <ButtonMotion
              type="button"
              className="text-sm bg-transparent"
              onClick={() => ((state.logged = false), appWriteLogout())}
            >
              Sign Out
            </ButtonMotion>
          </>
        ) : (
          <>
            <ButtonMotion
              className="text-sm bg-transparent font-medium"
              onClick={() => (state.loginModal = true)}
            >
              Sign In
            </ButtonMotion>

            <ButtonMotion
              className="text-sm bg-transparent"
              onClick={() => (state.createAccountModal = true)}
            >
              Sign Up
            </ButtonMotion>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
