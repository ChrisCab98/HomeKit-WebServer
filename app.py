import eventlet
import json
from flask import Flask, render_template
from flask_mqtt import Mqtt
from flask_bootstrap import Bootstrap
import time

eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_BROKER_URL'] = '192.168.68.113' # Devisubox
# app.config['MQTT_BROKER_URL'] = '192.168.1.29' # Home
# app.config['MQTT_BROKER_URL'] = '127.0.0.1' # Localhost
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False

mqtt = Mqtt(app)
bootstrap = Bootstrap(app)

@app.route('/')
def index():
    return render_template('homepage.html')


@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    mqtt.subscribe('cmnd/smartSurgeOutlet3/power')


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )

    print(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True, debug=True)