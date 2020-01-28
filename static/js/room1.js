$(document).ready(function () {
    var socket = io.connect('http://' + document.domain + ':' + location.port);



    window.onload = function () {

        console.log('Page has been refreshed')

        var topic = 'cmnd/smartSurgeOutlet3/power';
        var message = '';
        var qos = 0;
        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';

        var topic2 = 'cmnd/smartSurgeOutlet4/power';
        var message2 = '';
        var qos2 = 0;
        var data2 = '{"topic": "' + topic2 + '", "message": "' + message2 + '", "qos": ' + qos2 + '}';

        var topic3 = 'cmnd/smartSurgeOutlet2/power';
        var message3 = '';
        var qos3 = 0;
        var data3 = '{"topic": "' + topic3 + '", "message": "' + message3 + '", "qos": ' + qos3 + '}';

        socket.emit('publish', data = data);
        console.log(data)

        socket.emit('publish', data2 = data2);
        console.log(data2)

        socket.emit('publish', data3 = data3);
        console.log(data3)
    };

    $(".dropdown-toggle").dropdown();


    $('#deskLamp').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet3/power';
        var message = '';
        var qos = 0;
        var state = $('#deskLampState').text();

        if (state == 'On') {
            message = 'off';
        }

        else {
            message = 'on';
        }

        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });

    $('#usbPorts').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet4/power';
        var message = '';
        var qos = 0;
        var state = $('#usbPortsState').text();

        if (state == 'On') {
            message = 'off';
        }

        else {
            message = 'on';
        }

        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });

    $('#screenMonitor').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet2/power';
        var message = '';
        var qos = 0;
        var state = $('#screenMonitorState').text();

        if (state == 'On') {
            message = 'off';
        }

        else {
            message = 'on';
        }

        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });

    socket.on('mqtt_message', function (data) {
        console.log(data);
        if (data['topic'] == 'stat/smartSurgeOutlet3/POWER') {
            var img = document.getElementById("deskLampImg");
            var imgAttribute = img.getAttribute("src");

            if (data['payload'] == 'ON') {
                $('#deskLampState').text('On');
                imgAttribute = "../static/png/lampOn.png"
            }
            else {
                $('#deskLampState').text('Off');
                imgAttribute = "../static/png/lampOff.png"
            }
            img.setAttribute("src", imgAttribute);
        }

        if (data['topic'] == 'stat/smartSurgeOutlet4/POWER') {
            var img = document.getElementById("usbPortsImg");
            var imgAttribute = img.getAttribute("src");
            if (data['payload'] == 'ON') {
                $('#usbPortsState').text('On');
                imgAttribute = "../static/png/usbOn.png"
            }
            else {
                $('#usbPortsState').text('Off');
                imgAttribute = "../static/png/usbOff.png"
            }
            img.setAttribute("src", imgAttribute);

        }

        if (data['topic'] == 'stat/smartSurgeOutlet2/POWER') {
            var img = document.getElementById("screenMonitorImg");
            var imgAttribute = img.getAttribute("src");
            if (data['payload'] == 'ON') {
                $('#screenMonitorState').text('On');
                imgAttribute = "../static/png/screenOn.png"
            }
            else {
                $('#screenMonitorState').text('Off');
                imgAttribute = "../static/png/screenOff.png"
            }
            img.setAttribute("src", imgAttribute);

        }

    })
});