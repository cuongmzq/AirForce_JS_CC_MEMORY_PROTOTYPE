let PlayerFighter = Fighter.extend({
    ctor: function (manager, res) {
        this._super(manager, res);
        this.scheduleUpdate();
    },
    update: function (dt) {
        this._super(dt);
         if (this.manager.isTouching && this.fireEstimatedTime <= 0)
         {
             this.fire();
         }
    },

    createBulletPool: function (amount, autoExpand = true, res = "#Exhaust_Frame_01_png_processed.png") {
        this._super(amount, autoExpand, res);
    },

    move: function (dt) {

    },

    fire: function () {
        this._super();
        if (this.bulletPool !== null) {
            for (let i = 0; i < 3; ++i)
            {
                this.currentBullet = this.bulletPool.takeOut();
                if (this.currentBullet) {
                    this.currentBullet.x = this.x;
                    this.currentBullet.y = this.y;
                    this.currentBullet.setRotation(this.getRotation() - 15 + 15* i);
                    this.currentBullet.calculateDirection();
                    this.currentBullet.canMove = true;
                    this.currentBullet.scheduleUpdate();
                }
            }


            //Need attention on monitor usedAmount!
            //cc.log(this.bulletPool.objectList, this.bulletPool.usedAmount, this.bulletPool.currentAvailableID);
        }
    },
});