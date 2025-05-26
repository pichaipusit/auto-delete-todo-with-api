import { useEffect } from "react";
import "./App.css";
import { FOOD_TYPES } from "./types/food.types";
import MainList from "./components/MainList";
import ItemColumn from "./components/ItemColumn";
import { useFoodMovement } from "./hooks/useFoodMovement";

function App() {
  const { foodList, movedItems, moveToRight, moveBackToMain } =
    useFoodMovement();

  useEffect(() => {
    document.title = "Auto Delete Todo List";
  }, []);

  return (
    <>
      <div className="md:flex  h-screen">
        <MainList items={foodList} onClick={moveToRight} />
        <section className="md:flex md:ml-10 mt-10 md:mt-0 gap-6 space-y-8">
          {FOOD_TYPES.map((type) => (
            <ItemColumn
              key={type}
              title={type}
              items={movedItems[type]}
              onClick={moveBackToMain}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
