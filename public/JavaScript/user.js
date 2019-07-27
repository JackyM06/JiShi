window.onload=function(){
    init();
    InfoInit()
    sosuo();
    FontInit();
}

function init(){
    var menuList=document.getElementsByClassName("menuList")[0]
    var list=menuList.getElementsByTagName("li");
    for(var i=0;i<list.length;i++){
        list[i].theIndex=i;
        list[i].onclick=function(){
            var choice=menuList.getElementsByClassName("choice")[0];
            if(choice){
                choice.className="";
            }
            this.className="choice";
            if(this.theIndex == 0){
                // 点击文章时触发事件：
            }else if(this.theIndex == 1){
                //动态
            }else if(this.theIndex == 2){
                //最新文章
            }else{
                //热门
            }
        }
    }
}
function InfoInit(){
    var edit=document.getElementById("edit");
    var userInfo=document.getElementById("userInfo");
    var showInfo=document.getElementById("showInfo");
    var cancel=document.getElementById("cancel");
    var submit=document.getElementById("submit");
    edit.onclick=function(){
        showInfo.style.display="none";
        userInfo.style.display="block";
        document.getElementById('InfoText').innerHTML=showInfo.innerHTML;
    }
    cancel.onclick=function(){
        showInfo.style.display="block";
        userInfo.style.display="none";
    }
    submit.onclick=function(){
        showInfo.style.display="block";
        userInfo.style.display="none";
    };
}

$('#userInfo').on('submit',function(e){
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
        url: '/user/update',
        type: 'post',
        data : data,
        dataType: 'json',
        success: data=>{
            err_code = data.err_code
            if(err_code === 0){
                document.getElementById("showInfo").innerHTML = data.userInfo
            }else if(err_code == 1){
                if(confirm('请登录后修改！')){
                    window.location.href = '/login'
                }
            }else if(err_code === 500){
                alert('服务器忙，请稍后再试')
            }
        }
    })
})