//==================bubble section=================
// Customize bubbles performance
var n = 100,
speed = 20,
startSize = rand(99, 300);

// logical part
var c = document.getElementById("c"),

ctx = c.getContext("2d"),
cw = c.width = window.innerWidth,
ch = c.height = window.innerHeight,
mousePos = { x: "", y: "" },
img = new Image(),
particles = [],
Particle = function (index) {
    this.index = index;
    this.dur = (100 - rand(9, 90)) / speed;
    this.draw = function () {
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.alpha;
        ctx.globalCompositeOperation = 'lighter';
        if (index % 2 == 0) ctx.globalCompositeOperation = 'xor';
        ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.translate(-this.x, -this.y);
    };
};

// mouse hover interaction/ motion design
c.onmousemove = function (e) {mousePos = { x: e.clientX, y: e.clientY };};
document.onmouseleave = document.ontouchend = function (e) {mousePos = { x: "", y: "" };};

function setParticle(p, firstRun) {
    var startProps = { x: cw / 2 + rand(0, 60) - 30, y: ch / 2 + rand(0, 60) - 30, size: startSize, alpha: 0 };
    if (rand(0, 1) > 0.3 && mousePos.x != "") startProps = { x: mousePos.x, y: mousePos.y, size: startSize / 10, alpha: 0 };
    var _tl = new TimelineMax().fromTo(p, p.dur, startProps, {
        size: '+=' + String(rand(200, 400)),
        bezier: [{ alpha: rand(0.15, 0.65) }, { alpha: 0 }],
        ease: Power1.easeOut, //ease:Power0.easeNone,
        onComplete: function () {setParticle(p);} });

    if (firstRun) _tl.seek(p.dur * rand());
}

TweenMax.ticker.addEventListener("tick", function () {
    ctx.clearRect(0, 0, cw, ch);
    for (var i = 0; i < n; i++) {if (window.CP.shouldStopExecution(0)) break;particles[i].draw();}window.CP.exitedLoop(0);
});

// First run & handle resize
for (var i = 0; i < n; i++) {if (window.CP.shouldStopExecution(1)) break;particles.push(new Particle(i));}window.CP.exitedLoop(1);
window.addEventListener('resize', init);
init();

function init() {
    cw = c.width = window.innerWidth;
    ch = c.height = window.innerHeight;
    for (var i = 0; i < n; i++) {if (window.CP.shouldStopExecution(2)) break;
    TweenMax.killTweensOf(particles[i]);
    setParticle(particles[i], true);
}
window.CP.exitedLoop(2);}

function rand(min, max) {
    min ? min = min : min = 0;
    max ? max = max : max = 1;
    return min + (max - min) * Math.random();
}
img.src = "img/ball.png";

/******************** reference ********************
 * url: https://codepen.io/creativeocean/pen/WVrBaG
 * author: Tom Miller
 * when: Dec 6 2020
 ***************************************************/


//==================menu section=================
var vw = $(window).width();
var delay_time = 0;

//click logo    
$("#logo").click(function() {
    setTimeout(function(){
        $("ul").css("display", "block");
        $("h1").addClass("h1-menu-style");
    }, 500);
    //transform "X" sign
    var delay_time = 0;
    $("#hamburger").toggleClass('open');

    TweenMax.to($("#bg-menu-mobile"), 1, {
        x: -vw,
        ease: Expo.easeInOut
    });
    $("li").each(function() {
        TweenMax.to($(this), 1.2, {
            x:-vw,
            scaleX:1,
            delay: delay_time,
            ease: Expo.easeInOut
        });
        delay_time += .04;
    });
}); 

//click X to close the popup
$("#hamburger").click(function() {
    TweenMax.to($("#bg-menu-mobile"), 1.2, {
        x:0,
        ease: Expo.easeInOut
    });
    $("li").each(function() {
        TweenMax.to($(this), 1, {
        x:0,
        delay: delay_time,
        ease: Expo.easeInOut
        });
        delay_time += .02;
    });
    setTimeout(function(){
        $("h1").removeClass("h1-menu-style");
    }, 500);
    $("ul").css("display", "none");
    $("#hamburger").removeClass('open');
})
/******************** reference ********************
 * url: https://codepen.io/luiscarvalho/pen/WxKxoj
 * author: Luis Carvalho
 * when: Dec 8 2020
 ***************************************************/
