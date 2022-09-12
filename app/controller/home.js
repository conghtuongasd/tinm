'use strict';

const Controller = require('egg').Controller;
const browser = require('../services/browser')
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    let accElList = await (await browser()).getBlackListAccount()
    ctx.body = accElList;
  }
}

module.exports = HomeController;
