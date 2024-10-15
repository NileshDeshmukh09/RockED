const db = require("../models");
const { Op } = require("sequelize");
const { calculateEndDate } = require("../utils/HelperFunction");
const { User, Certificate } = db;

const createCertificate = async (req, res) => {
  const {
    certificate_code,
    certificate_name,
    issuer,
    overview,
    startDate,
    durationInMonths,
    status,
  } = req.body;

  const endDate = calculateEndDate(startDate, durationInMonths);

  const newCertificateData = {
    certificate_code,
    certificate_name,
    issuer,
    overview,
    startDate,
    endDate,
  };

  if (status) {
    newCertificateData.status = status;
  }

  if (status && status == "DRAFT") {
    newCertificateData.isEditable = true;
  }
  console.time("createquery");
  try {
    const checkexistingCertifcate = await Certificate.findOne({
      where: {
        certificate_code,
      },
    });

    if (checkexistingCertifcate) {
      return res.status(400).json({
        message:
          "Certificate Code Already Exist , Try Another Certificate Code",
      });
    }
    const newCertificate = await Certificate.create(newCertificateData);
    console.timeEnd("createquery");
    res.status(201).json({
      certificate: newCertificate,
    });
  } catch (err) {
    console.log("Error in Creating Certificate : ", err);
    return res.status(500).json({
      message: "Internal server error in creating Certificate",
      err: err.message,
    });
  }
};

const getCertificates = async (req, res) => {
  const { certificate_code, certificate_name, startDate, status } = req.query;

  const filters = {};
  if (certificate_name) {
    filters.certificate_name = { [Op.like]: `%${certificate_name}%` };
  }

  if (certificate_code) {
    filters.certificate_code = { [Op.like]: `%${certificate_code}%` };
  }

  if (status) {
    filters.status = { [Op.eq]: status };
  }

  if (startDate) {
    filters.startDate = { [Op.eq]: startDate };
  }

  try {
    const certificates = await Certificate.findAll({
      where: filters,
      include : [
        {
            model : User,
            attributes :  [ 'username' , 'email']
        }
      ]
    });

    res.status(201).json({
      message: "Fetched All Certificates !!",
      totalCertificates: certificates.length,
      certificates,
    });
  } catch (err) {
    console.log("Error in Fetching Certificate : ", err);
    return res.status(500).json({
      message: "Internal server error in Fetching Certificate",
      err: err.message,
    });
  }
};

const editCertificates = async (req, res) => {
  const certificate_code = req.params.certificate_code;
  const {
    certificate_name,
    issuer,
    overview,
    startDate,
    durationInMonths,
    status,
  } = req.body;

  console.time("editquery");
  try {
    const existingCertifcate = await Certificate.findOne({
      where: {
        certificate_code,
      },
    });

   
    if (!existingCertifcate) {
      return res.status(404).json({
        message: "Certificate Code Not Found !!",
      });
    }

    if(!existingCertifcate.isEditable){
        return res.status(404).json({
            message: `Certificate status: ${existingCertifcate.status}, only  status :  DRAFT  Certificate is Editable !!`,
          });
    }

    if(startDate){
        existingCertifcate.startDate = startDate;
    }
    if(durationInMonths){

        if( durationInMonths && typeof durationInMonths != 'number' ){
            return res.status(404).json({
                message: "Please Enter DURATION in Numbers !",
              });
        }
        const endDate = calculateEndDate(startDate, durationInMonths);
        existingCertifcate.endDate = endDate;
    }

    if(certificate_name){
        existingCertifcate.certificate_name = certificate_name;
    }
    if(issuer){
        existingCertifcate.issuer = issuer;
    }

    if (status) {
        existingCertifcate.status = status;
    }

    if (status && status == "DRAFT") {
        existingCertifcate.isEditable = true;
    }else{
        existingCertifcate.isEditable = false;
    }

    if(overview){
        existingCertifcate.overview = overview;
    }
    await existingCertifcate.save();
    console.timeEnd("editquery");
    return res.status(201).json({
      certificate: existingCertifcate,
    });
  } catch (err) {
    console.log("Error in Editing Certificate : ", err);
    return res.status(500).json({
      message: "Internal server error in Edit Certificate",
      err: err.message,
    });
  }
};

const userEnrollInCertificate = async( req, res ) =>{

    const { email, certificate_code } = req.body; 

    try{

        const certificate = await Certificate.findOne({
            where: {
              certificate_code,
            },
          });
      
         
          if (!certificate) {
            return res.status(404).json({
              message: "Certificate Not Found !!",
            });
          }


          const user = await User.findOne({
            where: {
              email,
            },
          });
      
         
          if (!user) {
            return res.status(404).json({
              message: "User Not Found !!",
            });
          }

          certificate.USERs.push(user);

          await certificate.save();

          return res.status(201).json({
            certificate: certificate,
          });


    }catch (err) {
        console.log("Error in userEnrollInCertificate  : ", err);
        return res.status(500).json({
          message: "Internal server error in userEnrollInCertificate",
          err: err.message,
        });
      }

}
module.exports = { createCertificate, getCertificates , editCertificates, userEnrollInCertificate};
