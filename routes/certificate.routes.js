const express = require("express");
const router = express.Router();
 const { createCertificate , getCertificates , editCertificates , userEnrollInCertificate} = require("../controllers/certificate.controller")

// certificate  route.
router.post("/", createCertificate);
router.get("/", getCertificates);

router.put("/:certificate_code", editCertificates);
router.post("/enroll", userEnrollInCertificate);

module.exports  = router;