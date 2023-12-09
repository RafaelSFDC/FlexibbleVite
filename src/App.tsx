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
function App() {
  useEffect(() => {
    return () => {
      checkUser();
      appWriteGetProjects();
    };
  }, []);

  return (
    <>
      <EditProjectModal />
      <CreateProjectModal />
      <ProjectModal />
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
