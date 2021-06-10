'use strict';

var mail = require('./');
var smtpConfig = require('./test/smtp-config');
var gulp = require('gulp');

gulp.task('test', function () {
  return gulp.src('./test/message.html').pipe(
    mail({
      to: smtpConfig.to,
      from: smtpConfig.from,
      smtp: smtpConfig.smtp,
    })
  );
});
