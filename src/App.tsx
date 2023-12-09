import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./globals.css";
import { useEffect } from "react";
import { appWriteGetProjects, checkUser } from "./libs/appwrite/api";
import { Toaster } from "sonner";
import CreateProjectModal from "./components/modals/CreateProjectModal";
import { useSnapshot } from "valtio";
import state from "./store/index";
function App() {
  const snap = useSnapshot(state);
  useEffect(() => {
    return () => {
      checkUser();
      appWriteGetProjects();
    };
  }, []);

  return (
    <>
      <CreateProjectModal />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
