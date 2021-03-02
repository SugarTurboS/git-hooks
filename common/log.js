const LogTypeEnum = {
  Error: '\x1B[31m%s\x1B[0m',
  Warn: '\x1B[33m%s\x1B[0m',
  Log: '\x1B[0m%s\x1B[0m',
  Success: '\x1B[32m%s\x1B[0m',
};

module.exports = {
  LogTypeEnum,
  logger: {
    log: console.log.bind(null, LogTypeEnum.Log),
    error: console.log.bind(null, LogTypeEnum.Error),
    warn: console.log.bind(null, LogTypeEnum.warn),
    success: console.log.bind(null, LogTypeEnum.Success),
  },
};
