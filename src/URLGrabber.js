var regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = window.location.href,
    match;
while (match = regex.exec(url)) {
    module.exports[match[1]] = match[2];
}

