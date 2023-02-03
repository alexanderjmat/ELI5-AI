import { useState, useEffect } from "react";
import Context from "./Context";
import MainAPI from "./api/Api";

function Provider(props) {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentNewsletter, setCurrentNewsletter] = useState();
  const [subscriptionResponse, setSubscriptionResponse] = useState("")

  useEffect(() => {
    async function getNews() {
      const request = await MainAPI.getLatestNewsletter().then((newsletter) => {
        setCurrentNewsletter(newsletter);
      });
      return request;
    }
    getNews();
  }, []);

  function checkEmail(email) {
    for (let char of email) {
      if (char == "@") return true;
    }
    return false;
  }

  async function subscribe(e) {
    if (checkEmail(email)) {
      const subscribe = await MainAPI.subscribe(email);
      setSubscriptionResponse(subscribe)
    } else {
      setSubscriptionResponse("Invalid email address")
    }
  }
  function handleShowModal() {
    setShowModal(true)
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  return (
    <Context.Provider
      value={{
        home: {
          currentNewsletter,
        },
        sub: {
          subscribe,
          onChangeEmail,
          handleShowModal,
          showModal,
          setShowModal,
          subscriptionResponse,
          setSubscriptionResponse,
          checkEmail
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
