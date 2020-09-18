let AreaManager = cc.Class.extend({
    areaList: {},
    ctor: function () {
        this.row = 2;
        this.colum = 2;

        this.xSection = cc.winSize.width / this.column;
        this.ySection = cc.winSize.height / this.row;

        for (let i = 0; i < this.row; ++i)
        {
            for (let j = 0; j < this.colum; ++j)
            {
                let area = {};
                area.xBoundary = cc.p(i * this.xSection, i * this.xSection + this.xSection);
                area.yBoundary = cc.p(j * this.ySection, j * this.ySection + this.ySection);
                area.id = i + j;
                this.areaList[id] = area;
            }
        }
    },

    getAreaId: function (x, y)
    {
        return Math.floor(x / this.xSection) + Math.floor(y / this.ySection);
    },
});