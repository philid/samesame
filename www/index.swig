<!DOCTYPE html>
<html>
<head>
	<title>timeline</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="/libs/bootstrap/css/bootstrap.css">
	<script type="text/javascript" src="/libs/timeline-2/timeline.js"></script>
    <link rel="stylesheet" type="text/css" href="/libs/timeline-2/timeline.css">
</head>

<body>
	<div id="content">
		<h2>List</h2>
		<div id="mytimeline"></div>
		<div id="items-list" style="margin-bottom:20px;"></div>
		<div id="player"></div>
		<h2 id="form-title"></h2>
		<div id="item-form"></div>
	</div>
  	<script src="./libs/jquery/jquery-2.0.3.min.js"></script>
  	<script src="./libs/swig.min.js"></script>
  	<script src="./libs/jstorage.min.js"></script>
  	<script data-main="{{ mainPath }}" src="./libs/require.js"></script>
</body>
</html>
