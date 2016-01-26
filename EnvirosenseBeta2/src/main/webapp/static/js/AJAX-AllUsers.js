/**
 * The Ready AJAX function firstly stops the current AJAX if ever it's running.
 * Afterwards, it starts one AJAX process. Finally, it creates an interval of 
 * AJAX processes starting after the time specified.
 */
var refreshInterval;

function readyAjax()
{
	stopAjax();
	runAjax();
	refreshInterval = setInterval(function() { runAjax(); }, 1000);
}

/**
 * The Stop AJAX function stops the current AJAX if ever it's running. 
 */
function stopAjax()
{
	clearInterval(refreshInterval);
}

/**
 * The Run AJAX function starts up the AJAX process. By collateral, this would 
 * have an "On Ready State Change" that would run a function once it sends a 
 * request to the server.
 */
function runAjax()
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () { readyStateChange(xmlHttp); };
	xmlHttp.open("GET", "http://localhost:8080/EnvirosenseBeta2/getuser/", true);
	xmlHttp.send();
}

/**
 * The Ready State Change function determines what to do depending on the connection
 * from the server. If it get a response from the server, it will do the necessary process
 * to parse the JSON object where appropriate.
 */
function readyStateChange(xmlHttp)
{
	/*
	 *	0: Hasn't started
	 *	1: Connected to the Server
	 *	2: Server has received our request
	 *	3: Server is processing
	 *	4: Request is finished and data is ready
	 */

	 if (xmlHttp.status == 200)
	 {
		var dataLocation = document.getElementById('ajaxContainer');
		dataLocation.innerHTML = "<img src='http://www.arabianbusiness.com/skins/ab.main/gfx/loading_spinner.gif' style='width: 10%; margin: 0 45%;' />";

		if (xmlHttp.readyState == 4)
		{
			var outputJSON = JSON.parse(xmlHttp.responseText);
			var dataList = [];
			
			/*
			 * The instantiation of the location on where the 
			 * JSON object's data will go to.
			 */
			dataLocation.innerHTML = "";
			
			for (var x in outputJSON)
				dataList.push(JSON.stringify(outputJSON[x]));

			for (x in dataList)
			{
				/*
				 * The algorithm to parse the JSON object 
				 * and display it to the user.
				 */
				dataLocation.innerHTML += dataList[x] + "<br />";
			}
		}
	}
	else if (xmlHttp.status == 404)
		document.getElementById('ajaxContainer').innerHTML = "Status 404.";
}