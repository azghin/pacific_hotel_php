<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'pacific_hotel');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]));
}

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (empty($data['room_id']) || empty($data['guest_name']) || empty($data['guest_email']) || empty($data['check_in']) || empty($data['check_out'])) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

$roomId = $data['room_id'];
$guestName = $data['guest_name'];
$guestEmail = $data['guest_email'];
$checkIn = $data['check_in'];
$checkOut = $data['check_out'];

// Insert reservation into the database
$sql = "INSERT INTO reservations (room_id, guest_name, guest_email, check_in, check_out) 
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('issss', $roomId, $guestName, $guestEmail, $checkIn, $checkOut);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Reservation successful!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>