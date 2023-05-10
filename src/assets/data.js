// const api = "http://intproj22.sit.kmutt.ac.th:8080/nw3/api/anno"
import router from '../router/index.js'

async function getAnnouncement() {
    let api=`${import.meta.env.VITE_BASE_URL}/api/announcements`
    try {
        const res = await fetch(api)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else throw new Error('Error, data is error! with DTO')
    } catch (error) {
        console.error(error)
    }
}

async function getAnnouncementById(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${id}`)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else {
            alert("The requested page is not available!")
            router.push('/admin/announcement')
            throw new Error('Error, data is error! with ID')
        }
    } catch (error) {
        console.error(error)
    }
}

async function getAnnouncementByIddata(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${id}/data`)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else {
            alert("The requested page is not available!")
            router.push('/admin/announcement')
            throw new Error('Error, data is error! with ID')
        }
    } catch (error) {
        console.error(error)
    }
}

async function getCategory() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/categories`)
        if (res.ok) {
            const category = res.json()
            return category
        }
        else {
            throw new Error('Error, data is error!')
        }
    } catch (error) {
        console.log(error)
    }
}

async function deleteannocement(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${id}`,{method:"DELETE"})
        if (res.ok) {
            router.push('/admin/announcement')
        }
        else {
            console.log(res.status);
            throw new Error('Error, data is error!')
        }
    } catch (error) {
        console.log(error);
        router.push('/admin/announcement')
    }
}

async function addAnnouncement(announcement) {

    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements`, {
            method: "POST",
            headers: {
          "Content-Type": "application/json",
            },
            body: JSON.stringify(announcement)
          });
        if (res.ok) {
            alert("create announcement")
            router.push('/admin/announcement')
        }
        else {
            throw new Error('Error, data is error!')
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateAnnouncement(announcement,id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/announcements/${id}`, {
            method: "PUT",
            headers: {
          "Content-Type": "application/json",
            },
            body: JSON.stringify(announcement)
          });
        if (res.ok) {
            alert("UPDATE announcement")
            router.push('/admin/announcement')
        }
        else {
            throw new Error('Error, data is error!')
        }
    } catch (error) {
        console.log(error)
    }
}






export { getAnnouncement, getAnnouncementById, getCategory ,addAnnouncement,deleteannocement,updateAnnouncement,getAnnouncementByIddata}