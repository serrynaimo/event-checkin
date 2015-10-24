Meteor.startup(function () {
	var userst = Assets.getText('users.txt');
	var users = userst.split(";");
	for (var i = 0; i < users.length; i++)
	{
		var ups = users[i].split(" ");
		try {
		var id = Accounts.createUser({
			username:ups[0].trim(),
			password:ups[1].trim()
		});
		} catch (error) {}
	}
});
