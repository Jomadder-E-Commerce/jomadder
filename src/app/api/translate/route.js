import { NextResponse } from 'next/server';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
    try {
        // Parse the request body
        const { text, to } = await req.json();

        const key = "Ao7CLWU7VNiKx9CJkrVFTLPcvGeTnQa1EGi7XlqdKR1zoC4BXZe7JQQJ99AKACqBBLyXJ3w3AAAbACOGnmVK";
        const endpoint = "https://api.cognitive.microsofttranslator.com";
        const location = "chinaeast";
        // Get environment variables
        // const key = process.env.TRANSLATOR_KEY;
        // const endpoint = process.env.NEXT_PUBLIC_TRANSLATOR_ENDPOINT;
        // const location = process.env.TRANSLATOR_LOCATION;

        // Validate environment variables
        if (!key || !endpoint || !location) {
            return NextResponse.json({ message: 'Missing required environment variables' }, { status: 500 });
        }

        // Make the API request to Microsoft Translator
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4(),
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': to.join(','), // Accepting an array of target languages
            },
            data: [{ text }], // Input text to be translated
        });

        // Return the translation result
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Translation error:', error.message);
        return NextResponse.json(
            { message: 'Error translating text', error: error.message },
            { status: 500 }
        );
    }
}
