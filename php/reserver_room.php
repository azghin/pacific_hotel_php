<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'hotel_reservation');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$roomId = $_POST['room_id'];
$guestName = $_POST['guest_name'];
$guestEmail = $_POST['guest_email'];
$checkIn = $_POST['check_in'];
$checkOut = $_POST['check_out'];

$sql = "INSERT INTO reservations (room_id, guest_name, guest_email, check_in, check_out) 
        VALUES ($roomId, '$guestName', '$guestEmail', '$checkIn', '$checkOut')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => 'Reservation successful!']);
} else {
    echo json_encode(['message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>