<?php

/**
 * Created by Nick
 * Handles the AJAX requests and returns the responses.
 */

include 'db.inc.php';

// Set time zone
date_default_timezone_set("Asia/Kolkata");

// Necessary variables
$isValid = $_POST['asyncValid'] === 'yes' ? true : false;
$questionID = $_POST['questionID'];
$postMessage = $_POST['cMessage'];

$qry = 'SELECT question FROM questions WHERE id ='.$questionID.';';

$result = mysqli_query($conn, $qry);

$row = mysqli_fetch_assoc($result);

// Serialize a JSON array for the response
$resultSet = array(
   'status' => mysqli_num_rows($result) !== 0 ? 'success' : 'error',
   'cContent' => $row['question']
);

// If error, push the error message else push the time
if ($resultSet['status'] === 'error'){
    $resultSet['errorMsg'] = 'Question for ID: '.$questionID.' is non existent in the database.';
}
else{
    $resultSet['cTime'] = date('H:i');
}


// Encode the array
$response = json_encode($resultSet);

echo $response;