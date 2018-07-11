// take to home page and if selected take to new form
router.get("/user/:id/newdoctor", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("sessions/newDoctor.ejs", {
      currentUser: foundUser
    });
  });
});

//create new house

router.post("/user/:id/newdoctor", (req, res) => {
  let doctorId;
  Doctor.create(req.body, (err, createdDoctor) => {
    doctorId = createdDoctor._id;
    Doctor.findById(doctorId, (err, foundDoctor) => {
      User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { doctors: foundDoctor } },
        { new: true },
        (err, updatedUser) => {
          res.redirect("/sessions/user/" + req.params.id);
        }
      );
    });
  });
});

//show house info

router.get("/doctor/:userid/:doctorid", (req, res) => {
  Doctor.findById(req.params.doctorid, (err, foundDoctor) => {
    console.log(foundDoctor);
    res.render("sessions/doctorShow.ejs", {
      doctor: foundDoctor,
      user_id: req.params.userid,
      indexOfDoctor: req.params.indexOfDoctor
    });
  });
});

//DELETE

router.delete("/doctor/:userid/:doctorid", (req, res) => {
  User.findByIdAndUpdate(
    req.params.userid,
    { $pull: { doctors: { _id: req.params.doctorid } } },
    (err, removeDoc) => {
      res.redirect("/sessions/user/" + req.params.userid);
    }
  );
});
