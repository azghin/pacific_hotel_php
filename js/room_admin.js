document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("id");
    const form = document.getElementById('edit-room-form');


    fetch(`../php/fetch_room.php?id=${roomId}`)
        .then(response => response.json())
        .then(room => {
             document.getElementById('name').value = room.name;
            document.getElementById('description').value = room.description;
            document.getElementById('price').value = parseFloat(room.price);
            document.getElementById('image').value = room.image;
        });

    if (!roomId) {
        alert("No room ID provided.");
        window.location.href = "admin.html"; // Redirect if no ID
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const roomName = document.getElementById('name').value;
        const roomDescription = document.getElementById('description').value;
        const roomPrice = parseFloat(document.getElementById('price').value);
        const roomImage = document.getElementById('image').value;



        const updatedData = {
            id: roomId,
            name: roomName,
            description: roomDescription,
            price: roomPrice,
            image: roomImage
        };
        // console.log(roomId,roomName, roomPrice, roomDescription, roomImage);
        // console.log(updatedData);
    
        fetch("../php/update_room.php", {
            
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('test');
            if (data.success) {
                alert("Room updated successfully!");
                window.location.href = "admin.html";
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
    });

  
    
});
