import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

// GET: hello endpoint
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

// GET: bmi endpoint
app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res
      .status(400)
      .send({
        error: "malformatted parameters"
      });
  }
  else {
    res.json({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  }
});

// POST: webexercises endpoint
app.post("/exercises", (req, res) => { 
  if ("daily_exercises" in req.body && "target" in req.body) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as { daily_exercises: any, target: any };
    if (body.daily_exercises instanceof Array) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const daily_exercises = body.daily_exercises.map((e: any): number => Number(e));
      const target = Number(body.target);
      if (isNaN(target) || daily_exercises.find((e: number): boolean => isNaN(e)) !== undefined) {
        res
          .status(400)
          .send({
            error: "malformatted parameters"
          });
      }
      else {
        const result = calculateExercises(daily_exercises, target);
        res.json(result);
      }
    }
    else {
      res
        .status(400)
        .send({
          error: "malformatted parameters"
        });
    }
  }
  else {
    res
      .status(400)
      .send({
        error: "parameters missing"
      });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});