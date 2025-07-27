export default function Categories({
  data,
  onFilterChange,
  onFilterReset,
}: {
  data: [][];
  onFilterChange: (category: string[]) => void;
  onFilterReset: () => void;
}) {
  function clearFilters() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      (radio as HTMLInputElement).checked = false;
    });
    onFilterReset();
  }
  const filterPressed = () => {
    const selectedCategories = Array.from(
      document.querySelectorAll('input[type="radio"]:checked')
    ).map((input) => (input as HTMLInputElement).id);
    onFilterChange(selectedCategories);
  };
  return (
    <div className="categories auto h-full">
      <div className="w-70 px-4 py-5 bg-white flex flex-col gap-3 rounded-md shadow-[0px_0px_15px_rgba(0,0,0,0.09)]">
        <legend className="text-xl font-semibold mb-3 select-none text-gray-700 underline">
          Categorias
        </legend>
        {data.map((category) => (
          <label
            key={category.id}
            htmlFor={category.id}
            className="font-medium h-10 relative hover:bg-zinc-100 flex items-center px-3 gap-3 rounded-lg has-[:checked]:text-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1 select-none text-gray-700"
          >
            <div className="w-5 fill-blue-500"></div>
            <span className="text-sm">{category.name}</span>
            <input
              type="radio"
              className="html w-4 h-4 absolute accent-current right-3 "
              id={category.id}
            />
          </label>
        ))}
        <div className="flex flex-row gap-2">
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors filter-button"
            onClick={() => filterPressed()}
          >
            <p className="text-sm">Filtrar</p>
          </button>
          <button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={clearFilters}
          >
            <p className="text-sm">Limpar</p>
          </button>
        </div>
      </div>
    </div>
  );
}
