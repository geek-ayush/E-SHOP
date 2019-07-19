
<?php
session_start();
header("Content-Type: application/json");
include 'response.php';

if(isset($_SESSION['shoecollection'])){
    unset($_SESSION['shoecollection']);
    echo json_encode(successResponse("successs"));
}else{
    echo json_encode(errorResponse("Empty Session"));
}
    
?>