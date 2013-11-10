<!DOCTYPE html>
<html>
<head>
	<title>SameSame</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="/libs/bootstrap/css/bootstrap.css">
	<script type="text/javascript" src="/libs/timeline-2/timeline.js"></script>
    <link rel="stylesheet" type="text/css" href="/libs/timeline-2/timeline.css">
</head>

<body>
	<div id="content" class="container">
		<div class="page-header">
          <h1>SameSame</h1>
          <p class="lead">Same conditions, Same actions.</p>
          <p class="lead">Full year planning application based on past experience records.
          	<br>
          	Be inspired or guided by your experiences (or other people experiences)
          	<br>
          	Live experiences, record them and use them to organize your life</p>
        </div>
        <div class="row"><button id="addbutton" class="btn btn-default">add</button><button id="projectbutton" class="btn btn-default">projection</button> filter : <input id="searchfield" type="text" value="" /><div>
		<h2 id="form-title" class="row"></h2>
		<div id="item-form" class="row"></div>
		<div id="mytimeline" class="row"></div>
	</div>
  	<script src="./libs/jquery/jquery-2.0.3.min.js"></script>
  	<script src="./libs/swig.min.js"></script>
  	<script src="./libs/jstorage.min.js"></script>
  	<script data-main="{{ mainPath }}" src="./libs/require.js"></script>
</body>
</html>


