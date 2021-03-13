import EslintPlugin from './plugins/eslint-plugin/index';
import CommitMessagePlugin from './plugins/commit-message-plugin';
import Core from './core';
import { PluginRecord } from './constants';

// 安装插件
Core.install(PluginRecord.EslintPlugin, (core: Core) => {
  core[PluginRecord.EslintPlugin] = new EslintPlugin(core);
});
Core.install(PluginRecord.CommitMessagePlugin, (core: Core) => {
  core[PluginRecord.CommitMessagePlugin] = new CommitMessagePlugin(core);
});

export default Core;
