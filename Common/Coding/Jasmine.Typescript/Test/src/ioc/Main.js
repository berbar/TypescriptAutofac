"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_1 = require("../../dist/jasmine");
const TypeOf = jasmine_1.default.System.Reflection.TypeOf;
var testID = 0;
var Assembly1;
(function (Assembly1) {
    class CTestingBase {
        constructor() {
            this.testID = ++testID;
        }
        Ha() {
        }
    }
    Assembly1.CTestingBase = CTestingBase;
    let Assembly2;
    (function (Assembly2) {
        class Testing2 extends CTestingBase {
        }
        Assembly2.Testing2 = Testing2;
        (function (Testing2) {
            class Testing3 {
            }
            console.debug(Testing3);
        })(Testing2 = Assembly2.Testing2 || (Assembly2.Testing2 = {}));
    })(Assembly2 = Assembly1.Assembly2 || (Assembly1.Assembly2 = {}));
    class Testing extends CTestingBase {
    }
    Assembly1.Testing = Testing;
})(Assembly1 || (Assembly1 = {}));
class CAni {
    constructor(name) {
        this.testID = ++testID;
        this.name = "";
        this.name = name;
    }
}
class CSingle {
    constructor() {
        this.testID = ++testID;
    }
}
class CTest {
    constructor(ani) {
        this.m_ani = null;
        this.testID = ++testID;
        this.m_ani = ani;
    }
    Dispose() {
        console.debug("dispose %s", this.testID);
    }
}
let CTest1 = class CTest1 extends CTest {
    constructor(ani) {
        super(ani);
    }
};
CTest1 = __decorate([
    __param(0, jasmine_1.default.System.Reflection.DeclaringType(TypeOf(CAni)))
], CTest1);
let CTest2 = class CTest2 extends CTest {
    constructor(ani, lifetimeScope) {
        super(ani);
        this.m_ani2 = null;
        console.debug(lifetimeScope);
    }
    set Name(str) {
    }
    get Name() {
        return "";
    }
    set Ani(ani) {
        this.m_ani2 = ani;
    }
};
__decorate([
    jasmine_1.default.System.Reflection.DeclaringType(TypeOf(CAni))
], CTest2.prototype, "Ani", null);
CTest2 = __decorate([
    __param(0, jasmine_1.default.System.Reflection.DeclaringType(TypeOf(CAni))),
    __param(0, jasmine_1.default.System.Reflection.Named("ani")),
    __param(1, jasmine_1.default.Ioc.InjectLifetimeScope())
], CTest2);
let ss = Symbol("ss");
console.debug(TypeOf(CTest1));
// type s = keyof ii;
// console.debug( s );
let cb = new jasmine_1.default.Ioc.CContainerBuilder();
cb.RegisterType(TypeOf(CTest1))
    .AsSelf().As(TypeOf(CTest))
    .Keyed(TypeOf(CTest), "1")
    .InstancePerMatchingLifetimeScope(ss)
    .WithParameter(new jasmine_1.default.Ioc.CTypedParameter(TypeOf(CAni), new CAni("sss")));
cb.RegisterType(TypeOf(CTest2))
    .AsSelf()
    .As(TypeOf(CTest))
    .Keyed(TypeOf(CTest), "2")
    .InstancePerMatchingLifetimeScope(ss)
    .PropertiesAutowired()
    .WithProperty(new jasmine_1.default.Ioc.CTypedParameter(TypeOf(CAni), new CAni("with property")));
//cb.RegisterType( TypeOf( CAni ) ).AsSelf().InstancePerLifetimeScope();
//cb.RegisterAssemblyTypes( new System.Reflection.CAssembly( Assembly1 ) ).Where( ( t ) => t.IsEquivalentTo( Assembly1.Testing ) ).AsSelf().SingleInstance();
cb.RegisterTypes([TypeOf(Assembly1.Testing), TypeOf(Assembly1.Assembly2.Testing2)])
    .AsSelf()
    .KeyedMapping(TypeOf(Assembly1.CTestingBase), t => t.GetJsConstructor().name)
    .SingleInstance();
cb.RegisterInstance(TypeOf(CSingle), new CSingle());
let container = cb.Build();
console.debug(container);
let test;
let single;
// test = container.Resolve( TypeOf( CTest ) );
// console.debug( test );
// test = container.Resolve( TypeOf( CTest ) );
// console.debug( test );
single = container.Resolve(TypeOf(CSingle));
console.debug(single);
let scope1 = container.BeginLifetimeScope(ss);
try {
    console.debug(scope1);
    //test = scope1.ResolveKeyed( TypeOf( CTest ), "1", new Ioc.CTypedParameter( TypeOf( CAni ), new CAni( "bee" ) ) );
    test = scope1.ResolveKeyed(TypeOf(CTest), "1");
    console.debug(test);
    test = scope1.ResolveKeyed(TypeOf(CTest), "1", new jasmine_1.default.Ioc.CTypedParameter(TypeOf(CAni), new CAni()));
    console.debug(test);
    test = scope1.ResolveKeyed(TypeOf(CTest), "2", new jasmine_1.default.Ioc.CTypedParameter(TypeOf(CAni), new CAni()));
    console.debug(test);
    test = scope1.ResolveKeyed(TypeOf(CTest), "2", new jasmine_1.default.Ioc.CTypedParameter(TypeOf(CAni), new CAni("gee")));
    console.debug(test);
    single = scope1.Resolve(TypeOf(CSingle));
    console.debug(single);
    console.debug(scope1.Resolve(TypeOf(Assembly1.Testing)));
    console.debug(scope1.Resolve(TypeOf(Assembly1.Assembly2.Testing2)));
    console.debug(scope1.ResolveKeyed(TypeOf(Assembly1.CTestingBase), "Testing"));
    console.debug(scope1.ResolveKeyed(TypeOf(Assembly1.CTestingBase), "Testing2"));
    //console.debug( scope1.Resolve( TypeOf( Assembly1.Assembly2.Testing2.Testing3 ) ) );
}
catch (e) {
}
scope1.Dispose();
function ScanTypesFromObject(obj) {
    let types = [];
    for (const k in obj) {
        const v = obj[k];
        if (v == undefined || v == null)
            continue;
        if (v["prototype"] != null) {
            types.push(jasmine_1.default.System.Reflection.TypeOf(v));
            types = types.concat(ScanTypesFromObject(v));
            continue;
        }
        types = types.concat(ScanTypesFromObject(v));
    }
    return types;
}
let types = ScanTypesFromObject(Assembly1);
console.debug(types);
//# sourceMappingURL=Main.js.map