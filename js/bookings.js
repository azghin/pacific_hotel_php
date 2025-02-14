fetch('../php/fetch_all_booking.php')
    .then(response => response.json())
    .then(data => {
        const bookingList = document.getElementById('booking-list');
        data.forEach(bookingIteam => {
            const bookCard = document.createElement('div');
            bookCard.className = 'room-card';
            bookCard.innerHTML = `
                <h3 class="guest-name">${bookingIteam.guest_name}</h3>
                <p class="guest-email">${bookingIteam.guest_email}</p>
                <p class="check-in">Check-in: ${bookingIteam.check_in}</p>
                <p class="check-out">Check-out: ${bookingIteam.check_out}</p>
                <p class="room-id">Room ID: ${bookingIteam.room_id}</p>
            
            <button class="print-btn" onclick="printBooking('${bookingIteam.room_id}', '${bookingIteam.guest_name}', '${bookingIteam.guest_email}', '${bookingIteam.check_in}', '${bookingIteam.check_out}')">Print</button>
        `;


            bookingList.appendChild(bookCard);
        });
    })
    .catch(error => console.error('Error fetching rooms:', error));


function printBooking(roomId, guestName, guestEmail, checkIn, checkOut) {
    const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(`Booking Details`, 10, 10);
        doc.text(`Guest Name: ${guestName}`, 10, 20);
        doc.text(`Guest Email: ${guestEmail}`, 10, 30);
        doc.text(`Check-in: ${checkIn}`, 10, 40);
        doc.text(`Check-out: ${checkOut}`, 10, 50);
        doc.text(`Room ID: ${roomId}`, 10, 60);
        doc.save(`${guestName}_booking.pdf`);
        }


