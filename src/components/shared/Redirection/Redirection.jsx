"use client";


import { useEffect } from "react";

const Redirection = () => {


  useEffect(() => {
    // Determine if the user landed directly on this page.
    // If document.referrer is empty or doesn't contain our host, we assume no previous browsing.
    const noHistory = !document.referrer.includes(window.location.host);

    if (noHistory) {
        // Push two dummy states to ensure the back button will trigger a popstate event.
        window.history.pushState({ isDummy: true }, "", window.location.href);
        window.history.pushState({ isDummy: true }, "", window.location.href);
  
        const handlePopState = (event) => {
          // Check if the state is our dummy state.
          if (event.state && event.state.isDummy) {
            // Redirect the user to the home page.
            window.location.replace("/");
          }
        };
  
        window.addEventListener("popstate", handlePopState);
  
        // Clean up the event listener on component unmount.
        return () => {
          window.removeEventListener("popstate", handlePopState);
        };
      }
  }, []);



  return (<div></div>);
};

export default Redirection;
