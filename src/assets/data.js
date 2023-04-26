
async function getAnnouncement() {
    try {
        const res = await fetch("http://localhost:8080/api/anno/dto")
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
        const res = await fetch(`http://localhost:8080/api/anno/${id}`)
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