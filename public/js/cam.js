
google.charts.load('current', {packages: ['corechart', 'bar']});
const webcamElement = document.getElementById('webcam');
let net;

function drawStacked(result) {
  var data_ = Array((result.length + 1));
  data_[0] = ['clase','Probabilidad', { role: "style" }];
  data_[1] = [result[0].className, result[0].probability, '#f39422'];

  for (iter = 1; iter < result.length; iter++){
      data_[(iter + 1)] = [result[iter].className, result[iter].probability, '#293a80'];
  }
  var data = google.visualization.arrayToDataTable(data_);
  var view = new google.visualization.DataView(data);

  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

  var options = {
      width: 600,
      height: 200,
      bar: {groupWidth: "95%"},
      legend: { position: "none" },
    };
    
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(view, options);
}

async function setupWebcam() {
    return new Promise((resolve, reject) => {
      const navigatorAny = navigator;
      navigator.getUserMedia = navigator.getUserMedia ||
          navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
          navigatorAny.msGetUserMedia;
      if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true},
          stream => {
            webcamElement.srcObject = stream;
            webcamElement.addEventListener('loadeddata',  () => resolve(), false);
          },
          error => reject());
      } else {
        reject();
      }
    });
  }

  async function app() {
    net = await mobilenet.load();
    await setupWebcam();
    while (true) {
      const result = await net.classify(webcamElement);
      drawStacked(result);
      await tf.nextFrame();
    }
  }

app();