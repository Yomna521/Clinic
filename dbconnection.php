<?php
function OpenCon(){
    $dbuser = "root";
    $dbpassword = "root";
    $db = 'dbclinic';
    $dbhost = 'localhost';
    $port = 3306;
    $conn = new mysqli($dbhost,"root",$dbpassword,$db);
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }
    return $conn;
}

function CloseCon($conn)
{
$conn -> close();
}
  
?>