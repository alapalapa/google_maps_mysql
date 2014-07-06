$(document).ready(function(){
  var map;
  var myCenter=new google.maps.LatLng(20.6671778, -103.39241099999998);

  //Funcion de inicializacion de valores
  function initialize()
  {
  var mapProp = {
    center:myCenter,
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),mapProp);

      google.maps.event.addListener(map, 'click', function(event) {
        //Funcion presionado
      //$('#map-canvas').longpress(function() {
        
          placeMarker(event.latLng);
          //cont = count(event.latLng);
          //va = event.latLng
          //console.log(va[parseInt(cont)-1]);
        //fin de funcion
      //});
    });
  }

  //Funcion para imprimir los markers
  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: 'img/pin.png',
    });

    var infowindow = new google.maps.InfoWindow({
      content: 'Latitude: ' + location.lat() + '<br>Longitud: ' + location.lng()
    });
    infowindow.open(map,marker);

    //Solo para mostrar latitud y longitud en consola (informativo)
    console.log("latitud" + location.lat());
    console.log("longitud" + location.lng());
    //Envio de datos por post al dar click sobre el mapa
    $.post("envio.php",
      {
        latitud: location.lat(),
        longitud: location.lng()
      },
      function(data,status){
        //alert("latitud: " + data + " Status: " + status);
    });
  }


  //Funcion de llamada al mapa cuando la ventana se ha cargado
  google.maps.event.addDomListener(window, 'load', initialize);


  $.ajax({
        type: "POST",
        url:"http://localhost/jaguarlabs/sitio/sitio-total/recibo.php",
        async: true,
        success: function(datos){
            var dataJson = eval(datos);
             
            for(var i in dataJson){
                //alert(dataJson[i].lat + " _ " + dataJson[i].long);
                var place = new google.maps.LatLng(dataJson[i].lat , dataJson[i].long);
                var marker2 = new google.maps.Marker({
                  position: place,
                  map: map,
                  icon: 'img/pin.png',
                });

                var infowindow = new google.maps.InfoWindow({
                  content: 'Fecha: ' + dataJson[i].date
                });

                infowindow.open(map,marker2);
            }
             
        },
        error: function (obj, error, objError){
            //avisar que ocurrió un error
            console.log('ocurrio un error');
        }
  });



});