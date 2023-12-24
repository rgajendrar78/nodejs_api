import nodemailer from "nodemailer";

export const emailSend = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    const mailOptions = {
      from: "",
      to: "",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);

    res.json({
      status: "success",
      message: "Email has been sent successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
