<?php

$con = mysql_connect('localhost','root','dba') or die ('no se pudo conectar');

mysql_select_db('maps') or die ('No base de datos');

$sql = "SELECT latitud,longitud,fecha FROM coords";
 
$resulset = mysql_query($sql,$con) or die ('no se pudo realizar el query');
 
$arr = array();
while ($obj = mysql_fetch_object($resulset)) {

    $arr[] = array('lat' => $obj->latitud,
                   'long' => $obj->longitud,
                   'date' => $obj->fecha,
        );
}


echo '' . json_encode($arr) . '';

?>