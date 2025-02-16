"use client"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./Redux/features/AllSlice/counterSlice";

const CounterComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value); // Get the counter value from the store

  return (
    <div className="bg-red-700">
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default CounterComponent;
