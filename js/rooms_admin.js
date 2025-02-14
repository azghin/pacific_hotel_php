let currentPage = 1;
const roomsPerPage = 4; // Number of rooms to display per page

// Function to fetch and display rooms for a specific page
function fetchAndDisplayRooms(page) {
    fetch(`../php/fetch_rooms.php?page=${page}&limit=${roomsPerPage}`)
        .then(response => response.json())
        .then(data => {
            const roomList = document.getElementById('room-list');
            roomList.innerHTML = ''; // Clear previous rooms

            data.rooms.forEach(room => {
                const roomCard = document.createElement('div');
                roomCard.className = 'room-list-card';
                roomCard.innerHTML = `
                    
                    <img src="../images/${room.image}" alt="${room.name}">
                    <div class="room-list-card-text">
                    <h3>${room.name}</h3>
                    <p>${room.description}</p>
                    <p>$${room.price}/night</p>
                    <a href="room.html?id=${room.id}">View Details</a>
                    </div>
                `;
                roomList.appendChild(roomCard);
            });

            // Update pagination controls
            updatePaginationControls(data.totalRooms);
        })
        .catch(error => console.error('Error fetching rooms:', error));
}

// Function to update pagination controls
function updatePaginationControls(totalRooms) {
    const totalPages = Math.ceil(totalRooms / roomsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            fetchAndDisplayRooms(currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Initial fetch for the first page
fetchAndDisplayRooms(currentPage);