document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');

    fetch(`php/fetch_room.php?id=${roomId}`)
        .then(response => response.json())
        .then(data => {
            const roomDetails = document.getElementById('room-details');
            roomDetails.innerHTML = `
             <img src="images/${data.image}" alt="${data.name}">
             <div class="room-details">
                <h2>${data.name}</h2>
               
                <p>${data.description}</p>
                <p>Price: $${data.price}/night</p>
                <div/>
            `;
        });

    document.getElementById('reservation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const guestName = document.getElementById('guest-name').value;
        const guestEmail = document.getElementById('guest-email').value;
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;

        const reservationData = {
            room_id: roomId,
            guest_name: guestName,
            guest_email: guestEmail,
            check_in: checkIn,
            check_out: checkOut
        };

        // Send reservation data to the server
        fetch('php/reserve.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Reservation successful!');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});