import { useState, useEffect } from "react";
import MainAPI from "../api/Api";
import cookie from "react-cookies";

function Admin(props) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const templates = {
    login: (
      <form onSubmit={adminLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          defaultValue={loginData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={handleChange}
          defaultValue={loginData.password}
        />
        <button type="submit">Submit</button>
      </form>
    ),
    adminPanel: (
      <div className="adminPanel">
        <form>
          <label>Create Newsletter</label>
          <button onClick={createNewsletter}>Submit</button>
          <label>Select Newsletter:</label>
          <select value={selectedNewsletter} onChange={handleNewsletter}>
            {newsletters.map((newsletter) => (
              <option value={newsletter.id}>{newsletter.date_published}</option>
            ))}
          </select>
          <button onClick={publishNewsletter}>
            Publish Selected Newsletter
          </button>
          <button onClick={deleteNewsletter}>Delete Selected Newsletter</button>
          <button onClick={adminLogout}>Logout</button>
        </form>
      </div>
    ),
  };

  const [page, setPage] = useState(templates.login);

  async function publishNewsletter(e) {
    e.preventDefault();
    let id;
    if (newsletters.length == 1) {
      id = newsletters[0].id
    } else {
      id = selectedNewsletter
    }
    console.log(id);
    const publish = await MainAPI.publishNewsletter(id);
    console.log(publish);
    return publish;
  }

  async function deleteNewsletter(e) {
    e.preventDefault();
    let id;
    if (newsletters.length == 1) {
      id = newsletters[0].id
    } else {
      id = selectedNewsletter
    }
    const request = await MainAPI.deleteNewsletter(id);
    console.log(request, id);
    return request;
  }

  function handleNewsletter(e) {
    console.log(e.target.value);
    setSelectedNewsletter(e.target.value);
  }

  async function createNewsletter(e) {
    e.preventDefault();
    const request = await MainAPI.createNewsletter();
    console.log(request);
    return request;
  }

  async function adminLogin(e) {
    e.preventDefault();
    const request = await MainAPI.adminLogin(
      loginData.username,
      loginData.password
    );
    setPage(templates.adminPanel);
    return request;
  }

  async function adminLogout(e) {
    e.preventDefault();
    const request = await MainAPI.adminLogout();
    console.log(request);
    setPage(templates.login);
    return request;
  }

  function handleChange(e) {
    const field = e.target.id;
    if (field === "username") {
      loginData.username = e.target.value;
    } else {
      loginData.password = e.target.value;
    }
    setLoginData(loginData);
  }

  useEffect(() => {
    if (cookie.load("admin_token")) {
      console.log(cookie.loadAll());
      console.log(cookie.load("admin_token"));
      MainAPI.getNewsletters().then((getNewsletters) => {
        setNewsletters(getNewsletters);
        setIsDataLoaded(true);
      });
    } else {
      setPage(templates.login);
    }
  }, []);

  return (
    <div className="Admin">
      {isDataLoaded ? templates.adminPanel : templates.login}
    </div>
  );
}

export default Admin;

/*

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [newsletters, setNewsletters] = useState([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState("");

  useEffect(() => {
    async function getNewsletters() {
      const request = await MainAPI.getNewsletters();
      setNewsletters(request);
    }
    getNewsletters();
  }, []);

  function handleNewsletter(e) {
    setSelectedNewsletter(e.target.value);
  }

  async function createNewsletter(e) {
    e.preventDefault()
    const request = await MainAPI.createNewsletter()
    console.log(request)
    return request;
  }

  async function adminLogin(e) {
    e.preventDefault();
    const request = await MainAPI.adminLogin(
      loginData.username,
      loginData.password
    );
    setPage(templates.adminPanel);
    return request;
  }

  async function adminLogout() {
    const request = await MainAPI.adminLogout();
    setPage(templates.login);
    return request;
  }

  function handleChange(e) {
    const field = e.target.id;
    if (field === "username") {
      loginData.username = e.target.value;
    } else {
      loginData.password = e.target.value;
    }
    setLoginData(loginData);
  }

  const templates = {
    login: (
      <form onSubmit={adminLogin}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          onChange={handleChange}
          defaultValue={loginData.username}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={handleChange}
          defaultValue={loginData.password}
        />
        <button type="submit">Submit</button>
      </form>
    ),
    adminPanel: (
      <div className="adminPanel">
        <form>
          <label>Create Newsletter</label>
          <button onClick={createNewsletter}>Submit</button>
          <label>Select Newsletter:</label>
          <select onChange={handleNewsletter}>
            {newsletters.map((newsletter) => (
              <option value={newsletter.id}>{newsletter.date_published}</option>
            ))}
          </select>
          <button type="submit">Publish</button>
          <button onClick={adminLogout}>Logout</button>
        </form>
      </div>
    ),
  };

  const [page, setPage] = useState(templates.login);

  useEffect(() => {
    console.log(Cookies.get())
    if (Cookies.get("admin_token")) {
      setPage(templates.adminPanel);
    } else {
      setPage(templates.login);
    }
  }, []);

*/
