let vectorTemp = cc.p(0, 0);
let vectorTemp_02 = cc.p(0, 0);
let vectorUp = {x: 0, y: 1};
let MainGameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.fighter = null;
        this.enemyCount = 30;
        this.enemyFighterList = [];
        this.enemyFighterPositionList = [];
        this.isTouching = false;
        this.touchPosition = cc.p(0, 0);
        this.touchRawPosition = cc.p(0, 0);
        this.playerRotateDirection = cc.p(0, 0);

        let bullet = new cc.Sprite(res.bullet);
        this.bulletSize = bullet.getContentSize();
        let fighter = new cc.Sprite(res.fighter);
        this.fighterSize = fighter.getContentSize();

        this.createBackground();
        this.createFighter();
        this.setScale(0.7);
        this.scheduleUpdate();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch) => {
                this.touchRawPosition.x = touch.getLocationX();
                this.touchRawPosition.y = touch.getLocationY();
                this.touchPosition = this.convertToNodeSpace(this.touchRawPosition);
                this.isTouching = true;
                return true;
            },
            onTouchMoved: (touch) => {
                this.touchRawPosition.x = touch.getLocationX();
                this.touchRawPosition.y = touch.getLocationY();
                this.touchPosition = this.convertToNodeSpace(this.touchRawPosition);
            },
            onTouchEnded: (touch) => {
                this.isTouching = false;
            }
        }, this);
    },

    update: function (dt) {
        if (this.isTouching && this.fighter.fireEstimatedTime <= 0) {
            this.rotateFighterToTouch();
            this.fighter.fire();
        }
        // this.enemyFighter.move(dt);
    },

    rotateFighterToTouch: function () {
        this.playerRotateDirection.x = this.touchPosition.x - this.fighter.x;
        this.playerRotateDirection.y = this.touchPosition.y - this.fighter.y;
        let rotation = this.pAngleSigned(vectorUp, this.playerRotateDirection);
        this.fighter.setRotation(rotation);
    },

    pAngleSigned: function (a, b) {
        let na = Math.sqrt(a.x * a.x + a.y * a.y);
        let nb = Math.sqrt(b.x * b.x + b.y * b.y);

        let xa = 0, ya = 0, xb = 0, yb = 0;
        if (na === 0) {
            xa = a.x;
            ya = a.y;
        } else {
            xa = a.x * 1.0 / na;
            ya = a.y * 1.0 / na;
        }

        if (nb === 0) {
            xb = b.x;
            yb = b.y;
        } else {
            xb = b.x * 1.0 / nb;
            yb = b.y * 1.0 / nb;
        }
        return -Math.atan2(xa * yb - ya * xb, xa * xb + ya * yb) * cc.DEG;
    },
    pRotateByAngleVectorOne: function (directionVector, radianAngle) {
        //v(0, 1) p(0, 0) sub: 0, 1
        directionVector.x = -Math.sin(radianAngle);
        directionVector.y = Math.cos(radianAngle);
    },

    pDistance: function (xa, ya, xb, yb) {
        if (xb === undefined && yb === undefined)
        {
            return this.pLength(xa.x - ya.x, xa.y - ya.y);
        }
        else
        {
            return this.pLength(xa - xb, ya - yb);
        }

    },

    pLength: function (x, y) {
        if (y === undefined)
        {
            return Math.sqrt(x.x * x.x + x.y * x.y);
        }
        else
        {
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
        this.fighter = new Fighter(this, res.fighter);
        this.fighter.x = cc.winSize.width / 2;
        this.fighter.y = this.fighter.height;
        this.addChild(this.fighter, 5);
        this.fighter.createBulletPool(this.fighter.bulletPoolAmount);

        for (let i = 0; i < this.enemyCount; ++i)
        {
            let enemyFighter = new Fighter(this, res.enemyFighter);
            enemyFighter.id = i;
            enemyFighter.direction.x = Math.random() > 0.5 ? 1: -1;
            enemyFighter.direction.y = Math.random() > 0.5 ? 1: -1;
            enemyFighter.x = Math.random() * cc.winSize.width;
            enemyFighter.y = Math.random() * cc.winSize.height;
            this.addChild(enemyFighter, 5);
            let enemyPosition = cc.p(enemyFighter.x, enemyFighter.y);
            this.enemyFighterPositionList.push(enemyPosition);
            this.enemyFighterList.push(enemyFighter);
        }

    }
});

let MainGameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        let layer = new MainGameLayer();
        this.addChild(layer);
    }
})