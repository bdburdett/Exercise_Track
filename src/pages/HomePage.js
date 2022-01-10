import React from "react";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function HomePage({ setExerciseToEdit }) {
  const history = useHistory();
  const [exercises, setExercises] = useState([]);

  // Method for deleting
  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      const newExercises = exercises.filter((e) => e._id !== _id);
      setExercises(newExercises);
    } else {
      console.error(
        `Failed to delete exercise with _id = ${_id}, statue code = ${response.stateus}`
      );
    }
  };

  // Method to handle editing
  const onEdit = (exercise) => {
    setExerciseToEdit(exercise);
    history.push("/edit-exercise");
  };

  // Method to handle loading exercises
  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <h2>List of Exercises</h2>
      <Table exercises={exercises} onDelete={onDelete} onEdit={onEdit}></Table>
      <br />
      <Link to="/add-exercise">Add Exercise</Link>
    </>
  );
}

export default HomePage;
