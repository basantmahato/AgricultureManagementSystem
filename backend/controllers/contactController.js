import ContactInquiry from "../models/ContactInquiry.js";

export const createInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }

    await ContactInquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: typeof subject === "string" ? subject.trim() : "",
      message: message.trim()
    });

    res.status(201).json({ message: "Thanks—we received your message and will get back to you soon." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
