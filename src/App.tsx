import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./globals.css";
import { useEffect } from "react";
import { appWriteGetProjects, checkUser } from "./libs/appwrite/api";
import { Toaster } from "sonner";
import CreateProjectModal from "./components/modals/CreateProjectModal";
import EditProjectModal from "./components/modals/EditProjectModal";
import ProjectModal from "./components/modals/ProjectModal";
import CreateAccountModal from "./components/modals/CreateAccountModal";
import LoginModal from "./components/modals/LoginModal";
function App() {
  useEffect(() => {
    checkUser();
    appWriteGetProjects();
  }, []);

  return (
    <>
      <EditProjectModal />
      <CreateProjectModal />
      <CreateAccountModal />
      <LoginModal />
      <ProjectModal />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
