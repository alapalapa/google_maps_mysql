<?php

$latitud = $_POST['latitud'];
$longitud = $_POST['longitud'];


$con = mysqli_connect('localhost','root','dba');
mysqli_select_db($con, 'maps');
$query = "INSERT INTO coords (latitud,longitud) VALUES ('$latitud','$longitud')";
mysqli_query($con, $query);


?>