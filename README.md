# gulp-mail

> A [gulp](https://github.com/gulpjs/gulp) wrapper for [Nodemailer](https://nodemailer.com) used to quickly send emails from tasks and/or the command-line during development or testing.

`gulp-mail` is based on [gulp-mailer](https://github.com/meerkats/gulp-mailer), which is not available on [npm](https://www.npmjs.com/).

## Installation

Installing via [npm](https://www.npmjs.org/package/gulp-mail):

```sh
npm install --save-dev gulp-mail
```

## Usage

### `mail(options)`

*   options: `Object`

## Options

`gulp-mail` uses **Nodemailer v0.7.1**, which has been deprecated for some time.  It is, however, simple and stable. Available options for `gulp-mail` are:

*   ### `options.smtp`
    Type: `Object`\
    Contains required SMTP configuration values. (See the example below.)

*   ### `options.to`
    Type: `String|Array`\
    A string or array containing one or more than one recipient address, respectively.

*   ### `options.from`
    Type: `String`\
    The display name for the sender.

*   ### `options.subject`
    Type: `String`\
    The email subject line. If not provided, a default subject line is generated from the source filename as `[TEST] path.basename`.

*   ### `options.html`
    Type: `String`\
    The HTML body of the email. If not provided, the source file becomes the message body.

*   ### `options.text`
    Type: `String`\
    The plaintext body of the email. If not provided, Nodemailer generates this based on the source file.

## Example

Currently, `gulp-mail` takes in piped streams and sends emails via SMTP only.

```js
var gulp = require('gulp');
var mail = require('gulp-mail');

var smtpConfig = {
    host: 'smtp.example.com',
    port: 465,
    secureConnection: true,
    auth: {
      user: 'user@example.com',
      pass: 'correcthorsebatterystaple'
    }
};

gulp.task('mail', function () {
  return gulp.src('path/to/message.html')
    .pipe(mail({
      to: [
        'bar@example.com'
      ],
      from: 'Example <user@example.com>',
      subject: 'A message from gulp-mail',
      smtp: smtpConfig
    }));
});
```
