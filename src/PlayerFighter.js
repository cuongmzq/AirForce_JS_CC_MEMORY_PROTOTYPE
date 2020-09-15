// let MOVEMENT = {LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4, NEUTRAL: 0};

let PlayerFighter = Fighter.extend({
    ctor: function (manager, res) {
        this._super(manager, res);
        this.rotationOffsetVector = cc.p(0, 0);
        this.direction = cc.p(0, 0);
        this.speed = 10;
        this.isPressing = false;


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: (touch) => {
                touchRawPosition.x = touch.getLocationX();
                touchRawPosition.y = touch.getLocationY();
                touchPosition = this.manager.convertToNodeSpace(touchRawPosition);
                this.isTouching = true;

                return true;
            },
            onTouchMoved: (touch) => {
                touchRawPosition.x = touch.getLocationX();
                touchRawPosition.y = touch.getLocationY();
                touchPosition = this.manager.convertToNodeSpace(touchRawPosition);
            },
            onTouchEnded: (touch) => {
                this.isTouching = false;
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (key, event) => {
                this.isPressing = true;

                if (key === cc.KEY.a)
                {
                    this.direction.x = -1;
                }
                else if (key === cc.KEY.d)
                {
                    this.direction.x = 1;
                }

                if (key === cc.KEY.w)
                {
                    this.direction.y = 1;
                }
                else if (key === cc.KEY.s)
                {
                    this.direction.y = -1;
                }
            },
            onKeyReleased: (key, event) => {
                this.isPressing = false;

                if (key === cc.KEY.a || key === cc.KEY.d)
                {
                    this.direction.x = 0;
                }

                if (key === cc.KEY.w || key === cc.KEY.s)
                {
                    this.direction.y = 0;
                }
            }
        }, this);
        this.scheduleUpdate();
    },
    update: function (dt) {
        if (this.fireEstimatedTime > 0) {
            this.fireEstimatedTime -= dt;
        } else {
            this.fireEstimatedTime = this.fireRate;
        }

        if (this.isTouching)
        {
            this.rotateFighterToTouch();
            if (this.fireEstimatedTime <= 0)
            {
                this.fire();
            }
        }

        this.move(dt);
    },

    rotateFighterToTouch: function () {
        this.rotationOffsetVector.x = touchPosition.x - this.x;
        this.rotationOffsetVector.y = touchPosition.y - this.y;
        let rotation = this.manager.pAngleSigned(vectorUp, this.rotationOffsetVector) * cc.DEG;
        this.setRotation(rotation);
    },

    createBulletPool: function (amount, autoExpand = true, res = "#Exhaust_Frame_01_png_processed.png") {
        this._super(amount, autoExpand, res);
    },

    move: function (dt) {
        if (this.x <= this.manager.fighterSize.width / 2) {
            this.x = this.manager.fighterSize.width / 2 + 0.5;
        }
        else if (this.x >= cc.winSize.width - this.manager.fighterSize.width / 2) {
            this.x = cc.winSize.width - this.manager.fighterSize.width / 2 - 0.5;
        }
        else if (this.y <= this.manager.fighterSize.width / 2) {
            this.y = this.manager.fighterSize.width / 2 + 0.5;

        }
        else if (this.y >= cc.winSize.height - this.manager.fighterSize.width / 2) {
            this.y = cc.winSize.height - this.manager.fighterSize.width / 2 - 0.5;
        }

        this.x += dt * this.direction.x * this.speed * 60;
        this.y += dt * this.direction.y * this.speed * 60;
        //
        // this.manager.enemyFighterPositionList[this.id].x = this.x;
        // this.manager.enemyFighterPositionList[this.id].y = this.y;

        // this.setRotation(this.manager.pAngleSigned(vectorUp, this.direction) * cc.DEG);
    },

    fire: function () {
        if (this.bulletPool !== null) {
            for (let i = 0; i < 3; ++i)
            {
                this.currentBullet = this.bulletPool.takeOut();
                if (this.currentBullet) {
                    this.currentBullet.x = this.x;
                    this.currentBullet.y = this.y;
                    this.currentBullet.setRotation(this.getRotation() - 15 + 15 * i);
                    this.currentBullet.calculateDirection();
                    this.currentBullet.canMove = true;
                    this.currentBullet.scheduleUpdate();
                }
            }

            //Need attention on monitor usedAmount!
        }
    },
});