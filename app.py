"""

A small Test application to show how to use Flask-MQTT.

"""

import eventlet
import json
from flask import Flask, render_template
from flask_mqtt import Mqtt
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
import sqlite3
from datetime import datetime


eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
# app.config['MQTT_BROKER_URL'] = '192.168.68.113'  # HomeKit-Server.devisubox.com
app.config['MQTT_BROKER_URL'] = '192.168.1.29'  # HomeKit-Server.local
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_CLIENT_ID'] = ''
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False
app.config['MQTT_LAST_WILL_TOPIC'] = 'home/lastwill'
app.config['MQTT_LAST_WILL_MESSAGE'] = 'bye'
app.config['MQTT_LAST_WILL_QOS'] = 2

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/accessories.db'
app.config['SECRET_KEY'] = 'mysecret'
db = SQLAlchemy(app)

# Parameters for SSL enabled
# app.config['MQTT_BROKER_PORT'] = 8883
# app.config['MQTT_TLS_ENABLED'] = True
# app.config['MQTT_TLS_INSECURE'] = True
# app.config['MQTT_TLS_CA_CERTS'] = 'ca.crt'

mqtt = Mqtt(app)
socketio = SocketIO(app)


class Accessorie(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    Name = db.Column(db.String(20), nullable=False)
    Topic = db.Column(db.String(100), nullable=False, unique=True)
    # Image = db.Column(db.String(50), nullable=False,)

    Image_ID = db.Column(db.Integer, db.ForeignKey('image.id'))

    def __repr__(self):
        return '%r' % (self.Name)


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    Name = db.Column(db.String(50), nullable=False, unique=False)
    Path = db.Column(db.String(50), nullable=False, unique=False)

    Accessories = db.relationship('Accessorie', backref='image')

    def __repr__(self):
        return '%r' % (self.Name)


@app.route('/')
def index():
    today = datetime.today()

    d1 = today.strftime("%H:%M %a. %d %b.")
    print("d1 =", d1)

    return render_template('room1.html', d1=d1)


@app.route('/addAccessories')
def addAccessories():
    return render_template('addAccessories.html')


@app.route('/livingRoom')
def livingRoom():
    return render_template('livingRoom.html')


@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt.publish(data['topic'], data['message'], data['qos'])


@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt.subscribe(data['topic'], data['qos'])


@socketio.on('unsubscribe_all')
def handle_unsubscribe_all():
    mqtt.unsubscribe_all()


@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode(),
        qos=message.qos,
    )
    socketio.emit('mqtt_message', data=data)


@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
    # print(level, buf)
    pass


mqtt.subscribe(topic='stat/smartSurgeOutlet1/POWER')
mqtt.subscribe(topic='stat/smartSurgeOutlet2/POWER')
mqtt.subscribe(topic='stat/smartSurgeOutlet3/POWER')
mqtt.subscribe(topic='stat/smartSurgeOutlet4/POWER')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, use_reloader=True, debug=True)
