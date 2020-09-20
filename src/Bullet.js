/*
Note_01: I have passed in this.width and this.height in moveOutFrame function &&
        Memory increasing like hell!!! width and height having access to {}
        Accessed to Node.contentSize seem to have memory Increasing problem
        **Solution: the size(width and height) is fixed so save it in a oneInstanced object
        and access to it to get the size:
        <code>
        let bullet = new cc.Sprite(res.bullet);
        this.bulletSize = bullet.getContentSize();
        </code>
        Unscheduled Update when push back to pool is very helpful!
 */
let Bullet = cc.Sprite.extend({

    ctor: function (fighter, res) {
        this._super(res);
        this.fighter = fighter;
        this.manager = fighter.manager;
        this.id = -444;
        this.canMove = false;
        this.speed = 10;
        this.direction = cc.p(0, 0);
        this.enableDebug = false;
        entityManager.insert(this);
        areaManager.updateEntityArea(this, this.manager.bulletSize.width, this.manager.bulletSize.height);

        if (false) {
            this.debugDrawList = new Array(4);
            for (let i = 0; i < 4; ++i) {
                let drawNode = new cc.DrawNode();
                let startPoint = cc.p(this.x - areaManager.cellWidth / 2, this.y - areaManager.cellHeight / 2);
                let endPoint = cc.p(this.x + areaManager.cellWidth / 2, this.y + areaManager.cellHeight / 2)
                drawNode.drawRect(startPoint, endPoint, cc.color(255, 255, 0, 0), 3, cc.color(255, 255, 0));
                this.manager.addChild(drawNode, 999);
                this.debugDrawList[i] = drawNode;
                drawNode.setVisible(false);
            }
            this.enableDebug = true;
        }
    },
    update: function (dt) {
        if (this.canMove) {
            this.move(dt);
            this.bouncing();

            if (this.fighter.id === -555) {
                this.collisionDetection();
            }
            areaManager.updateEntityArea(this, this.manager.bulletSize.width, this.manager.bulletSize.height);
        }

        if (this.enableDebug) {
            for (let i = 0; i < 4; ++i) {
                if (this.canMove && areaManager.isValidAreaID(this.areaList[i])) {
                    this.debugDrawList[i].setVisible(true);
                    this.debugDrawList[i].x = areaManager.areaList[this.areaList[i]].x;
                    this.debugDrawList[i].y = areaManager.areaList[this.areaList[i]].y;
                } else {
                    this.debugDrawList[i].setVisible(false);
                }
            }
        }
    },
    moveOutFrame: function (x, y, offsetX, offsetY) {
        return (x < -offsetX || x > cc.winSize.width + offsetX || y < -offsetY || y > cc.winSize.height + offsetY);
    },
    reachEdgeFrameY: function (y) {
        return (y < 0 || y > cc.winSize.height);
    },
    reachEdgeFrameX: function (x) {
        return (x < 0 || x > cc.winSize.width);
    },
    move: function (dt) {
        this.x += this.direction.x * 60 * this.speed * dt;
        this.y += this.direction.y * 60 * this.speed * dt;
    },
    bouncing: function () {
        if (this.x <= 0 || this.x >= cc.winSize.width || this.y <= 0 || this.y >= cc.winSize.height) {
            this.fighter.bulletPool.pushBack(this.poolID);
            this.x = this.fighter.x;
            this.y = this.fighter.y;
            this.canMove = false;
            // this.unscheduleUpdate();
            return;
        }

        if (this.x <= 0) {
            this.x = 0.5;
            if (this.direction.x < 0) {

                this.direction.x *= -1;
            }
        } else if (this.x >= cc.winSize.width) {

            this.x = cc.winSize.width - 0.5;
            if (this.direction.x > 0) {
                this.direction.x *= -1;
            }
        }

        if (this.y <= 0) {

            this.y = 0.5;
            if (this.direction.y < 0) {
                this.direction.y *= -1;
            }
        } else if (this.y >= cc.winSize.height) {

            this.y = cc.winSize.height - 0.5;
            if (this.direction.y > 0) {
                this.direction.y *= -1;
            }
        }

        this.setRotation(this.fighter.manager.pAngleSigned(vectorUp, this.direction) * cc.DEG);
    },

    collisionDetection: function () {
        for (let i = 0; i < 4; ++i)
        {
            if (areaManager.isValidAreaID(this.areaList[i]))
            {
                for (let j = 0; j < areaManager.areaList[this.areaList[i]].objectCount; ++j)
                {
                    let entityID = areaManager.areaList[this.areaList[i]].objectList[j];
                    if (areaManager.areaList[this.areaList[i]].objectList[j])
                    if (intersectWithCenterBound(this, entityManager.entityList[entityID], this.manager.bulletSize.width, this.manager.bulletSize.height, this.manager.fighterSize.width, this.manager.fighterSize.height)) {
                        cc.log("hit");
                    }
                }
            }
        }
    },
    calculateDirection: function () {
        this.fighter.manager.pRotateByAngleVectorOne(this.direction, -this.getRotation() / cc.DEG);
    },
});

let intersectionWith = function (xa, ya, xb, yb, wa, ha, wb, hb) {
    return !(xa > xb + wb
        || ya > yb + hb
        || xa + wa < xb
        || ya + ha < yb);
}

let intersectWithCenterBound = function (a, b, aw, ah, bw, bh) {
    return !(a.x > b.x + bw / 2
        || a.y > b.y + bh / 2
        || a.x + aw / 2 < b.x
        || a.y + ah / 2 < b.y);
}