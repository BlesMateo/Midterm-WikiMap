//ilovepie


<body>
  <form action='create file in here to link to sql' method="POST">
    <button type="submit" name="submit">Add to Maps</button>
  </form >
</body>

$sql = "INSERT INTO location_marker(title, lat, long, place_id) VALUES('$title', $lat, $long, $place_id);";
mysqli_query($conn, $sql);
