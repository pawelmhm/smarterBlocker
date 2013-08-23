var send_message = {
	server_url: "http://sio.com:5000/xml",
	notify_server: function () {
		var data = new FormData();
		data.append("first","Nicholas");
		var req = new XMLHttpRequest();
		req.onload = function () {
			document.write(req.responseText);
			}
		req.open("POST",this.server_url,true);
		req.send(data);
	}
};

document.addEventListener('DOMContentLoaded',function() {
	send_message.notify_server();
});
//do something change
