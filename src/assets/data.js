// const api = "http://intproj22.sit.kmutt.ac.th:8080/nw3/api/anno"

async function getAnnouncement() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/anno/dto`)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else throw new Error('Error, data is error!')
    } catch (error) {
        console.log(error);
    }
}

async function getAnnouncementById(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/anno/${id}`)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else throw new Error('Error, data is error!')
    } catch (error) {
        console.log(error)
    }
}
export { getAnnouncement, getAnnouncementById }