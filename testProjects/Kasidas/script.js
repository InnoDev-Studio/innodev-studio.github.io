document.getElementById('submitBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const kasidaId = document.getElementById('kasidaId').value;

    if (!name || !gender) {
        document.getElementById('statusMessage').innerText = "Name and gender are required.";
        return;
    }

    const data = {
        name: name,
        gender: gender,
        kasida_id: kasidaId || null // If kasidaId is empty, send null for random
    };

    fetch('http://192.168.1.200:5000/create_video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('statusMessage').innerText = "Kasida successfully published!";
        console.log("Result:", result);
    })
    .catch(error => {
        document.getElementById('statusMessage').innerText = "An error occurred. Please try again.";
        console.error("Error:", error);
    });
});
