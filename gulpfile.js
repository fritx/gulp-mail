var mail = require('./')
var mailInfo = require('./test/mail-info')  // private
var gulp = require('gulp')
var assert = require('assert')

gulp.task('test', function(){
  // security
  assert.throws(function(){
    mail({
      to: ['a@example.com', '-bi@example.com']
    })
  }, /Invalid envelope addresses/)

  // send mail
  return gulp.src([
      './test/i-love-you.html',
      './test/1.html',
      './test/2.html'
    ])
    .pipe(mail({
      to: mailInfo.to,
      from: mailInfo.from,
      smtp: mailInfo.smtp
    }))
  // blocked after sending
  // becase transporter remained working
})
