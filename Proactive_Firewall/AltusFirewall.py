from pox.core import core
from pox.lib.util import dpidToStr
import pox.openflow.libopenflow_01 as of
from pox.lib.packet.ethernet import ethernet
from pymongo import MongoClient

# Even a simple usage of the logger is much nicer than print!
log = core.getLogger()

# function to handle all housekeeping items when firewall starts
def _handle_StartFirewall (event):
    log.info("Firewall Tutorial is running.")

# function to handle all PacketIns from switch/router
def _handle_PacketIn (event):
    
    packet = event.parsed
    dnsPacket = event.parsed.find('dns')
    
    client = MongoClient('localhost',27017)
    db = client['altusdb']
    collection = db['blockingRules']
    
    results = collection.find()
    for result in results:
        if result['id'] == event.connection.dpid:
            if dnsPacket is not None:
                for website in result['websites']:
                    if dnsPacket.questions[0].name == website['name']:
                        log.info("installing flow for %s.%i -> %s.%i" %
                                 (packet.src, event.port, packet.dst, 53))
                        msg = of.ofp_flow_mod()
                        msg.match = of.ofp_match.from_packet(packet, event.port)
                        msg.idle_timeout = 5
                        msg.hard_timeout = 10
                        msg.data = event.ofp
                        event.connection.send(msg)

# main function to start module
def launch ():
    core.openflow.addListenerByName("ConnectionUp", _handle_StartFirewall)
    core.openflow.addListenerByName("PacketIn", _handle_PacketIn)