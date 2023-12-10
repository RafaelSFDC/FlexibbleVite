import ButtonMotion from "./framerMotion/ButtonMotion";
import { useSnapshot } from "valtio";
import { categoryFilters } from "../constants";
import state from "../store";
const Categories = () => {
  const snap = useSnapshot(state);
  return (
    <div className="flexBetween w-full gap-5 flex-wrap ">
      <ul className="w-full flex gap-2 overflow-x-auto overflow-y-hidden h-auto pb-2">
        {categoryFilters.map((filter) => (
          <ButtonMotion
            key={filter}
            type="button"
            onClick={() => {
              state.activeFilter = filter;
            }}
            className={`px-2 py-3 rounded-lg capitalize whitespace-nowrap bg-transparent ${
              snap.activeFilter === filter
                ? " text-primary-purple font-medium"
                : "font-normal bg-light-white-100"
            } `}
          >
            {filter}
          </ButtonMotion>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
