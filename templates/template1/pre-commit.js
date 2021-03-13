const { exec } = require('child_process');
const GhCore = require('../../git-hooks-new.js');
const { ESLint } = require('eslint');

class PreCommitHook {
  constructor() {
    this.core = new GhCore({
      whiteList: ['eslint-plugin'],
    });
  }

  run() {
    // 执行 git 的命令
    this._getDiffFileList()
      .then((fileList) => {
        this._lintFileList(fileList);
      })
      .catch((error) => {
        logger.error(error);
        process.exit(1);
      });
  }

  _getDiffFileList() {
    return new Promise((resolve, reject) => {
      exec('git diff --cached --diff-filter=ACMR --name-only', (error, stdout) => {
        if (error) {
          reject(`exec error: ${error}`);
        }
        // 对返回结果进行处理，拿到要检查的文件列表
        const diffFileList = stdout
          .split('\n')
          .filter((diffFile) => /(\.js|\.jsx|\.ts|\.tsx)(\n|$)/gi.test(diffFile));

        resolve(diffFileList);
      });
    });
  }

  _lintFileList(fileList) {
    const eslintPlugin = this.core['eslint-plugin'];
    eslintPlugin.setFileList(fileList);
    return eslintPlugin.lintFiles(new ESLint()).then(() => {
      eslintPlugin.output();
    });
  }
}

const hook = new PreCommitHook();
hook.run();
