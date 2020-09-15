let vectorUp = {x: 0, y: 1};
let vectorDown = {x: 0, y: -1};
let touchPosition = cc.p(0, 0);
let touchRawPosition = cc.p(0, 0);
cc.log = function () {};

let MainGameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.fighter = null;
        this.enemyCount = 25;
        this.enemyFighterList = [];
        this.enemyFighterPositionList = [];
        this.isTouching = false;
        this.playerRotateDirection = cc.p(0, 0);
        //
        let bullet = new cc.Sprite(res.bullet);
        let fighter = new cc.Sprite(res.fighter);

        this.bulletSize = bullet.getContentSize();
        this.fighterSize = fighter.getContentSize();

        this.createBackground();
        this.createFighter();
        this.setScale(1);
        this.scheduleUpdate();
    },

    update: function (dt) {
        // this.rotateFighterToTouch();
    },

    pAngleSigned: function (aX, aY, bX, bY) {
        let xa = 0, ya = 0, xb = 0, yb = 0;

        if  (bX === undefined || bY === undefined)
        {
            let na = Math.sqrt(aX.x * aX.x + aX.y * aX.y);
            let nb = Math.sqrt(aY.x * aY.x + aY.y * aY.y);

            if (na === 0) {
                xa = aX.x;
                ya = aX.y;
            } else {
                xa = aX.x * 1.0 / na;
                ya = aX.y * 1.0 / na;
            }

            if (nb === 0) {
                xb = aY.x;
                yb = aY.y;
            } else {
                xb = aY.x * 1.0 / nb;
                yb = aY.y * 1.0 / nb;
            }

        }
        else
        {
            let na = Math.sqrt(aX * aX + aY * aY);
            let nb = Math.sqrt(bX * bX + bY * bY);

            if (na === 0) {
                xa = aX;
                ya = aY;
            } else {
                xa = aX * 1.0 / na;
                ya = aY * 1.0 / na;
            }

            if (nb === 0) {
                xb = bX;
                yb = bY;
            } else {
                xb = bX * 1.0 / nb;
                yb = bY * 1.0 / nb;
            }
        }

        return -Math.atan2(xa * yb - ya * xb, xa * xb + ya * yb);

    },
    pRotateByAngleVectorOne: function (directionVector, radianAngle) {
        directionVector.x = -Math.sin(radianAngle);
        directionVector.y = Math.cos(radianAngle);
    },

    pDistance: function (xa, ya, xb, yb) {
        if (xb === undefined && yb === undefined) {
            return this.pLength(xa.x - ya.x, xa.y - ya.y);
        } else {
            return this.pLength(xa - xb, ya - yb);
        }

    },

    pLength: function (x, y) {
        if (y === undefined) {
            return Math.sqrt(x.x * x.x + x.y * x.y);
        } else {
            return Math.sqrt(x * x + y * y);
        }
    },

    createBackground: function () {
        let background = new cc.Sprite(res.background);
        background.x = cc.winSize.width / 2;
        background.y = cc.winSize.height / 2;
        background.setScale(cc.winSize.width / background.width, cc.winSize.height / background.height);
        this.addChild(background);
    },

    createFighter: function () {
        this.fighter = new PlayerFighter(this, res.fighter);
        this.fighter.id = -555;
        this.fighter.fireRate = 0.05;
        this.fighter.x = cc.winSize.width / 2;
        this.fighter.y = this.fighter.height;

        touchPosition.x = this.fighter.x;
        touchPosition.y = this.fighter.y;

        this.addChild(this.fighter, 5);
        this.fighter.createBulletPool(50, true, res.bullet);

        for (let i = 0; i < this.enemyCount; ++i) {
            let enemyFighter = new EnemyFighter(this, res.enemyFighter);
            enemyFighter.fireRate = 0.05;
            enemyFighter.id = i;
            enemyFighter.speed = Math.random() * 6 + 2;

            let random = Math.random();
            if (random < 0.5) {
                enemyFighter.x = (Math.random() > 0.5 ? 1.1 : -0.1) * cc.winSize.width;
                enemyFighter.y = Math.floor(Math.random() * 10) * this.fighterSize.width;
            } else {
                enemyFighter.x = Math.floor(Math.random() * 10) * this.fighterSize.width;
                enemyFighter.y = (Math.random() > 0.5 ? 1.1 : -0.1) * cc.winSize.height;
            }

            let angle = this.pAngleSigned(vectorUp.x, vectorUp.y, enemyFighter.x - this.fighter.x, enemyFighter.y - this.fighter.y);
            enemyFighter.setRotation(angle * cc.DEG);
            this.pRotateByAngleVectorOne(enemyFighter.direction, angle);

            this.addChild(enemyFighter, Math.floor(Math.random() * 8 + 4));
            enemyFighter.createBulletPool(50, true, res.bullet_02);
            let enemyPosition = cc.p(enemyFighter.x, enemyFighter.y);
            this.enemyFighterPositionList.push(enemyPosition);
            this.enemyFighterList.push(enemyFighter);
        }
    }
});

let MainGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.ifx_plist);
        let layer = new MainGameLayer();
        this.addChild(layer);
    }
});