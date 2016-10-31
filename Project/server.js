var express = require('express'),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    request = require('request');
var router = express.Router();

var app = express();
app.set('views', './');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('COOKIEKEY'));
app.listen(8081);

app.get('/', function (req, res) {
    res.status(200);
    res.set({'Content-Type': 'text/html', 'Cache-Control': 'no-cache'});
    res.render('EJSFirewallPage.ejs', {}, function (err, html) {
        if (err) {
            res.redirect('/error');
        } else {
            res.send(html);
        }
    });
});

app.post('/post_firewall_rule1', function (req, res) {
	var nodeId =  req.body.input11;
	var tableId = req.body.input12;
	var url= 'http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/' + nodeId + '/flow-node-inventory:table/'+ tableId +'/';
	request.get(url, { 
  		'auth': {
    			'user': 'admin',
    			'pass': 'admin',
    			'sendImmediately': false
  		}},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
    		var pulledData = JSON.parse(body);
				res.status(200);
				res.set({'Content-Type': 'text/html', 'Cache-Control': 'no-cache'});
				res.render('EJSFirewallPage.ejs', {}, function (err, html) {
					if (err) {
						res.redirect('/error');
					} else {
						res.send(html);
					}
				});
			}
		}
	);
});

app.post('/post_firewall_rule2', function (req, res) {
	var nodeId =  req.body.input21;
	var tableId = req.body.input22;
  var flowId = req.body.input23;
  var sourceIP =  req.body.input24;
	var destIP = req.body.input25;
	var url= 'http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/' + nodeId + '/flow-node-inventory:table/'+ tableId +'/flow/' + flowId+'/';
	request.put(url, { 
  		'auth': {
    			'user': 'admin',
    			'pass': 'admin',
    			'sendImmediately': false
  		},
      body: {
        "flow": [
          {
            "id": flowId,
            "match": {
              "ethernet-match": {
                "ethernet-type": {
                  "type": "2048"
                }
              },
              "ipv4-source": sourceIP,
              "ipv4-destination": destIP
            },
            "instructions": {
              "instruction": [
                {
                  "order": "1",
                  "apply-actions": {
                    "action": [
                      {
                        "drop-action": {},
                        "order": "1"
                      }
                    ]
                  }
                }
              ]
            },
            "flow-name": "flow"+flowId,
            "priority": "150",
            "cookie": "10",
            "table-id": "0"
          }
        ]
      },
      json: true
    },
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
    		var pulledData = JSON.parse(body);
				res.status(200);
				res.set({'Content-Type': 'text/html', 'Cache-Control': 'no-cache'});
				res.render('EJSFirewallPage.ejs', {}, function (err, html) {
					if (err) {
						res.redirect('/error');
					} else {
						res.send(html);
					}
				});
			}
		}
	);
});

app.post('/post_firewall_rule_delete', function (req, res) {
	var nodeId =  req.body.input11;
	var tableId = req.body.input12;
	var url= 'http://localhost:8181/restconf/config/opendaylight-inventory:nodes/node/' + nodeId + '/flow-node-inventory:table/'+ tableId +'/flow/' + flowId+'/';
	request.delete(url, { 
  		'auth': {
    			'user': 'admin',
    			'pass': 'admin',
    			'sendImmediately': false
  		}},
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
    		var pulledData = JSON.parse(body);
				res.status(200);
				res.set({'Content-Type': 'text/html', 'Cache-Control': 'no-cache'});
				res.render('EJSFirewallPage.ejs', {}, function (err, html) {
					if (err) {
						res.redirect('/error');
					} else {
						res.send(html);
					}
				});
			}
		}
	);
});
