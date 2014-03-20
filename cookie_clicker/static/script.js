image_size = 50;

function getFriends() {
    FB.api('me/friends?fields=picture,name', function(response) {
        response.data.forEach(createFriend);
        setInterval(aquarium.update, 1);
    });
}

function moveInterval(current, add, end) {
    if (add > 0) {
        if (current + add > end) {
//            paeis iki galo: end - current
//            liks eiti: add - (end - current)
//            pozicija: end - (add - (end - current))
//            paprastai: 2*end - add - current
            return [2*end - add - current, true];
        }
    }
    if (add < 0) {
        if (current + add < 0) {
//            paeis iki galo: current
//            liks eiti: - add - current
//            pozicija: - add - current
            return [-add - current, true];
        }
    }
    return [current + add, false];
}


function Friend(data) {
    console.log('creating friend');
    this.name = data.name;
    this.image = data.picture.data.url;

    this.bitmap = new Image();
    this.bitmap.src = this.image;

    this.item = $('<span class="friend_item"><img src="' + this.image + '"/></span>');
    this.item = "a";

    if (false) {
        this.mx = Math.random() * 20;
        this.my = Math.random() * 20;
    }
    else {
        var angle = Math.random() * 2 * Math.PI;
        var speed = 3;//Math.random() * 5;
        this.mx = Math.cos(angle)*speed;
        this.my = Math.sin(angle)*speed;
        this.px = width / 2;
        this.py = height / 2;
    }


    this.move = function() {
        this.ima
        var result = moveInterval(this.px, this.mx, width-image_size);
        this.px = result[0];
        if (result[1])
            this.mx *= -1;

        var result = moveInterval(this.py, this.my, height-image_size);
        this.py = result[0];
        if (result[1])
            this.my *= -1;
    }
}

function Aquarium() {
    all_friends = [];

    this.init = function() {
        console.log("initing");
        width = $(document).width();
        height = $(document).height();
        canvas = $("#canvas")[0];
        ctx = canvas.getContext("2d");
        console.log("Setting size to ", width, height);
        ctx.canvas.width = width;
        ctx.canvas.height = height;
    }

    this.update = function() {
        console.log("update")
        this.all_friends.forEach(function(friend) {
            friend.move();
            ctx.drawImage(friend.bitmap, friend.px, friend.py);
        });
    }

}

aquarium = new Aquarium();
$(window).load(function() {

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '189451487932004',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    console.log("status changed to ", response.status);
    if (response.status === 'connected') {
        getFriends();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so.
      // In real-life usage, you wouldn't want to immediately prompt someone to login
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login()
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook.
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  });
  };
    aquarium.init();
});

current = 0;

function createFriend(data) {
    var friend = new Friend(data);
    all_friends.push(friend);
    $('#friends_list').append(friend.item);
}

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

/*
  function testAPI() {
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
        console.log(response);
    });

    FB.api('me/friends?fields=picture,name', function(response) {
        response.data.forEach(createFriend);
        setInterval(aquarium.update, 1);
    });
  }
*/
