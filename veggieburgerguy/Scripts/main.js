var sizes = [{cls:'three',div:4},{cls:'four',div:3},{cls:'six',div:2}];

var size = sizes[1];

var thumbnail = '<div class="' + size.cls + ' columns thumbnail">' +
                    '<div>' +
                        '<a href="{{link}}" style="background-image: url({{url}});" target="_blank"></a>' +
                    '</div>' +
                '</div>';

var divider = '</div><div class="row section">';

function gi()
{
    var request = new XMLHttpRequest();
    request.open('GET', '/home/gallery', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);

            var output = [];
            var d = size.div;
            for(var i=0; i<data.length; i++)
            {
                var img = data[i];
                output.push(thumbnail.replace(/{{link}}/, img.Link).replace(/{{url}}/, img.Url));

                if((i+1)%d == 0)
                    output.push(divider);
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