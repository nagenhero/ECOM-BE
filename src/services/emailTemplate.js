export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"SNSS ECOMMERCE" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Action Requires-Activate your new acount",
    text: `hello ${name} follow link to activate your acount
    ${url}`, // plain‑text body
    html: `
    <p>Hello ${name},</p>
    <br/>
    <p>Your account has been created. Click the button below to activate it:</p>
   <a href=${url}>
   <button style="background: green; color:white; padding:2rem">
    Activate please Now</button>
   </a>
  `,
  };
};

export const WelcomeEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"SNSS ECOMMERCE" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "thankyou for registration",
    text: `hello ${name} thanks for registration
    ${url}`, // plain‑text body
    html: `
    <p>Hello ${name},</p>
    <br/>
    
  
   <button style="background: green; color:white; padding:2rem">
    thanks</button>
  
  `,
  };
};
