import { useGetTranslatedTextMutation } from "@/components/Redux/services/translateApi";
import { useEffect, useState } from "react";

const useTranslate = (text) => {
    const [getTranslatedText] = useGetTranslatedTextMutation('loading');
    const [translatedText, setTranslatedText] = useState(text); // State for translated text

    useEffect(() => {
        // Prevent making a request if text is empty or undefined
        if (!text || text.trim() === "") {
            setTranslatedText(""); // Set translatedText to an empty string if text is invalid
            return;
        }

        const translate = async () => {
            try {
                const response = await getTranslatedText({ text });
                console.log("API Response:", response.data.data.translated);
                setTranslatedText(response.data.data.translated); // Update with translation or fallback to original
            } catch (error) {
                console.error("Translation failed:", error);
                setTranslatedText(text); // Fallback to original text in case of an error
            }
        };

        translate();
    }, [text, getTranslatedText]); // Dependency array ensures hook re-runs when `text` changes

    return translatedText; // Return the translated text
};

export default useTranslate;
