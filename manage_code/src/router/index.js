	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import fangwuleixing from '@/views/fangwuleixing/list'
	import news from '@/views/news/list'
	import fangyuanxinxi from '@/views/fangyuanxinxi/list'
	import diqu from '@/views/diqu/list'
	import fangwuzulin from '@/views/fangwuzulin/list'
	import storeup from '@/views/storeup/list'
	import users from '@/views/users/list'
	import yuyuekanfang from '@/views/yuyuekanfang/list'
	import forum from '@/views/forum/list'
	import discussfangyuanxinxi from '@/views/discussfangyuanxinxi/list'
	import zulinhetong from '@/views/zulinhetong/list'
	import yonghu from '@/views/yonghu/list'
	import fangdong from '@/views/fangdong/list'
	import config from '@/views/config/list'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/fangwuleixing',
			name: '房屋类型',
			component: fangwuleixing
		}
		,{
			path: '/news',
			name: '房屋资讯',
			component: news
		}
		,{
			path: '/fangyuanxinxi',
			name: '房源信息',
			component: fangyuanxinxi
		}
		,{
			path: '/diqu',
			name: '地区',
			component: diqu
		}
		,{
			path: '/fangwuzulin',
			name: '房屋租赁',
			component: fangwuzulin
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/users',
			name: '管理员',
			component: users
		}
		,{
			path: '/yuyuekanfang',
			name: '预约看房',
			component: yuyuekanfang
		}
		,{
			path: '/forum',
			name: '我的发布',
			component: forum
		}
		,{
			path: '/discussfangyuanxinxi',
			name: '房源信息评论评论',
			component: discussfangyuanxinxi
		}
		,{
			path: '/zulinhetong',
			name: '租赁合同',
			component: zulinhetong
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/fangdong',
			name: '房东',
			component: fangdong
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
