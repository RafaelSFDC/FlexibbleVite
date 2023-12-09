import Categories from "../components/Categories";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <Projects />
      <h1>Load More</h1>
    </section>
  );
}
