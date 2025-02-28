function addTask() {
    const task = document.getElementById("task").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    
    if (task.trim() === "") return;
    
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `${task} - ${date} ${time ? 'at ' + time : ''} <button onclick="deleteTask(this)">Delete</button>`;
    li.classList.add("fade-in");
    taskList.appendChild(li);
    
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}

function drawClock() {
    const canvas = document.getElementById("clockCanvas");
    const ctx = canvas.getContext("2d");
    const now = new Date();
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(radius, radius);
    ctx.rotate(-Math.PI / 2);
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, radius - 2, 0, 2 * Math.PI);
    ctx.stroke();
    
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    function drawHand(length, width, angle) {
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length * Math.cos(angle), length * Math.sin(angle));
        ctx.stroke();
    }
    
    drawHand(radius * 0.5, 6, (hours + minutes / 60) * (Math.PI / 6));
    drawHand(radius * 0.8, 4, (minutes + seconds / 60) * (Math.PI / 30));
    drawHand(radius * 0.9, 2, seconds * (Math.PI / 30));
    ctx.resetTransform();
}

setInterval(drawClock, 1000);