Meteor.startup(function () {
	var userst = Assets.getText('users.txt');
	var users = userst.split(";");
	for (var i = 0; i < users.length; i++)
	{
		var ups = users[i].split(" ");
		console.log("Uid " + ups[0] + ", pw " + ups[1]);
		try {
		var id = Accounts.createUser({
			username:ups[0].trim(),
			password:ups[1].trim()
		});
		} catch (error) {}
	}
	console.log(users);
});
