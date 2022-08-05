import React from 'react'

const Routers = [
    {
        path: '/',
        component: React.lazy(() => import('../views/login/index')),
        // 如果要求严格路径
        isExact: true,
        meta: {
            title: '登录页面'
        }
    },
    {
        path: '/home',
        component: React.lazy(() => import('../views/home/index')),
        meta: {
            title: '首页'
        }
    }
]

export default Routers