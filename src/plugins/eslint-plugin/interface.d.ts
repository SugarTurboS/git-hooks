interface LintResult {
  filePath: string;
  messages: LintMessage[];
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  output?: string;
  source?: string;
  usedDeprecatedRules: unknown[];
}
interface LintMessage {
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
