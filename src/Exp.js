// convertToNodeSpace: function (worldPoint) {
//     return cc.pointApplyAffineTransform(worldPoint, this.getWorldToNodeTransform());
// },
//
// cc.pointApplyAffineTransform = function (point, transOrY, t) {
//     var x, y;
//     if (t === undefined) {
//         t = transOrY;
//         x = point.x;
//         y = point.y;
//     } else {
//         x = point;
//         y = transOrY;
//     }
//     return {x: t.a * x + t.c * y + t.tx, y: t.b * x + t.d * y + t.ty};
// };
//
// //Node.getWorldToNodeTransform
// getWorldToNodeTransform: function () {
//     return cc.affineTransformInvert(this.getNodeToWorldTransform());
// },
//
// getNodeToWorldTransform: function () {
//     var t = this.getNodeToParentTransform();
//     for (var p = this._parent; p !== null; p = p.parent)
//         t = cc.affineTransformConcat(t, p.getNodeToParentTransform());
//     return t;
// },
//
// getNodeToParentTransform: function (ancestor) {
//     var t = this._renderCmd.getNodeToParentTransform();
//     if (ancestor) {
//         var T = {a: t.a, b: t.b, c: t.c, d: t.d, tx: t.tx, ty: t.ty};
//         for (var p = this._parent; p != null && p != ancestor; p = p.getParent()) {
//             cc.affineTransformConcatIn(T, p.getNodeToParentTransform());
//         }
//         return T;
//     } else {
//         return t;
//     }
// },
//
// cc.affineTransformConcat = function (t1, t2) {
//     return {
//         a: t1.a * t2.a + t1.b * t2.c,                          //a
//         b: t1.a * t2.b + t1.b * t2.d,                               //b
//         c: t1.c * t2.a + t1.d * t2.c,                               //c
//         d: t1.c * t2.b + t1.d * t2.d,                               //d
//         tx: t1.tx * t2.a + t1.ty * t2.c + t2.tx,                    //tx
//         ty: t1.tx * t2.b + t1.ty * t2.d + t2.ty
//     };				    //ty
// };
//
// cc.affineTransformConcatIn = function (t1, t2) {
//     var a = t1.a, b = t1.b, c = t1.c, d = t1.d, tx = t1.tx, ty = t1.ty;
//     t1.a = a * t2.a + b * t2.c;
//     t1.b = a * t2.b + b * t2.d;
//     t1.c = c * t2.a + d * t2.c;
//     t1.d = c * t2.b + d * t2.d;
//     t1.tx = tx * t2.a + ty * t2.c + t2.tx;
//     t1.ty = tx * t2.b + ty * t2.d + t2.ty;
//     return t1;
// };
//
// getParent: function () {
//     return this._parent;
// },
//
// //Class
//
// /****************************************************************************
//  Copyright (c) 2008-2010 Ricardo Quesada
//  Copyright (c) 2011-2012 cocos2d-x.org
//  Copyright (c) 2013-2014 Chukong Technologies Inc.
//
//  http://www.cocos2d-x.org
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//  ****************************************************************************/
//
// var cc = cc || {};
//
// /**
//  * Common getter setter configuration function
//  * @function
//  * @param {Object}   proto      A class prototype or an object to config<br/>
//  * @param {String}   prop       Property name
//  * @param {function} getter     Getter function for the property
//  * @param {function} setter     Setter function for the property
//  * @param {String}   getterName Name of getter function for the property
//  * @param {String}   setterName Name of setter function for the property
//  */
// cc.defineGetterSetter = function (proto, prop, getter, setter, getterName, setterName) {
//     if (proto.__defineGetter__) {
//         getter && proto.__defineGetter__(prop, getter);
//         setter && proto.__defineSetter__(prop, setter);
//     } else if (Object.defineProperty) {
//         var desc = {enumerable: false, configurable: true};
//         getter && (desc.get = getter);
//         setter && (desc.set = setter);
//         Object.defineProperty(proto, prop, desc);
//     } else {
//         throw new Error("browser does not support getters");
//     }
//
//     if (!getterName && !setterName) {
//         // Lookup getter/setter function
//         var hasGetter = (getter != null), hasSetter = (setter != undefined), props = Object.getOwnPropertyNames(proto);
//         for (var i = 0; i < props.length; i++) {
//             var name = props[i];
//
//             if ((proto.__lookupGetter__ ? proto.__lookupGetter__(name)
//                 : Object.getOwnPropertyDescriptor(proto, name))
//                 || typeof proto[name] !== "function")
//                 continue;
//
//             var func = proto[name];
//             if (hasGetter && func === getter) {
//                 getterName = name;
//                 if (!hasSetter || setterName) break;
//             }
//             if (hasSetter && func === setter) {
//                 setterName = name;
//                 if (!hasGetter || getterName) break;
//             }
//         }
//     }
//
//     // Found getter/setter
//     var ctor = proto.constructor;
//     if (getterName) {
//         if (!ctor.__getters__) {
//             ctor.__getters__ = {};
//         }
//         ctor.__getters__[getterName] = prop;
//     }
//     if (setterName) {
//         if (!ctor.__setters__) {
//             ctor.__setters__ = {};
//         }
//         ctor.__setters__[setterName] = prop;
//     }
// };
//
// /**
//  * Create a new object and copy all properties in an exist object to the new object
//  * @function
//  * @param {object|Array} obj The source object
//  * @return {Array|object} The created object
//  */
// cc.clone = function (obj) {
//     // Cloning is better if the new object is having the same prototype chain
//     // as the copied obj (or otherwise, the cloned object is certainly going to
//     // have a different hidden class). Play with C1/C2 of the
//     // PerformanceVirtualMachineTests suite to see how this makes an impact
//     // under extreme conditions.
//     //
//     // Object.create(Object.getPrototypeOf(obj)) doesn't work well because the
//     // prototype lacks a link to the constructor (Carakan, V8) so the new
//     // object wouldn't have the hidden class that's associated with the
//     // constructor (also, for whatever reasons, utilizing
//     // Object.create(Object.getPrototypeOf(obj)) + Object.defineProperty is even
//     // slower than the original in V8). Therefore, we call the constructor, but
//     // there is a big caveat - it is possible that the this.init() in the
//     // constructor would throw with no argument. It is also possible that a
//     // derived class forgets to set "constructor" on the prototype. We ignore
//     // these possibities for and the ultimate solution is a standardized
//     // Object.clone(<object>).
//     var newObj = (obj.constructor) ? new obj.constructor : {};
//
//     // Assuming that the constuctor above initialized all properies on obj, the
//     // following keyed assignments won't turn newObj into dictionary mode
//     // because they're not *appending new properties* but *assigning existing
//     // ones* (note that appending indexed properties is another story). See
//     // CCClass.js for a link to the devils when the assumption fails.
//     for (var key in obj) {
//         var copy = obj[key];
//         // Beware that typeof null == "object" !
//         if (((typeof copy) === "object") && copy && !(copy instanceof cc.Node) && !(copy instanceof HTMLElement)) {
//             newObj[key] = cc.clone(copy);
//         } else {
//             newObj[key] = copy;
//         }
//     }
//     return newObj;
// };
//
// cc.inject = function (srcPrototype, destPrototype) {
//     for (var key in srcPrototype)
//         destPrototype[key] = srcPrototype[key];
// };
//
// /**
//  * @namespace
//  * @name ClassManager
//  */
// var ClassManager = function () {
//     var id = (0|(Math.random()*998));
//     var instanceId = (0|(Math.random()*998));
//
//     this.getNewID = function () {
//         return id++;
//     };
//
//     this.getNewInstanceId = function () {
//         return instanceId++;
//     };
// };
// var classManager = new ClassManager();
//
// /* Managed JavaScript Inheritance
//  * Based on John Resig's Simple JavaScript Inheritance http://ejohn.org/blog/simple-javascript-inheritance/
//  * MIT Licensed.
//  */
// (function () {
//     var fnTest = /\b_super\b/;
//
//
//     /**
//      * The base Class implementation (does nothing)
//      * @class
//      */
//     cc.Class = function () {
//     };
//
//     /**
//      * Create a new Class that inherits from this Class
//      * @static
//      * @param {object} props
//      * @return {function}
//      */
//     cc.Class.extend = function (props) {
//         var _super = this.prototype;
//
//         // Instantiate a base Class (but only create the instance,
//         // don't run the init constructor)
//         var prototype = Object.create(_super);
//
//         // Copy the properties over onto the new prototype. We make function
//         // properties non-eumerable as this makes typeof === 'function' check
//         // unnecessary in the for...in loop used 1) for generating Class()
//         // 2) for cc.clone and perhaps more. It is also required to make
//         // these function properties cacheable in Carakan.
//         var desc = {writable: true, enumerable: false, configurable: true};
//
//         // The dummy Class constructor
//         var Class;
//         if (cc.game.config && cc.game.config[cc.game.CONFIG_KEY.exposeClassName]) {
//             var constructor = "(function " + (props._className || "Class") + " (arg0, arg1, arg2, arg3, arg4, arg5) {\n";
//             constructor += "    this.__instanceId = classManager.getNewInstanceId();\n";
//             constructor += "    if (this.ctor) {\n";
//             constructor += "        switch (arguments.length) {\n";
//             constructor += "        case 0: this.ctor(); break;\n";
//             constructor += "        case 1: this.ctor(arg0); break;\n";
//             constructor += "        case 3: this.ctor(arg0, arg1, arg2); break;\n";
//             constructor += "        case 4: this.ctor(arg0, arg1, arg2, arg3); break;\n";
//             constructor += "        case 5: this.ctor(arg0, arg1, arg2, arg3, arg4); break;\n";
//             constructor += "        default: this.ctor.apply(this, arguments);\n";
//             constructor += "        }\n";
//             constructor += "    }\n";
//             constructor += "})";
//             Class = eval(constructor);
//         }
//         else {
//             Class = function (arg0, arg1, arg2, arg3, arg4) {
//                 this.__instanceId = classManager.getNewInstanceId();
//                 if (this.ctor) {
//                     switch (arguments.length) {
//                         case 0: this.ctor(); break;
//                         case 1: this.ctor(arg0); break;
//                         case 2: this.ctor(arg0, arg1); break;
//                         case 3: this.ctor(arg0, arg1, arg2); break;
//                         case 4: this.ctor(arg0, arg1, arg2, arg3); break;
//                         case 5: this.ctor(arg0, arg1, arg2, arg3, arg4); break;
//                         default: this.ctor.apply(this, arguments);
//                     }
//                 }
//             };
//         }
//
//         desc.value = classManager.getNewID();
//         Object.defineProperty(prototype, '__pid', desc);
//
//         // Populate our constructed prototype object
//         Class.prototype = prototype;
//
//         // Enforce the constructor to be what we expect
//         desc.value = Class;
//         Object.defineProperty(prototype, 'constructor', desc);
//
//         // Copy getter/setter
//         this.__getters__ && (Class.__getters__ = cc.clone(this.__getters__));
//         this.__setters__ && (Class.__setters__ = cc.clone(this.__setters__));
//
//         for (var idx = 0, li = arguments.length; idx < li; ++idx) {
//             var prop = arguments[idx];
//             for (var name in prop) {
//                 var isFunc = (typeof prop[name] === "function");
//                 var override = (typeof _super[name] === "function");
//                 var hasSuperCall = fnTest.test(prop[name]);
//
//                 if (isFunc && override && hasSuperCall) {
//                     desc.value = (function (name, fn) {
//                         return function () {
//                             var tmp = this._super;
//
//                             // Add a new ._super() method that is the same method
//                             // but on the super-Class
//                             this._super = _super[name];
//
//                             // The method only need to be bound temporarily, so we
//                             // remove it when we're done executing
//                             var ret = fn.apply(this, arguments);
//                             this._super = tmp;
//
//                             return ret;
//                         };
//                     })(name, prop[name]);
//                     Object.defineProperty(prototype, name, desc);
//                 } else if (isFunc) {
//                     desc.value = prop[name];
//                     Object.defineProperty(prototype, name, desc);
//                 } else {
//                     prototype[name] = prop[name];
//                 }
//
//                 if (isFunc) {
//                     // Override registered getter/setter
//                     var getter, setter, propertyName;
//                     if (this.__getters__ && this.__getters__[name]) {
//                         propertyName = this.__getters__[name];
//                         for (var i in this.__setters__) {
//                             if (this.__setters__[i] === propertyName) {
//                                 setter = i;
//                                 break;
//                             }
//                         }
//                         cc.defineGetterSetter(prototype, propertyName, prop[name], prop[setter] ? prop[setter] : prototype[setter], name, setter);
//                     }
//                     if (this.__setters__ && this.__setters__[name]) {
//                         propertyName = this.__setters__[name];
//                         for (var i in this.__getters__) {
//                             if (this.__getters__[i] === propertyName) {
//                                 getter = i;
//                                 break;
//                             }
//                         }
//                         cc.defineGetterSetter(prototype, propertyName, prop[getter] ? prop[getter] : prototype[getter], prop[name], getter, name);
//                     }
//                 }
//             }
//         }
//
//         // And make this Class extendable
//         Class.extend = cc.Class.extend;
//
//         //add implementation method
//         Class.implement = function (prop) {
//             for (var name in prop) {
//                 prototype[name] = prop[name];
//             }
//         };
//         return Class;
//     };
// })();
//
