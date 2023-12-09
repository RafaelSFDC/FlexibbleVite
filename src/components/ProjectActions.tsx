import ButtonMotion from "./framerMotion/ButtonMotion";
import { toast } from "sonner";
import state from "../store";
import { appWriteDeleteProject } from "../libs/appwrite/api";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  let loading = false;

  const handleDeleteProject = async () => {
    if (state.deletingProject) {
      return;
    }
    toast.promise(appWriteDeleteProject(projectId), {
      loading: "Deleting your project...",
      success: () => {
        loading = false;
        state.projectModal = false;
        return `Your project has been deleted successfully`;
      },
      error: () => {
        loading = false;
        return `Something went wrong, please try again later`;
      },
    });
  };
  return (
    <>
      <ButtonMotion
        className="flexCenter view-action_btn bg-green-500"
        onClick={() => (
          (state.projectModal = false), (state.projectModalFormEdit = true)
        )}
      >
        <img src="/pencile.svg" alt="edit" width={24} height={24} />
      </ButtonMotion>
      <ButtonMotion
        type="button"
        className="flexCenter delete-action_btn bg-red-500"
        onClick={handleDeleteProject}
        disabled={loading}
      >
        <img src="/trash.svg" alt="delete" width={24} height={24} />
      </ButtonMotion>
    </>
  );
};

export default ProjectActions;
