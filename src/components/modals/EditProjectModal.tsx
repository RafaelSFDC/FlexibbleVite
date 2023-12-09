import ProjectForm from "../ProjectForm";
import state from "../../store";
import ModalMotion from "../framerMotion/ModalMotion";
import { useSnapshot } from "valtio";

const EditProjectModal = () => {
  const snap = useSnapshot(state);
  if (!snap.logged) {
    return null;
  }
  return (
    <ModalMotion isOpen={snap.projectModalFormEdit}>
      <h3 className="modal-head-text">Edit your project</h3>
      <ProjectForm type="edit" />
    </ModalMotion>
  );
};

export default EditProjectModal;
