import * as exercises from "./exercises_model.mjs";
import express from "express";

const PORT = 3000;

const app = express();

// middleware implemented
app.use(express.json());

// Create new exercise
app.post("/exercises", (req, res) => {
  exercises
    .createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((exercise) => {
      res.status(201).json(exercise);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: "Request failed" });
    });
});

// Retrieve exercises
app.get("/exercises", (req, res) => {
  let filter = {};

  exercises
    .findExercise(filter, "", 0)
    .then((exercises) => {
      res.send(exercises);
    })
    .catch((error) => {
      console.error(error);
      res.send({ Error: "Request failed" });
    });
});

// Update the exercise of provided id
app.put("/exercises/:_id", (req, res) => {
  exercises
    .replaceExercise(
      req.params._id,
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.json({
          _id: req.params._id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else {
        res.status(500).json({ Error: "Resource not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: "Request failed" });
    });
});

// Delete the exercise of provided id
app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(500).json({ Error: "Resource not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Request failed" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
