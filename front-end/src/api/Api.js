import axios from "axios";
import cookie from "react-cookies";
const BASE_URL = "https://eli5-ai-backend.herokuapp.com";

class MainAPI {
  //admin methods

  static async getAdmin() {
    const request = await axios.get(`${BASE_URL}/admin`, {
      withCredentials: true,
      headers: {
        "Authorization": cookie.load("admin_token")
      }
    });
    console.log(request);
    return request;
  }

  static async adminLogin(username, password) {
    const request = await axios.post(`${BASE_URL}/admin/login`, {
      username: username,
      password: password,
    });
    if (request.status == "200") {
      console.log(request);
      cookie.save("admin_token", request.data.token);
      console.log(cookie.load("admin_token"));
      return request;
    } else {
      return request;
    }
  }

  static async adminLogout() {
    const request = await axios.get(`${BASE_URL}/admin/logout`, {
      withCredentials: true,
      headers: {
        "Authorization": cookie.load("admin_token")
      }
    });
    if (request.status == 200) {
      cookie.remove("admin_token");
    }
    return request;
  }

  static async getNewsletters() {
    const request = await axios.get(`${BASE_URL}/admin/newsletters`, {
      withCredentials: true,
      headers: {
        "Authorization": cookie.load("admin_token")
      }
    });
    return request.data.newsletters;
  }

  static async getNewsletter(id) {
    const request = await axios.get(`${BASE_URL}/admin/newsletter/${id}`, {
      withCredentials: true,
      headers: {
        "Authorization": cookie.load("admin_token")
      }
    });
    console.log(request);
    return request.data.newsletter;
  }

  static async createNewsletter() {
    const request = await axios.post(`${BASE_URL}/admin/newsletter`, {
      withCredentials: true,
      "Authorization": `${cookie.load("admin_token")}`
    });
    console.log(request);
    return request;
  }

  static async publishNewsletter(id) {
    const request = await axios.patch(`${BASE_URL}/admin/newsletter/${id}`, {
      withCredentials: true,
      "Authorization": `${cookie.load("admin_token")}`,
    });
    return request.data.publishNewsLetter;
  }

  static async deleteNewsletter(id) {
    const request = await axios.delete(`${BASE_URL}/admin/newsletter/${id}`, {
      withCredentials: true,
      headers: {
        "Authorization": cookie.load("admin_token")
      }
    })
    console.log(request)
    return request.data;
  }

  static async getSubscribers() {
    const request = await axios.get(`${BASE_URL}/admin/subscribers`, {
      withCredentials: true,
      headers: {
        "Authorization": cookie.load("admin_token")
      }
    })
    return request.data
  }

  //user methods
  static async getLatestNewsletter() {
    try {
      const request = await axios.get(`${BASE_URL}/newsletter`);
      return request.data.newsletter;
    } catch(e) {
      return e
    }
  }

  static async subscribe(email) {
    const request = await axios.post(`${BASE_URL}/subscribe`, {
      email: email
    })
    return request.data
  }

  static async confirmSubscription(code) {
    const request = await axios.get(`${BASE_URL}/confirm-email${code}`)
    return request.data
  }
}

export default MainAPI;
