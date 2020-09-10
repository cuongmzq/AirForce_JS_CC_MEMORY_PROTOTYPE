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
        this._super();
        this.fighter = fighter;
        this.manager = fighter.manager;
        this.id = -444;
        this.canMove = false;
        this.speed = 10;
        this.direction = cc.p(0, 0);
        this.setTexture(res);
    },
    update: function (dt) {
        this.move(dt);
        this.bouncing();
        this.collisionDetection();
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
        if (this.canMove) {
            this.x += this.direction.x * 60 * this.speed * dt;
            this.y += this.direction.y * 60 * this.speed * dt;
        }
    },
    bouncing: function () {
        // if (this.moveOutFrame(this.x, this.y, this.fighter.manager.bulletSize.width / 2, this.fighter.manager.bulletSize.height / 2)) {
        //     this.fighter.bulletPool.pushBack(this.poolID);
        //     this.unscheduleUpdate();
        //     return;
        // }
        if (this.x <= 0)
        {
            this.fighter.bulletPool.pushBack(this.poolID);

            this.x = 0.5;
            if (this.direction.x < 0)
            {

                this.direction.x *= -1;
            }
        }
        else if (this.x >= cc.winSize.width)
        {
            this.fighter.bulletPool.pushBack(this.poolID);

            this.x = cc.winSize.width - 0.5;
            if (this.direction.x > 0)
            {
                this.direction.x *= -1;
            }
        }

        if (this.y <= 0)
        {
            this.fighter.bulletPool.pushBack(this.poolID);

            this.y = 0.5;
            if (this.direction.y < 0)
            {
                this.direction.y *= -1;
            }

        }
        else if (this.y >= cc.winSize.height)
        {
            this.fighter.bulletPool.pushBack(this.poolID);

            this.y = cc.winSize.height - 0.5;
            if (this.direction.y > 0)
            {
                this.direction.y *= -1;
            }
        }
        //
        // if (this.reachEdgeFrameX(this.x))
        // {
        //     this.direction.x *= -1;
        // }
        //
        // if (this.reachEdgeFrameY(this.y))
        // {
        //     this.direction.y *= -1;
        // }

        this.setRotation(this.fighter.manager.pAngleSigned(vectorUp, this.direction));
    },

    collisionDetection: function () {
        if (this.id === -444)
        {
            for (let i = 0; i < this.manager.enemyCount; ++i)
            {
                if (this.manager.pDistance(this.x, this.y, this.manager.enemyFighterPositionList[i].x, this.manager.enemyFighterPositionList[i].y) < this.manager.fighterSize.width / 2)
                {
                    this.manager.enemyFighterList[i].unscheduleUpdate();
                    this.manager.enemyFighterList[i].setVisible(false);
                    // this.fighter.bulletPool.pushBack(this.poolID);
                    // this.unscheduleUpdate();
                }
            }
        }
    },
    calculateDirection: function () {
        this.fighter.manager.pRotateByAngleVectorOne(this.direction, -this.getRotation() / cc.DEG);
    }
});