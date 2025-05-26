import { useEffect, useState } from "react";
import "./App.css";
import { FOOD_TYPES, type FoodItem, type FoodType } from "./types/food.types";
import MainList from "./components/MainList";
import ItemColumn from "./components/ItemColumn";

function App() {
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [movedItems, setMovedItems] = useState<Record<FoodType, FoodItem[]>>({
    Fruit: [],
    Vegetable: [],
  });
  const moveToRight = () => {};
  const moveBackToMain = () => {};

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const withIds = data.map((item: FoodItem) => ({
          ...item,
          id: crypto.randomUUID(),
        }));
        setFoodList(withIds);
      });
  }, []);

  return (
    <>
      <div className="md:flex">
        <MainList items={foodList} onClick={moveToRight} />
        <section className="md:flex md:ml-10 mt-10 md:mt-0 gap-4">
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
