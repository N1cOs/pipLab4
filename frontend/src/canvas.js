window.onload = (e) => {
  if (location.pathname === '/check') {
    console.log('im on check!!!, here i am!!!');
    var radius = 100;


    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const coordCenter = width / 2;
    const scale = 50;

    function draw() {
      ctx.beginPath();
      let startangel = 180 * Math.PI / 180;
      let endangel = 270 * Math.PI / 180;
      ctx.arc(coordCenter, coordCenter, radius / 2, startangel, endangel, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.moveTo(width / 2, height / 2 - radius / 2);
      ctx.lineTo(width / 2 - radius / 2, height / 2);
      ctx.lineTo(width / 2, height / 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(width / 2, height / 2 - radius, radius, radius);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2 + radius);
      ctx.lineTo(width / 2 + radius, height / 2);
      ctx.lineTo(width / 2, height / 2);
      ctx.fill();
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.strokeStyle = '#000';
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      ctx.fillStyle = '#ed1c24';
    }

    function getMP(canvas, event) {
      let rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left - 5,
        y: event.clientY - rect.top - 5
      };
    }


    canvas.addEventListener('click', function (event) {
      const MP = getMP(canvas, event);


      if (document.querySelector('input[name="valueOfR"').value) {
        ctx.beginPath();
        ctx.arc(MP.x, MP.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ed1c24';
        ctx.fill();
      }
      document.querySelector('input[name="valueOfX"]').setAttribute('value', ((MP.x - width / 2) / scale).toFixed(3));
      document.querySelector('input[name="valueOfY"]').setAttribute('value', ((-MP.y + height / 2) / scale).toFixed(3));
    });

    document.querySelector('input[name="valueOfR"').oninput = () => {
      radius = event.target.value * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw();
      historyDots();
    };

    function historyDots() {
      const xCoordinates = document.querySelectorAll('td.x_coord');
      const yCoordinates = document.querySelectorAll('td.y_coord');
      for (let i = 0; i < xCoordinates.length; i++) {
        ctx.beginPath();
        let valueOfX = parseFloat(xCoordinates[i].innerText);
        let valueOfY = parseFloat(yCoordinates[i].innerText);
        ctx.arc(valueOfX * scale + width / 2, height / 2 - valueOfY * scale, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ed1c24';
        ctx.fill();
      }
    }

    draw();
    historyDots();
  }
  else if (location.pathname=='/login')
    console.log('hey');
};
