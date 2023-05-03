import { createRouter, createWebHistory } from 'vue-router'
import Announcement from '../views/Announcement.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'
import createapp from '../views/create.vue'
import indexinit from '../views/indexinit.vue'
import CreateAnnouncement from '../views/CreateAnnouncement.vue'
import EditAnnouncement from '../views/EditAnnouncement.vue'
import AnnouncementTable from '../views/AnnouncementTable.vue'
import AddAnnouncement from '../views/AddAnnouncement.vue'
import deleteannouncement from '../views/deleteannocement.vue'
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
            component: AnnouncementTable
        },
        {
            path: '/admin/announcement/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail
        },
        {
            path: '/admin/announcement/add',
            name: 'AddAnnouncement',
            component: AddAnnouncement
        },
        {
            path: '/admin/announcement/:id/delete',
            name: 'deleteannouncement',
            component: deleteannouncement
        },

        {
            path: '/admin/announcement/:id/edit',
            name: 'EditAnnouncement',
            component: EditAnnouncement
        }
    ]
})
export default router