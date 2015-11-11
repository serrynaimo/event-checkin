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
        user:getUserName(),
        time : new Date(),
        stype:fnd[0]['type'],
        early:fnd[0]['early'],
        type : "Event",
        event : eventname,
        success : success
      });
    }
  },
  addEntry: function (text, money, name, type, early, checked) {
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
              type : type,
              early:early,
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
              kopiChecked : checked['kopi'],
              cssmeetupChecked : checked['cssmeetup']
            });
            Log.insert({
              id : text,
              name : name,
              time : new Date(),
              type : "New",
              money : money,
              user:getUserName(),
              early:early,
              amount : '0',
              stype : type,
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
  modID: function (id, name, money, type, checked) {
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
          var early = fnd[0]['early'];
          fnd = Attendees.find({id:id}).fetch();
          if (fnd.length == 0)
          {
            Attendees.update(oid, {$set: {
              id:id,
              money:money,
              type:type,              
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
              kopiChecked : checked['kopi'],
              cssmeetupChecked : checked['cssmeetup']
            }});
            Log.insert({
              id : id,
              name : name,
              time : new Date(),
              type : "ModID",
              money : money,
              amount : '0',
              early:early,
              user:getUserName(),
              stype:type,
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
   modName: function (id, name, money, type, checked) {
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
          var early = fnd[0]['early'];
          fnd = Attendees.find({name:name}).fetch();
          if (fnd.length == 0)
          {
            Attendees.update(oid, {$set: {
              name:name,
              money:money,
              type:type,
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
              kopiChecked : checked['kopi'],
              cssmeetupChecked : checked['cssmeetup']
            }});
            Log.insert({
              id : id,
              name : name,
              time : new Date(),
              type : "ModName",
              money : money,
              amount : '0',
              early:early,
              user:getUserName(),
              stype:type,
              event : "",
              success : true
            });
          }
        }
      }
    }
  },
  modOther: function (id, name, money, type, checked) {
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
          var early = fnd[0]['early'];
          Attendees.update(oid, {$set: {
            money:money,
            type:type,
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
            kopiChecked : checked['kopi'],
            cssmeetupChecked : checked['cssmeetup']
          }});
          Log.insert({
              id : id,
              name : name,
              time : new Date(),
              stype:type,
              type : "ModOther",
              money : money,
              amount : '0',
              early:early,
              user:getUserName(),
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
      if (uname == "admin" || uname == "coffee" || uname == "bar")
      {
        var fnd = Attendees.find({id:id}).fetch();
        if (fnd.length == 1)
        {
          var early = fnd[0]['early'];
          var nb = parseInt(fnd[0]['money'])-parseInt(money);
          if (nb < 0)
          {
            Log.insert({
              id : id,
              name : fnd[0]['name'],
              time : new Date(),
              type : "Purchase",
              money : fnd[0]['money'],
              stype:fnd[0]['type'],
              user:getUserName(),
              early:early,
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
              stype:fnd[0]['type'],
              early:early,
              user:getUserName(),
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
      if (uname == "admin" || uname == "coffee" || uname == "bar")
      {
        var fnd = Attendees.find({id:id}).fetch();
        if (fnd.length == 1)
        {
          var early = fnd[0]['early'];
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
            user:getUserName(),
            early:early,
            stype:fnd[0]['type'],
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
      {
        this.next();
      }
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
      if (uname == "coffee" || uname == "admin" || uname == "bar")
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
  Session.setDefault("early",false);
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
      if (Session.get("balance") < 0)
        return "Not enough credit!";
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
    },
    event:function(){
      return Session.get("theevent");
    },
    early:function(){
      return Session.get("early");
    }
  });
  Template.log.onRendered(function(){
    var all = Log.find({}, {sort: {time: -1}}).fetch();
    var elem = document.body.getElementsByClassName('log-text')[0];
    for (i = 0; i < all.length; i++)
      elem.value = elem.value +
        "\"" + all[i]['time'] + "\"," +
        "\"" + all[i]['user'] + "\"," +
        "\"" + all[i]['type'] + "\"," +
        "\"" + all[i]['id'] + "\"," +
        "\"" + all[i]['name'] + "\"," +
        "\"" + all[i]['early'] + "\"," +
        all[i]['money'] + "," +
        all[i]['amount'] + "," +
        "\"" + all[i]['stype']+"\"," +
        "\"" + all[i]['event'] + "\"," +
        "\"" + all[i]['success'] + "\"\n";
  });
  Template.event.events({
    "submit .new-entry":function(event){
      event.preventDefault();
      var di = event.target.event.value || Session.get("theevent");
      Session.set("theevent",di);
      Session.set("allowed",false);
      Session.set("early",false);
      var text = event.target.id.value;
      if(text == 'configure') {
        document.body.classList.toggle('configure');
      }
      else if (text)
      {
        if (di)
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
              (fnd[0]['kopiChecked'] && di == 'kopi') ||
              (fnd[0]['cssmeetupChecked'] && di == 'cssmeetup'));
            Session.set("allowed",success);
            Meteor.call("log",text,di,success);
            Session.set("name",fnd[0]['name']);
            Session.set("early",fnd[0]['early']);
          }
        }
        setTimeout(function() {
          if(success) {
            window.print();
          }
        },1000);
        setTimeout(function() {
          document.body.classList.remove('checked');
          event.target.id.focus();
        }, 4000);
        document.body.classList.add('checked');
      }
      event.target.id.value = "";
      event.target.id.focus();

      console.log("defaults write com.google.Chrome DisablePrintPreview -boolean true\nopen /Applications/Google\ Chrome.app --args --disable-print-preview --kiosk http://localhost:3000/event");
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
      }
      event.target.id.value = "";
      event.target.id.focus();
    }
  });
  Template.add.events({
    "submit .new-entry": function (event) {
      event.preventDefault();
      var text = event.target.id.value;
      var mval = event.target.amount.value;
      var nm = event.target.name.value;
      var type = event.target.type.value;
      if (!mval) //todo what to do?
        mval = '0';
      var nm = event.target.name.value;
      Meteor.call("addEntry", text, mval, nm, type, Session.get("early"), makeChecked());
      Session.set("early",false);
      event.target.id.value="";
      event.target.name.value="";
      document.getElementById("lastname").focus();
    },
    "submit .search": function(event){
      event.preventDefault();
      var alldata = JSON.parse(localStorage.getItem("mydata"));
      var fnd = [];
      if (event.target.name.value)
        fnd = getByName(alldata, event.target.name.value);
      else
        fnd = getByEmail(alldata, event.target.email.value);
      Session.set("numrows",0);
      var res = document.getElementById('results');
      while (res.children.length > 1)
        res.removeChild(res.children[1]);
      var resultDiv = document.getElementById('resultdiv');
      if (fnd)
      {
        resultDiv.style.display='inline';
        Session.set("numrows",fnd.length);
        var res = document.getElementById('results');
        for (i = 0; i < fnd.length; i++)
        {
          var row = res.insertRow(1);
          var checkbox = document.createElement('input');
          checkbox.type = "checkbox";
          checkbox.name = "selected" + i.toString();
          var chkb = row.insertCell(0);
          chkb.appendChild(checkbox);
          var first = row.insertCell(1);
          first.innerHTML = fnd[i]['first'];
          var second = row.insertCell(2);
          second.innerHTML = fnd[i]['lastname'];
          var email = row.insertCell(3);
          email.innerHTML = fnd[i]['email'];
          var myevent = row.insertCell(4);
          myevent.innerHTML = fnd[i]['event'];
          var tw = row.insertCell(5);
          tw.innerHTML = fnd[i]['twitter'];
          var cnc = row.insertCell(6);
          cnc.innerHTML = fnd[i]['cancelled'];
        }
        event.target.name.value = "";
        event.target.email.value = "";
      }
      else
        resultDiv.style.display='none';
    },
    "submit .result-form":function(event){
      event.preventDefault();
      var nrows = Session.get("numrows");
      var tb = document.getElementById('results');
      document.body.getElementsByClassName('toggle-css')[0].checked=false;
      document.body.getElementsByClassName('toggle-js')[0].checked=false;
      document.body.getElementsByClassName('toggle-grumpy')[0].checked=false;
      document.body.getElementsByClassName('toggle-retreat')[0].checked=false;
      document.body.getElementsByClassName('toggle-shdh')[0].checked=false;
      document.body.getElementsByClassName('toggle-node')[0].checked=false;
      document.body.getElementsByClassName('toggle-careers')[0].checked=false;
      document.body.getElementsByClassName('toggle-ios')[0].checked=false;
      document.body.getElementsByClassName('toggle-tldr')[0].checked=false;
      document.body.getElementsByClassName('toggle-ux')[0].checked=false;
      document.body.getElementsByClassName('toggle-talkjs')[0].checked=false;
      document.body.getElementsByClassName('toggle-haskell')[0].checked=false;
      document.body.getElementsByClassName('toggle-bots')[0].checked=false;
      document.body.getElementsByClassName('toggle-rails')[0].checked=false;
      document.body.getElementsByClassName('toggle-audio')[0].checked=false;
      document.body.getElementsByClassName('toggle-kopi')[0].checked=false;
      document.body.getElementsByClassName('toggle-cssmeetup')[0].checked=false;
      Session.set("early",false);
      document.body.getElementsByClassName('aname')[0].value="";
      for (i = 1; i <= nrows; i++)
      {
        var row = tb.rows[i];
        var chk = row.cells[0].children[0].checked;
        if (chk)
        {
          var fullname = row.cells[1].innerHTML + ' ' + row.cells[2].innerHTML;
          var evt = row.cells[4].innerHTML;
          document.body.getElementsByClassName('aname')[0].value = fullname;
          if (evt == 'JSConf.Asia Ticket'||evt == 'Early-Buddy JSConf.Asia Ticket' || evt == 'JSConf.Asia')
            document.body.getElementsByClassName('toggle-js')[0].checked = true;
          if (evt == 'Front-End TL;DR')
            document.body.getElementsByClassName('toggle-tldr')[0].checked = true;
          if (evt == 'Dev Careers in Singapore')
            document.body.getElementsByClassName('toggle-careers')[0].checked = true;
          if (evt == 'SuperHappyDevHouse_4.0 Ticket'||evt == 'SuperHappyDevHouse_4.0')
            document.body.getElementsByClassName('toggle-shdh')[0].checked = true;
          if (evt == 'Grumpy Gits')
            document.body.getElementsByClassName('toggle-grumpy')[0].checked = true;
          if (evt == 'KopiJS')
            document.body.getElementsByClassName('toggle-kopi')[0].checked = true;
          if (evt == 'Haskell Meetup Web-Dev Edition')
            document.body.getElementsByClassName('toggle-haskell')[0].checked = true;
          if (evt == 'CSSConf.Asia Ticket' || evt == 'Early-Buddy CSSConf.Asia Ticket' || evt=='CSSConf.Asia')
            document.body.getElementsByClassName('toggle-css')[0].checked = true;
          if (evt == 'Rails Girls (DevFest.Asia Edition)')
            document.body.getElementsByClassName('toggle-rails')[0].checked = true;
          if (evt == 'Hacking UX: Design thinking for techies')
            document.body.getElementsByClassName('toggle-ux')[0].checked = true;
          if (evt == 'talk.js Special-Edition')
            document.body.getElementsByClassName('toggle-talkjs')[0].checked = true;
          if (evt == 'NodeSchool')
            document.body.getElementsByClassName('toggle-node')[0].checked = true;
          if (evt == 'WebAudio Hack-Day')
            document.body.getElementsByClassName('toggle-audio')[0].checked = true;
          if (evt == 'iOS DevScout DevFest.Asia workshop')
            document.body.getElementsByClassName('toggle-ios')[0].checked = true;
          if (evt == 'NodeBots - Sumo Bot Battles')
            document.body.getElementsByClassName('toggle-bots')[0].checked = true;
          if (evt == 'CSS Singapore Meetup')
            document.body.getElementsByClassName('toggle-cssmeetup')[0].checked = true;
          if (evt == 'DevFest.Asia Festival Ticket' || evt == 'Early-Buddy Festival Ticket')
          {
            document.body.getElementsByClassName('toggle-css')[0].checked=true;
            document.body.getElementsByClassName('toggle-js')[0].checked=true;
            document.body.getElementsByClassName('toggle-grumpy')[0].checked=true;
            document.body.getElementsByClassName('toggle-retreat')[0].checked=true;
            document.body.getElementsByClassName('toggle-shdh')[0].checked=true;
            document.body.getElementsByClassName('toggle-node')[0].checked=true;
            document.body.getElementsByClassName('toggle-careers')[0].checked=true;
            document.body.getElementsByClassName('toggle-ios')[0].checked=true;
            document.body.getElementsByClassName('toggle-tldr')[0].checked=true;
            document.body.getElementsByClassName('toggle-ux')[0].checked=true;
            document.body.getElementsByClassName('toggle-talkjs')[0].checked=true;
            document.body.getElementsByClassName('toggle-haskell')[0].checked=true;
            document.body.getElementsByClassName('toggle-bots')[0].checked=true;
            document.body.getElementsByClassName('toggle-rails')[0].checked=true;
            document.body.getElementsByClassName('toggle-audio')[0].checked=true;
            document.body.getElementsByClassName('toggle-kopi')[0].checked=true;
            document.body.getElementsByClassName('toggle-cssmeetup')[0].checked=true;
          }
          if (evt == 'Global Day of Coderetreat')
            document.body.getElementsByClassName('toggle-retreat')[0].checked = true;
          if (evt == 'Early-Buddy JSConf.Asia Ticket' || evt == 'Early-Buddy Festival Ticket' || evt == 'Early-Buddy CSSConf.Asia Ticket')
            Session.set("early",true);
        }
      }
    }
  });
  Template.edit.events({
    "submit .new-entry": function (event) {
      event.preventDefault();
      var mode = event.target.mode.value;
      if (mode == 'modify')
      {
        doModify(event.target.stype.value);
        doClear();
      }
      else if (mode == 'load')
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
          document.body.getElementsByClassName('toggle-cssmeetup')[0].checked=fnd[0]['cssmeetupChecked'];
          event.target.mode.value = 'modify';
          event.target.id.value = '';
          event.target.stype.value=fnd[0]['type'];
        }
      }
      document.getElementById("wristid").focus();
    },
    "click .clear-button":function(event){
      doClear();
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("attendees", function(){
    //var currentUser = this.userId;
      //if (currentUser)
      //{
        //var uid = Accounts.findUserByUsername("admin")._id;
        //console.log(uid);
        //if (currentUser == uid)
          return Attendees.find();
      //}
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
