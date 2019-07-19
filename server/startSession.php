<?php
session_start();
header("Content-Type: application/json");
include 'config/connection.php';
include 'response.php';

$id=$_POST['id'];
echo $id;

 if(!isset($_SESSION['shoecollection']))
 {
     $_SESSION['shoecollection'] = [];

 }else if(isset($_SESSION['shoecollection'])){
     if($id!=null){
        $sql = "SELECT * FROM ShoeCollection WHERE id=$id";
        $res=mysqli_query($conn,$sql);
        while ($row=mysqli_fetch_assoc($res)) {
            array_push($_SESSION['shoecollection'] ,array(
                "id"=>$row['id'],
                "img"=>$row['img'],
                "itemname"=>$row['itemname'],
                "sellername"=>$row['sellername'],
                "prize"=>$row['prize'])
            );
        }
        echo json_encode(successResponse($_SESSION[$id] ));
     }
     
 }
    
?>