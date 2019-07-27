## 一、记时简介（页面仿自简书）

记时在页面上一点一点重现了简书得设计，但是在客户端处理和服务端处理上都采用自己的想法来做的。

为Node.js学习结果项目，支持用户的攥写文章与发布文章，展示个人主页，以及对于文章的喜欢功能。

文件目录

```shell
│  app.js
│  package-lock.json
│  package.json
│  Readme.md
│
├─controller
│      article.js
│      index.js
│      registerLogin.js
│      user.js
│      writer.js
│
├─models
│      Article.js
│      User.js
│
├─public
│  ├─css
│  │      common.css
│  │      login.css
│  │
│  ├─img
│  │      01.png
│  │      02.jpg
│  │      admin.png
│  │      demo.png
│  │      favicon.png
│  │      logo.png
│  │
│  ├─JavaScript
│  │      article.js
│  │      index.js
│  │      login.js
│  │      search.js
│  │      user.js
│  │      writer.js
│  │      zh.js
│  │
│  └─lib
│      ├─bootstrap
│      │
│      ├─IconFont
│      │      iconfont.css
│      │
│      ├─jquery
│      │      jquery.min.js
│      │
│      ├─layui
│      │
│      └─slick
|
│
├─routers
│      article.js
│      index.js
│      mainRouter.js
│      RegisterLogin.js
│      user.js
│      writer.js
│
└─views
    │  404.html
    │  article.html
    │  index.html
    │  login.html
    │  search.html
    │  user.html
    │  writer.html
    │
    ├─_layout
    │      home.html
    │
    └─_partials
            footer.html
            header.html
```

## 二、 部署方法

1. `clone`整个文件夹

2. 安装`node.js`

3. ~~安装npm服务，~~(node.js已集成)

4. 在文件夹目录下命令行执行`npm init -y`将依赖性安装进来

5. 下载mongodb,在D盘创建一个目录

   ```shell
   D:\data\db
   ```

6. 在D盘命令行中执行`mongod`用以打开数据库

7. 在文件夹目录下使用命令行执行`node app`

8. 访问[http://127.0.0.1:3000](http://127.0.0.1:3000/)即可完成部署

## 三、路由设计

### 1.1 登录注册

| 请求路径  | 请求方式 | 请求参数           | 备注           |
| --------- | -------- | ------------------ | -------------- |
| /login    | get      |                    | 渲染登陆注册页 |
| /login    | post     | 账号或手机号、密码 | 处理登陆信息   |
| /register | post     | 昵称、手机号、密码 | 处理注册信息   |



### 1.2 写作页

| 请求路径               | 请求方式 | 请求参数                  | 备注           |
| ---------------------- | -------- | ------------------------- | -------------- |
| /writer                | get      |                           | 渲染文章编辑页 |
| /writer/delete（异步） | get      | articles.id               | 删除指定文章   |
| /writer/save （异步）  | post     | articles.id,title,content | 更新或保存文章 |
| /writer/open （异步）  | get      | articles.id               | 打开指定文章   |

### 1.2 主页

| 请求路径                | 请求方式 | 请求参数 | 备注         |
| ----------------------- | -------- | -------- | ------------ |
| /                       | get      |          | 渲染主页     |
| /index/getmore （异步） | get      | page     | 追加10条文章 |

### 1.3 用户页

| 请求路径             | 请求方式 | 请求参数   | 备注              |
| -------------------- | -------- | ---------- | ----------------- |
| /user                | get      | [nickname] | 渲染主页,判定权限 |
| /user/upate （异步） | post     | userInfo   | 更新个人简介      |

### 1.4 文章页

| 请求路径               | 请求方式 | 请求参数  | 备注         |
| ---------------------- | -------- | --------- | ------------ |
| /article               | get      | articleId | 渲染文章页   |
| /aritcle/like （异步） | get      | articleId | 处理喜欢信息 |



## 四、模型设计

### 2.1 User

| 名称            | 类型   | 是否必选 | 默认值         | 取值范围 | 备注             |
| --------------- | ------ | -------- | -------------- | -------- | ---------------- |
| nickname        | String | true     | 无             | 无       | 用户输入         |
| telephoneNumber | String | true     | 无             | 无       | 用户输入         |
| password        | String | true     | 无             | 无       | 需要加密         |
| avatar          | String | false    |                |          | 头像链接*        |
| userInfo        | String | false    | "这个人懒死啦" | 无       |                  |
| follows         | Array  | false    | []             | 无       | 关注的用户账号   |
| fans            | Array  | false    | []             | 无       | 粉丝的用户账号   |
| articleID       | Array  | false    | []             | 无       | 用户创作的文章ID |
| commentID       | Array  | false    | []             | 无       | 用户评论的ID     |



### 2.2 Article

| 名称         | 类型   | 是否必选 | 默认值 | 取值范围 | 备注 |
| ------------ | ------ | -------- | ------ | -------- | ---- |
| title        | String | true     |        |          |      |
| Introduction | String |          |        |          | 引言 |
| content      | String | true     |        |          |      |
| nickname     | String | true     |        |          |      |
| createTime   | date   |          | data() |          |      |
| lastTime     | data   |          | data() |          |      |
| commentID    | Array  |          | []     |          |      |
| LikeID       | Array  |          | []     |          |      |