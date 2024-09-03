<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "asset_inventory";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$assetId = $_POST['assetId'];

$sql = "SELECT * FROM assets WHERE assetId='$assetId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(null);
}

$conn->close();
?>