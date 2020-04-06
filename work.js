var ctx;

var headerText = 'Stay at Home';
var bodyText1 = 'Save Lives!';
var bodyText2;
var bodyText3;

// https://stackoverflow.com/a/16599668
function getLines(ctx, text, maxWidth) {
    if (!text) {
        return [];
    }
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

var boxImg = document.getElementById("bg-1");

function clearBox() {
    let bgColor = '#085195fa';

    ctx.fillStyle = bgColor;
    ctx.fillRect(674, 168, 1260, 690);
    
    ctx.drawImage(boxImg, 674, 168, 1230, 690);

    ctx.globalAlpha = 0.75;

    var grd = ctx.createRadialGradient(1273, 500, 40, 1273, 500, 400);
    grd.addColorStop(0, "#0c528a");
    grd.addColorStop(1, "#072c4a");
    ctx.fillStyle = grd;
    ctx.fillRect(674, 168, 1230, 690);
    ctx.globalAlpha = 1;
}

function writeHeader(text) {
    ctx.fillStyle = 'rgb(245,170,7)';
    ctx.fillRect(700, 200, 1180, 100);

    ctx.fillStyle = 'white';
    ctx.font = `62px RedFont`;
    ctx.textAlign = "center";
    ctx.fillText(text, 1300, 270);
}

function writeBodyCenter(text) {
    ctx.fillStyle = 'white';
    ctx.font = `48px RedFont`;
    ctx.textAlign = "center";
    let lines = getLines(ctx, text, 1200);

    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        // ctx.fillText(lines[i], 730, 415 + (i * 50));
        ctx.fillText(lines[i], 1300, 570 + (i * 54));
    }
}

var bulletStartSpacing = 215;
var bulletSpacing = 200;

function writeBodyBullet(text) {
    ctx.fillStyle = 'white';
    ctx.font = `42px RedFont`;
    ctx.textAlign = "left";
    // ctx.fillText(text, 730, 415);
    // ctx.fillText(text, 730, 415 + 50);
    let lines = getLines(ctx, text, 1100);
    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 730, (bulletStartSpacing + (bulletSpacing * 1)) + (i * 54));
    }
}

function writeBodyBullet2(text) {
    ctx.fillStyle = 'white';
    ctx.font = `42px RedFont`;
    ctx.textAlign = "left";
    // ctx.fillText(text, 730, 415);
    // ctx.fillText(text, 730, 415 + 50);
    let lines = getLines(ctx, text, 1100);
    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 730, (bulletStartSpacing + (bulletSpacing * 2)) + (i * 54));
    }
}

function writeBodyBullet3(text) {
    ctx.fillStyle = 'white';
    ctx.font = `42px RedFont`;
    ctx.textAlign = "left";
    // ctx.fillText(text, 730, 415);
    // ctx.fillText(text, 730, 415 + 50);
    let lines = getLines(ctx, text, 1100);
    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], 730, (bulletStartSpacing + (bulletSpacing * 3)) + (i * 54));
    }
}

function loaded() {
    var c = document.getElementById("can");
    ctx = c.getContext("2d");
    var img = document.getElementById("cuomo-1");
    ctx.drawImage(img, 6, 4);
    draw();
}

window.onload = function() {
    this.loaded();
};

function draw() {
    clearBox();
    if (headerText) {
        writeHeader(headerText);
    }
    if (bodyText1 && !bodyText2) {
        writeBodyCenter(bodyText1);
    } else {
        if (bodyText3) {
            bulletStartSpacing = 200;
            bulletSpacing = 180;
            writeBodyBullet3(bodyText3);
        } else {
            bulletStartSpacing = 215;
            bulletSpacing = 200;
        }
        writeBodyBullet(bodyText1);
        writeBodyBullet2(bodyText2);
    }
}

$('#header-in').on("input", function(e) {
    let val = $(this).val();
    clearBox();
    headerText = val;
    console.log('val', val);
    draw()
});

$('#header-in').on("input", function(e) {
    let val = $(this).val();
    clearBox();
    headerText = val;
    console.log('val', val);
    draw()
});


$('#body1-in').on("input", function(e) {
    let val = $(this).val();
    clearBox();
    bodyText1 = val;
    console.log('val', val);
    draw()
});

$('#body2-in').on("input", function(e) {
    let val = $(this).val();
    clearBox();
    bodyText2 = val;
    console.log('val', val);
    draw()
});

$('#body3-in').on("input", function(e) {
    let val = $(this).val();
    clearBox();
    bodyText3 = val;
    console.log('val', val);
    draw()
});

var timer = null;

$('#bg-url').on('input', function(e) {
    let val = $(this).val();
    let url = 'https://cors-anywhere.herokuapp.com/' + val;
    // $('#bg-1').prop('src', url);

    let _img = loadImage(url, function(img) {
        boxImg = _img;
        draw();
    })
})

function loadImage(src, callback) {
    var img = new Image();

    img.onload = callback;
    img.setAttribute('crossorigin', 'anonymous'); // works for me

    img.src = src;

    return img;
}

$('#sel').on('change', function(e) {
    let val = $(this).val();
    console.log('val', val);
    $('#cuomo-1').prop('src', 'cuomo-' + val + '.png');
    // time to load
    clearTimeout(timer);
    timer = setTimeout(() => {
        loaded();
    }, 500);
})

function download(){
    document.getElementById("download").download = "cuomo.png";
    document.getElementById("download").href = document.getElementById("can").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}