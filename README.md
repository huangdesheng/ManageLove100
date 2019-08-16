

#### 参与贡献
项目开发  ： 黄德生
友情出演  ：tony
龙套大哥  ：林场
剧情设计  ：志强


#### 软件架构
vue +  router + element + store + less + axios + es6

#### 使用架构
- bulid webpack 编辑打包配置目录
- config 项目配置
- dist 项目打包后的文件
- node_modules npm 包
- src 开发需要的目录
  - api 后端接口地址
    - module api 接口模块文件
      - applyReward.js(申请奖励金模块)
      - helpFul.js (教育帮扶模块)
      - mutualHelp.js(互助模块)
      - projectSetting.js (项目配置管理模块)
      - reportSetting.js (公告设置模块)
      - role.js(角色管理模块)
      - temporary.js (临时存储模块)
      - userInfo.js(用户模块,包括登录，修改密码)
      - welfareReward.js (公益模块管理模块)
    - axios.js axios 配置文件
    - index.js 导出所有接口地址
  - assets 资源目录
  - components 组件目录
  - config 配置
  - mixins 通用方法及属性
  - router vue 路由配置文件
  - store vuex 文件
  - styles less 样式文件
  - views 页面
    - helpFul 教育帮扶模块
        - groupHelp  团体帮扶
        - manageHelp 认领管理
        - personHelp 个人帮扶
    - index 首页
    - login 登录
    - manageApplyReward 奖励金
    - manageSystem 系统管理
        - manageAccount   账号管理
        - manageAuthority 权限管理
    - manageWelfare 公益管理
    - mutualHelp 互助模块
    - manageSystem 项目配置管理
        - manageAccount   banner设置
        - manageAuthority 报告设置
    - App.vue入口文件
     - main.js 项目启动文件（入口）
- static 静态资源目录
- .babelrc babel 配置文件
- .eslint eslint 配置文件
- .postcssrc webpack 处理 css 插件配置
- .package npm 配置信息
        


#### 安装教程

1. npm install(如果安装淘宝镜像 cnpm install)
2. cd ManageLove
3. npm run dev

# ManageLove

#### 介绍
爱心100分管理后台
