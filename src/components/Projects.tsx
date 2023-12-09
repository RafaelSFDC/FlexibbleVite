import ProjetCard from "./ProjetCard";
import { useSnapshot } from "valtio";
import state from "../store";

const Projects = () => {
  const snap = useSnapshot(state);
  let count = 0;
  const projectCards = snap.projects.map((project: any, index: number) => {
    if (snap.activeFilter !== "All" && project.category !== snap.activeFilter) {
      return null;
    } else {
      count++;
    }
    return (
      <ProjetCard
        key={project.$id}
        id={project.$id}
        image={project.image}
        title={project.title}
        name={project.createdBy[0].name}
        avatarUrl={project.createdBy[0].avatarURL}
        userId={project.createdBy[0].$id}
        index={index}
      />
    );
  });

  return (
    <section className="projects-grid">
      {snap.projects.length > 0 && count > 0 ? (
        projectCards
      ) : (
        <p>No projects found, why don't you create some?</p>
      )}
    </section>
  );
};

export default Projects;
