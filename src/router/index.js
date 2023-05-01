import { createRouter, createWebHistory } from 'vue-router'
import Announcement from '../views/Announcement.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'
import createapp from '../views/create.vue'
import indexinit from '../views/indexinit.vue'
import CreateAnnouncement from '../views/CreateAnnouncement.vue'
import EditAnnouncement from '../views/editAnnouncement.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Start',
            component: createapp
        },
        {
            path: '/index.html',
            name: 'Startwithindex',
            component: indexinit
        },
        {
            path: '/admin/announcement',
            name: 'Announcement',
            component: Announcement
        },
        {
            path: '/admin/announcement/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail
        },
        {
            path: '/admin/announcement/create',
            name: 'CreateAnnouncement',
            component: CreateAnnouncement
        },
        {
            path: '/admin/announcement/edit/:id',
            name: 'EditAnnouncement',
            component: EditAnnouncement
        }
    ]
})
export default router