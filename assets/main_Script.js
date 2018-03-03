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
        movePanel: cc.Node,
        whitePrefab: cc.Prefab,
        blackPrefab: cc.Prefab,
        initRow: 6,
        initCol: 4,
        _newTopRow: null,
        _curBottomRow :null,
        _curTouchRow: -1,
        _startPosittion: null,
    },

    onLoad: function(){
        //加载 填满屏幕中央
        this._curBottomRow = 0;
        this._newTopRow = 6;
        this._startPosittion = this.movePanel.position;


        for(let row = 0; row < 6; row++){
            let randomBlackCol = Math.floor(Math.random() * 4);
            for(let col = 0; col < 4; col++){
                 let block = null;
                 if(randomBlackCol == col){
                     block = cc.instantiate(this.blackPrefab);
                     block.getComponent("block_Script").init("black",this);
                 }else{
                     block = cc.instantiate(this.whitePrefab);
                     block.getComponent("block_Script").init("white",this);

                 }
                 this.movePanel.addChild(block);
                 block.name = row + "#" + col;
                 block.position = cc.pMult(cc.v2(col,row),150);
            }
        }

        //碰到黑块往下移动
        //一行只有一个黑块
        //一行有四个块
        //触碰黑块的时候，回收最下面一行，生成最上面的一行
        //触碰白块，游戏结束
    },
    move: function(){
        let movePosition = cc.v2(this._startPosittion.x,(this._startPosittion.y + (this._curBottomRow + 1) * -150));

        this.movePanel.runAction(cc.sequence(
            cc.moveTo(0.3,movePosition),
            cc.callFunc(this.updateRender.bind(this))
        ))
    },

    updateRender : function(){
            let row = this._newTopRow;
            let randomBlackCol = Math.floor(Math.random() * 4);
            for(let col = 0; col < 4; col++){
                 let block = null;
                 if(randomBlackCol == col){
                     block = cc.instantiate(this.blackPrefab);
                     block.getComponent("block_Script").init("black",this)
                 }else{
                     block = cc.instantiate(this.whitePrefab);
                     block.getComponent("block_Script").init("white",this);

                 }
                 this.movePanel.addChild(block);
                 block.name = row + "#" + col;
                 block.position = cc.pMult(cc.v2(col,row),150);
            }
            //remove buttom row
            let oldRow = this._curBottomRow;
            for(let col = 0 ; col < 4 ; col++){
                this.movePanel.getChildByName(oldRow + "#" + col).removeFromParent();

            }
            this._curBottomRow++;
            this._curTouchRow++;
            this._newTopRow++;
        }
        
    
    
});
