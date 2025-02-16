"use client"
import {translate} from "@vitalets/google-translate-api"


export const translateText = async(text,targetLanguage = 'en')=>{

    try{
        const res = await translate(text , {to: targetLanguage});
        console.log(res.text)
        return res.text
    }
    catch(err){
        return "Could not translate"
    }

}

console.log(await translateText("你好"))