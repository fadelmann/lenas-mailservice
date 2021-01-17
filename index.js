const nodemailer = require('nodemailer');

async function main() {
  const transporter = nodemailer.createTransport({
    host: 'send.one.com',
    port: 465,
    secure: true,
    tls: {
      requireTLS: true,
    },
    auth: {
      user: 'info@lenafranzisca.com',
      pass: 'O$!rJdEX&lJA#gG4',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Lena Franzsika 👻" <info@lenafranzisca.com>', // sender address
    to: 'fabian.adelmann@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text bodynid
    html: '<b>Hello world?</b>', // html body
  });
}

main().catch(err => console.log(err));
