import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyidWi_NJ8oVl9MqNkKDqdWpZ5zErw6Io",
  authDomain: "smart-network-monitor.firebaseapp.com",
  databaseURL: "https://smart-network-monitor-default-rtdb.firebaseio.com",
  projectId: "smart-network-monitor",
  storageBucket: "smart-network-monitor.appspot.com",
  messagingSenderId: "149779684101",
  appId: "1:149779684101:web:7901109f35aa78c94ff56c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference
const networkRef = ref(db, "network");

// Real-time listener
onValue(networkRef, (snapshot) => {

    const data = snapshot.val();

    if(data){

        document.getElementById("primaryStatus").innerText = data.primary || "ACTIVE";
        document.getElementById("backupStatus").innerText = data.backup || "STANDBY";
        document.getElementById("internetStatus").innerText = data.internet || "CONNECTED";

        document.getElementById("latency").innerText = data.latency || "--";
        document.getElementById("packetLoss").innerText = data.packet_loss || "--";
        document.getElementById("bandwidth").innerText = data.bandwidth || "--";
        document.getElementById("networkStatus").innerText = data.status || "--";

        // ALERT DISPLAY (Separate Lines)
        document.getElementById("alertText").innerHTML =
        "Latency: " + (data.latency || "--") + "<br>" +
        "Packet Loss: " + (data.packet_loss || "--") + "<br>" +
        "Bandwidth: " + (data.bandwidth || "--");

    }

});


// Simulate Primary Router Failure
window.failPrimary = function(){

update(networkRef,{
primary:"FAILED",
backup:"ACTIVE",
status:"FAILOVER",
latency:"80 ms",
packet_loss:"5 %",
bandwidth:"60 Mbps"
});

}

// Activate Backup Router
window.activateBackup = function(){

update(networkRef,{
backup:"ACTIVE",
status:"BACKUP RUNNING"
});

}

// Restore Internet
window.restoreInternet = function(){

update(networkRef,{
primary:"ACTIVE",
backup:"STANDBY",
internet:"CONNECTED",
status:"NORMAL",
latency:"25 ms",
packet_loss:"0 %",
bandwidth:"100 Mbps"
});

}