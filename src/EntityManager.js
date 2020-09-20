// Managed by taking used of __instanceId

let EntityManager = cc.Class.extend({
    ctor: function () {
        this.entityList = {};
        this.bulletList = {};
        this.fighterList = {};
        // this.instanceIdList = [];
    },
    insert: function (entity, type = "") {
        if (type === "fighter")
        {
            this.fighterList[entity.__instanceId] = entity;
            entity.type = "fighter";
        }
        else if (type === "bullet")
        {
            this.bulletList[entity.__instanceId] = entity;
            entity.type = "bullet";
        }
        else
        {
            this.entityList[entity.__instanceId] = entity;
            entity.type = "object";
        }
        entity.areaList = [-1, -1, -1, -1];
        // this.instanceIdList.push(entity.__instanceId);
    },
    getEntity: function (entityID)
    {
        if (this.entityList.hasOwnProperty(entityID))
        {
            return this.entityList[entityID];
        }
        if (this.bulletList.hasOwnProperty(entityID))
        {
            return this.bulletList[entityID];
        }
        if (this.bulletList.hasOwnProperty(entityID))
        {
            return this.fighterList[entityID];
        }
    }
});