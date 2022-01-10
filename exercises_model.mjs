// Get the mongoose object
import mongoose from "mongoose";

// Prepare to the database exercises in the MongoDB server running locally on port 27017
mongoose.connect("mongodb://localhost:27017/exercises", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to to the database
const db = mongoose.connection;

// The open event is called when the database connection successfully opens
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define the schema
const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Compile the model from the schema. This must be done after defining the schema.
const Exercise = mongoose.model("Exercise", ExerciseSchema);

// Create exercise
const createExercise = async (name, reps, weight, unit, date) => {
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  // Call save to persist this object as a document in MongoDB
  return exercise.save();
};

// returns exercise
const findExercise = async (filter, projection, limit) => {
  const query = Exercise.find(filter).select(projection).limit(limit);
  return query.exec();
};

// Update exercise
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
  const result = await Exercise.replaceOne(
    { _id: _id },
    { name: name, reps: reps, weight: weight, unit: unit, date: date }
  );
  return result.modifiedCount;
};

// Delete exercise
const deleteById = async (_id) => {
  const result = await Exercise.deleteOne({ _id: _id });
  // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
  return result.deletedCount;
};

export { createExercise, findExercise, replaceExercise, deleteById };
