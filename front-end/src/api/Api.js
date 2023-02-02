import axios from "axios";
import cookie from "react-cookies";
const BASE_URL = "http://localhost:3001";

class MainAPI {
  //admin methods
  static async removeToken() {
    cookie.remove("admin_token");
  }

  static async getAdmin() {
    const request = await axios.get(`${BASE_URL}/admin`, {
      withCredentials: true,
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
    });
    if (request.status == 200) {
      cookie.remove("admin_token");
    }
    return request;
  }

  static async getNewsletters() {
    const request = await axios.get(`${BASE_URL}/admin/newsletters`, {
      withCredentials: true,
    });
    console.log(request);
    return request.data.newsletters;
  }

  static async getNewsletter(id) {
    const request = await axios.get(`${BASE_URL}/admin/newsletter/${id}`, {
      withCredentials: true,
    });
    console.log(request);
    return request.data.newsletter;
  }

  static async createNewsletter() {
    const request = await axios.post(`${BASE_URL}/admin/newsletter`, {
      withCredentials: true,
      headers: {
        Cookie: `${cookie.load("admin_token")}`,
      },
    });
    console.log(request);
    return request;
  }

  static async publishNewsletter(id) {
    const request = await axios.patch(`${BASE_URL}/admin/newsletter/${id}`, {
      withCredentials: true,
      headers: {
        Cookie: `${cookie.load("admin_token")}`,
      },
    });
    return request.data.publishNewsLetter;
  }

  static async deleteNewsletter(id) {
    const request = await axios.delete(`${BASE_URL}/admin/newsletter/${id}`, {
      withCredentials: true,
    })
    console.log(request)
    return request.data;
  }

  //user methods
  static async getLatestNewsletter() {
    const request = await axios.get(`${BASE_URL}/newsletter`);
    console.log(request)
    return request.data.newsletter;
  }

  static async subscribe(email) {
    const request = await axios.post(`${BASE_URL}/subscribe`, {
      body: {
        email: email
      }
    })
    return request.data
  }

  static async confirmSubscription(code) {
    const request = await axios.get(`${BASE_URL}/confirm-email${code}`)
    return request.data
  }
}

export default MainAPI;
