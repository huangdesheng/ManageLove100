import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import mutualHelp from '@/views/mutualHelp'
import login from '@/views/login'
import noPage from '@/views/404'
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index,
      children: [{
        path: '/index',
        name: 'index',
        component: () =>
          import('@/views/index'),
        meta: {
          title: "首页"
        }
      }],
      meta: {
        title: "首页",
        id: 1
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: "登录"
      }
    },
    {
      path: '/mutualHelp',
      name: 'mutualHelp',
      component: mutualHelp,
      meta: {
        title: "教育互助",
        id: 2
      }
    },
    {
      path: '/helpFul',
      name: '教育帮扶',
      meta: {
        id: 3
      },
      component: () =>
        import('@/views/helpFul'),
      children: [{
          path: '/helpFul/groupHelp',
          name: 'helpFul/groupHelp',
          component: () =>
            import('@/views/helpFul/groupHelp'),
          meta: {
            title: "团体帮扶",
            id: 8
          }
        },
        {
          path: '/helpFul/personHelp',
          name: 'helpFul/personHelp',
          component: () =>
            import('@/views/helpFul/personHelp'),
          meta: {
            title: "个人帮扶",
            id: 9
          }
        },
        {
          path: '/helpFul/manageHelp',
          name: 'helpFul/manageHelp',
          component: () =>
            import('@/views/helpFul/manageHelp'),
          meta: {
            title: "认领管理",
            id: 10
          }
        }
      ]
    },

    {
      path: '/manageWelfare',
      name: 'manageWelfare',
      component: () =>
        import('@/views/manageWelfare'),
      meta: {
        title: "公益管理",
        id: 4
      }
    }, {
      path: '/manageApplyReward',
      name: 'manageApplyReward',
      component: () =>
        import('@/views/manageApplyReward'),
      meta: {
        title: "申请奖励金管理",
        id: 5
      }
    },
    {
      path: '/programSetting',
      name: '项目配置管理',
      meta: {
        id: 6
      },
      component: () =>
        import('@/views/programSetting'),
      children: [{
          path: '/programSetting/bannerSetting',
          name: 'programSetting/bannerSetting',
          component: () =>
            import('@/views/programSetting/bannerSetting'),
          meta: {
            title: "首页Banner",
            id: 11
          }
        },
        {
          path: '/programSetting/reportSetting',
          name: 'programSetting/reportSetting',
          component: () =>
            import('@/views/programSetting/reportSetting'),
          meta: {
            title: "公告管理",
            id: 12
          }
        }
      ]
    },

    {
      path: '/manageSystem',
      name: '系统权限',
      meta: {
        id: 7
      },
      component: () =>
        import('@/views/manageSystem'),
      children: [{
          path: '/manageSystem/manageAuthority',
          name: 'manageSystem/manageAuthority',
          component: () =>
            import('@/views/manageSystem/manageAuthority'),
          meta: {
            title: "权限管理",
            id: 13
          }
        },
        {
          path: '/manageSystem/manageAccount',
          name: 'manageSystem/manageAccount',
          component: () =>
            import('@/views/manageSystem/manageAccount'),
          meta: {
            title: "账号管理",
            id: 14
          }
        }
      ]
    },
    {
      path: '*',
      name: '404页面不存在',
      component: noPage,
      meta: {
        title: "404页面不存在"
      }
    }
  ]
})

export default router
