cd /home/pi/HomeKit-WebServer
echo "Update Homekit-WebServer from GitHub"
git pull
echo "Start HomeKit-WebServer"
su - pi -c "python3 /home/pi/HomeKit-WebServer/app.py" &
