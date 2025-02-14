<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'pacific_hotel');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// Get pagination parameters
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 4;
$offset = ($page - 1) * $limit;

// Fetch rooms for the current page
$sql = "SELECT * FROM rooms LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(['error' => 'Query failed: ' . $conn->error]));
}

$rooms = [];
while ($row = $result->fetch_assoc()) {
    $rooms[] = $row;
}

// Get total number of rooms
$totalRoomsQuery = $conn->query("SELECT COUNT(*) as total FROM rooms");
$totalRooms = $totalRoomsQuery->fetch_assoc()['total'];

echo json_encode([
    'rooms' => $rooms,
    'totalRooms' => $totalRooms
]);

$conn->close();
?>