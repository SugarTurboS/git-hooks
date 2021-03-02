/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
const path = require('path');

class AbstractHook {
  constructor() {
    if (new.target !== AbstractHook) {
      if (!new.target.prototype.hasOwnProperty('getHookName')) {
        throw new Error('please override or overload getHookName method');
      }
      if (!new.target.prototype.hasOwnProperty('run')) {
        throw new Error('please override or overload run method');
      }
    } else {
      throw new Error('please override or overload constructor');
    }
  }
  /**
   * @description 获取当前钩子的名称
   */
  getHookName() {}

  /**
   * @description 获取当前仓库的名称
   */
  getRepositoryName() {
    // 此时已经处于执行git脚本阶段，所以不用判断.git是否存在
    // 寻找到.git的上级目录
    const pathList = __dirname.split(path.sep);
    const gitRootIndex = pathList.indexOf('.git');
    return pathList[gitRootIndex - 1];
  }

  /**
   * @description 获取当前仓库的路径
   */
  getRepositoryPath() {
    return __dirname.split('.git')[0];
  }

  /**
   * @description 钩子主逻辑
   */
  run() {}
}

module.exports = AbstractHook;
