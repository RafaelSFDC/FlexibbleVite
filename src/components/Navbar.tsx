import { useSnapshot } from "valtio";
import ButtonMotion from "./framerMotion/ButtonMotion";
import { NavLinks } from "../constants";
import state from "../store/index";
import { lazy } from "react";

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
                  snap.user.image
                    ? state.user.image
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="user"
                width={40}
                height={40}
              />
            </button>

            <button onClick={() => (state.projectModalForm = true)}>
              Share Work
            </button>
            <ButtonMotion type="button" className="text-sm">
              Sign Out
            </ButtonMotion>
          </>
        ) : (
          <>
            <a href="login">
              <ButtonMotion className="btn btn-ghost btn-small">
                Sign In
              </ButtonMotion>
            </a>
            <a href="create-account">
              <ButtonMotion className="btn btn-primary btn-small bg">
                Sign Up
              </ButtonMotion>
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
