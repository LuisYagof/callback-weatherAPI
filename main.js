const WRAPPERresults = document.querySelector("#wrapperResults")
const INPUTlat = document.querySelector("#inputLat")
const INPUTlon = document.querySelector("#inputLon")
const SEARCHbtn = document.querySelector("#searchBTN")

// function printData(elem){
// // aquí entraría (data.current.weather[0]) desde el }else{ de getWeather
//     let tag = document.createElement("p")
//     let tagCont = document.createTextNode(elem.description)
//     tag.appendChild(tagCont)
//     WRAPPERresults.appendChild(tag)
// }

SEARCHbtn.addEventListener("click", function(){
    getWeather(INPUTlat.value, INPUTlon.value, (error, data) => {
        if(error !== null) { // KO
          console.error(error);
        }
        else { // OK
          transformData(data.daily)
        }
      })
})

function transformData (array) {
  let data = {
    labels: ['Hoy', 'Mañana', 'Pasao', 'El siguiente', 'En 4 días', 'En 5 días', 'En 6 días', 'En una semana'],
    series: [
      [array[0].temp.min, array[1].temp.min, array[2].temp.min, array[3].temp.min, array[4].temp.min, array[5].temp.min, array[6].temp.min, array[7].temp.min],

      [array[0].temp.max, array[1].temp.max, array[2].temp.max, array[3].temp.max, array[4].temp.max, array[5].temp.max, array[6].temp.max, array[7].temp.max]
    ]
  }

  let options = {
    lineSmooth: false,
    // axisY: {
    //   offset: 100,
    // }
  };

  let responsiveOptions = [
    ['screen and (min-width: 641px) and (max-width: 1024px)', {
      seriesBarDistance: 10,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value;
        }
      }
    }],
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Line('.ct-chart', data, options, responsiveOptions);
}

// 40.4218534,-3.6921458,284