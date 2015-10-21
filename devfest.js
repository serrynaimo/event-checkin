Attendees = new Mongo.Collection("attendees");
Log = new Mongo.Collection("log");

Router.configure({layoutTemplate:'ApplicationLayout'});

Meteor.methods({
  log: function (id,eventname,success){
    var fnd = Attendees.find({id:id}).fetch();
    if (fnd.length == 1)//should always be 1
    {
      Log.insert({
        id : id,
        name : fnd[0]['name'],
        money : fnd[0]['money'],
        amount : '0',
        time : new Date(),
        type : "Event",
        event : eventname,
        success : success
      });
    }
  },
  addEntry: function (text, money, name, checked) {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
      {
        var fnd = Attendees.find({id:text}).fetch();
        if (fnd.length == 0)
        {
          fnd = Attendees.find({name:name}).fetch();
          if (fnd.length == 0)
          {
            Attendees.insert({
              id : text,
              name : name,
              money : money,
              last : '0',
              grumpyChecked : checked['grumpy'],
              retreatChecked : checked['retreat'],
              shdhChecked : checked['shdh'],
              nodeChecked : checked['node'],
              careersChecked : checked['careers'],
              iosChecked : checked['ios'],
              tldrChecked : checked['tldr'],
              uxChecked : checked['ux'],
              talkjsChecked : checked['talkjs'],
              cssChecked : checked['css'],
              haskellChecked : checked['haskell'],              
              jsChecked : checked['js'],
              botsChecked : checked['bots'],
              railsChecked : checked['rails'],
              audioChecked : checked['audio'],
              kopiChecked : checked['kopi']
            });
            Log.insert({
              id : text,
              name : name,
              time : new Date(),
              type : "New",
              money : money,
              amount : '0',
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
  modID: function (id, name, money, checked) {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
      {
        fnd = Attendees.find({name:name}).fetch();
        if (fnd.length == 1)
        {          
          var oid = fnd[0]._id;
          fnd = Attendees.find({id:id}).fetch();
          if (fnd.length == 0)
          {
            Attendees.update(oid, {$set: {
              id:id,
              money:money,
              grumpyChecked : checked['grumpy'],
              retreatChecked : checked['retreat'],
              shdhChecked : checked['shdh'],
              nodeChecked : checked['node'],
              careersChecked : checked['careers'],
              iosChecked : checked['ios'],
              tldrChecked : checked['tldr'],
              uxChecked : checked['ux'],
              talkjsChecked : checked['talkjs'],
              cssChecked : checked['css'],
              haskellChecked : checked['haskell'],              
              jsChecked : checked['js'],
              botsChecked : checked['bots'],
              railsChecked : checked['rails'],
              audioChecked : checked['audio'],
              kopiChecked : checked['kopi']
            }});
            Log.insert({
              id : id,
              name : name,
              time : new Date(),
              type : "ModID",
              money : money,
              amount : '0',
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
   modName: function (id, name, money, checked) {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
      {
        fnd = Attendees.find({id:id}).fetch();
        if (fnd.length == 1)
        {
          var oid = fnd[0]._id;
          fnd = Attendees.find({name:name}).fetch();
          if (fnd.length == 0)
          {
            Attendees.update(oid, {$set: {
              name:name,
              money:money,
              grumpyChecked : checked['grumpy'],
              retreatChecked : checked['retreat'],
              shdhChecked : checked['shdh'],
              nodeChecked : checked['node'],
              careersChecked : checked['careers'],
              iosChecked : checked['ios'],
              tldrChecked : checked['tldr'],
              uxChecked : checked['ux'],
              talkjsChecked : checked['talkjs'],
              cssChecked : checked['css'],
              haskellChecked : checked['haskell'],              
              jsChecked : checked['js'],
              botsChecked : checked['bots'],
              railsChecked : checked['rails'],
              audioChecked : checked['audio'],
              kopiChecked : checked['kopi']
            }});
            Log.insert({
              id : id,
              name : name,
              time : new Date(),
              type : "ModName",
              money : money,
              amount : '0',
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
  modOther: function (id, name, money, checked) {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
      {
        fnd = Attendees.find({id:id}).fetch();
        if (fnd.length == 1)
        {
          var oid = fnd[0]._id;
          Attendees.update(oid, {$set: {
            money:money,
            grumpyChecked : checked['grumpy'],
            retreatChecked : checked['retreat'],
            shdhChecked : checked['shdh'],
            nodeChecked : checked['node'],
            careersChecked : checked['careers'],
            iosChecked : checked['ios'],
            tldrChecked : checked['tldr'],
            uxChecked : checked['ux'],
            talkjsChecked : checked['talkjs'],
            cssChecked : checked['css'],
            haskellChecked : checked['haskell'],              
            jsChecked : checked['js'],
            botsChecked : checked['bots'],
            railsChecked : checked['rails'],
            audioChecked : checked['audio'],
            kopiChecked : checked['kopi']
          }});
          Log.insert({
              id : id,
              name : name,
              time : new Date(),
              type : "ModOther",
              money : money,
              amount : '0',
              event : "",
              success : true
            });
        }
      }
    }
  },
  modPrice: function(id,money){
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin" || uname == "coffee")
      {
        var fnd = Attendees.find({id:id}).fetch();
        if (fnd.length == 1)
        {
          var nb = parseInt(fnd[0]['money'])-parseInt(money);
          if (nb < 0)
          {
            Log.insert({
              id : id,
              name : fnd[0]['name'],
              time : new Date(),
              type : "Purchase",
              money : fnd[0]['money'],
              amount : money,
              event : "",
              success : false
            });
            throw new Meteor.Error("Negative Balance");
          }
          else
          {
            var oid = fnd[0]._id;
            Attendees.update(oid, {$set: {money:nb.toString(),last:money}});
            Log.insert({
              id : id,
              name : fnd[0]['name'],
              time : new Date(),
              type : "Purchase",
              money : nb.toString(),
              amount : money,
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
  undo: function(id){
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin" || uname == "coffee")
      {
        var fnd = Attendees.find({id:id}).fetch();
        if (fnd.length == 1)
        {
          var lval = parseInt(fnd[0]['last']);
          var nb = parseInt(fnd[0]['money'])+lval;          
          var oid = fnd[0]._id;
          Attendees.update(oid, {$set: {money:nb.toString(),last:'0'}});
          Log.insert({
            id : id,
            name : fnd[0]['name'],
            time : new Date(),
            type : "Undo",
            money : nb.toString(),
            amount : '-'+lval.toString(),
            event : "",
            success : true
          });          
        }
      }
    }
  }
});

Router.route('/',{
  name: 'home',
  template:'home'
});
Router.route('/add',{
  onBeforeAction: function() {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
        this.next();
      else
        this.redirect("home");
    }
  }
});
Router.route('/edit',{
  onBeforeAction: function() {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
        this.next();
      else
        this.redirect("home");
    }
  }
});
Router.route('/purchase',{
  onBeforeAction: function() {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "coffee" || uname == "admin")
        this.next();
      else
        this.redirect("home");
    }
  }
});
Router.route('/event');
Router.route('/log',{
  onBeforeAction: function() {
    var currentUser = Meteor.userId();   
    if (currentUser)
    {
      var uname = Meteor.user().username;
      if (uname == "admin")
        this.next();
      else
        this.redirect("home");
    }
  }
});

if (Meteor.isClient) {
  Session.setDefault("balance",'0');
  Session.setDefault("allowed",false);
  Session.setDefault("name","");
  Meteor.subscribe("attendees");
  Meteor.subscribe("log");
  Template.log.helpers({
    log: function(){
      return Log.find({}, {sort: {time: -1}});
    }
  });
  Template.edit.helpers({
    attendees: function() { return Attendees.find({}); }
  });
  Template.add.helpers({
    attendees: function() { return Attendees.find({}); }
  });
  Template.purchase.helpers({
    balance: function() {
      return Session.get("balance");
    }
  });
  Template.event.helpers({
    allowed:function(){
      var a = Session.get("allowed");
      if (a) return "YES";
      else return "NO";
    },
    name:function(){
      return Session.get("name");
    }
  });
  Template.log.onRendered(function(){
    var all = Log.find({}, {sort: {time: -1}}).fetch();
    var elem = document.body.getElementsByClassName('log-text')[0];
    for (i = 0; i < all.length; i++)
      elem.value = elem.value +
        "\"" + all[i]['time'] + "\"," +
        "\"" + all[i]['type'] + "\"," +
        "\"" + all[i]['id'] + "\"," +
        "\"" + all[i]['name'] + "\"," +
        all[i]['money'] + "," +
        all[i]['amount'] + "," +
        "\"" + all[i]['event'] + "\"," +
        "\"" + all[i]['success'] + "\"\n";
  });
  Template.event.events({
    "submit .new-entry":function(event){
      event.preventDefault();
      var di = event.target.event.value;
      Session.set("allowed",false);
      if (di)
      {
        var text = event.target.id.value;
        if (text)
        {
          var fnd = Attendees.find({id:text}).fetch();
          if (fnd.length == 1)
          {
            var success = ((fnd[0]['cssChecked'] && di == 'css') ||
              (fnd[0]['jsChecked'] && di == 'js1') ||
              (fnd[0]['grumpyChecked'] && di == 'grumpy') ||
              (di == 'welcome') ||
              (fnd[0]['retreatChecked'] && di == 'retreat') ||
              (fnd[0]['shdhChecked'] && di == 'shdh') ||
              (fnd[0]['nodeChecked'] && di == 'node') ||
              (fnd[0]['careersChecked'] && di == 'careers') ||
              (fnd[0]['iosChecked'] && di == 'ios') ||
              (fnd[0]['tldrChecked'] && di == 'tldr') ||
              (fnd[0]['uxChecked'] && di == 'ux') ||
              (fnd[0]['talkjsChecked'] && di == 'talkjs') ||
              (fnd[0]['cssChecked'] && di == 'cssparty') ||
              (fnd[0]['haskellChecked'] && di == 'haskell') ||
              (fnd[0]['jsChecked'] && di == 'js2') ||
              (fnd[0]['botsChecked'] && di == 'bots') ||
              (fnd[0]['jsChecked'] && di == 'jsparty') ||
              (fnd[0]['railsChecked'] && di == 'rails') ||
              (fnd[0]['audioChecked'] && di == 'audio') ||
              (fnd[0]['kopiChecked'] && di == 'kopi'));
            Session.set("allowed",success);
            Meteor.call("log",text,di,success);
            Session.set("name",fnd[0]['name']);
          }
        }
      }
      event.target.id.value = "";
    }
  });
  Template.purchase.events({
    "submit .new-entry":function(event){
      event.preventDefault();
      var text = event.target.id.value;
      var mval = event.target.amount.value;
      var type = event.target.type.value;
      if (type == 'purchase')
      {
        if (mval&&text)
        {
          var fnd = Attendees.find({id:text}).fetch();
          if (fnd.length == 1)
          {
            Session.set("balance",(parseInt(fnd[0]['money'])-parseInt(mval)).toString());
            Meteor.call("modPrice", text, mval);
          }
        }
        event.target.id.value = "";        
      }
      else if (type == 'checkbalance')
      {
        Session.set("balance",'0');
        if (text)
        {
          var fnd = Attendees.find({id:text}).fetch();
          if (fnd.length == 1)
            Session.set("balance",fnd[0]['money']);
        }
        event.target.id.value = "";
      }
      else if (type == 'undo')
      {
        Session.set("balance",'0');
        if (text)
        {
          var fnd = Attendees.find({id:text}).fetch();
          if (fnd.length == 1)
          {
            Session.set("balance",(parseInt(fnd[0]['money'])+parseInt(fnd[0]['last'])).toString());
            Meteor.call("undo", text);
          }
        }
        event.target.id.value = "";
      }
    }
  });
  Template.add.events({
    "submit .new-entry": function (event) {
      event.preventDefault();
      var text = event.target.id.value;
      var mval = event.target.amount.value;
      var nm = event.target.name.value;
      if (!mval) //todo what to do?
        mval = '0';
      var nm = event.target.name.value;
      Meteor.call("addEntry", text, mval, nm, makeChecked());
      event.target.id.value="";
      event.target.name.value="";
    }
  });
  Template.edit.events({
    "submit .new-entry": function (event) {
      event.preventDefault();
      var type = event.target.type.value;
      if (type == 'modify')
      {
        doModify();
        doClear();
      }
      else if (type == 'load')
      {      
        //load entry from db and fill in info
        var myid = document.body.getElementsByClassName('aid')[0].value;
        var myname = document.body.getElementsByClassName('aname')[0].value;
        var fnd = [];
        if (myid)
          fnd = Attendees.find({id:myid}).fetch();
        else if (myname)
          fnd = Attendees.find({name:myname}).fetch();
        if (fnd.length == 1)
        {
          document.body.getElementsByClassName('aid')[0].value=fnd[0]['id'];
          document.body.getElementsByClassName('aname')[0].value=fnd[0]['name'];
          document.body.getElementsByClassName('amoney')[0].value=fnd[0]['money'];
          document.body.getElementsByClassName('toggle-css')[0].checked=fnd[0]['cssChecked'];
          document.body.getElementsByClassName('toggle-js')[0].checked=fnd[0]['jsChecked'];
          document.body.getElementsByClassName('toggle-grumpy')[0].checked=fnd[0]['grumpyChecked'];
          document.body.getElementsByClassName('toggle-retreat')[0].checked=fnd[0]['retreatChecked'];
          document.body.getElementsByClassName('toggle-shdh')[0].checked=fnd[0]['shdhChecked'];
          document.body.getElementsByClassName('toggle-node')[0].checked=fnd[0]['nodeChecked'];
          document.body.getElementsByClassName('toggle-careers')[0].checked=fnd[0]['careersChecked'];
          document.body.getElementsByClassName('toggle-ios')[0].checked=fnd[0]['iosChecked'];
          document.body.getElementsByClassName('toggle-tldr')[0].checked=fnd[0]['tldrChecked'];
          document.body.getElementsByClassName('toggle-ux')[0].checked=fnd[0]['uxChecked'];
          document.body.getElementsByClassName('toggle-talkjs')[0].checked=fnd[0]['talkjsChecked'];
          document.body.getElementsByClassName('toggle-haskell')[0].checked=fnd[0]['haskellChecked'];
          document.body.getElementsByClassName('toggle-bots')[0].checked=fnd[0]['botsChecked'];
          document.body.getElementsByClassName('toggle-rails')[0].checked=fnd[0]['railsChecked'];
          document.body.getElementsByClassName('toggle-audio')[0].checked=fnd[0]['audioChecked'];
          document.body.getElementsByClassName('toggle-kopi')[0].checked=fnd[0]['kopiChecked'];
        }
      }
    },
    "click .clear-button":function(event){
      doClear();
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("attendees", function(){
    var currentUser = this.userId;
    //console.log("CU :" + currentUser);
      if (currentUser)
      {
        var uid = Accounts.findUserByUsername("admin")._id;
        //console.log(uid);
        if (currentUser == uid)
          return Attendees.find();
      }
  });
  Meteor.publish("log", function(){
    var currentUser = this.userId;
    //console.log("CU :" + currentUser);
      if (currentUser)
      {
        var uid = Accounts.findUserByUsername("admin")._id;
        //console.log(uid);
        if (currentUser == uid)
          return Log.find();
      }
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
