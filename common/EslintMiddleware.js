const { ESLint } = require('eslint');
const process = require('process');

/**
 * @description Eslint中间件
 */
class EslintMiddleware {
  constructor({ fileList, logger = console.log }) {
    this.eslint = new ESLint();
    this.fileList = fileList;
    this.logger = logger;
    this.errorCount = 0;
    this.warningCount = 0;
  }

  async lintFiles() {
    this.results = await this.eslint.lintFiles(this.fileList);
    /**
     * @description eslint输出结果的类型
     *     LintResult {
            filePath: string;
            messages: Linter.LintMessage[];
            errorCount: number;
            warningCount: number;
            fixableErrorCount: number;
            fixableWarningCount: number;
            output?: string;
            source?: string;
            usedDeprecatedRules: DeprecatedRuleUse[];
          }
          LintMessage {
            column: number;
            line: number;
            endColumn?: number;
            endLine?: number;
            ruleId: string | null;
            message: string;
            messageId?: string;
            nodeType?: string;
            fatal?: true;
            severity: Severity;
            fix?: Rule.Fix;
          }
     */
    this.results.forEach((result) => {
      this.errorCount += result.errorCount;
      this.warningCount += result.warningCount;
    });
  }

  output() {
    this._outputLabelLine('ESLint Start');
    this.results.forEach((result) => {
      if (result.messages && result.messages.length > 0) {
        this.logger.error(`ESLint has found problems in file: ${result.filePath}`);
        result.messages.forEach((msg) => {
          if (msg.severity === 2) {
            this.logger.error(`Error: ${msg.message} in Line ${msg.line} Column ${msg.column}`);
          } else {
            this.logger.warn(`Warning: ${msg.message} in Line ${msg.line} Column ${msg.column}`);
          }
        });
      }
    });
    if (this.errorCount >= 1) {
      this._outputLabelLine('ESLint Failed');
      this.logger.error(
        `✖ ${this.errorCount + this.warningCount} problems(${this.errorCount} error, ${
          this.warningCount
        } warning)`
      );
      this._outputLabelLine('ESLint End');
      process.exit(1);
    } else if (this.warningCount >= 1) {
      this._outputLabelLine('ESLint Warned');
      this._outputLabelLine('ESLint End');
      process.exit(0);
    } else {
      this._outputLabelLine('ESLint Passed');
      this._outputLabelLine('ESLint End');
      process.exit(0);
    }
  }
  _outputLabelLine(s) {
    this.logger.log(`========${s}========`);
  }
}

module.exports = EslintMiddleware;
