import SoilBooking from "../models/SoilBooking.js";

export const createSoilBooking = async (req, res) => {
  try {
    const soilTests = {
      pH: ["on", "true", "1"].includes(String(req.body.pH).toLowerCase()) || req.body.pH === true,
      nitrogen: ["on", "true", "1"].includes(String(req.body.nitrogen).toLowerCase()) || req.body.nitrogen === true,
      phosphorus: ["on", "true", "1"].includes(String(req.body.phosphorus).toLowerCase()) || req.body.phosphorus === true,
      potassium: ["on", "true", "1"].includes(String(req.body.potassium).toLowerCase()) || req.body.potassium === true
    };

    const soilPhotos = req.files?.length ? req.files.map((f) => `/uploads/${f.filename}`) : [];

    const booking = await SoilBooking.create({
      user: req.user.userId,
      soilType: req.body.soilType,
      cropDescription: req.body.cropDescription,
      testingCenter: req.body.testingCenter,
      location: req.body.location,
      mobile: req.body.mobile,
      soilTests,
      soilPhotos
    });

    const populated = await SoilBooking.findById(booking._id).populate("user", "name email");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMySoilBookings = async (req, res) => {
  try {
    const bookings = await SoilBooking.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
