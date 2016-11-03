# Firewall rule management system using OpenDaylight RestConf and POX

Overview:

This project investigate firewall rule implementation on SDN using OpenFlow Standards.

Major Components: 
1. OpenDayLight 
2. POX 
3. Mininet 
4. NodeJS 
5. MongoDB

Installation Guide:

1. OpenDayLight

Download prebuild OpenDayLight from : https://www.opendaylight.org/downloads 
For feature installation refer : https://wiki.opendaylight.org/view/Karaf:Step_by_Step_Guide

2. POX

checkout repository with (git clone https://github.com/noxrepo/pox.git) 
copy AltusFirewall.py from project repository to ext folder in pox directory

3. Mininet

sudo apt install mininet

4. NodeJS

sudo apt install node 
sudo apt install npm

5. MongoDB

To install mongoDB please refer : https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04

Instructions to Run web application:

1. git clone http://gitlab.thothlab.org/team_altus/OpenFlow-Firewall.git 
2. go to Firewall_GUI/Project folder 
3. run npm install 
3. run 'node server.js' 
4. thats it.

Instructions to run other Components:

1. OpenDayLight

run /bin ./karaf

2. POX

goto pox directory and run ./pox.py AltusFirewall forwarding.l2_learning

3. Mininet

sudo mn --topo tree,depth=2,fanout=3 --nat --controller=remote,ip=192.168.1.7 --switch ovs,protocols=OpenFlow10

open new terminal and run

sudo ovs-vsctl set-controller s1 tcp:192.168.1.4:6633

4. MongoDB

Mongo client will be invoked automatically.

To install pymongo please refer: https://pypi.python.org/pypi/pymongo/2.7.2

Dependencies:

1. nodeJS 
2. npm 
3. node modules such as restify, request etc.

Description of project files 
1. AltusFirewall.py 
THis file implements our dynamic rule that listens for pactket In events and applies blocking websites 
based on switch this requested from.

2. Server.js 
This file is the node application that provides API to the front end for all features.

3. EJSFirewallPage.ejs 
This is the 1 page appliation ejs file that is used by Node EJS framework to render UI.

4. package.json 
This file contains all the dependencies that should be installed in node_modules folder to successfully run the project.
