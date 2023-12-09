import Image from "next/image";
import Link from "next/link";
import ButtonMotion from "./framerMotion/ButtonMotion";
import { toast } from "sonner";
import { appWriteDeleteProject } from "@/app/api/appwrite/api";
import state from "@/store/store";
import { useRouter } from "next/navigation";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  let loading = false;
  const router = useRouter();

  const handleDeleteProject = async () => {
    if (state.deletingProject) {
      return;
    }
    toast.promise(appWriteDeleteProject(projectId), {
      loading: "Deleting your project...",
      success: (data) => {
        loading = false;
        router.push("/");
        return `Your project has been deleted successfully`;
      },
      error: (data) => {
        loading = false;
        return `Something went wrong, please try again later`;
      },
    });
  };
  return (
    <>
      <ButtonMotion className="flexCenter view-action_btn bg-green-500">
        <Link href={`/edit-project/${projectId}`}>
          <Image src="/pencile.svg" alt="edit" width={24} height={24} />
        </Link>
      </ButtonMotion>
      <ButtonMotion
        type="button"
        className="flexCenter delete-action_btn bg-red-500"
        onClick={handleDeleteProject}
        disabled={loading}
      >
        <Image src="/trash.svg" alt="delete" width={24} height={24} />
      </ButtonMotion>
    </>
  );
};

export default ProjectActions;
