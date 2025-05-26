import { useState, useRef, useEffect } from "react";
import type { FoodItem, FoodType } from "../types/food.types";

export function useFoodMovement() {
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
    if (timers.current[item.id]) {
      clearTimeout(timers.current[item.id]);
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

  return {
    foodList,
    movedItems,
    moveToRight,
    moveBackToMain,
  };
}
