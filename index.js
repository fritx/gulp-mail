// learnt from https://github.com/meerkats/gulp-mailer
// used old nodemailer@0.7.1 instead

var _ = require('underscore');
var nodemailer = require('nodemailer');
var path = require('path');
var through2 = require('through2');
var util = require('util');
var log = require('fancy-log');
var colors = require('ansi-colors');

module.exports = function (options) {

    options = _.defaults(options || {}, {
        to: null,
        from: null,
        subject: null,
        html: null,
        text: null,
        smtp: null
    });

    // fix security: (engine=sendmail) Command injection in nodemailer
    // https://github.com/advisories/GHSA-48ww-j4fc-435p
    assertValidOptions(options);

    return through2.obj(function (file, enc, next) {

        var transporter = nodemailer.createTransport("SMTP", options.smtp);

        if (file.isNull()) {
            this.push(file);
            return next();
        }

        var to = options.to.join(',');
        var subject = options.subject || _subjectFromFilename(file.path);
        var html = options.html || file.contents.toString();
        var text = options.text || null;

        return transporter.sendMail({
            from: options.from,
            to: to,
            subject: subject,
            generateTextFromHTML: true, // added
            html: html,
            text: text
        }, function (error, info) {

            if (error) {
                log.error(error);
                transporter.close();
                return next();
            }
            
            log.info('Sent email', colors.cyan(subject), 'to', colors.red(to));
            transporter.close();
            next();

        });
    });
};

_subjectFromFilename = function (filename) {
    var name = path.basename(filename).replace(path.extname(filename), '');
    return util.format('[TEST] %s', name);
};

// for compatibility reasons, we don't upgrade nodemailer, but handle it
// with the same error message as nodemailer, also old ECMAScript version
// https://github.com/nodemailer/nodemailer/commit/ba31c64c910d884579875c52d57ac45acc47aa54
function assertValidOptions(options) {
    var toList = options.to || [];
    var fromList = (options.from || '').split(/\s*\,+\s*/);
    var addressList = [].concat(toList).concat(fromList);
    var hasInvalidAddress = false
    for (var i = 0; i < addressList.length; i++) {
        if (/^-/.test(addressList[i])) {
          hasInvalidAddress = true;
          break;
        }
    }
    if (hasInvalidAddress) {
        throw new Error('Can not send mail. Invalid envelope addresses.');
    }
}
