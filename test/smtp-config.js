'use strict';

// Replace the credentials below with your own in order to test
module.exports = {
    to: 'to@example.com',
    from: 'user@example.com',
    smtp: {
        host: 'smtp.example.com',
        port: 465,
        secureConnection: true,
        auth: {
          user: 'user@example.com',
          pass: 'correcthorsebatterystaple'
        }
    }
};
