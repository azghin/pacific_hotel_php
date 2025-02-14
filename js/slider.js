let currentSlide = 0;

// Fetch rooms from the backend
fetch('php/fetch_all_rooms.php')
    .then(response => response.json())
    .then(data => {
        const slider = document.querySelector('.slider');
        const limitedData = data.slice(0, 4); // Get only the first 4 items
        limitedData.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            roomCard.innerHTML = `
                <img src="images/${room.image}" alt="${room.name}">
                <div class="room-card-content">
                <h3>${room.name}</h3>
                <p>${room.description}</p>
                <p>$${room.price}/night</p>
                <a href="room.html?id=${room.id}">View Details</a>
                </div>
            `;
            slider.appendChild(roomCard);
        });
    })
    .catch(error => console.error('Error fetching rooms:', error));

// Function to move the slider
function moveSlide(direction) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.room-card');
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
}