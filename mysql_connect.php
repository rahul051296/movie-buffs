<?php

DEFINE ('DB_USER','u826157947_mb');
DEFINE ('DB_PSWD','mb_database_1');
DEFINE ('DB_HOST','mysql.hostinger.in');
DEFINE ('DB_NAME','u826157947_mb');

$dbcon= mysqli_connect( DB_HOST, DB_USER, DB_PSWD, DB_NAME);

if(!$dbcon)
{
    die('Error Connecting to database');
}

?>

<html>

<body>
    <p style="text-align:center">Your details have been added successfully</p>
    <h2 style="text-align:center">Redirecting You to Homepage</h2>
    
    </body>
</html>