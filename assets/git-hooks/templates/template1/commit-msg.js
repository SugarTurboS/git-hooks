const GhCore = require('../../git-hooks-new.js');
const process = require('process');

class CommitMsgHook {
  constructor() {
    this.core = new GhCore({
      whiteList: ['commit-check-plugin'],
    });
  }

  run() {
    const commitMsgStoragePath = process.argv.slice(-1)[0];

    try {
      this.core['commit-message-plugin'].setCommitMsgStoragePath(commitMsgStoragePath);

      // 读取 commit
      const commitMsg = this.core['commit-message-plugin'].readCommitMessage();

      // 修改 commit
      this.core['commit-message-plugin'].writeCommitMessage(`[linted]${commitMsg}`);
    } catch (err) {
      console.error(err);
    }
  }
}

const hook = new CommitMsgHook();
hook.run();
