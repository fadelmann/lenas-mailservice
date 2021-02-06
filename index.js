const nodemailer = require('nodemailer');
const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

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

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  server.route({
    method: 'POST',
    path: '/send-mail',
    config: {
      payload: {
        parse: true,
      },
    },
    handler(request) {
      const { name, email, about, message } = request.payload;

      // send mail with defined transport object
      return transporter.sendMail({
        from: '"Lena Franzsika 👻" <info@lenafranzisca.com>', // sender address
        to: 'fabian.adelmann@gmail.com', // list of receivers
        subject: 'My Website', // Subject line
        html: `
From: ${name}
Email: ${email}
About: ${about}

${message}
        `,
      });
    },
  });

  await server.start();
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
