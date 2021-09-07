/*
 * @Description: 
 * @Author: 
 * @Date: 2021-09-07 10:41:58
 * @LastEditTime: 2021-09-07 10:41:59
 * @LastEditors: Tuohaohu
 * @Usage: 
 */
const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/_variable.scss";'
      }
    }
  }
};