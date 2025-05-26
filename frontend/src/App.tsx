import { useEffect, useRef, useState } from "react";
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
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const moveToRight = (item: FoodItem) => {
    setFoodList((prev) => prev.filter((food) => food.id !== item.id));
    setMovedItems((prev) => ({
      ...prev,
      [item.type]: [...prev[item.type], item],
    }));

    timers.current[item.id] = setTimeout(() => {
      moveBackToMain(item);
    }, 5000);
  };
  const moveBackToMain = (item: FoodItem) => {
    const timer = timers.current[item.id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[item.id];
    }

    setFoodList((prev) => [...prev, item]);
    setMovedItems((prev) => ({
      ...prev,
      [item.type]: prev[item.type].filter((i) => i.id !== item.id),
    }));
  };

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
