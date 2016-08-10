function gi()
{
    var request = new XMLHttpRequest();
    request.open('GET', '/home/gallery', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);

            var output = [];
            for(var i=0; i<data.length; i++)
            {
                var img = data[i];
                output.push('<div class="three columns"><a href="' + img.Link + '"><img class="u-max-full-width" src="' + img.Url + '" ></a></div>');

                if((i+1)%4 == 0)
                    output.push('</div><div class="row section">');
            }

            document.getElementById('gallery').innerHTML = output.join('');
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}