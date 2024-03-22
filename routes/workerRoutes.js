const express = require("express");
const {
  getWorkerInfoController,
  updateProfileController,
  getWorkerByIdController,
  workerAppointmentsController,
  updateStatusController,
} = require("../controllers/workerCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getWorkerInfo", authMiddleware, getWorkerInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post("/getWorkerById", authMiddleware, getWorkerByIdController);

//GET Appointments
router.get(
  "/worker-appointments",
  authMiddleware,
  workerAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
