const nodemailer = require ("nodemailer")
const dotenv = require('dotenv');
dotenv.config()
//var inlineBase64 = require("nodemailer-plugin-inline-base64");

const sendEmailCreateOrder =  async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
    });
      //transporter.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>You have ordered the product <b>${order.name}</b> with the amount: <b>${order.amount}</b> and price: <b>${order.price} VND</b></div>
        <div>Below are images of the product/></div>
        </div>`
        attachImage.push({path: order.image})
    })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "You have placed an order at GYMISEASY shop", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>You have successfully placed an order at GYMISEASY shop</b></div> ${listItem}`, // html body
    attachments: attachImage,
  });
}

module.exports = {
    sendEmailCreateOrder
}