<?php
header("Content-Type: application/json");
include 'response.php';

include 'config/connection.php';

$sql = "SELECT * FROM ShoeCollection";

$res=mysqli_query($conn,$sql);
    
$shoecollection = array();
while ($row=mysqli_fetch_assoc($res)) {
    array_push($shoecollection,array(
        "id"=>$row['id'],
        "img"=>$row['img'],
        "itemname"=>$row['itemname'],
        "sellername"=>$row['sellername'],
        "prize"=>$row['prize'])
    );
}
echo json_encode(successResponse($shoecollection));

?>