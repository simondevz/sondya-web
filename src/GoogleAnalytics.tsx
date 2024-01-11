import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

export default function GoogleAnalytics() {
  const location = useLocation();
  ReactGA.initialize("G-LDTXTCYBNW");

  useEffect(() => {
    console.log(location.pathname + location.search);
  }, [location.pathname, location.search]);
  return <></>;
}
