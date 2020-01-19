// array of colors 
bgColors = [
  ["#eeeeee", "#eeeeee", "#eeeeee"],
  ["#b7c6da", "#d7cde6", "#dee5e6"],
  ["#92a8c2", "#c5b4e0", "#bcdde2"],
  ["#7c98b8", "#b39bd6", "#8bd1db"],
  ["#698db5", "#a88ad8", "#7dcfdb"],
  ["#4f81b8", "#9a72da", "#6ac5d3"],
  ["#3576bd", "#835ac5", "#53bccc"],
  ["#1768bf", "#7543c4", "#3aaec0"],
  ["#0062cc", "#6928d1", "#269eb1"],
  ["#006ee6", "#5e14d4", "#1390a3"],
  ["#007bff", "#5208c9", "#028599"],
];
// Parse local CSV file 
// g1 -> co2 emission
// g2.csv -> area of country
// g3 -> population
// e1 -> energy use in kg of used oil
// e2 -> electricity from gas and oil
// e3 -> co2 from electricity and heat 
// i1 -> co2 from manufacturing
// i2 -> co2 from residential and public service
// l1 -> agriculture
// l2 -> forest area
// t1 -> co2 emission from transport 
// t3 -> air passengers
// c1 -> countries codes - full, iso-2, alpha 3
file_g1 = "https://glanonim.com/Archive/visualization/data/g1.csv";
file_g2 = "https://glanonim.com/Archive/visualization/data/g2.csv";
file_g3 = "https://glanonim.com/Archive/visualization/data/g3.csv";
file_c1 = "https://glanonim.com/Archive/visualization/data/c1.csv";
// parse csv to memory
Papa.parse(file_g2, {
  download: true,
  header: true,
  escapeChar: ' ',
  delimiter: ",",
  complete: function (results) {
    //console.log("g2:", results.data);
    localStorage.setItem("g2", JSON.stringify(results.data));
  }
});
Papa.parse(file_g3, {
  download: true,
  header: true,
  complete: function (results) {
    localStorage.setItem("g3", JSON.stringify(results.data));
  }
});
Papa.parse(file_c1, {
  download: true,
  header: true,
  complete: function (results) {
    localStorage.setItem("c1", JSON.stringify(results.data));
    // continue once loaded  
    Papa.parse(file_g1, {
      download: true,
      header: true,
      complete: function (results) {
        localStorage.setItem("g1", JSON.stringify(results.data));
        // map
        // set first category co2 per country 
        localStorage.setItem("activeMap", JSON.stringify("country"));
        displayMap();
        var selCountries = [];
        localStorage.setItem("selCountries", JSON.stringify(selCountries));
      }
    });
  }
});
// end of csv loading  
//
// STACKED LINE CHART
// load a stacked line chart
$("ul.stackedStarter li").click(function () {
  // make this category active
  $("ul.stackedStarter li").removeClass("active");
  $(this).addClass("active");
  // get needed source of data
  var chSource = $(this).attr("data-chart");
  drawStacked(chSource);
});
// RADAR TAB SHOW
// after click on button group switch category with radar charts
$("div#cat-pills a").click(function () {
  // get needed source of data
  var aId = $(this).attr("id");
  var chSource;
  if (aId == "cat-transport-tab") { chSource = "t"; }
  if (aId == "cat-energy-tab") { chSource = "e"; }
  if (aId == "cat-land-tab") { chSource = "l"; }
  if (aId == "cat-industry-tab") { chSource = "i"; }
  drawRadar(chSource);
});
// after click on button group switch map
$("button.mapCat").click(function () {
  var id = $(this).attr('id');
  var map = "country";
  if (id == "mapCountry") { map = "country"; }
  if (id == "mapCitizen") { map = "citizen"; }
  if (id == "mapArea") { map = "area"; }
  localStorage.setItem("activeMap", JSON.stringify(map));
  var val = $(this).val();
  displayMap(val);
});
// after year change update all stuff
$("input#yearSelect").click(function () {
  var val = $(this).val();
  cleanCharts();
  displayMap(val);
});
// trigger data process
$("button.processData").click(function () {
  $("div#processingProgress").removeClass("d-none");
  var val = $("input#yearSelect").val();
  cleanCharts();
  processData(val);
  // hide modal
});
// COUNTRY
//
// select country
$("#countriesList").on("click", "li", function () {
  var cid = $(this).attr("data-country");
  // get array of countries from local storage
  selCountries = JSON.parse(localStorage.getItem("selCountries"));
  // check if country is already in array
  if (contains.call(selCountries, cid) == true) {
    $(this).removeClass("active");
    selCountries.splice(selCountries.indexOf(cid), 1);
  } else {
    $(this).addClass("active");
    selCountries.push(cid);
  }
  if (selCountries.length > 0) {
    $("button.processData").removeClass("disabled");
  } else {
    $("button.processData").addClass("disabled");
  }
  // save back to local storage
  localStorage.setItem("selCountries", JSON.stringify(selCountries));
  // do refresh trigger function for all graphs
  cleanCharts();
});
// click on button to reset list of countries
$("button#resetCountries").click(function () {
  $("div#processingProgress").removeClass("d-none");
  // get array of countries from local storage
  selCountries = JSON.parse(localStorage.getItem("selCountries"));
  selCountries = [];
  $("#countriesList li").removeClass("active");
  // save back to local storage
  localStorage.setItem("selCountries", JSON.stringify(selCountries));
  // do refresh trigger function for all graphs
  cleanCharts();
  processData();
});
// MAP
//
// general display map
function displayMap(givenYear) {
  // update button active
  $("button.mapCat").removeClass("active");
  let mapContext = JSON.parse(localStorage.getItem("activeMap"));
  var ColorColumn = 0;
  // country codes
  let c1 = JSON.parse(localStorage.getItem("c1"));
  if (mapContext == "country") {
    // co2 generation
    let g1 = JSON.parse(localStorage.getItem("g1"));
    // min and max year
    min = 1960;
    max = 2014;
    // update legend
    $("#legendTxt").html('milions tons of CO<sub>2</sub> emission');
    $("#updateUnit").html('mtons');
    // update text and range slider
    updateMinMaxYear(min, max);
    // if not other selected pick max year
    if (givenYear == "" || isNaN(givenYear)) {
      updateYear(max);
      // gather data for this year
      dataWork = yearArrayDivider(max, g1, c1);
      $("input#yearSelect").val(max);
    } else {
      updateYear(givenYear);
      // gather data for this year
      dataWork = yearArrayDivider(givenYear, g1, c1);
      $("input#yearSelect").val(givenYear);
    }
    ColorColumn = 1;
    // update button active 
    $("button#mapCountry").addClass("active");
  }
  if (mapContext == "citizen") {
    // co2 generation
    let g1 = JSON.parse(localStorage.getItem("g1"));
    // population
    let g3 = JSON.parse(localStorage.getItem("g3"));
    // min and max year 
    min = 1960;
    max = 2014;
    // update legend
    $("#legendTxt").html('tons of CO<sub>2</sub> per citizen');
    $("#updateUnit").html('tons/citizen');
    // update text and range slider
    updateMinMaxYear(min, max);
    // gather data for this year
    if (givenYear == "" || isNaN(givenYear)) {
      updateYear(max);
      // gather data for this year
      dataWork = yearArrayDivider(max, g1, c1, g3);
      $("input#yearSelect").val(max);
    } else {
      updateYear(givenYear);
      // gather data for this year
      dataWork = yearArrayDivider(givenYear, g1, c1, g3);
      $("input#yearSelect").val(givenYear);
    }
    ColorColumn = 0;
    // update button active 
    $("button#mapCitizen").addClass("active");
  }
  if (mapContext == "area") {
    // co2 generation
    let g1 = JSON.parse(localStorage.getItem("g1"));
    // area
    let g2 = JSON.parse(localStorage.getItem("g2"));
    // min and max year
    min = 1960;
    max = 2014;
    // update legend
    $("#legendTxt").html('kg of CO<sub>2</sub> per km<sup>2</sup>');
    $("#updateUnit").html('tons/km<sup>2</sup>');
    // update text and range slider
    updateMinMaxYear(min, max);
    // gather data for this year
    if (givenYear == "" || isNaN(givenYear)) {
      updateYear(max);
      // gather data for this year
      dataWork = yearArrayDivider(max, g1, c1, g2);
      $("input#yearSelect").val(max);
    } else {
      updateYear(givenYear);
      // gather data for this year
      dataWork = yearArrayDivider(givenYear, g1, c1, g2);
      $("input#yearSelect").val(givenYear);
    }
    // gather data for this year 
    ColorColumn = 2;
    // update button active 
    $("button#mapArea").addClass("active");
  }
  // end of per button stuff
  // color leged
  $(".roleLegend").each(function () {
    $(this).removeClass();
    var numb = $(this).attr("data-role");
    $(this).addClass("progress-bar roleLegend bg-" + mapContext + "-" + numb);
  });
  // sort array smallest to biggest
  data = dataWork.sort(function (a, b) {
    return b[2] - a[2] || a[0].localeCompare(b[0]);
  }
  );
  // colour map - check min and max, divide into 10 colours and generate a map
  // check min and max  
  var max = Math.max.apply(Math, data.map(function (o) { return o[2]; }));
  var min = Math.min.apply(Math, data.map(function (o) { return o[2]; }));
  max = parseFloat(max);
  min = parseFloat(min);
  // update legend
  $("#legendLeft small").text(min.toFixed(3));
  $("#legendRight small").text(max.toFixed(3));
  // divide countries into 10 categories
  var countryPerCat = Math.round(data.length / 10);
  // print countries into left sidebar 
  //<li class="list-group-item list-group-item-action">
  //              Germany
  //  <span class="badge badge-pill badge-dark bg-citizen-10">312</span>
  //</li>
  generatedList = "";
  var j = 10;
  var jCounter = 0;
  selCountries = JSON.parse(localStorage.getItem("selCountries"));
  for (var i = 0; i < data.length; i++) {
    var act = "";
    // loop to add class "active" if item still is in the array 
    if (selCountries != null) {
      for (var k = 0; k < selCountries.length; k++) {
        if (selCountries[k] == data[i][0]) { act = "active"; }
      }
    }
    // generate list of countries
    generatedList += '<li class="list-group-item list-group-item-action ' + act + '" data-country="' + data[i][0] + '">';
    generatedList += data[i][1];
    generatedList += '<span class="badge badge-pill badge-dark ml-1 bg-' + mapContext + '-' + j + '">' + data[i][2].toFixed(3) + '</span>';
    generatedList += '</li>';
    // update color in array to show it on the map
    data[i][3] = j;
    jCounter++;
    if (jCounter == countryPerCat && j > 1) {
      j--;
      jCounter = 0;
    }
  }
  // add countries with no number
  for (var i = 0; i < c1.length; i++) {
    var found = 0;
    for (var j = 0; j < data.length; j++) {
      if (data[j][0] == c1[i]["Alpha-2 code"]) {
        found++;
      }
    }
    if (found == 0) {
      // add to list of countries
      generatedList += '<li class="list-group-item list-group-item-action" data-country="' + c1[i]["Alpha-2 code"] + '">';
      generatedList += c1[i]["Country"];
      generatedList += '<span class="badge badge-pill badge-dark ml-1 bg-no-data text-dark">no data</span>';
      generatedList += '</li>';
      // push to array
      data.push([c1[i]["Alpha-2 code"], c1[i]["Country"], 0, 0])
    }
  }
  $("#countriesList").html(generatedList);
  // update map
  // map chart
  am4core.ready(function () {
    // Create map instance
    var chart = am4core.create("globeChart", am4maps.MapChart);
    // Set map definition
    chart.geodata = am4geodata_worldLow;
    // Set projection
    chart.projection = new am4maps.projections.Mercator();
    cl = "#eeeeee";
    for (var i = 0; i < 11; i++) {
      // Generate unqiue series name
      var replVar = i;
      var tableNo = replVar.toString();
      tableNo = "series" + tableNo;
      // Create map polygon series 
      tableNo = chart.series.push(new am4maps.MapPolygonSeries());
      for (var j = 0; j < data.length; j++) {
        if (data[j][3] == i) {
          tableNo.include += data[j][0];
          cl = bgColors[data[j][3]][ColorColumn];
          // Use real geometry
          tableNo.useGeodata = true;
          // Configure series
          tableNo.mapPolygons.template.tooltipText = "{name}";
          tableNo.mapPolygons.template.fill = am4core.color(cl);
          tableNo.fill = am4core.color(cl);
        }
      }
    }
    // zoom
    chart.zoomControl = new am4maps.ZoomControl();
    // map chart end   
  }); // end am4core.ready()
  //  end of chart
}
// make array of country and value for particular year
// format country code, country name, value in float
function yearArrayDivider(year, array, codes, divider) {
  var column = [];
  let mapContext = JSON.parse(localStorage.getItem("activeMap"));
  // for each row
  for (var i = 0; i < array.length; i++) {
    // calculate final value if existing
    y = parseFloat(array[i][year.toString()]);
    // if 2nd data set is defined means needs to divide with that
    var value = 0;
    if (mapContext != "country") {

      // in loop find country with that value 
      for (var j = 0; j < divider.length; j++) {
        if (mapContext == "area") {
          if (array[i]["Country Code"] == divider[j]["Country Code"]) {
            value = parseFloat(divider[j][year.toString()]);
          };
        }
        if (mapContext == "citizen") {
          if (array[i]["Country Name"] == divider[j][""]) {
            value = parseFloat(divider[j][year.toString()]);
          };
        }
        // no definition where country is not found
      }
    }
    // if value has been defined (found) then fix country code to use map - map uses only 2 digit name
    if (y != "" && !isNaN(y)) {
      // find 2 letter code based on 3 letter code for better map performance
      code = array[i]["Country Code"];
      for (var j = 0; j < codes.length; j++) {
        if (array[i]["Country Code"] == codes[j]["Alpha-3 code"]) {
          code = codes[j]["Alpha-2 code"];
        }
      }
      if (mapContext != "country") {
        if (value == 0) { value = 0.1 }
        divd = 1;
        if (mapContext == "area") { divd = 1000 }
        if (mapContext == "citizen") { divd = 1 }
        column.push([code, array[i]["Country Name"], parseFloat(y / value * divd)]);
      } else {
        column.push([code, array[i]["Country Name"], y]);
      }
    }
  }
  return (column);
}
// update min and max country in slider on main page 
function updateMinMaxYear(y1, y2) {
  $("input#yearSelect").attr("min", y1);
  $("input#yearSelect").attr("max", y2);
}
// update year in a text (automatically max) 
function updateYear(year) {
  $("label[for='yearSelect']").text("Year: " + year);
  $("h1#yearUpdate").text("Cross country comparisons in " + year);
}
var contains = function (needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  var findNaN = needle !== needle;
  var indexOf;
  if (!findNaN && typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (needle) {
      var i = -1, index = -1;
      for (i = 0; i < this.length; i++) {
        var item = this[i];
        if ((findNaN && item !== item) || item === needle) {
          index = i;
          break;
        }
      }
      return index;
    };
  }
  return indexOf.call(this, needle) > -1;
};
// CLEAN CHARTS
//
// executed after change of countries list or year 
function cleanCharts() {
  var placeholderStacked = '<div class="mt-5 pt-5 text-center placeholder" id="stackedPlaceholder"><i class="material-icons h1 mt-5 mb-3">playlist_add</i><p class="lead">Select countries and select from list on left to generate chart</p></div>';
  $("div#linediv").html(placeholderStacked);
  $("ul.stackedStarter li").removeClass("active");
  var placeholderRadar = '<div class="mt-5 pt-5 text-center placeholder radarPlaceholder"><i class="material-icons h1 mt-4 mb-3">playlist_add</i><p class="lead">Select countries and trigger processing to generate chart</p></div>';
  $("div.radar").html(placeholderRadar);
  //$('#cat-pills a:first-child').tab('show');
}
// PROCESS DATA
//
// set to to local memory arrays based on selected countries
function processData(givenYear) {
  localStorage.setItem("prog", JSON.stringify(0));
  // get countries list
  let selCountries = JSON.parse(localStorage.getItem("selCountries"));
  // execute only if any countries are added to array
  if (selCountries.length > 0) {
    // Parse local CSV file 
    // g1 -> co2 emission
    // g2.csv -> area of country
    // g3 -> population
    // e1 -> energy use in kg of used oil
    // e2 -> electricity from gas and oil
    // e3 -> co2 from electricity and heat 
    // i1 -> co2 from manufacturing
    // i2 -> co2 from residential and public service
    // l1 -> agriculture
    // l2 -> forest area
    // t1 -> co2 emission from transport 
    // t3 -> air passengers
    // c1 -> countries codes - full, iso-2, alpha 3 
    file_g1 = "https://glanonim.com/Archive/visualization/data/g1.csv";
    file_g2 = "https://glanonim.com/Archive/visualization/data/g2.csv";
    file_g3 = "https://glanonim.com/Archive/visualization/data/g3.csv";
    file_e1 = "https://glanonim.com/Archive/visualization/data/e1.csv";
    file_e2 = "https://glanonim.com/Archive/visualization/data/e2.csv";
    file_e3 = "https://glanonim.com/Archive/visualization/data/e3.csv";
    file_i1 = "https://glanonim.com/Archive/visualization/data/i1.csv";
    file_i2 = "https://glanonim.com/Archive/visualization/data/i2.csv";
    file_l1 = "https://glanonim.com/Archive/visualization/data/l1.csv";
    file_l2 = "https://glanonim.com/Archive/visualization/data/l2.csv";
    file_t1 = "https://glanonim.com/Archive/visualization/data/t1.csv";
    file_t3 = "https://glanonim.com/Archive/visualization/data/t3.csv";
    // Make array with countries 
    // get countries names and codes 
    let c1 = JSON.parse(localStorage.getItem("c1"));

    // check year 
    // if not other selected pick max year
    if (givenYear == "" || isNaN(givenYear)) {
      var givenYear = parseInt($("input#yearSelect").attr("max"));
      console.log("Radar charts are set to year: " + givenYear);
    };

    var countryTemp = [];
    // find values in tables t1 based on 3-letter code found in array c1
    for (var j = 0; j < c1.length; j++) {
      for (var i = 0; i < selCountries.length; i++) {
        if (selCountries[i].length == 2) {
          if (selCountries[i] === c1[j]["Alpha-2 code"]) {
            code = c1[j]["Alpha-3 code"];
            name = c1[j]["Country"];
            countryTemp.push({ "country": name, "code": code });
          }
        }
        if (selCountries[i].length == 3) {
          if (selCountries[i] === c1[j]["Alpha-3 code"]) {
            code = c1[j]["Alpha-3 code"];
            name = c1[j]["Country"];
            countryTemp.push({ "country": name, "code": code });
          }
        }
      }
    }

    // Parse local CSV file
    Papa.parse(file_e1, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "e1s", "e1", givenYear);
      }
    });
    Papa.parse(file_e2, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "e2s", "e2", givenYear);
      }
    });
    Papa.parse(file_e3, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "e3s", "e3", givenYear);
      }
    });
    Papa.parse(file_i1, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "i1s", "i1", givenYear);
      }
    });
    Papa.parse(file_i2, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "i2s", "i2", givenYear);
      }
    });
    Papa.parse(file_l1, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "l1s", "l1", givenYear);
      }
    });
    Papa.parse(file_l2, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "l2s", "l2", givenYear);
      }
    });
    Papa.parse(file_t1, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "t1s", "t1", givenYear);
      }
    });
    Papa.parse(file_t3, {
      download: true,
      header: true,
      complete: function (results) {
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog++;
        localStorage.setItem("prog", JSON.stringify(prog));
        generateFinalArray(countryTemp, results.data, "t2s", "t2", givenYear);
      }
    });
    Papa.parse(file_g1, {
      download: true,
      header: true,
      complete: function (results) {
        generateFinalArray(countryTemp, results.data, "g1s", "g1", givenYear);
        g2ST = JSON.parse(localStorage.getItem("g2"));
        generateFinalArray(countryTemp, g2ST, "g2STs", "g2ST", givenYear, results.data);
        g3ST = JSON.parse(localStorage.getItem("g3"));
        generateFinalArray(countryTemp, g3ST, "g3STs", "g3ST", givenYear, results.data);
        prog = parseInt(JSON.parse(localStorage.getItem("prog")));
        prog = prog + 3;
        localStorage.setItem("prog", JSON.stringify(prog));
      }
    });

  } else {
    // else clean charts
    cleanCharts();
    cleanStorage();
  }
}

function cleanStorage() {
  localStorage.removeItem('t1');
  localStorage.removeItem('t2');
  localStorage.removeItem('e1');
  localStorage.removeItem('e2');
  localStorage.removeItem('e3');
  localStorage.removeItem('i1');
  localStorage.removeItem('i2');
  localStorage.removeItem('l1');
  localStorage.removeItem('l2');
  localStorage.removeItem('t1s');
  localStorage.removeItem('t2s');
  localStorage.removeItem('e1s');
  localStorage.removeItem('e2s');
  localStorage.removeItem('e3s');
  localStorage.removeItem('i1s');
  localStorage.removeItem('i2s');
  localStorage.removeItem('l1s');
  localStorage.removeItem('l2s');
}

function drawRadar(type) {
  var dataA, dataB, dataC;
  var process = 0;
  if (type == "l") {
    // Add data 
    dataA = JSON.parse(localStorage.getItem("l1"));
    dataB = JSON.parse(localStorage.getItem("l2"));
    if (dataA === null) { process = 1 }
    if (dataB === null) { process = 1 }
    if (dataA !== null) { if (dataA.length < 1) { process = 1 } }
    if (dataB !== null) { if (dataB.length < 1) { process = 1 } }
  }
  if (type == "i") {
    // Add data 
    dataA = JSON.parse(localStorage.getItem("i1"));
    dataB = JSON.parse(localStorage.getItem("i2"));
    if (dataA === null) { process = 1 }
    if (dataB === null) { process = 1 }
    if (dataA !== null) { if (dataA.length < 1) { process = 1 } }
    if (dataB !== null) { if (dataB.length < 1) { process = 1 } }
  }
  if (type == "t") {
    // Add data 
    dataA = JSON.parse(localStorage.getItem("t1"));
    dataB = JSON.parse(localStorage.getItem("t2"));
    if (dataA === null) { process = 1 }
    if (dataB === null) { process = 1 }
    if (dataA !== null) { if (dataA.length < 1) { process = 1 } }
    if (dataB !== null) { if (dataB.length < 1) { process = 1 } }
  }
  if (type == "e") {
    // Add data 
    dataA = JSON.parse(localStorage.getItem("e1"));
    dataB = JSON.parse(localStorage.getItem("e2"));
    dataC = JSON.parse(localStorage.getItem("e3"));
    if (dataA === null) { process = 1 }
    if (dataB === null) { process = 1 }
    if (dataC === null) { process = 1 }
    if (dataA !== null) { if (dataA.length < 1) { process = 1 } }
    if (dataB !== null) { if (dataB.length < 1) { process = 1 } }
    if (dataC !== null) { if (dataC.length < 1) { process = 1 } }
  }
  // if variable are exisitng proceed if not cleanCharts
  if (process === 0) {
    am4core.ready(function () {
      // radar instance start
      var nameA, nameB, nameC;
      if (type == "l") {
        nameA = "radarlA";
        nameB = "radarlB";
      }
      if (type == "i") {
        nameA = "radariA";
        nameB = "radariB";
      }
      if (type == "t") {
        nameA = "radartA";
        nameB = "radartB";
      }
      if (type == "e") {
        nameA = "radareA";
        nameB = "radareB";
        nameC = "radareC";
      }
      // Create charts instance
      var chartA = am4core.create(nameA, am4charts.RadarChart);
      // Copy data
      chartA.data = dataA;
      // Create axes 
      var categoryAxisA = chartA.xAxes.push(new am4charts.CategoryAxis());
      categoryAxisA.dataFields.category = "country";
      var valueAxisA = chartA.yAxes.push(new am4charts.ValueAxis());
      valueAxisA.renderer.axisFills.template.fill = chartA.colors.getIndex(2);
      valueAxisA.renderer.axisFills.template.fillOpacity = 0.15;
      // Create and configure series  
      var seriesA = chartA.series.push(new am4charts.RadarSeries());
      seriesA.dataFields.valueY = "value";
      seriesA.dataFields.categoryX = "country";
      seriesA.strokeWidth = 3;
      //seriesA.columns.template.tooltipText = "{country}: {value}";  

      // Create charts instance
      var chartB = am4core.create(nameB, am4charts.RadarChart);
      // Copy data
      chartB.data = dataB;
      // Create axes 
      var categoryAxisB = chartB.xAxes.push(new am4charts.CategoryAxis());
      categoryAxisB.dataFields.category = "country";
      var valueAxisB = chartB.yAxes.push(new am4charts.ValueAxis());
      valueAxisB.renderer.axisFills.template.fill = chartB.colors.getIndex(2);
      valueAxisB.renderer.axisFills.template.fillOpacity = 0.15;
      // Create and configure series 
      var seriesB = chartB.series.push(new am4charts.RadarSeries());
      seriesB.dataFields.valueY = "value";
      seriesB.dataFields.categoryX = "country";
      seriesB.strokeWidth = 3;
      //seriesB.columns.template.tooltipText = "{country}: {value}";  

      if (type == "e") {
        // Create charts instance  
        var chartC = am4core.create(nameC, am4charts.RadarChart);
        // Copy data
        chartC.data = dataC;
        // Create axes 
        var categoryAxisC = chartC.xAxes.push(new am4charts.CategoryAxis());
        categoryAxisC.dataFields.category = "country";
        var valueAxisC = chartC.yAxes.push(new am4charts.ValueAxis());
        valueAxisC.renderer.axisFills.template.fill = chartC.colors.getIndex(2);
        valueAxisC.renderer.axisFills.template.fillOpacity = 0.15;
        // Create and configure series 
        var seriesC = chartC.series.push(new am4charts.RadarSeries());
        seriesC.dataFields.valueY = "value";
        seriesC.dataFields.categoryX = "country";
        seriesC.strokeWidth = 3;
        //seriesC.columns.template.tooltipText = "{country}: {value}";  


      }
    }); // end am4core.ready()

  } else {
    console.log("Error while generating radar charts");
    cleanCharts();
  }
}
function drawStacked(type) {
  $("div#linediv").html();
  var chartTitle, dataset, legendLeft;
  if (type == "g1") {
    dataset = "g1s";
    chartTitle = "CO2 emissions per country";
    legendLeft = "mton";
  }
  if (type == "g2") {
    dataset = "g2STs";
    chartTitle = "CO2 emissions per country square kilometer";
    legendLeft = "ton/km2";
  }
  if (type == "g3") {
    dataset = "g3STs";
    chartTitle = "CO2 emissions per citizen of a country";
    legendLeft = "ton/ppl";
  }
  if (type == "t1") {
    dataset = "t1s";
    chartTitle = "CO2 emissions from transport";
    legendLeft = "% of total fuel consumption";
  }
  if (type == "t2") {
    dataset = "t2s";
    chartTitle = "Air passengers per country";
    legendLeft = "ppl";
  }
  if (type == "i1") {
    dataset = "i1s";
    chartTitle = "CO2 from manufacturing and construction";
    legendLeft = "kg of oil equivalent per capita";
  }
  if (type == "i2") {
    dataset = "i2s";
    chartTitle = "CO2 from residential buildings services";
    legendLeft = "% of total";
  }
  if (type == "l1") {
    dataset = "l1s";
    chartTitle = "Agricultural methane emissions";
    legendLeft = "mton of CO2 equivalent";
  }
  if (type == "l2") {
    dataset = "l2s";
    chartTitle = "Forest area";
    legendLeft = "% of land area";
  }
  if (type == "e1") {
    dataset = "e1s";
    chartTitle = "Energy use";
    legendLeft = "kg of oil equivalent per capita";
  }
  if (type == "e2") {
    dataset = "e2s";
    chartTitle = "Electricity production from oil, gas and coal";
    legendLeft = "% of total";
  }
  if (type == "e3") {
    dataset = "e3s";
    chartTitle = "CO2 from electricity and heat production";
    legendLeft = "% of total fuel combustion";
  }
  t1s = JSON.parse(localStorage.getItem(dataset));

  // need to transpose the matrix and change headers
  // headers: country, year per one row   
  // full new array
  var fArray = new Array();
  //({"Year":"2019", "Country1":value1, "Country2":value2 ...}) 
  // 1 row in new array
  //var TempStackedRow = [];
  // for each year -> colNames.length-1 (as last column is country name)
  for (var i = 0; i < t1s[0].length - 1; i++) {
    var fullArray = new Object();
    fullArray.year = t1s[0][i];
    // for each country in array
    for (var j = 1; j < t1s.length; j++) {
      var name = t1s[j][t1s[j].length - 1];
      var value = t1s[j][i];
      // put to column with header a value   
      fullArray[name] = value;
    }
    fArray[i] = fullArray;
    // end of stacked thingy  
  }
  // line chart
  am4core.ready(function () {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Create chart instance
    var chart = am4core.create("linediv", am4charts.XYChart);
    chart.data = fArray;
    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.title.text = "Year";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 50;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = legendLeft;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text;
    });
    // 
    // Create series
    for (var j = 1; j < t1s.length; j++) {
      window['series' + j] = chart.series.push(new am4charts.LineSeries());
      window['series' + j].dataFields.valueY = t1s[j][t1s[j].length - 1];
      window['series' + j].dataFields.categoryX = "year";
      window['series' + j].name = t1s[j][t1s[j].length - 1];
      window['series' + j].fillOpacity = 0.5;
      window['series' + j].stacked = true;
      // static
      window['series' + j].legendSettings.labelText = "Total of " + t1s[j][t1s[j].length - 1] + ":";
      window['series' + j].legendSettings.valueText = "{valueY.close}";
      // hovering
      window['series' + j].legendSettings.itemLabelText = "Generated by " + t1s[j][t1s[j].length - 1] + ":";
      window['series' + j].legendSettings.itemValueText = "{valueY}";
    }

    // Add title
    var title = chart.titles.create();
    title.text = chartTitle;
    title.fontSize = 25;
    title.marginBottom = 30;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    // add legend
    chart.legend = new am4charts.Legend();
    // allow to narrow show 
    chart.scrollbarX = new am4core.Scrollbar();
  });
}
function generateFinalArray(countryTemp, baseArray, nameStacked, name, givenYear, dividerSet) {
  // copy for radar 
  var colNames = Object.keys(baseArray[1]);
  // remove countries names and so on
  colNames.splice(colNames.length - 5, 5);
  colNames.push("country");
  var countryTempStacked = [];
  countryTempStacked.push(colNames);
  // copy for stacked  
  for (var j = 0; j < countryTemp.length; j++) {
    // define array per country row
    var v = 0;
    for (var k = 0; k < baseArray.length; k++) {
      if (countryTemp[j]["code"] === baseArray[k]["Country Code"] || countryTemp[j]["country"] === baseArray[k]["Country Name"]) {
        // radar value copy
        v = baseArray[k][givenYear];
        // stacked value copy for all years = colNames.length - 1 (minus due to country name inside)
        var countryTempStackedRow = [];
        for (var l = 0; l < colNames.length - 1; l++) {
          // put to column with header a value  
          var tempVal = baseArray[k][colNames[l]];
          if (tempVal == "" || isNaN(tempVal)) { tempVal = parseFloat(0); } else { tempVal = parseFloat(tempVal) }
          // if value is co2 per citizen or area -> need to find for those countries co2 value to divide through
          if (name == "g2ST" || name == "g3ST") {
            for (var m = 1; m < dividerSet.length; m++) {  
              if (dividerSet[m]["Country Name"] == countryTemp[j]["country"]) {
                var baseCO = dividerSet[m][colNames[l]];
                if (baseCO == "" || isNaN(baseCO) || tempVal==0){tempVal = 0;}else{
                  tempVal = baseCO / tempVal * 1000; 
                  if(name == "g2ST"){tempVal = tempVal*1000000;}
                }
                  }
            } 
          }
          countryTempStackedRow.push(tempVal.toFixed(3));
        }
        // stacked thingy
        countryTempStackedRow.push(countryTemp[j]["country"]);
        countryTempStacked.push(countryTempStackedRow);
        // end of stacked thingy
      };
    }
    // radar thingy
    countryTemp[j]["value"] = parseFloat(v).toFixed(3);
  }
  // have to save to memory as cannot normally pass this array
  localStorage.setItem(name, JSON.stringify(countryTemp));
  // have to save to memory as cannot normally pass this array
  localStorage.setItem(nameStacked, JSON.stringify(countryTempStacked));

  let prog = JSON.parse(localStorage.getItem("prog"));
  if (isNaN(prog)) { prog = 99; }
  if (prog == 0 && !isNaN(prog)) { prog = 1; }
  var progBar = Math.round(100 - (99 / prog));
  $("#valueProgress").text(progBar + "%");
  console.log(progBar + "%");
  if (parseInt(prog) > 10) {
    $("div#processingProgress").addClass("d-none");
    localStorage.removeItem('prog');
    $("#valueProgress").text("0%");
  }
}
