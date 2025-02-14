<?php

header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'pacific_hotel');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$roomId = $_GET['id'];
$sql = "SELECT * FROM rooms WHERE id = $roomId";
$result = $conn->query($sql);
$room = $result->fetch_assoc();

echo json_encode($room);
$conn->close();


?>