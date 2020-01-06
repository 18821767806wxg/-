$(".b-list").find("li").hover(function(){
    $(this).addClass("active").siblings().removeClass("active");
    $(this).find(".list-name .list-cont").css("display","block")
    
},function(){
    $(this).find(".list-name .list-cont").css("display","none")
    $(this).removeClass("active");
})
