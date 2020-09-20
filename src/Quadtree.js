// const QT_MAX_LEVEL = 5;
// const QT_MAX_OBJECTS = 10;
// let quadtreeCount = 0;
// let quadtreeNodeCount = 0;
//
// let Quadtree = cc.Class.extend({
//     ctor: function (level, rect) {
//         this.level = level;
//         this.bounds = rect;
//         this.objectsList = [];
//         this.objectsCount = 0;
//         this.nodes = [];
//     },
//
//     clear: function () {
//         this.bounds = null;
//         this.objectsList.length = 0;
//
//         if (this.nodes.length === 4) {
//             for (let i = 0; i < this.nodes.length; ++i) {
//                 this.nodes[i].clear();
//                 this.nodes[i] = null;
//             }
//         }
//     },
//
//     split: function () {
//         let subWidth = this.bounds.width / 2;
//         let subHeight = this.bounds.height / 2;
//         let subX = this.bounds.x;
//         let subY = this.bounds.y;
//
//         for (let i = 0; i < 2; ++i) {
//             for (let j = 0; j < 2; ++j) {
//                 let quadtree = new Quadtree(this.level + 1, cc.rect(subX + subWidth * i, subY + subHeight * j, subWidth, subHeight));
//                 this.nodes.push(quadtree);
//                 quadtreeNodeCount++;
//             }
//         }
//     },
//
//     isContain: function (entity) {
//         if (!(entity instanceof cc.Node )|| this.bounds === null)
//             return false;
//         return !(this.bounds.x > entity.x + entity.width
//                 || this.bounds.y > entity.y + entity.height
//                 || this.bounds.x + this.bounds.width < entity.x
//                 || this.bounds.y + this.bounds.height < entity.y);
//     },
//
//     insert: function (entity) {
//         if (entity instanceof cc.Node)
//         {
//             if (this.nodes.length === 4)
//             {
//                 for (let i = 0; i < 4; ++i)
//                 {
//                     if (this.nodes[i].isContain(entity))
//                     {
//                         this.nodes[i].insert(entity);
//                     }
//                 }
//             }
//
//             if (this.isContain(entity))
//             {
//                 this.objectsList.push(entity);
//                 this.objectsCount++;
//                 quadtreeCount++;
//             }
//
//             if (this.objectsCount > QT_MAX_OBJECTS && this.level < QT_MAX_LEVEL)
//             {
//                 this.split();
//                 while (this.objectsCount > 0)
//                 {
//                     for (let i = 0; i < 4; ++i)
//                     {
//                         if (this.nodes[i].isContain(this.objectsList[this.objectsCount - 1]))
//                         {
//                             this.nodes[i].insert(this.objectsList[this.objectsCount - 1]);
//                         }
//                     }
//                     this.objectsList.length--;
//                     this.objectsCount--;
//                 }
//             }
//         }
//         else if (Array.isArray(entity))
//         {
//             for (let i = 0; i < entity.length; ++i)
//             {
//                 if (this.nodes.length === 4)
//                 {
//                     for (let i = 0; i < 4; ++i)
//                     {
//                         if (this.nodes[i].isContain(entity[i]))
//                         {
//                             this.nodes[i].insert(entity[i]);
//                         }
//                     }
//                 }
//
//                 if (this.isContain(entity[i]))
//                 {
//                     this.objectsList.push(entity[i]);
//                     this.objectsCount++;
//                     quadtreeCount++;
//                 }
//
//                 if (this.objectsCount > QT_MAX_OBJECTS && this.level < QT_MAX_LEVEL)
//                 {
//                     this.split();
//                     while (this.objectsCount > 0)
//                     {
//                         for (let i = 0; i < 4; ++i)
//                         {
//                             if (this.nodes[i].isContain(this.objectsList[this.objectsCount - 1]))
//                             {
//                                 this.nodes[i].insert(this.objectsList[this.objectsCount - 1]);
//                             }
//                         }
//                         if (this.objectsList.length > 0)
//                         {
//                             this.objectsList.length--;
//
//                         }
//                         this.objectsCount--;
//                     }
//                 }
//             }
//         }
//     },
//
//     retrieve: function (returnObjectList, entity) {
//         if (this.nodes.length === 4)
//         {
//             for (let i = 0; i < 4; ++i)
//             {
//                 if (this.nodes[i].isContain(entity))
//                 {
//                     this.nodes[i].retrieve(returnObjectList, entity);
//                 }
//             }
//         }
//
//         if (this.isContain(entity))
//         {
//             for (let i = 0; i < this.objectsCount; ++i)
//             {
//                 if (entity !== this.objectsList[i])
//                 {
//                     returnObjectList.push(this.objectsList[i]);
//                 }
//             }
//         }
//     }
// });
//
//
