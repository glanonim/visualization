 
    //
    //
    // OTHER INTERACTIONS
    //


 $(function () {  
    // toggle show side panel button 
    $("#showSidePanel").toggle();
    // fix css due to jQuery loading later
    $("#showSidePanel").css("display", "none");

    // date update
    $("#yearSelect").change(function () {
      year = $(this).val();
      $("label[for='yearSelect']").text("Year: " + year);
      $("h1#yearUpdate").text("Cross country comparisons in " + year);
    });
    // show and hide side panel to select country
    $("#hideSidePanel").click(function () {
      $("#countriesSelect").toggle();
      $("#hideSidePanel").toggle();
      $("#showSidePanel").toggle();
    });
    $("#showSidePanel").click(function () {
      $("#countriesSelect").toggle();
      $("#hideSidePanel").toggle();
      $("#showSidePanel").toggle();
    }); 

    // change map category
    // display per citizen, color: primary
    $("button#mapCitizen").click(function () {
      $("button.mapCat").removeClass("active");
      $("button#mapCitizen").addClass("active");
      // change legend and sidebar display
    });
    // display per are, color: info
    $("button#mapArea").click(function () {
      $("button.mapCat").removeClass("active");
      $("button#mapArea").addClass("active");
      // change legend and sidebar display
    });
    // display per country, color: indigo
    $("button#mapCountry").click(function () {
      $("button.mapCat").removeClass("active");
      $("button#mapCountry").addClass("active");
      // change legend and sidebar display
    });
  });

   
 
 

  