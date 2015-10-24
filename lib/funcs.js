makeChecked = function()
{
	return {'css': document.body.getElementsByClassName('toggle-css')[0].checked,
		'js': document.body.getElementsByClassName('toggle-js')[0].checked,		
    	'grumpy': document.body.getElementsByClassName('toggle-grumpy')[0].checked,
    	'retreat':document.body.getElementsByClassName('toggle-retreat')[0].checked,
    	'shdh': document.body.getElementsByClassName('toggle-shdh')[0].checked,
    	'node': document.body.getElementsByClassName('toggle-node')[0].checked,
    	'careers':document.body.getElementsByClassName('toggle-careers')[0].checked,
    	'ios': document.body.getElementsByClassName('toggle-ios')[0].checked,
    	'tldr': document.body.getElementsByClassName('toggle-tldr')[0].checked,
    	'ux': document.body.getElementsByClassName('toggle-ux')[0].checked,
    	'talkjs':document.body.getElementsByClassName('toggle-talkjs')[0].checked,
    	'haskell': document.body.getElementsByClassName('toggle-haskell')[0].checked,
    	'bots': document.body.getElementsByClassName('toggle-bots')[0].checked,
    	'rails':document.body.getElementsByClassName('toggle-rails')[0].checked,
    	'audio': document.body.getElementsByClassName('toggle-audio')[0].checked,
    	'kopi': document.body.getElementsByClassName('toggle-kopi')[0].checked};
}

doModify = function()
{
	var myid = document.body.getElementsByClassName('aid')[0].value;
  	var myname = document.body.getElementsByClassName('aname')[0].value;
  	var mval = document.body.getElementsByClassName('amoney')[0].value;
  	if (myid && myname)
  	{
    	var fnd = Attendees.find({id:myid}).fetch();
    	var fndn = Attendees.find({name:myname}).fetch();
    	if (fnd.length == 0) //newid, get byname
    	{      		
      		if (fndn.length == 1)
        		Meteor.call("modID", myid, myname, mval, makeChecked());
    	}
    	else //must be equal to 1
    	{
    		if (fndn.length == 1) //same id, same name, new other stuff
    			Meteor.call("modOther", myid, myname, mval, makeChecked());
    		else if (fndn.length == 0) //new name
      			Meteor.call("modName", myid, myname, mval, makeChecked());
    	}
  	}      
}

doClear = function()
{
    document.body.getElementsByClassName('aid')[0].value="";
    document.body.getElementsByClassName('aname')[0].value="";
    document.body.getElementsByClassName('amoney')[0].value="";
    document.getElementById("load-radio").checked = true;
}

getByEmail = function(alldata, email)
{
	var ret = [];
	for (lname in alldata)
	{
		for (i = 0; i < alldata[lname].length; i++)
			if (alldata[lname][i]['email'] == email)
				ret.push(alldata[lname][i]);
	}
	return ret;
}

var CLIENT_ID = '1060956843056-v11dem23gv4iojcktvpkm2kjlclta649.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/drive','https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/spreadsheets'];

checkAuth = function() {
gapi.auth.authorize(
  {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuthResult);
}

handleAuthResult = function(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
	  // Hide auth UI, then load client library.
	  authorizeDiv.style.display = 'none';
	  callScriptFunction();
	} else {
	  // Show auth UI, allowing the user to initiate authorization by
	  // clicking authorize button.
	  authorizeDiv.style.display = 'inline';
	}
}

handleAuthClick = function(event) {
	gapi.auth.authorize(
	  {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	  handleAuthResult);
	return false;
}

callScriptFunction = function() {
	var scriptId = "MVcwcfYze7J6hv-W3-Oeq9CFi-_cQwZG0";

	// Create an execution request object.
	var request = {
	    'function': 'getData'
	    };

	// Make the API request.
	var op = gapi.client.request({
	    'root': 'https://script.googleapis.com',
	    'path': 'v1/scripts/' + scriptId + ':run',
	    'method': 'POST',
	    'body': request
	});

	op.execute(function(resp) {
	  if (resp.error && resp.error.status) {
	    // The API encountered a problem before the script
	    // started executing.
	    appendPre('Error calling API:');
	    appendPre(JSON.stringify(resp, null, 2));
	  } else if (resp.error) {
	    // The API executed, but the script returned an error.

	    // Extract the first (and only) set of error details.
	    // The values of this object are the script's 'errorMessage' and
	    // 'errorType', and an array of stack trace elements.
	    var error = resp.error.details[0];
	    appendPre('Script error message: ' + error.errorMessage);

	    if (error.scriptStackTraceElements) {
	      // There may not be a stacktrace if the script didn't start
	      // executing.
	      appendPre('Script error stacktrace:');
	      for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
	        var trace = error.scriptStackTraceElements[i];
	        appendPre('\t' + trace.function + ':' + trace.lineNumber);
	      }
	    }
	  } else {
	    // The structure of the result will depend upon what the Apps
	    // Script function returns. Here, the function returns an Apps
	    // Script Object with String keys and values, and so the result
	    // is treated as a JavaScript object (folderSet).
	    var allData = resp.response.result;
	    if (Object.keys(allData).length == 0) {
	        appendPre('No Data returned!');
	    } else {
	      appendPre('Data!');
	      /*Object.keys(allData).forEach(function(id){
	      	for (i = 0; i < allData[id].length; i++)
	      	{
		        appendPre('\t' + allData[id][i]['first'] + ', ' + allData[id][i]['email'] + ', '
		        	+ allData[id][i]['event'] + ', ' + allData[id][i]['twitter'] + ', ' 
		        	+ allData[id][i]['cancelled'] + ' (' + id  + ')');		        
		    }
	      });*/
	      localStorage.setItem("mydata",JSON.stringify(allData));
	    }
	  }
	});
}

appendPre = function(message) {
	var pre = document.getElementById('output');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}
