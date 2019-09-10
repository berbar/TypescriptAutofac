"use strict";
/// <reference path="../dist/JsArrayExtension.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_1 = require("../dist/jasmine");
const http = require("http");
const TestHub = require("./TestHub");
const socketConnectionSettings = {
    url: "http://localhost:63355/TestHub"
};
class CApplication {
    constructor() {
        this.m_lifetimeScope = null;
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Preload();
            let contextAccessor = this.m_lifetimeScope.Resolve(jasmine_1.default.System.Reflection.TypeOf(jasmine_1.default.Network.Socket.CContextAccessor));
            let socketContext = contextAccessor.GetSocketContext(socketConnectionSettings);
            yield socketContext.Connection.Connect();
            socketContext.Connection.Listen("RoleResult", function () {
                console.debug(arguments);
            });
            socketContext.Connection.Send("Role", "Admin");
        });
    }
    Preload() {
        let socketConnection = new jasmine_1.default.Network.Socket.SignalR.CSignalRConnection(socketConnectionSettings);
        let socketContext = new jasmine_1.default.Network.Socket.CContext(socketConnection);
        let socketContextAccessor = new jasmine_1.default.Network.Socket.CContextAccessor();
        socketContextAccessor.AddSocketContext(socketContext);
        let cb = new jasmine_1.default.Autofac.CContainerBuilder();
        cb.RegisterInstance(jasmine_1.default.System.Reflection.TypeOf(jasmine_1.default.Network.Socket.CContextAccessor), socketContextAccessor);
        // TestHub接收器的类型
        let receiverTypes = new jasmine_1.default.System.Reflection.CAssembly(TestHub).GetTypes().where(t => {
            if (t.IsInheritFrom(jasmine_1.default.System.Reflection.TypeOf(jasmine_1.default.Network.Socket.CReceiver)))
                return true;
            if (t.GetMethodOne("OnReceived") != null)
                return true;
            return false;
        });
        cb.RegisterTypes(receiverTypes)
            .AsSelf()
            .InstancePerDependency();
        socketContext.AddReceivers(receiverTypes);
        this.m_lifetimeScope = cb.Build();
    }
}
new CApplication().Start();
var server = http.createServer(function (req, res) {
});
server.listen(9000);
//# sourceMappingURL=Main.js.map