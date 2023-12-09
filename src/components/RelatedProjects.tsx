import state from "../store";

type Props = {
  projects: {
    $id: string;
    title: string;
    createdBy: {
      $id: string;
      name: string;
      avatarURL: string;
    }[];
    category: string;
    image: string;
    description: string;
    liveSiteUrl: string;
    githubUrl: string;
  }[];
};
const RelatedProjects = ({ projects }: Props) => {
  const findIndex = (id: string) => {
    state.projectModal = false;
    state.activeProject = -1;
    setTimeout(() => {
      state.activeProject = state.projects.findIndex(
        (project: any) => project.$id === id
      );
      state.projectModal = true;
    }, 300); // 300 milissegundos = 0,3 segundos
  };
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">
          {projects.length
            ? ` More by ${projects[0].createdBy[0].name}`
            : "No projects found"}
        </p>

        {projects.length ? (
          <a
            href={`/?category=${projects[0].category}`}
            className="text-primary-purple font-semibold"
          >
            View all
          </a>
        ) : null}
      </div>

      <div className="related_projects-grid">
        {projects.map((project) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <button
              key={project.$id}
              className="flexCenter group relative w-full h-full"
              onClick={() => findIndex(project.$id)}
            >
              <img
                src={project.image}
                width={414}
                height={314}
                alt="project image"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{project.title}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
