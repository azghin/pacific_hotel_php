<?php

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli('localhost', 'root', '', 'pacific_hotel');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "here");
}

// Get room ID from URL
$roomId = $_GET['id'];
// if (!$roomId) {
//     http_response_code(400);
//     echo json_encode(['success' => false, 'message' => 'Room ID is required']);
//     exit;
// }


// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit;
}



$required = ['id','name', 'description', 'price', 'image'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
        exit;
    }
}



    // Update room
    $stmt = $conn->prepare("UPDATE rooms SET 
        name = ?, 
        description = ?, 
        price = ?, 
        image = ?
        WHERE id = ?");

    $stmt->bind_param('ssdsi', 
        $input['name'],
        $input['description'],
        $input['price'],
        $input['image'],
        $input['id']
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true , 'message' => 'Room updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error: ' . '$stmt->error']);
    }

$conn->close();
?>