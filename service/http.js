"use strict";
/*
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  According to the GPL, it is forbidden to delete all copyright notices,
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。

  根据协议，您必须保留所有版权声明，如果修改源码则必须开源修改后的源码。
  前往 https://mcsmanager.com/ 申请闭源开发授权或了解更多。
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKoa = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
// 装载 HTTP 服务路由
const http_router_1 = __importDefault(require("../routers/http_router"));
function initKoa() {
    // 初始化 Koa 框架
    const koaApp = new koa_1.default();
    koaApp.use(koa_body_1.default({
        multipart: true,
        formidable: {
            maxFileSize: 1024 * 1024 * 1024 * 1000
        }
    }));
    // 装载 Koa 最高级中间件
    koaApp.use(async (ctx, next) => {
        await next();
        // 因所有HTTP请求必须由面板端创建任务护照才可使用，因此准许跨域请求，也可保证安全
        ctx.response.set("Access-Control-Allow-Origin", "*");
        ctx.response.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        ctx.response.set("Access-Control-Allow-Headers", "Content-Type, Cookie, Accept-Encoding, User-Agent, Host, Referer, " + "X-Requested-With, Accept, Accept-Language, Cache-Control, Connection");
        ctx.response.set("X-Power-by", "MCSManager");
    });
    koaApp.use(http_router_1.default.routes()).use(http_router_1.default.allowedMethods());
    return koaApp;
}
exports.initKoa = initKoa;
//# sourceMappingURL=http.js.map