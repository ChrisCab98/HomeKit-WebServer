$(document).ready(function () {
    var socket = io.connect('http://' + document.domain + ':' + location.port);

    window.onload = function () {
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

        console.log("1 : " + state)

        if (state == 'On') {
            message = 'off';
            console.log("if state == On " + message)
        }

        else {
            message = 'on';
            console.log("if state == Off " + message)
        }

        var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
        console.log(data)
        // console.log(state)
        socket.emit('publish', data = data);
    });



    $('#usbPorts').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet4/power';
        var message = 'on';
        var qos = 0;
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