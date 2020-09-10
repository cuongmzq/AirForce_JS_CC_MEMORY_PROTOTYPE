let ObjectPool = cc.Class.extend({
    ctor: function (creator, amount) {
        this.objectList = [];
        this.creator = creator;
        this.baseAmount = amount;
        this.currentAmount = 0;
        this.usedAmount = 0;
        this.currentAvailableID = 0;
        this.autoExpand = true;
        this.needAvailableID = false;
    },
    initPool: function () {
        for (let i = 0; i < this.baseAmount; ++i) {
            let obj = this.creator();
            obj.setVisible(false);
            obj.poolID = i;
            obj.isUsed = false;
            this.objectList.push(obj);
            this.currentAmount++;
        }
    },
    pushBack: function (id) {
        this.objectList[id].setVisible(false);
        this.objectList[id].isUsed = false;
        if (this.usedAmount < 0)
        {
            this.usedAmount = 0;
        }
        else
        {
            this.usedAmount--;
        }
        if (this.needAvailableID) {
            this.currentAvailableID = id;
        }
    },
    takeOut: function () {
        let tempID = this.currentAvailableID;
        this.needAvailableID = true;
        this.usedAmount++;
        while (tempID >= 0 && tempID < this.currentAmount) {
            if (this.objectList[tempID] !== null && !this.objectList[tempID].isUsed) {
                this.objectList[tempID].setVisible(true);
                this.objectList[tempID].isUsed = true;
                return this.objectList[tempID];
            }
            tempID++;
        }

        //Search from beginning
        for (let id = 0; id < this.currentAvailableID; ++id) {
            if (this.objectList[id] !== null && !this.objectList[id].isUsed) {
                this.objectList[id].setVisible(true);
                this.objectList[id].isUsed = true;
                return this.objectList[id];
            }
        }

        this.currentAvailableID = tempID;

        if (this.autoExpand) {
            let obj = this.creator();
            obj.poolID = tempID;
            obj.isUsed = true;
            this.objectList.push(obj);
            this.currentAmount++;
            return obj;
        }
        this.usedAmount--;
    },
    isUsedAll: function () {
        return this.currentAvailableID <= -1;
    }
});