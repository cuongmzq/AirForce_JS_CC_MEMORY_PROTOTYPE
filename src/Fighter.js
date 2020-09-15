let Fighter = cc.Sprite.extend({
    ctor: function (manager, res) {
        this._super(res);
        this.manager = manager;
        this.bulletPool = null;
        this.bulletPoolAmount = 10;
        this.fireRate = 0.1;
        this.fireEstimatedTime = 0;
        this.currentBullet = null;
        this.direction = cc.p(0, 0);
        this.id = -1;
        this.speed = 2;
    },
    update: function (dt) {
        // if (this.fireEstimatedTime > 0) {
        //     this.fireEstimatedTime -= dt;
        // } else {
        //     this.fireEstimatedTime = this.fireRate;
        // }
        //
        // this.move(dt);
        //
        // if (this.fireEstimatedTime <= 0)
        // {
        //     this.fire();
        // }
    },

    //Please call this after run ctor()
    createBulletPool: function (amount, autoExpand = true, res = "#Exhaust_Frame_01_png_processed.png") {
        if (!this.bulletPool) {
            let creator = () => {
                let bullet = new Bullet(this, res);
                bullet.x = this.x;
                bullet.y = this.y;
                this.manager.addChild(bullet, this.getLocalZOrder() - 1);
                return bullet;
            }
            this.bulletPool = new ObjectPool(creator, amount);
            this.bulletPool.autoExpand = autoExpand;
            this.bulletPool.initPool();
        }
    },

    fire: function () {

    },

    move: function (dt) {

    }
});