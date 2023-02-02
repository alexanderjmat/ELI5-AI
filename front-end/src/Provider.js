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
        console.log(newsletter)
      });
      return request;
    }
    getNews();
  }, []);

  async function subscribe(e) {
    console.log(email);
    const subscribe = await MainAPI.subscribe(email);
    console.log(subscribe)
    setSubscriptionResponse(subscribe)
    console.log(subscriptionResponse)
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
          setSubscriptionResponse
        },
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Provider;
