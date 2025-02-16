'use client'
import { useEffect } from "react";

export default function GoogleTranslate() {
    useEffect(() => {
        // Create a script element for Google Translate
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Define the Google Translate initialization function
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: "en" },
                "google_translate_element"
            );
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="google_translate_element"></div>;
}