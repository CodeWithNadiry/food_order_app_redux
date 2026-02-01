import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
import MealItem from "./MealItem";
const requestConfig = {};
const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) return <p className="center">Fetching meals...</p>;

  if (error) return <ErrorPage title="Failed To fetch meals!" message={error} />;

  return (
    <ul className="w-[90%] max-w-280 list-none my-4 mx-auto p-1 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
      {loadedMeals.map((meal) => {
        const { id, name, price, description, image } = meal;
        const mealsData = {
          id,
          name,
          price,
          description,
          image: `http://localhost:3000/${image}`,
        };
        return <MealItem key={id} data={mealsData} />;
      })}
    </ul>
  );
};

export default Meals;
