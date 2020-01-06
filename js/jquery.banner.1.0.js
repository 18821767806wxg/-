;(function($,jQuery){
    "use strict";
    $.fn.banner = function(options){
        var that = this;
        // 1.默认参数处理
        options = options || {};
        this._obj = {
            btn:options.btn===false ? false : true,
            list:options.list===false ? false : true,
            autoPlay:options.autoPlay===false ? false : true,
            delayTime:options.delayTime || 2000,
            moveTime:options.moveTime || 200,
            index:options.index || 0,
            // 假设上一张的索引
            iPrev:options.img.length-1,
            img:options.img || []
        };
        
        // 2.渲染布局:样式写到行内
        this._obj.init = function(){
            var str = ``;
            for(var i=0;i<this.img.length;i++){
                str += `<a href="##"><img src="${this.img[i]}"></a>`
            }
            that.html(`<div class="imgbox">${str}</div>`).css({
                width:"100%",
                height:470,
                position:"relative",
                overflow:"hidden"
            }).children(".imgbox").css({
                width:"100%",
                height:470,
            }).children("a").css({
                position:"absolute",
                left:2000,
                top:0,
                width:"100%",
                height:470
            }).eq(0).css({
                left:0
            })
            // 返回上一步选择器
            .end()
            .children("img").css({
                width:"100%",
                height:470
                
            })
        }
        this._obj.init();





        this._obj.leftClick = function(){
            if(that._obj.index == 0){
                that._obj.index = that._obj.img.length-1;
                that._obj.iPrev = 0;
            }else{
                that._obj.index--;
                that._obj.iPrev = that._obj.index + 1;
            }
            that._obj.btnMove(1)
        }
        this._obj.rightClick = function(){
            if(that._obj.index == that._obj.img.length-1){
                that._obj.index = 0;
                that._obj.iPrev = that._obj.img.length-1;
            }else{
                that._obj.index++;
                that._obj.iPrev = that._obj.index - 1;
            }
            that._obj.btnMove(-1)
        }
        this._obj.btnMove = function(type){
            // console.log(this.iPrev,this.index);
            let imgs = that.children(".imgbox").children("a");
            imgs.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:imgs.eq(0).width() * type
            },this.moveTime).end().eq(this.index).css({
                left:-imgs.eq(0).width() * type
            }).stop().animate({
                left:0
            },this.moveTime);

            if(!this.list) return;
            that.children(".list").children("li").css("background","rgba(200,200,200,0.8)").eq(this.index).css("background","blue");
        }
        // 3.判断用户是否需要按钮功能
        if(this._obj.btn){
            // 左右按钮的布局+样式
            $("<input type='button' id='left' value='<'>").css({
                left:0
            }).appendTo(this).after($("<input type='button' id='right' value='>'>").css({
                right:0
            })).parent().children("input").css({
                position:"absolute",
                top:130,
                width:40,
                height:40,
                border:"none",
                background:"rgba(200,200,200,0.8)"
            })
            // 左右按钮的功能部分
            this.on("click","#left",that._obj.leftClick)
            this.on("click","#right",that._obj.rightClick)
        }
        

        // 4.判断用户是否需要小圆点(list)的功能
        if(this._obj.list){
            let str = "";
            for(var i=0;i<this._obj.img.length;i++){
                str += `<li></li>`;
            }
            $("<ul class='list'>").html(str).appendTo(this).css({
                margin:0,
                padding:0,
                listStyle:"none",
                width:"100%",
                height:40,
                position:"absolute",
                bottom:0,
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                lineHeight:"40px"
            }).children("li").css({
                width:20,
                height:20,
                borderRadius:"50%",
                background:"rgba(200,200,200,0.8)",
                margin:"0 20px",
                textAlign:"center",
                cursor:"pointer"
            }).eq(this._obj.index).css({
                background:"blue"
            }).end().click(function(){
                if($(this).index() > that._obj.index){
                    that._obj.listMove($(this).index(),-1)
                }
                if($(this).index() < that._obj.index){
                    that._obj.listMove($(this).index(),1)
                }
                that._obj.index = $(this).index();
            })

            this._obj.listMove = function(iNow,type){
                // console.log(this.index,iNow)
                let imgs = that.children(".imgbox").children("a");
                imgs.eq(this.index).css({
                    left:0
                }).stop().animate({
                    left:imgs.eq(0).width() * type
                },this.moveTime).end().eq(iNow).css({
                    left:-imgs.eq(0).width() * type
                }).stop().animate({
                    left:0
                },this.moveTime)

                that.children(".list").children("li").css("background","rgba(200,200,200,0.8)").eq(iNow).css("background","blue");
            }
        }

        // 4.判断用户是否需要自动播放功能
        if(this._obj.autoPlay){
            this._obj.t = setInterval(() => {
                this._obj.rightClick();
            }, this._obj.delayTime);

            this.hover(function(){
                clearInterval(that._obj.t)
            },function(){
                that._obj.t = setInterval(() => {
                    that._obj.rightClick();
                }, that._obj.delayTime);
            })
        }
    }

})($,jQuery);