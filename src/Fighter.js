let Fighter = cc.Sprite.extend({
    ctor: function (manager, res) {
        this._super();
        this.manager = manager;
        this.bulletPool = null;
        this.bulletPoolAmount = 10;
        this.fireRate = 0.05;
        this.fireEstimatedTime = 0;
        this.currentBullet = null;
        this.direction = cc.p(0, 0);
        this.id = -555;

        this.setTexture(res);
        this.scheduleUpdate();
    },
    update: function (dt) {
        this.move(dt);
        if (this.fireEstimatedTime > 0) {
            this.fireEstimatedTime -= dt;
        } else {
            this.fire();
            this.fireEstimatedTime = this.fireRate;
        }
    },

    //Please call this after run ctor()
    createBulletPool: function (amount) {
        if (!this.bulletPool) {
            let creator = () => {
                let bullet = new Bullet(this, res.bullet);
                bullet.x = this.x;
                bullet.y = this.y;
                this.manager.addChild(bullet, 1);
                return bullet;
            }
            this.bulletPool = new ObjectPool(creator, amount);
            this.bulletPool.autoExpand = true;
            this.bulletPool.initPool();
        }
    },

    fire: function () {
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
            // cc.log(this.bulletPool.objectList, this.bulletPool.usedAmount, this.bulletPool.currentAvailableID);
        }

    },

    move: function (dt) {
        if (this.x <= 0)
        {
            this.x = 0.5;
            if (this.direction.x < 0)
            {
                this.direction.x *= -1;
            }
        }
        else if (this.x >= cc.winSize.width)
        {
            this.x = cc.winSize.width - 0.5;
            if (this.direction.x > 0)
            {
                this.direction.x *= -1;
            }
        }

        if (this.y <= 0)
        {
            this.y = 0.5;
            if (this.direction.y < 0)
            {
                this.direction.y *= -1;
            }

        }
        else if (this.y >= cc.winSize.height)
        {
            this.y = cc.winSize.height - 0.5;
            if (this.direction.y > 0)
            {
                this.direction.y *= -1;
            }
        }
        this.x += dt * this.direction.x * 10 * 60;
        this.y += dt * this.direction.y * 10 * 60;

        if (this.id !== -555)
        {
            this.manager.enemyFighterPositionList[this.id].x = this.x;
            this.manager.enemyFighterPositionList[this.id].y = this.y;
        }
    }
});