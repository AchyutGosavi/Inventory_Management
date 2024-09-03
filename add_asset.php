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

$employeeName = $_POST['employeeName'];
$employeeId = $_POST['employeeId'];
$cpuNo = $_POST['cpuNo'];
$assetId = $_POST['assetId'];
$serialNumber = $_POST['serialNumber'];
$purchaseDate = $_POST['purchaseDate'];
$issuedDate = $_POST['issuedDate'];
$issuedStatus = $_POST['issuedStatus'];
$verificationStatus = $_POST['verificationStatus'];

$sql = "INSERT INTO assets (employeeName, employeeId, cpuNo, assetId, serialNumber, purchaseDate, issuedDate, issuedStatus, verificationStatus)
VALUES ('$employeeName', '$employeeId', '$cpuNo', '$assetId', '$serialNumber', '$purchaseDate', '$issuedDate', '$issuedStatus', '$verificationStatus')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>