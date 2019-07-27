
$(".Weibo").click(function(){
    window.sharetitle = $(".Title").text(); //分享内容的标题
    window.shareUrl = window.location.href; //分享内容的链接
    share2();
});
function share2(){
    (function(s,d,e){
        try{}
        catch(e){}
        var f='http://v.t.sina.com.cn/share/share.php?',u=d.location.href,
        p=['url=',e(u),'&title=',e(window.sharetitle),'&appkey=2924220432','&pic=',e(window.shareUrl)].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent);
}

$(".QQzone").click(function(){
    window.sharetitle = $(".Title").text(); //分享内容的标题
    window.shareUrl = window.location.href; //分享内容的链接
    share3();
});
function share3(){
    (function(s,d,e){
        try{}
        catch(e){}
        var f='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',u=d.location.href,
        p=['url=',e(u),'&title=',e(window.sharetitle),'&appkey=2924220432','&pic=',e(window.shareUrl)].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent);
}
window.onload=function(){
    sosuo();
    FontInit();
}

$(".Like").click(function(){
    let id = $(this).attr('name')
    $.ajax({
        url:'/article/like',
        type:'get',
        data:{
            articleId:id
        },
        dataType: 'json',
        success: data=>{
            let err_code = data.err_code
            if(err_code == 0){    //喜欢
                $(this).removeClass("fa-heart-o");
                $(this).addClass("fa-heart");        
            }else if(err_code == 1){ //取消喜欢
                $(this).removeClass("fa-heart");
                $(this).addClass("fa-heart-o");        
            }else if(err_code == 2){ //请登录后
                if(confirm('请先登录')){
                    window.location.href = '/login'
                }
            }else if(err_code == 500){
                alert('服务器忙，请稍后再试')
            }
        }
    })
});