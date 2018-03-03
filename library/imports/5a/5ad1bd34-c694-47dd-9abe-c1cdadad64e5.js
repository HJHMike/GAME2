"use strict";
cc._RF.push(module, '5ad1b00xpRH3Zq+wc2trWTl', 'block_Script');
// block_Script.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        _type: null,
        _mainScript: null
    },
    init: function init(type, _mainScript) {
        this._type = type;
        this._mainScript = _mainScript;
        this.node.on("touchstart", function () {
            if (this._type == "white") {
                console.log("hahaha");
            } else {
                var blockRow = this.node.name.split("#")[0];
                if (parseInt(blockRow) !== this._mainScript._curTouchRow + 1) {
                    console.log("hahaha");
                } else {
                    this._mainScript.move();
                }
            }
        }.bind(this));
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad: function () {


    //},

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();