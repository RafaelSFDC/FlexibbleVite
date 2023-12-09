type Props = {
  title: string;
  filters: Array<string>;
  name: string;
  defaultValue?: string;
};

const CustomMenu = ({ title, filters, name, defaultValue }: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>
      <div className="self-start relative">
        <select
          name={name}
          id={name}
          defaultValue={defaultValue ? defaultValue : ""}
          required
          className="cursor-pointer custom-select"
        >
          <option value="" disabled className="custom-option">
            Select a category
          </option>
          {filters.map((filter) => (
            <option
              key={filter}
              value={filter}
              className="cursor-pointer custom-option"
            >
              {filter}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomMenu;
