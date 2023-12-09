import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ButtonMotion from "./framerMotion/ButtonMotion";
import {
  appWriteCreateProject,
  appWriteEditProject,
} from "../libs/appwrite/api.js";
import { useSnapshot } from "valtio";
import { categoryFilters } from "../constants";
import state from "../store";

const ProjectForm = ({ type }: { type: string }) => {
  const snap = useSnapshot(state);
  const [selectedImage, setSelectedImage] = useState("");
  const [file, setFile] = useState<File | undefined>(undefined);

  // EDIT FORM ONLY
  useEffect(() => {
    return () => {
      if (type === "edit") setSelectedImage(projectDetails.image);
    };
  }, []);

  type ProjectDetails = {
    $id: string;
    title: string;
    createdBy: [
      {
        $id: string;
        name: string;
        avatarURL: string;
      }
    ];
    category: string;
    image: string;
    description: string;
    liveSiteUrl: string;
    githubUrl: string;
  };
  const projectDetails: ProjectDetails =
    type === "edit"
      ? snap.projects[snap.activeProject]
      : {
          $id: "",
          title: "",
          createdBy: [
            {
              $id: "",
              name: "",
              avatarURL: "",
            },
          ],
          category: "",
          image: "",
          description: "",
          liveSiteUrl: "",
          githubUrl: "",
        };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("RESULTADO DA FUNÇÃO FORMAT FORM:", data);
    console.log(data);
    console.log("type check:", type);
    if (type === "create") {
      toast.promise(appWriteCreateProject(data, file), {
        loading: "Creating your project...",
        success: () => {
          state.projectModalForm = false;
          state.projectModalFormEdit = false;
          return `Your project has been created successfully`;
        },
        error: "Something went wrong, please try again later",
      });
    } else {
      toast.promise(appWriteEditProject(data, file), {
        loading: "Updating your project...",
        success: () => {
          state.projectModalForm = false;
          state.projectModalFormEdit = false;
          return `Your project has been updated successfully`;
        },
        error: "Something went wrong, please try again later",
      });
    }
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.includes("image")) {
      toast.error("Please select an image");
      return;
    }

    const objectURL = URL.createObjectURL(file);
    setSelectedImage(objectURL);

    setFile(file);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        {!selectedImage && (
          <label htmlFor="poster" className="flexCenter form_image-label">
            Upload Image
          </label>
        )}
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Project poster"
            className="sm:p-10 object-container z-20 "
          />
        )}
      </div>
      <FormField
        title="Project Title"
        type="text"
        name="title"
        placeholder="Enter the title of your project"
        defaultValue={projectDetails?.title}
      />
      <FormField
        title="Description"
        type="text"
        name="description"
        placeholder="Enter the description of your project"
        defaultValue={projectDetails?.description}
      />
      <FormField
        title="Website URL"
        type="url"
        name="liveSiteUrl"
        placeholder="Enter the URL of your project"
        defaultValue={projectDetails?.liveSiteUrl}
      />
      <FormField
        title="GitHub URL"
        type="url"
        name="githubUrl"
        placeholder="Enter the URL of your github repository"
        defaultValue={projectDetails?.githubUrl}
      />
      <CustomMenu
        title="Category"
        filters={categoryFilters}
        name="category"
        defaultValue={projectDetails?.category}
      />
      {type === "edit" && (
        <input type="text" name="$id" value={projectDetails.$id} hidden />
      )}
      <div className="flexStart w-full">
        <ButtonMotion type="submit" leftIcon="/plus.svg">
          {type === "create" ? "Create Project" : "Update Project"}
        </ButtonMotion>
      </div>
    </form>
  );
};

export default ProjectForm;
