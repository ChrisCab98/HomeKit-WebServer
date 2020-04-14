$(document).ready(function () {
    var socket = io.connect('http://' + document.domain + ':' + location.port);

    console.log('Page has been refreshed')
    // $('#deskLampImgGlow').hide();

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

    window.onload = function () {

        // var topic = 'cmnd/smartSurgeOutlet3/power';
        // var message = '';
        // var qos = 0;
        // var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';

        // var topic2 = 'cmnd/smartSurgeOutlet4/power';
        // var message2 = '';
        // var qos2 = 0;
        // var data2 = '{"topic": "' + topic2 + '", "message": "' + message2 + '", "qos": ' + qos2 + '}';

        // var topic3 = 'cmnd/smartSurgeOutlet2/power';
        // var message3 = '';
        // var qos3 = 0;
        // var data3 = '{"topic": "' + topic3 + '", "message": "' + message3 + '", "qos": ' + qos3 + '}';

        // socket.emit('publish', data = data);
        // console.log(data)

        // socket.emit('publish', data2 = data2);
        // console.log(data2)

        // socket.emit('publish', data3 = data3);
        // console.log(data3)
    };

    $(".dropdown-toggle").dropdown();


    $('#deskLamp').click(function (event) {
        var topic = 'cmnd/smartSurgeOutlet3/power';
        var message = '';
        var qos = 0;
        var state = $('#deskLampState').text();

        if (state == 'Allumé') {
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

        if (state == 'Allumé') {
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

        if (state == 'Allumé') {
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
                $('#deskLampState').text('Allumé');
                imgAttribute = "../static/png/lamp2Glow.png"

                $('#deskLamp').removeClass("accessorie")
                $('#deskLamp').addClass("accessorieActive")
                $('#deskLampState').removeClass("accessorieStatusOff")
                $('#deskLampState').addClass("accessorieStatusOn")
                $('#deskLampName').removeClass("accessorieNameOff")
                $('#deskLampName').addClass("accessorieNameOn")

            }
            else {
                $('#deskLampState').text('Éteint');
                imgAttribute = "../static/png/lamp2Off.png"

                $('#deskLamp').removeClass("accessorieActive")
                $('#deskLamp').addClass("accessorie")
                $('#deskLampState').removeClass("accessorieStatusOn")
                $('#deskLampState').addClass("accessorieStatusOff")
                $('#deskLampName').removeClass("accessorieNameOn")
                $('#deskLampName').addClass("accessorieNameOff")
            }
            img.setAttribute("src", imgAttribute);
        }

        if (data['topic'] == 'stat/smartSurgeOutlet4/POWER') {
            var img = document.getElementById("usbPortsImg");
            var imgAttribute = img.getAttribute("src");
            if (data['payload'] == 'ON') {
                $('#usbPortsState').text('Allumé');
                imgAttribute = "../static/png/powerOutlet.png"

                $('#usbPorts').removeClass("accessorie")
                $('#usbPorts').addClass("accessorieActive")
                $('#usbPortsState').removeClass("accessorieStatusOff")
                $('#usbPortsState').addClass("accessorieStatusOn")
                $('#usbPortsName').removeClass("accessorieNameOff")
                $('#usbPortsName').addClass("accessorieNameOn")
            }
            else {
                $('#usbPortsState').text('Éteint');
                imgAttribute = "../static/png/powerOutletOff.png"

                $('#usbPorts').removeClass("accessorieActive")
                $('#usbPorts').addClass("accessorie")
                $('#usbPortsState').removeClass("accessorieStatusOn")
                $('#usbPortsState').addClass("accessorieStatusOff")
                $('#usbPortsName').removeClass("accessorieNameOn")
                $('#usbPortsName').addClass("accessorieNameOff")
            }
            img.setAttribute("src", imgAttribute);

        }

        if (data['topic'] == 'stat/smartSurgeOutlet2/POWER') {
            var img = document.getElementById("screenMonitorImg");
            var imgAttribute = img.getAttribute("src");
            if (data['payload'] == 'ON') {
                $('#screenMonitorState').text('Allumé');
                imgAttribute = "../static/png/TV.png"

                $('#screenMonitor').removeClass("accessorie")
                $('#screenMonitor').addClass("accessorieActive")
                $('#screenMonitorState').removeClass("accessorieStatusOff")
                $('#screenMonitorState').addClass("accessorieStatusOn")
                $('#screenMonitorName').removeClass("accessorieNameOff")
                $('#screenMonitorName').addClass("accessorieNameOn")
            }
            else {
                $('#screenMonitorState').text('Éteint');
                imgAttribute = "../static/png/TVOff.png"

                $('#screenMonitor').removeClass("accessorieActive")
                $('#screenMonitor').addClass("accessorie")
                $('#screenMonitorState').removeClass("accessorieStatusOn")
                $('#screenMonitorState').addClass("accessorieStatusOff")
                $('#screenMonitorName').removeClass("accessorieNameOn")
                $('#screenMonitorName').addClass("accessorieNameOff")
            }
            img.setAttribute("src", imgAttribute);

        }

    })
});