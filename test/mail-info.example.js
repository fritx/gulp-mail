// private
module.exports = {
  to: [
    'example@163.com'
  ],
  // note: testing account via https://ethereal.email/
  // https://nodemailer.com/smtp/testing/
  from: 'raphaelle <raphaelle.buckridge98@ethereal.email>',
  smtp: {
    auth: {
      user: 'raphaelle.buckridge98@ethereal.email',
      pass: 'P87npkf5eCBnn47e5M'
    },
    host: 'smtp.ethereal.email',
    secureConnection: false,
    port: 587
  }
}
