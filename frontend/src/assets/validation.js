// document.onload = (e) => {
//   if (location.pathname === '/check') {
function buildCanvas(){
console.log('im on check!!!, here i am!!!');
    var radius = 100;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const coordCenter = width / 2;
    const scale = 20;

    function draw() {
      ctx.beginPath();

      let startangel = 90 * Math.PI / 180;
      let endangel = 180 * Math.PI / 180;
      ctx.arc(coordCenter, coordCenter, radius, startangel, endangel, false);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.moveTo(width / 2, height / 2 + radius);
      ctx.lineTo(width / 2 - radius, height / 2);
      ctx.lineTo(width / 2, height / 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(width / 2, height / 2 - radius, radius / 2, radius);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2 - radius / 2);
      ctx.lineTo(width / 2 - radius, height / 2);
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

    let rRadios = document.getElementsByName('valueOfR');
    for (let i = 0; i < rRadios.length; i++) {
      rRadios[i].addEventListener('change', function () {
        if (this.value > 0)
        radius = this.value*scale;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        historyDots();
      });
    }

    // document.querySelector('input[name="valueOfR"').oninput = () => {
    //   radius = event.target.value * scale;
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   draw();
    //   historyDots();
    // };

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
  document.querySelectorAll('input[type="text"]').forEach((element) => {
    element.addEventListener('input', replaceY);
    element.addEventListener('change', replaceY);
    console.log('hello');

    function replaceY() {
      this.value = this.value.replace(/[^0-9.,]/, "");
    }

  } )

// };

