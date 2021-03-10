const logBox = require('./logPro/logBox');

module.exports = {
  logger: {
    log: logBox({ color: 'blue' }),
    error: logBox({ color: 'red' }),
    warn: logBox.bind({ color: 'yellow' }),
    success: logBox.bind({ color: 'green' }),
  },
};
