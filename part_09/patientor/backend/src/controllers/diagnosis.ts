import express from "express";

import Diagnosis from "../models/diagnosis";
import diagnosisService from "../services/diagnosisService";
import config from "../configs";

const router = express.Router();

// GET: all the diagnonis
router.get("/", async (_request, response, next) => {
  try {
    const diagnosis = await Diagnosis.find({});
    response.json(diagnosis);
  } 
  catch (error) {
    next(error)  ;
  }
});

if (config.nodeEnv === "development") {
  // GET: initialize the diagnosis list
  router.get("/reset", async (_request, response, next) => {
    try {
      // drop all existing entries
      await Diagnosis.deleteMany({});
      // add new entries
      const entries = diagnosisService.getEntries();
      const promises = entries.map(entry => new Diagnosis({ ...entry }).save());
      const results = await Promise.all(promises);

      response.status(200).send({
        message: `added ${results.length} entries`
      });
    }
    catch (error) {
      next(error);
    }
  });
}
export default router;