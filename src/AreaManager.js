// Suitable for centered AnchorPoint Object!!!

let AreaManager = cc.Class.extend({
        ctor: function (horizontalSlice, verticalSlice, width, height) {
            this.xSections = horizontalSlice;
            this.ySections = verticalSlice;

            this.cellWidth = width / horizontalSlice;
            this.cellHeight = height / verticalSlice;
            this.cellCount = horizontalSlice * verticalSlice;

            this.areaList = new Array(this.xSections * this.ySections);

            for (let rowID = 0; rowID < this.ySections; ++rowID) {
                for (let columnID = 0; columnID < this.xSections; ++columnID) {
                    let cell = new Cell();
                    cell.x = this.cellWidth / 2 + this.cellWidth * columnID;
                    cell.y = this.cellHeight / 2 + this.cellHeight * rowID;
                    cell.id = rowID * this.xSections + columnID;
                    this.areaList[cell.id] = cell;
                }
            }
        },
        getPointAreaID: function (x, y) {
            if (this.isManageable(x, y)) {
                let rowID = Math.floor(y / this.cellHeight);
                let columnID = Math.floor(x / this.cellWidth);
                return rowID * this.xSections + columnID;
            }
            return -1;
        },
        getPointArea: function (x, y) {
            let areaID = this.getPointAreaID(x, y);
            if (this.isValidAreaID(areaID))
                return this.areaList[areaID];
            return null;
        },
        getAreaWithID: function (areaID) {
            if (this.isValidAreaID(areaID))
                return this.areaList[areaID];
            return null;
        },
        getAreaXWithID: function (areaID) {
            if (this.isValidAreaID(areaID))
                return this.areaList[areaID].x;
            return null;
        },
        getAreaYWithID: function (areaID) {
            if (this.isValidAreaID(areaID))
                return this.areaList[areaID].y;
            return null;
        },
        updateEntityArea: function (entity, width = 0, height = 0) {
            if (this.isManageable(entity.x, entity.y)) {
                let areaID_00 = this.getPointAreaID(entity.x - width / 2, entity.y + height / 2);
                let areaID_01 = this.getPointAreaID(entity.x + width / 2, entity.y + height / 2);
                let areaID_02 = this.getPointAreaID(entity.x - width / 2, entity.y - height / 2);
                let areaID_03 = this.getPointAreaID(entity.x + width / 2, entity.y - height / 2);

                if (this.isValidAreaID(areaID_00) && areaID_00 !== entity.areaList[0]) {
                    if (this.isValidAreaID(entity.areaList[0]))
                        this.areaList[entity.areaList[0]].remove(entity.__instanceId);
                    entity.areaList[0] = areaID_00;
                    this.areaList[entity.areaList[0]].insert(entity.__instanceId);
                }

                if (this.isValidAreaID(areaID_01) && areaID_01 !== entity.areaList[1]) {
                    if (this.isValidAreaID(entity.areaList[1]))
                        this.areaList[entity.areaList[1]].remove(entity.__instanceId);
                    entity.areaList[1] = areaID_01;
                    this.areaList[entity.areaList[1]].insert(entity.__instanceId);
                }

                if (this.isValidAreaID(areaID_02) && areaID_02 !== entity.areaList[2]) {
                    if (this.isValidAreaID(entity.areaList[2]))
                        this.areaList[entity.areaList[2]].remove(entity.__instanceId);
                    entity.areaList[2] = areaID_02;
                    this.areaList[entity.areaList[2]].insert(entity.__instanceId);
                }

                if (this.isValidAreaID(areaID_03) && areaID_03 !== entity.areaList[3]) {
                    if (this.isValidAreaID(entity.areaList[3]))
                        this.areaList[entity.areaList[3]].remove(entity.__instanceId);
                    entity.areaList[3] = areaID_03;
                    this.areaList[entity.areaList[3]].insert(entity.__instanceId);
                }
            }
        },
        isManageable: function (x, y) {
            return !(x < 0 || y < 0 || x > cc.winSize.width || y > cc.winSize.height);
        },
        isValidAreaID: function (areaID) {
            return !(areaID < 0 || areaID >= this.cellCount);
        }
    }
);

let Cell = cc.Class.extend({
    ctor: function () {
        this.id = 0;
        this.x = 0;
        this.y = 0;
        this.objectList = [];
        this.objectCount = 0;
    },
    insert: function (entityID) {
        this.objectList.push(entityID);
        this.objectCount++;
    },
    remove: function (entityID) {
        if (this.objectList[this.objectCount - 1] === entityID) {
            this.objectCount = --this.objectList.length;
            return true;
        }

        for (let i = 0; i < this.objectCount - 1; ++i) {
            if (this.objectList[i] === entityID) {
                let holder = this.objectList[i];
                this.objectList[i] = this.objectList[this.objectCount - 1];
                this.objectList[this.objectCount - 1] = holder;
                this.objectCount = --this.objectList.length;
                return true;
            }
        }
        return false;
    }
});