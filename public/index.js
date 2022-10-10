function handleSubmit(event){
   
    const ip_add=document.getElementById("ip-inputed").value;
    fetch(`http://ip-api.com/json/${ip_add}`)
      .then(response => response.json())
      .then((data) =>{ 
      
      var container = L.DomUtil.get('map');
        if(container != null){
          container._leaflet_id = null;
        }
        
       var map = L.map('map').setView([data.lat, data.lon], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
      
  var marker = L.marker([data.lat,data.lon]).addTo(map);
  marker.bindPopup(`<b>Your Location is:</b><br>City: ${data.city}<br> Country:${data.country}<br> ZIP Address:${data.zip}  `).openPopup();
  var popup = L.popup();
  
  function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("<b> You clicked the map at </b>" + e.latlng.toString())
          .openOn(map);
          e.preventDefault();
  }
  
  map.on('click', onMapClick);
    })
      .catch(err => console.log(err));
    event.preventDefault();
  }
  
    const form = document.getElementById('form');
    form.addEventListener("submit",handleSubmit)