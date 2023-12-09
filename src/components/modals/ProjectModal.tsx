import { useSnapshot } from "valtio";
import state from "../../store";
import ModalMotion from "../framerMotion/ModalMotion";
import RelatedProjects from "../RelatedProjects";
import ProjectActions from "../ProjectActions";

const ProjectModal = () => {
  const snap = useSnapshot(state);
  if (snap.activeProject === -1) {
    return null;
  }
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
  const projectDetails: ProjectDetails = snap.projects[snap.activeProject];
  console.log(projectDetails);
  const userProjects = snap.projects.filter(
    (project: any) =>
      project.createdBy[0].$id === projectDetails.createdBy[0].$id &&
      project.$id !== projectDetails.$id
  );

  return (
    <ModalMotion isOpen={snap.projectModal}>
      {!projectDetails ? (
        "Loading..."
      ) : (
        <>
          <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
            <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
              <button>
                <img
                  src={projectDetails?.createdBy[0]?.avatarURL}
                  width={50}
                  height={50}
                  alt="profile"
                  className="rounded-full"
                />
              </button>

              <div className="flex-1 flexStart flex-col gap-1">
                <p className="self-start text-lg font-semibold">
                  {projectDetails?.title}
                </p>
                <div className="user-info">
                  <button>{projectDetails?.createdBy[0]?.name}</button>
                  <img src="/dot.svg" width={4} height={4} alt="dot" />
                  <button className="text-primary-purple font-semibold">
                    {projectDetails?.category}
                  </button>
                </div>
              </div>
            </div>
            {projectDetails.createdBy[0].$id === snap.userCollection && (
              <div className="flex justify-end items-center gap-2">
                <ProjectActions projectId={projectDetails?.$id} />
              </div>
            )}
          </section>
          <section className="mt-14">
            <img
              src={`${projectDetails?.image}`}
              className="object-cover rounded-2xl"
              width={1064}
              height={798}
              alt="poster"
            />
          </section>
          <section className="flexCenter flex-col mt-20">
            <p className="max-w-5xl text-xl font-normal">
              {projectDetails?.description}
            </p>

            <div className="flex flex-wrap mt-5 gap-5">
              <a
                href={projectDetails?.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
              >
                🖥 <span className="underline">Github</span>
              </a>
              <img src="/dot.svg" width={4} height={4} alt="dot" />
              <a
                href={projectDetails?.liveSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
              >
                🚀 <span className="underline">Live Site</span>
              </a>
            </div>
          </section>

          <section className="flexCenter w-full gap-8 mt-28">
            <span className="w-full h-0.5 bg-light-white-200" />
            <a href={""} className="min-w-[82px] h-[82px]">
              <img
                src={projectDetails?.createdBy[0]?.avatarURL}
                className="rounded-full"
                width={82}
                height={82}
                alt="profile image"
              />
            </a>
            <span className="w-full h-0.5 bg-light-white-200" />
          </section>
          <RelatedProjects projects={userProjects} />
        </>
      )}
    </ModalMotion>
  );
};

export default ProjectModal;
