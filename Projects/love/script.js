function decompress(compressedText) {
    try {
        // Decode the Base64 string to a binary string
        const binaryString = atob(compressedText);
        
        // Create a Uint8Array from the binary string
        const compressedData = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            compressedData[i] = binaryString.charCodeAt(i);
        }

        // Decompress the data back to the original string
        const decompressedText = pako.inflate(compressedData, { to: 'string' });
        return decompressedText;
    } catch (error) {
        console.error("Decompression error:", error);
        return null; // Return null or a more appropriate value in case of an error
    }
}

window.addEventListener("DOMContentLoaded", event => {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.2; // Set volume to 20%
    document.getElementById('background-music').play()
  });



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function processMessage(msg) {
    const messages = msg.split(" ");
    const combinedMessages = [];

    for (let i = 0; i < messages.length; i++) {
        if (messages[i].length < 3 && i < messages.length - 1) {
            // Attach current message to the next one if it's less than 3 characters
            messages[i + 1] = messages[i] + ' ' + messages[i + 1];
        } else if (messages[i].length >= 3) {
            // Only add messages that are 3 characters or longer
            combinedMessages.push(messages[i]);
        }
    }

    // Filter to remove any undefined or empty values from combinedMessages
    return combinedMessages.filter(msg => msg); 
}

// Get the `msg` and `photo` parameters from the URL
const msg = getQueryParam("msg");
let photoCompressed = getQueryParam("photo");
console.log(photoCompressed)
let photo = null;

if (photoCompressed) {
    photo = decompress(photoCompressed);
    console.log("Decompressed photo URL:", photo);
}

// Split the `msg` by spaces and store it in `messages`
const messages = msg ? processMessage(msg) : ["I", "Love", "You"];

// Set the initial text to the first word in `messages`
const textElement = document.getElementById("text");
textElement.textContent = messages[0];

// Set the animation duration based on the number of words
const duration = messages.length * 2;
document.querySelector(".message").style.animationDuration = `${duration}s, 0.5s`;

// Set the background image URL for `#background-photo`
if (photo) {
    const backgroundPhoto = document.getElementById("background-photo");
    backgroundPhoto.style.backgroundImage = `url('${photo}')`;
}

// Function to loop through messages and display each word sequentially
let currentMessageIndex = 0;
setInterval(() => {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    textElement.textContent = messages[currentMessageIndex];
}, 2000);
