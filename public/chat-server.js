const socket = new WebSocket("wss:www.nordic-taggers.dk:5000/socket");

socket.onmessage = function(e) {
    document.getElementById('root').innerHTML = e.data;
};
