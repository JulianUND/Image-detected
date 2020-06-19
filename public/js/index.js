
google.charts.load('current', {packages: ['corechart', 'bar']});

let net = null;
google.charts.setOnLoadCallback(drawChart);

      function drawChart(result) {
        var data_ = Array((result.length + 1));

        data_[0] = ['clase','Probabilidad', { role: "style" }];
        data_[1] = [result[0].className, result[0].probability, '#ffdc34'];
    
        for (iter = 1; iter < result.length; iter++){
            data_[(iter + 1)] = [result[iter].className, result[iter].probability, '#110133'];
        }
    
        var data = google.visualization.arrayToDataTable(data_);
    
        var options = {
            is3D: true,
         pieHole: 0.4,
          width: 1400,
          height: 700,
          colors: ['#4dd599', '#ffdc34', '#323232']
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
function drawStacked(result) {
    var data_ = Array((result.length + 1));

    data_[0] = ['clase','Probabilidad', { role: "style" }];
    data_[1] = [result[0].className, result[0].probability, '#4dd599'];

    for (iter = 1; iter < result.length; iter++){
        data_[(iter + 1)] = [result[iter].className, result[iter].probability, '#323232'];
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
        annotations: {
            boxStyle: {
              // Color of the box outline.
              stroke: '#888',
              // Thickness of the box outline.
              strokeWidth: 4,
              // x-radius of the corner curvature.
              rx: 10,
              // y-radius of the corner curvature.
              ry: 10,
              // Attributes for linear gradient fill.
              gradient: {
                // Start color for gradient.
                color1: '#fbf6a7',
                // Finish color for gradient.
                color2: '#33b679',
                // Where on the boundary to start and
                // end the color1/color2 gradient,
                // relative to the upper left corner
                // of the boundary.
                x1: '0%', y1: '0%',
                x2: '100%', y2: '100%',
                // If true, the boundary for x1,
                // y1, x2, and y2 is the box. If
                // false, it's the entire chart.
                useObjectBoundingBoxUnits: true
              }
            }
          },
        width: 1200,
        height: 600,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };


    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(view, options);
  }


 function showFiles() {
    let demoImage = document.getElementById('idImage');

    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    
    reader.onload = function (event) {

        demoImage.src = reader.result;
    }
    
    reader.readAsDataURL(file);
    app();
}  


async function app(){
    net = await mobilenet.load();
    await predice();
}


async function predice(){
    img_ = document.getElementById('idImage');

    if (img_.src != ""){
        img_.width = 700;
        img_.height = 700;
        or_width =  img_.width;
        or_height = img_.height;

        const result = await net.classify(img_);

        drawStacked(result);
        drawChart(result);

    }
}
app();