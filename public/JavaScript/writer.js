// 自动监视网页高度
function autoHeight(){
    var height=window.innerHeight;
    var div=document.getElementById("editorBody");
    div.style.height=height+"px";
    var text=document.getElementsByClassName("w-e-text-container")[0];
    text.style.height=(height-112)+"px";//富文本编辑器高度自适配
    if(text!=null){
        text.style.height=(height-112)+"px";
    }
}
window.onload=autoHeight;
window.onresize=autoHeight;
// 添加

// 设置被选中列表样式
function EditorOpen(obj){
    var list=document.getElementById("TitleList");
    var choice=list.getElementsByClassName("choice")[0];
    if(choice!=null){
        choice.className="";
    }
    obj.className="choice";
    document.getElementById("none").style.display="none";
    document.getElementById("editorArea").style.display="block";
    // 服务器向编辑器渲染标题与内容具体代码：
    id = obj.getAttribute("name")   //由于是li标签无name属性
    $('#ID').val('')
    $.ajax({
        url:'/writer/open',
        type: 'get',
        data: {
            id: id
        },
        dataType: 'json',
        success: data=>{
            err_code = data.err_code
            if(err_code === 0){
                $('#ID').val(data.id)
                $('#TITLE').val(data.title)
                editor.txt.html(data.content)
            }else if(err_code === 500){
                window.alert('服务器忙，请稍后再试')
            }
        }
    })
}
// 添加文章按钮事件
function addBlog(){
    var list=document.getElementById("TitleList");
    var para = document.createElement("p");
    para.innerHTML='<span class="Title fa fa-file"></span>无标题文章';
    var button=document.createElement("button");
    button.className="fa fa-trash";
    button.addEventListener("click",function(e){
        e.stopPropagation();   //阻止冒泡事件
        Delete();
    });
    var li=document.createElement("li");
    li.append(para);
    li.append(button);
    li.onclick=function(e){
        EditorOpen(li);
    };
    list.append(li);
    EditorOpen(li);
    $('#TITLE').val('无标题文章··')
    editor.txt.html('')
}
//删除文章按钮事件
function Delete(){
    if(confirm("确认删除吗？")){
        var ul=document.getElementById("TitleList");
        var li=ul.getElementsByClassName("choice")[0];
        var id = li.getAttribute('name')
        if(id){
            console.log('hello')
            $.ajax({
                url: '/writer/delete',
                type: 'get',
                data: {
                    id: id
                },
                dataType: 'json',
                success: data=>{
                    err_code = data.err_code
                    if(err_code === 0){
                        ul.removeChild(li);
                        alert("已成功删除!")
                        let none = document.getElementById("none");
                        none.style.display = "block";
                        let ea = document.getElementById("editorArea");
                        ea.style.display = "none";
                    }else if(err_code === 500){
                        alert('服务器忙,请稍后再试')
                    }
                }
            })
        }else{
            ul.removeChild(li);
            alert("该文档未曾保存，已删除!")
            let none = document.getElementById("none");
            none.style.display = "block";
            let ea = document.getElementById("editorArea");
            ea.style.display = "none";
        }
        
        // 向服务端发送删除请求具体代码:
    }else{
        alert("您已取消删除！")
    }
}
//保存按钮事件

$('#editorArea').on('submit',function(e){
    e.preventDefault()
    if(confirm("确认保存吗？")){
        //向服务端发送保存具体代码：
        let html =  editor.txt.html()
        let text = editor.txt.text()
        text = text.length>100?text.substring(0,100)+'...':text
        var formData = $(this).serialize()+'&'+$.param({'content': html})+'&'+$.param({'Introduction':text}) //追加序列化表单
        $.ajax({
            url:'/writer/save',
            type:'post',
            data:formData,
            dataType: 'json',
            success: data=>{
                let err_code = data.err_code
                if(err_code === 0){  //新文章
                    document.getElementsByClassName("choice")[0].getElementsByTagName("p")[0].innerHTML=
                    '<span class="Title fa fa-file"></span>'+document.getElementById("TITLE").value;
                    document.getElementsByClassName("choice")[0].setAttribute('name',data.id)     //设置li标签的name属性
                    $('#ID').val(data.id)
                    alert(data.message)
                }else if(err_code ===1){ //更新文章
                    document.getElementsByClassName("choice")[0].getElementsByTagName("p")[0].innerHTML=
                    '<span class="Title fa fa-file"></span>'+document.getElementById("TITLE").value;
                    alert(data.message)
                }else if(err_code === 500){
                    alert('服务器忙，请稍后再试')
                }
            }
        })
    }else{
        alert("您取消了保存（＞人＜；）")
    }
})