let EnemyFighter = Fighter.extend({
    ctor: function (manager, res) {
        this._super(manager, res);
        this.flippedY = true;
        this.scheduleUpdate();
    },
    update: function (dt) {
        // this._super(dt);
        this.move(dt);

        if (this.fireEstimatedTime <= 0)
        {
            this.fire();
        }
    },

    createBulletPool: function (amount, autoExpand = true, res = "#Laser_Large_png_processed.png") {
        this._super(amount, autoExpand, res);
    },

    move: function (dt) {
        // if (this.x <= -this.manager.fighterSize.width ||
        //     this.x >= cc.winSize.width + this.manager.fighterSize.width ||
        //     this.y <= -this.manager.fighterSize.width ||
        //     this.y >= cc.winSize.height + this.manager.fighterSize.width)
        // {
        //
        // }

        if (this.x <= -this.manager.fighterSize.width) {
            this.x = 0.5;
            if (this.direction.x < 0) {
                this.direction.x *= -1;
            }
        }
        else if (this.x >= cc.winSize.width + this.manager.fighterSize.width) {
            this.x = cc.winSize.width - 0.5;
            if (this.direction.x > 0) {
                this.direction.x *= -1;
            }
        }
        else if (this.y <= -this.manager.fighterSize.width) {
            this.y = 0.5;
            if (this.direction.y < 0) {
                this.direction.y *= -1;
            }

        }
        else if (this.y >= cc.winSize.height + this.manager.fighterSize.width) {
            this.y = cc.winSize.height - 0.5;
            if (this.direction.y > 0) {
                this.direction.y *= -1;
            }
        }

        this.x += dt * this.direction.x * this.speed * 60;
        this.y += dt * this.direction.y * this.speed * 60;
        //
        // this.manager.enemyFighterPositionList[this.id].x = this.x;
        // this.manager.enemyFighterPositionList[this.id].y = this.y;

        this.setRotation(this.manager.pAngleSigned(vectorUp, this.direction) * cc.DEG);
        // this.manager.pRotateByAngleVectorOne(this.direction, angle);
    },

    fire: function () {
        this._super();
        if (this.bulletPool !== null) {
            this.currentBullet = this.bulletPool.takeOut();
            if (this.currentBullet) {
                this.currentBullet.x = this.x;
                this.currentBullet.y = this.y;
                this.currentBullet.setRotation(this.getRotation());
                this.currentBullet.calculateDirection();
                this.currentBullet.canMove = true;
                this.currentBullet.scheduleUpdate();
            }

            //Need attention on monitor usedAmount!
            //cc.log(this.bulletPool.objectList, this.bulletPool.usedAmount, this.bulletPool.currentAvailableID);
        }
    },

});