<?php

header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'pacific_hotel');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get room ID from URL
$roomId = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$price = floatval($_POST['price']);
$image = $_POST['image'];

// Get PUT data


$sql="UPDATE rooms SET name='$name', description='$description', price='$price', image='$image' WHERE id='$roomId'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['message' => 'Room updated successfully!']);
} else {
    echo json_encode(['message' => 'Error: ' . $conn->error]);
}

$conn->close();

?>