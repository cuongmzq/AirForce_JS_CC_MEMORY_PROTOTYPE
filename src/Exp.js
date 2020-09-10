convertToNodeSpace: function (worldPoint) {
    return cc.pointApplyAffineTransform(worldPoint, this.getWorldToNodeTransform());
},

cc.pointApplyAffineTransform = function (point, transOrY, t) {
    var x, y;
    if (t === undefined) {
        t = transOrY;
        x = point.x;
        y = point.y;
    } else {
        x = point;
        y = transOrY;
    }
    return {x: t.a * x + t.c * y + t.tx, y: t.b * x + t.d * y + t.ty};
};

//Node.getWorldToNodeTransform
getWorldToNodeTransform: function () {
    return cc.affineTransformInvert(this.getNodeToWorldTransform());
},

getNodeToWorldTransform: function () {
    var t = this.getNodeToParentTransform();
    for (var p = this._parent; p !== null; p = p.parent)
        t = cc.affineTransformConcat(t, p.getNodeToParentTransform());
    return t;
},

getNodeToParentTransform: function (ancestor) {
    var t = this._renderCmd.getNodeToParentTransform();
    if (ancestor) {
        var T = {a: t.a, b: t.b, c: t.c, d: t.d, tx: t.tx, ty: t.ty};
        for (var p = this._parent; p != null && p != ancestor; p = p.getParent()) {
            cc.affineTransformConcatIn(T, p.getNodeToParentTransform());
        }
        return T;
    } else {
        return t;
    }
},

cc.affineTransformConcat = function (t1, t2) {
    return {
        a: t1.a * t2.a + t1.b * t2.c,                          //a
        b: t1.a * t2.b + t1.b * t2.d,                               //b
        c: t1.c * t2.a + t1.d * t2.c,                               //c
        d: t1.c * t2.b + t1.d * t2.d,                               //d
        tx: t1.tx * t2.a + t1.ty * t2.c + t2.tx,                    //tx
        ty: t1.tx * t2.b + t1.ty * t2.d + t2.ty
    };				    //ty
};

cc.affineTransformConcatIn = function (t1, t2) {
    var a = t1.a, b = t1.b, c = t1.c, d = t1.d, tx = t1.tx, ty = t1.ty;
    t1.a = a * t2.a + b * t2.c;
    t1.b = a * t2.b + b * t2.d;
    t1.c = c * t2.a + d * t2.c;
    t1.d = c * t2.b + d * t2.d;
    t1.tx = tx * t2.a + ty * t2.c + t2.tx;
    t1.ty = tx * t2.b + ty * t2.d + t2.ty;
    return t1;
};

getParent: function () {
    return this._parent;
},
