const WRAPPERresult = document.querySelector("#wrapperResult")
const INPUTlat = document.querySelector("#inputLat")
const INPUTlon = document.querySelector("#inputLon")
const SEARCHbtn = document.querySelector("#searchBTN")
const RESETbtn = document.querySelector("#resetBTN")

SEARCHbtn.addEventListener("click", function(){
    getWeather(INPUTlat.value, INPUTlon.value, (error, data) => {
        if(error !== null) {
          console.error(error);
        }
        else {
          transformData(data.daily)
          if(!WRAPPERresult.classList.contains("written")){
            printData(data.current.weather[0])
          }
        }
      })
})

function printData(elem){
  WRAPPERresult.classList.add("written")
  let tag = document.createElement("p")
  let tagCont = document.createTextNode(`The current weather is ${elem.description}`)
  tag.appendChild(tagCont)
  WRAPPERresult.appendChild(tag)
}

function transformData (array) {
  let data = {
    labels: ['Hoy', 'Mañana', 'Pasao', 'El siguiente', 'En 4 días', 'En 5 días', 'En 6 días', 'En una semana'],
    series: [
      [array[0].temp.min, array[1].temp.min, array[2].temp.min, array[3].temp.min, array[4].temp.min, array[5].temp.min, array[6].temp.min, array[7].temp.min],

      [array[0].temp.max, array[1].temp.max, array[2].temp.max, array[3].temp.max, array[4].temp.max, array[5].temp.max, array[6].temp.max, array[7].temp.max]
    ]
  }

  let options = {
    lineSmooth: false
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
    }],

    ['screen and (min-width: 768px)', {
      axisY: {
        offset: 60,
      }
    }]
  ];

  new Chartist.Line('.ct-chart', data, options, responsiveOptions);
}

function reset(){
  document.querySelector(".ct-chart").remove()
}

RESETbtn.addEventListener("click", reset)

// 40.4218534,-3.6921458,284