'use strict';

var flatOpts = require('flat-options');
var nodemailer = require('nodemailer');
var path = require('path');
var through2 = require('through2');
var log = require('fancy-log');
var colors = require('ansi-colors');

module.exports = function (options) {
    options = flatOpts(options, {
        to: null,
        from: null,
        subject: null,
        html: null,
        text: null,
        smtp: null
    });

    return through2.obj(function (file, enc, callback) {
        var transporter = nodemailer.createTransport('SMTP', options.smtp);

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        var to = options.to.constructor === Array ? options.to.join(',') : options.to;
        var subject = options.subject || path.basename(file.path);
        var html = options.html || file.contents.toString();
        var text = options.text || null;

        return transporter.sendMail({
            from: options.from,
            to: to,
            subject: subject,
            generateTextFromHTML: true,
            html: html,
            text: text
        }, function (error, info) {
            if (error) {
                log.error(error);
            } else {
                log.info('Sent email', colors.cyan(subject), 'to', colors.red(to));
            }

            transporter.close();
            callback();
        });
    });
};
