import { userActivationUrlEmailTemplate } from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";
export const userActivationUrlEmail = async (obj) => {
  const transporter = emailTransporter();
  const mailOptions = userActivationUrlEmailTemplate(obj);
  const info = await transporter.sendMail(mailOptions);
  console.log(info.messageId);
  return info.messageId;
};
