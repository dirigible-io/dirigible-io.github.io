if (document.cookie.indexOf('cookieControl') > -1) {
    var script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.type = 'text/javascript';
    script['async'] = "true";
    script.charset = "utf-8";
    document.getElementById("tweets").appendChild(script);
    script.onload = function() {
        twttr.widgets.createTimeline({
                sourceType: "profile",
                screenName: "dirigible_io",
                tweetLimit: 3
            },
            document.getElementById("tweets")
        );
    };
} else {
    var p = document.createElement('p');
    p.innerHTML = "Please, accept the Cookies & Privacy Policy below to be able to load the Twitter widget.";
    document.getElementById("tweets").appendChild(p);
}