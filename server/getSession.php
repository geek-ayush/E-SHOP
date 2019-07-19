<?php
session_start();
header("Content-Type: application/json");
include 'response.php';


 if(!isset($_SESSION['shoecollection']))
 {
     $_SESSION['shoecollection'] = [];

 }else if(isset($_SESSION['shoecollection'])){
     
        echo json_encode(successResponse($_SESSION['shoecollection'] ));
     
 }
    
?>