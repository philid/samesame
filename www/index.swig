<!DOCTYPE html>
<html>
<head>
	<title>timeline</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body>
	hello 

	{{ test|json }}
	<div id="content"></div>
  	<script src="./libs/jquery/jquery-2.0.3.min.js"></script>
  	<script src="./libs/swig.min.js"></script>
  	<script src="./libs/jstorage.min.js"></script>
  	<script data-main="{{ mainPath }}" src="./libs/require.js"></script>
</body>
</html>
