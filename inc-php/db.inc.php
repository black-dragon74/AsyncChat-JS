<?php

/**
 * Created by Nick
 * Handles the database connectivity, must be included in all files requiring DB interaction/
 */

// Define URLs
$dbURL = 'localhost';
$dbUser = 'root';
$dbPass = 'ExDb20Tra';
$dbName = 'AsyncDB';

// Create a new connection
$conn = mysqli_connect($dbURL, $dbUser, $dbPass, $dbName);

// Check if the connection is successful
if (mysqli_connect_error()){
    die('Error instantiating DB connection, '.mysqli_connect_error());
}

// Connections will be closed by the individual files once the DB operations are finished