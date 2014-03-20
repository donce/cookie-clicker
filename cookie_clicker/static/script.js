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
    this.name = data.name;
    this.image = data.picture.data.url;

    this.bitmap = new Image();
    this.bitmap.src = this.image;

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
        //TODO: make class fields
        width = $(document).width();
        height = $(document).height();
        canvas = $("#canvas")[0];
        ctx = canvas.getContext("2d");
        ctx.canvas.width = width;
        ctx.canvas.height = height;
    }

    this.drawBackground = function() {
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "blue";
        ctx.fill();
    }

    this.update = function() {
        aquarium.drawBackground();
        all_friends.forEach(function(friend) {
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
      FB.login();
    } else {
      FB.login();
    }
  });
  };
    aquarium.init();
});


function createFriend(data) {
    var friend = new Friend(data);
    all_friends.push(friend);
}
