import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const snap = useSnapshot(state);
  if (snap.logged) {
    return;
  }
  return <div>AuthProviders</div>;
};

export default AuthProviders;
