<?php
session_start();
header("Content-Type: application/json");
include 'config/connection.php';
include 'response.php';

$id=$_GET['id'];
\array_splice($_SESSION['shoecollection'],$id,1);
echo json_encode(successResponse("successs"));

    
?>