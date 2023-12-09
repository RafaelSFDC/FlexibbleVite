import Image from "next/image";
import Link from "next/link";
import React from "react";
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
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">
          {projects.length
            ? ` More by ${projects[0].createdBy[0].name}`
            : "No projects found"}
        </p>

        {projects.length ? (
          <Link
            href={`/?category=${projects[0].category}`}
            className="text-primary-purple font-semibold"
          >
            View all
          </Link>
        ) : null}
      </div>

      <div className="related_projects-grid">
        {projects.map((project) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${project.$id}`}
              key={project.$id}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={project.image}
                width={414}
                height={314}
                alt="project image"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{project.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
