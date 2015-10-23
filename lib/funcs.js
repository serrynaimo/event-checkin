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
