function autoHeight(){
    var height=window.innerHeight;
    var div=document.getElementsByClassName("loginBox")[0];
    div.style.height=height+"px";
}
window.onload=function(){
    autoHeight();
    init();
}
window.onresize=function(){
    autoHeight()
};
function init(){
    var title=document.getElementsByClassName("title")[0];
    var alist=title.getElementsByTagName("a");
    for(var i=0;i<alist.length;i++){
        alist[i].theIndex=i;
        alist[i].onclick=function(){
            title.getElementsByClassName("choice")[0].className="";
            this.className="choice";
            var display1=document.getElementById("Login");
            var display2=document.getElementById("Register");
            if(this.theIndex == 0){
                display2.style.display="none";
                display1.style.display="block";
                // 点击登录后事件代码：

            }else{
                display1.style.display="none";
                display2.style.display="block";
                // 点击注册后事件代码
            }
        }
    }
}

