<?php
require 'dbconnection.php';
$conn = OpenCon();
// read the forms request
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$age = $_POST['age'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$doc = $_POST['dr'];
$session = $_POST['type'];
$date = $_POST['date'];

$ok = true;
$messages = array();

// log patients info into patients database

$patient = "INSERT INTO `patients` (`fname`,`lname`,`age`,`email`, `phone`) VALUES ('$fname','$lname','$age','$email','$phone')";
if ($conn->query($patient) == TRUE) {
    $patientId= $conn->insert_id;
} 
else {
    $messages[] = "An error occured while connecting to the Database";
    $ok = false;
}  
// if patient info has been logged then add appointment  
if($ok){
    $sql = "INSERT INTO `appointments` (`patientID`,`doctorName`,`service`,`datetime`) VALUES ('$patientId','$doc','$session','$date')";
    if ($conn->query($sql) == TRUE) {
        $ok = true;
        $messages[] = "Your information has been stored! We will be in touch to confirm your booking";
    } 
    else {
        $ok = false;
        $messages[] = "An error occured while connecting to the Database";
    }
}
echo json_encode(
    array(
        'ok' => $ok,
        'messages' => $messages,
    )
);
CloseCon($conn);
    




?>
