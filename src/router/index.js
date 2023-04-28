import { createRouter, createWebHistory } from 'vue-router'
import Announcement from '../views/Announcement.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Announcement',
            component: Announcement
        },
        {
            path: '/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail
        }
        // {
        //     path: '/:notfoundpath(.*)',
        //     name: 'PageNotFound',
        //     component: PageNotFound        
        // }
    ]
})
export default router