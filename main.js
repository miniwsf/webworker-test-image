const input = document.querySelector('#input');

const result = document.querySelector('#result');
const domain = document.querySelector('#domain');

if (window.Worker) {
	const myWorker = new Worker("worker.js");

	input.onchange = function() {
		if(!domain.value){
			alert("请先输入字符串域名");
		}
		else{
			myWorker.postMessage([input.value, domain.value]);
			console.log('Message posted to worker');
		}
	};

	myWorker.onmessage = function(e) {
		result.textContent = e.data;
		console.log('Message received from worker');
	}
} else {
	console.log('Your browser doesn\'t support web workers.')
}
