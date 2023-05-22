// const api = "http://intproj22.sit.kmutt.ac.th:8080/nw3/api/anno"
import router from "../router/index.js";

async function getAnnouncement(mode = "admin", category = 0) {
  let api = `${import.meta.env.VITE_BASE_URL}/api/announcements?mode=${mode}&category=${category}`;
  try {
    const res = await fetch(api);
    if (res.ok) {
      const announc = res.json();
      return announc;
    } else throw new Error("Error, data is error! with DTO");
  } catch (error) {
    console.error(error);
  }
}
async function getuserAnnouncement(mode = "active", page = 0, category = 0) {
  let api = `${import.meta.env.VITE_BASE_URL
    }/api/announcements/pages?mode=${mode}&page=${page}&size=5&category=${category}`;
  try {
    const res = await fetch(api);
    if (res.ok) {
      const announc = res.json();
      return announc;
    } else throw new Error("Error, data is error! with DTO");
  } catch (error) {
    console.error(error);
  }
}
async function getAnnouncementById(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/announcements/${id}?count=false`
    );
    if (res.ok) {
      const announc = res.json();
      return announc;
    } else {
      // alert("The requested page is not available!");
      // router.push("/admin/announcement");
      return false
      // throw new Error("Error, data is error! with ID");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getAnnouncementByIddata(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/announcements/${id}/data`
    );
    if (res.ok) {
      const announc = res.json();
      return announc;
    } else {
      // alert("The requested page is not available!");
      // router.push("/admin/announcement");
      throw new Error("Error, data is error! with ID");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getAnnouncementByIduser(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/announcements/${id}?count=true`
    );

    if (res.ok) {
      const announc = res.json();

      return announc;
    } else {
      // alert("The requested page is not available!");
      // router.push("/announcement");
      return false
      // throw new Error("Error, data is error! with ID");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getCategory() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/categories`);
    if (res.ok) {
      const category = res.json();
      return category;
    } else {
      throw new Error("Error, data is error!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteannocement(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/announcements/${id}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      return true
      // router.push("/admin/announcement");
    } else {
      console.log(res.status);
      // throw new Error("Error, data is error!");
      return false
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

async function addAnnouncement(announcement) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/announcements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      }
    );
    if (res.ok) {
      // alert("create announcement");
      // router.push("/admin/announcement");
    } else {
      throw new Error("Error, data is error!");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}

async function updateAnnouncement(announcement, id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/announcements/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      }
    );
    if (res.ok) {
      // alert("UPDATE announcement");
      // router.push("/admin/announcement");
    } else {
      throw new Error("Error, data is error!");
    }
  } catch (error) {
    console.log(error);
    return false
  }
}
async function getcount(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/count/${id}`);
    if (res.ok) {
      const count = res.json();
      return count;
    } else {
      throw new Error("Error, data is error!");
    }
  } catch (error) {
    console.log(error);
  }
}
export {
  getAnnouncement,
  getAnnouncementById,
  getCategory,
  addAnnouncement,
  deleteannocement,
  updateAnnouncement,
  getAnnouncementByIddata,
  getuserAnnouncement,
  getAnnouncementByIduser,
  getcount
};
