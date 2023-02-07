import "./Confirmation.css"
import { useLocation } from "react-router-dom"
import Navigation from "../navigation/Navigation";
import Header from "../home/Header";
import BottomFooter from "../home/BottomFooter";
import { useEffect, useState } from "react";
import MainAPI from "../api/Api";

function Confirmation() {
    const { search } = useLocation();
    const [data, setData] = useState("")
    useEffect(() => {
        async function confirmSubscription() {
            const request = await MainAPI.confirmSubscription(search);
            setData(request)
            return request
        }
        confirmSubscription()
    }, [])

  return (
    <div className="Confirmation">
      <Navigation />
      <Header />
      <div className="Confirmation__content">
        <p>
          {data ? data : "loading..."}
        </p>
      </div>
      <BottomFooter />
    </div>
  );
}

export default Confirmation;
