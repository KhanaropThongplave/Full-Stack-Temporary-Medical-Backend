// @ts-nocheck
module.exports = app => {
    const patient = require("../controllers/patient.controllers")
    const hospital = require("../controllers/hospital.controllers");
    const information = require("../controllers/information.controllers");
    const appointment = require("../controllers/appointment.controllers");
    
    var router = require("express").Router();

    router.post("/register-patient/auth1", patient.registerPatientStep1);
    router.post("/register-patient/auth2", patient.registerPatientStep2);
    router.post("/login-patient", patient.loginPatient);
    router.get("/get-patient/:id", patient.getOnePatient);
    router.get("/get-patient", patient.getAllPatient);
    router.put("/update-patient/:id", patient.updateOnePatient);
    router.put("/delete-patient/:id", patient.deleteOnePatient);
    router.put("/delete-patient", patient.deleteAllPatient);
  
    router.post("/create-hospital", hospital.createHospital);
    router.get("/get-hospital", hospital.getAllHospital);
    router.get("/get-hospital/:id", hospital.getOneHospital);
    router.put("/update-hospital/:id", hospital.updateOneHospital);
    router.put("/delete-hospital/:id", hospital.deleteOneHospital);
    router.put("/delete-hospital", hospital.deleteAllHospital);
    
    router.post("/create-information", information.createInformation);
    router.get("/get-information", information.getAllInformation);
    router.get("/get-information/:id", information.getOneInformation);
    router.put("/update-information/:id", information.updateOneInformation);
    router.put("/delete-information/:id", information.deleteOneInformation);
    router.put("/delete-information", information.deleteAllInformation);

    router.post("/create-appointment", appointment.createAppointment);
    router.get("/get-appointment", appointment.getAllAppointment);
    router.get("/get-appointment/:id", appointment.getOneAppointment);
    router.put("/update-appointment/:id", appointment.updateOneAppointment);
    router.put("/delete-appointment/:id", appointment.deleteOneAppointment);
    router.put("/delete-appointment", appointment.deleteAllAppointment);

    app.use('/smartcity', router);
};