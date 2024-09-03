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

$searchAssetId = $_POST['searchAssetId'];

$sql = "SELECT * FROM assets WHERE assetId='$searchAssetId'";
$result = $conn->query($sql);

$assets = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $assets[] = $row;
    }
}

echo json_encode($assets);

$conn->close();
?>