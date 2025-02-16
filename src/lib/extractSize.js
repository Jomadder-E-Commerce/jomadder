export function extractKey(data) {
    // Split the input string into parts by ";"
    const parts = data?.split(";");

    // Try to find "Size:", "Specifications:", and "Color:" in order
    const sizePart = parts?.find(part => part?.trim().startsWith("Size:"));
    const specPart = parts?.find(part => part?.trim().startsWith("Specifications:"));
    const colorPart = parts?.find(part => part?.trim().startsWith("Color:"));

    // Return the first key found in the order of priority: "Size", "Specifications", "Color"
    return sizePart
        ? "Size"
        : specPart
        ? "Specifications"
        : colorPart
        ? "Color"
        : "";
}

export function extractSize(data) {
    // Split the string into parts by ";"
    const parts = data?.split(";");

    // Find the part starting with "Size:", "Specifications:", or "Color:" in order of priority
    const sizePart = parts?.find(part => part?.trim().startsWith("Size:"));
    const specPart = parts?.find(part => part?.trim().startsWith("Specifications:"));
    const colorPart = parts?.find(part => part?.trim().startsWith("Color:"));

    // Return the value corresponding to the first key found, or an empty string if none are found
    return sizePart
        ? sizePart.replace("Size:", "").trim()
        : specPart
        ? specPart.replace("Specifications:", "").trim()
        : colorPart
        ? colorPart.replace("Color:", "").trim()
        : "";
}



export function extractTheSize(input){
    const match = input.match(/尺码:[^;]*?(\d+MM)/);
    return match ? match[1] : null;
}

export function extractTheColor(input){
    const match = input.match(/颜色:([^;]*)/);
    return match ? match[1] : null;
}
