import ProjectForm from "../ProjectForm";
import state from "../../store";
import ModalMotion from "../framerMotion/ModalMotion";
import { useSnapshot } from "valtio";

const CreateProjectModal = () => {
  const snap = useSnapshot(state);
  if (!snap.logged) {
    return null;
  }
  return (
    <ModalMotion isOpen={snap.projectModalForm}>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type="create" />
    </ModalMotion>
  );
};

export default CreateProjectModal;
