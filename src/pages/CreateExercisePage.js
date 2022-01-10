import React, { useState } from "react";
import { useHistory } from "react-router";

// State variables for the user input
export const CreateExercisePage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");
  // use for going back to home page after alerted
  const history = useHistory();

  // Create exercise
  const createExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert("Successfully added the exercise!");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    history.push("/");
  };

  // Form for creating an exercise
  return (
    <div>
      <h2>Add Exercise</h2>
      <input
        type="text"
        placeholder="Enter exercise"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter weight amount"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <input
        type="date"
        placeholder="Enter date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={createExercise}>Create</button>
    </div>
  );
};

export default CreateExercisePage;
