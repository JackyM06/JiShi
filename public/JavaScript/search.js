function autoHeight(){
    var height=window.innerHeight;
    var div=document.getElementsByClassName("searchbody")[0];
    div.style.height=height-60+"px";
};
autoHeight();
window.onresize=autoHeight;

window.onload=function(){
    sosuo();    
    FontInit();

    var list=document.getElementById("categories");
    var ListA=list.getElementsByTagName("a");
    for(var i=0;i<ListA.length;i++){
        ListA[i].theIndex=i;
        ListA[i].onclick=function(){
            var choice=list.getElementsByClassName("choice")[0];
            if(choice!=null){
                choice.className="";
            }
            this.className="choice";
            // 搜素结果具体代码：
            console.log(this.theIndex); //0:文章，1用户 2专题 3文集
        }
    }
}