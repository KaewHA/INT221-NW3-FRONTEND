// const api = "http://intproj22.sit.kmutt.ac.th:8080/nw3/api/anno"

async function getAnnouncement() {
    let api=`${import.meta.env.VITE_BASE_URL}/api/anno/dto`
    console.log(api);
    try {
        const res = await fetch(api)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else throw new Error('Error, data is error! with DTO')
    } catch (error) {
        console.log(error);
    }
}

async function getAnnouncementById(id) {
    console.log(id);
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/anno/${id}`)
        if (res.ok) {
            const announc = res.json()
            return announc
        }
        else throw new Error('Error, data is error! with ID')
    } catch (error) {
        console.log(error)
    }
}
export { getAnnouncement, getAnnouncementById }