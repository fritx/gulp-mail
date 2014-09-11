var mail = require('./')
var mailInfo = require('./test/mail-info')  // private
var gulp = require('gulp')

gulp.task('test', function(){
  // send mail
  return gulp.src('./test/i-love-you.html')
    .pipe(mail({
      to: mailInfo.to,
      from: mailInfo.from,
      smtp: mailInfo.smtp
    }))
  // blocked after sending
  // becase transporter remained working
})
