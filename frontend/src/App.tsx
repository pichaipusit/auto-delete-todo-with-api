import { useEffect, useState } from "react";
import "./App.css";
import type { FoodItem } from "./types/food.types";
import MainList from "./components/MainList";

function App() {
  const [foodList, setFoodList] = useState<FoodItem[]>([]);

  const moveToRight = () => {};

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
      <div>
        <MainList items={foodList} onClick={moveToRight} />
      </div>
    </>
  );
}

export default App;
