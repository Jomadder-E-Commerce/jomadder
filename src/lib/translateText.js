import React, { useEffect, useState, useRef } from "react";
import { useGetTranslatedTextMutation } from "@/components/Redux/services/translateApi";

const TranslateText = ({ text, children }) => {
    const [getTranslatedText] = useGetTranslatedTextMutation();
    const [translatedText, setTranslatedText] = useState(null);
    const [loading, setLoading] = useState(false);

    // Global cache for translations
    const translationCache = useRef({});
    // Queue to process translations one at a time
    const translationQueue = useRef([]);

    useEffect(() => {
        if (!text || text.trim() === "") {
            setTranslatedText(""); // Empty input results in empty output
            setLoading(false);
            return;
        }

        // Check if the text is already cached
        if (translationCache.current[text]) {
            setTranslatedText(translationCache.current[text]);
            setLoading(false);
            return;
        }

        // Add to queue if not already queued
        if (!translationQueue.current.includes(text)) {
            translationQueue.current.push(text);
            processTranslationQueue();
        }
    }, [text, getTranslatedText]);

    const processTranslationQueue = async () => {
        if (loading || translationQueue.current.length === 0) return; // Prevent parallel processing
        setLoading(true);

        const currentText = translationQueue.current.shift(); // Get the next text to translate

        try {
            const response = await getTranslatedText({ text: currentText });
            const translated = response?.data?.data?.translated || currentText;

            // Cache the translated text
            translationCache.current[currentText] = translated;

            // Update the state only if the current text matches the input text
            if (currentText === text) {
                setTranslatedText(translated);
            }
        } catch (error) {
            console.error("Translation failed:", error);
            // Fallback to raw text
            if (currentText === text) {
                setTranslatedText(currentText);
            }
        } finally {
            setLoading(false);
            // Process the next item in the queue
            processTranslationQueue();
        }
    };

    if (loading) {
        return <span>Translating...</span>; // Display a loader while processing
    }

    return children ? children(translatedText) : <span>{translatedText}</span>;
};

export default TranslateText;