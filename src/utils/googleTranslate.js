// src/components/GoogleTranslate.js
"use client"
import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Dynamically load the Google Translate script
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Define the Google Translate initialization function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "zh", // Original language of your content
          includedLanguages: "en", // Target language(s)
          autoDisplay: false, // Hide the dropdown widget
        },
        "google_translate_element"
      );
    };

    // Automatically set the translation to English
    const translateToEnglish = () => {
      const langSelectEvent = new Event("change");
      setTimeout(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = "en"; // Change language to English
          select.dispatchEvent(langSelectEvent); // Trigger the translation
        }
      }, 1000); // Delay to ensure the widget is loaded
    };

    // Trigger translation when the window loads
    window.onload = translateToEnglish;

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI to render, just script injection
};

export default GoogleTranslate;
