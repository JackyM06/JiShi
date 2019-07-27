function replace(){
    // 换一批
}
// 字体控制开关等显示
function fontshow(){
    var a=document.getElementsByClassName("switch")[0];
    var b=document.getElementById("short2");
    if(a.style.display=="block"){
        a.style.display="none";
        b.style.display="none";
    }else{
        a.style.display="block";
        b.style.display="block";
    }
        
}
function FontInit(){
    var switchB=document.getElementsByClassName("switchB");
    for(var i=0;i<switchB.length;i++){
        switchB[i].onclick=function(){
            if(!this.classList.contains("choice")){
                r=sibling(this)[0];
                r.classList.remove("choice");
                this.classList.add("choice");
                console.log(this.parentElement.id);
                if(this.parentElement.id=="Day&Night"){
                    var body=document.getElementsByClassName("body")[0];
                    var NavBar=document.getElementsByClassName("NavBar")[0]
                    
                    if(this.classList.contains("switch-off")){ //关闭黑夜模式
                        NavBar.style.backgroundColor="#ffffff"
                        body.style.backgroundColor="#ffffff";  
                    }else{                                     //开启黑夜模式
                        alert("黑夜模式开启失败！(系统正在调试中</>)")
                    }
                }else if(this.parentElement.id == "FontName"){   
                    var fontname;
                    if(this.classList.contains("switch-off")){ //转换为黑体
                        fontname="微软雅黑";
                    }else{                                     //转换为宋体
                        fontname="宋体";
                    }
                    function fn(obj){
                        for(var i=0;i<obj.length;i++){
                    　　    if(obj[i].children){
                    　　　　    fn(obj[i].children);
                    　　　　 }
                            if((!obj[i].classList.contains("fa")) && obj[i].id!="home")
                    　　　　    obj[i].style.fontFamily=fontname;  
                    　　　}
                    　　}
                    fn(document.children);
                }else{
                    if(this.classList.contains("switch-off")){ //转换为繁体
                        zh_tran('t');
                    }else{                                     //转换为简体
                        zh_tran('s')
                    }
                }
            }
        }
    }
}
function sibling(elem){ //获取兄弟a标签
    var r = [];
    var n = elem.parentNode.firstChild;
    for(;n;n = n.nextSibling) {
     if(n.nodeType === 1 && n != elem && n.tagName === "A") {
      r.push(n);
     }
    } 
     return r;
}
function fontoff(){   //字体设置提示框关闭
    document.getElementsByClassName("switch")[0].style.display="none";
    document.getElementById("short2").style.display="none";
}
function sosuo(){   
    var card=document.getElementsByClassName("cardbox");
    for(var j=0;j<card.length;j++){
        var list=card[j].getElementsByTagName("a");
        for(var i=0;i<list.length;i++){
            list[i].onclick=function(){
                document.getElementById("inputSearch").value=this.innerHTML;
            }
        }
    }
}
window.onload=function(){
    sosuo();
    FontInit();
}
function search(){
    window.location.href("/search")
}

$(function(){
    $('.slick').slick({
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }); 
});

function getMore(){
    $.ajax({
        url: '/index/getmore',
        type: 'get',
        data: null,
        dataType: 'json',
        success: data=>{
            let err_code = data.err_code
            if(err_code == 0){
                let newlist = template('bloglist',{
                    articles: data.articles
                })
                document.getElementById('bl').innerHTML = document.getElementById('bl').innerHTML+newlist
            }else if(err_code == 1){
                alert('暂无更多数据👀')
            }else if(err_code == 500){
                alert('服务器忙，请稍后再试')
            }
        }
    })
}

