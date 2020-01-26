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

        socket.emit('publish', data = data);
        console.log(data)

        socket.emit('publish', data2 = data2);
        console.log(data2)
    };

    $('#deskLamp').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet3/power';
        var message = '';
        var qos = 0;
        var state = $('#deskLampState').text();
        var img = document.getElementById("deskLampImg");
        var imgAttribute = img.getAttribute("src");

        console.log("img :" + imgAttribute)

        if (state == 'On') {
            message = 'off';
            imgAttribute = "../static/png/lampOff.png"
            console.log("if state == On " + message)
        }

        else {
            message = 'on';
            imgAttribute = "../static/png/lampOn.png"
            console.log("if state == Off " + message)
        }

        img.setAttribute("src",imgAttribute);
        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });



    $('#usbPorts').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet4/power';
        var message = '';
        var qos = 0;
        var state = $('#usbPortsState').text();
        var img = document.getElementById("usbPortsImg");
        var imgAttribute = img.getAttribute("src");

        console.log("1 : " + state)

        if (state == 'On') {
            message = 'off';
            imgAttribute = "../static/png/usbOff.png"
            console.log("if state == On " + message)
        }

        else {
            message = 'on';
            imgAttribute = "../static/png/usbOn.png"
            console.log("if state == Off " + message)
        }

        img.setAttribute("src",imgAttribute);
        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        socket.emit('publish', data = data);
    });






    socket.on('mqtt_message', function (data) {
        console.log(data);
        if (data['topic'] == 'stat/smartSurgeOutlet3/POWER') {
            if (data['payload'] == 'ON') {
                $('#deskLampState').text('On');
            }
            else {
                $('#deskLampState').text('Off');
            }

        }

        if (data['topic'] == 'stat/smartSurgeOutlet4/POWER') {
            if (data['payload'] == 'ON') {
                $('#usbPortsState').text('On');
            }
            else {
                $('#usbPortsState').text('Off');
            }

        }

    })

});