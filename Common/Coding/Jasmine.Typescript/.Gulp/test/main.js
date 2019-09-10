"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_1 = require("../dist/jasmine");
const TypeOf = jasmine_1.default.System.Reflection.TypeOf;
console.debug(jasmine_1.default);
let CReceiveMethod_Login = class CReceiveMethod_Login {
    OnReceived(...args) {
    }
};
CReceiveMethod_Login = __decorate([
    jasmine_1.default.Network.Lived.Decorators.ReceiveMethod("Login")
], CReceiveMethod_Login);
class CReceiverChat {
    GetMessage() {
    }
    GetImage() {
    }
}
__decorate([
    jasmine_1.default.Network.Lived.Decorators.ReceiveMethod("GetMessage")
], CReceiverChat.prototype, "GetMessage", null);
__decorate([
    jasmine_1.default.Network.Lived.Decorators.ReceiveMethod("GetImage")
], CReceiverChat.prototype, "GetImage", null);
class CWebsocketContext extends jasmine_1.default.Network.Lived.CContext {
    constructor() {
        super();
    }
}
let cb = new jasmine_1.default.Ioc.CContainerBuilder();
cb.RegisterType(TypeOf(jasmine_1.default.Network.Lived.SignalR.CSignalRConnection)).As(TypeOf(jasmine_1.default.Network.Lived.CConnection)).InstancePerDependency();
cb.RegisterType(TypeOf(CWebsocketContext)).Keyed(TypeOf(jasmine_1.default.Network.Lived.CContext), "/TestHub").SingleInstance();
let netContext = new jasmine_1.default.Network.Lived.CContext();
netContext.AddReceiver(jasmine_1.default.System.Reflection.TypeOf(CReceiveMethod_Login));
netContext.AddReceiver(jasmine_1.default.System.Reflection.TypeOf(CReceiverChat));
//# sourceMappingURL=main.js.map