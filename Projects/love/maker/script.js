function compress(text) {
    const binaryString = pako.deflate(text, { to: 'string' });
    return btoa(binaryString); // Encode to Base64
}

document.getElementById("generate-url").addEventListener("click", function () {
    const message = document.getElementById("message").value;
    const photoUpload = document.getElementById("photo-upload").files[0];
    const photoUrl = document.getElementById("photo-url").value;

    let photoData;

    // Handle photo upload or URL
    if (photoUpload) {
        const reader = new FileReader();
        reader.onload = function () {
            photoData = compress(reader.result); // Compress Base64
            const encodedUrl = encodeURIComponent(photoData);
            createURL(message, encodedUrl);
        };
        reader.readAsDataURL(photoUpload); // Read the file as a Base64 URL
    } else if (photoUrl) {
        photoData = compress(photoUrl); // Compress the URL
        const encodedUrl = encodeURIComponent(photoData);
        createURL(message, encodedUrl);
    } else {
        alert("Please upload a photo or provide a URL.");
    }
});

function createURL(message, photoData) {
    const encodedMessage = encodeURIComponent(message);
    const url = `file:///p%3A/LoveWeb/index.html?msg=${message}&photo=${photoData}`;
    // Display only the first 200 characters followed by '...' if the URL is longer than 200 characters
    const displayedUrl = url.length > 100 ? url.substring(0, 100) + '...' : url;

    // Update the inner HTML to show the generated URL with a link
    document.getElementById("result").innerHTML = `<p>Generated URL:</p><a href="${url}" target="_blank">${displayedUrl}</a>`;
}
