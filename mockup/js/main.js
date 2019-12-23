 
    //
    //
    // OTHER INTERACTIONS
    //


 $(function () {
    // first time date load
    year = $("#yearSelect").val();
    $("label[for='yearSelect']").text("Year: " + year);
    $("h1#yearUpdate").text("Details for " + year);
    // mark first category as active
    $("button#mapCitizen").addClass("active");
    // toggle show side panel button 
    $("#showSidePanel").toggle();
    // fix css due to jQuery loading later
    $("#showSidePanel").css("display", "none");

    // date update
    $("#yearSelect").change(function () {
      year = $(this).val();
      $("label[for='yearSelect']").text("Year: " + year);
      $("h1#yearUpdate").text("Details for " + year);
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

  
    //
    //
    // STUFF FOR MAP CHART
    //

  // map chart
  am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Define country data
    var countries = {
      "AD": {
        "country": "Andorra",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["andorraLow", "andorraHigh"]
      },
      "AE": {
        "country": "United Arab Emirates",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["uaeLow", "uaeHigh"]
      },
      "AF": {
        "country": "Afghanistan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "AG": {
        "country": "Antigua and Barbuda",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["antiguaBarbudaLow", "antiguaBarbudaHigh"]
      },
      "AI": {
        "country": "Anguilla",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["anguillaLow", "anguillaHigh"]
      },
      "AL": {
        "country": "Albania",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["albaniaLow", "albaniaHigh"]
      },
      "AM": {
        "country": "Armenia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["armeniaLow", "armeniaHigh"]
      },
      "AO": {
        "country": "Angola",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["angolaLow", "angolaHigh"]
      },
      "AQ": {
        "country": "Antarctica",
        "continent_code": "AN",
        "continent": "Antarctica",
        "maps": []
      },
      "AR": {
        "country": "Argentina",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["argentinaLow", "argentinaHigh"]
      },
      "AS": {
        "country": "American Samoa",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": ["americanSamoaLow", "americanSamoaHigh"]
      },
      "AT": {
        "country": "Austria",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["austriaLow", "austriaHigh"]
      },
      "AU": {
        "country": "Australia",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": ["australiaLow", "australiaHigh"]
      },
      "AW": {
        "country": "Aruba",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["arubaLow", "arubaHigh"]
      },
      "AX": {
        "country": "Aland Islands",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "AZ": {
        "country": "Azerbaijan",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["azerbaijanLow", "azerbaijanHigh"]
      },
      "BA": {
        "country": "Bosnia and Herzegovina",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["bosniaHerzegovinaLow", "bosniaHerzegovinaHigh", "bosniaHerzegovinaCantonsLow", "bosniaHerzegovinaCantonsHigh"]
      },
      "BB": {
        "country": "Barbados",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["barbadosLow", "barbadosHigh"]
      },
      "BD": {
        "country": "Bangladesh",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["bangladeshLow", "bangladeshHigh"]
      },
      "BE": {
        "country": "Belgium",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["belgiumLow", "belgiumHigh"]
      },
      "BF": {
        "country": "Burkina Faso",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["burkinaFasoLow", "burkinaFasoHigh"]
      },
      "BG": {
        "country": "Bulgaria",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["bulgariaLow", "bulgariaHigh"]
      },
      "BH": {
        "country": "Bahrain",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["bahrainLow", "bahrainHigh"]
      },
      "BI": {
        "country": "Burundi",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["burundiLow", "burundiHigh"]
      },
      "BJ": {
        "country": "Benin",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["beninLow", "beninHigh"]
      },
      "BL": {
        "country": "Saint Barthelemy",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "BM": {
        "country": "Bermuda",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["bermudaLow", "bermudaHigh"]
      },
      "BN": {
        "country": "Brunei Darussalam",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["bruneiDarussalamLow", "bruneiDarussalamHigh"]
      },
      "BO": {
        "country": "Bolivia, Plurinational State of",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["boliviaLow", "boliviaHigh"]
      },
      "BQ": {
        "country": "Bonaire, Sint Eustatius and Saba",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["bonaireSintEustatiusSabaLow", "bonaireSintEustatiusSabaHigh"]
      },
      "BR": {
        "country": "Brazil",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["brazilLow", "brazilHigh"]
      },
      "BS": {
        "country": "Bahamas",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "BT": {
        "country": "Bhutan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["bhutanLow", "bhutanHigh"]
      },
      "BV": {
        "country": "Bouvet Island",
        "continent_code": "AN",
        "continent": "Antarctica",
        "maps": []
      },
      "BW": {
        "country": "Botswana",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["botswanaLow", "botswanaHigh"]
      },
      "BY": {
        "country": "Belarus",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["belarusLow", "belarusHigh"]
      },
      "BZ": {
        "country": "Belize",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["belizeLow", "belizeHigh"]
      },
      "CA": {
        "country": "Canada",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["canadaLow", "canadaHigh"]
      },
      "CC": {
        "country": "Cocos (Keeling) Islands",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "CD": {
        "country": "Congo, the Democratic Republic of the",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["congoDRLow", "congoDRHigh"]
      },
      "CF": {
        "country": "Central African Republic",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["centralAfricanRepublicLow", "centralAfricanRepublicHigh"]
      },
      "CG": {
        "country": "Congo",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["congoLow", "congoHigh"]
      },
      "CH": {
        "country": "Switzerland",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["switzerlandLow", "switzerlandHigh"]
      },
      "CI": {
        "country": "Cote d'Ivoire",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "CK": {
        "country": "Cook Islands",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "CL": {
        "country": "Chile",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["chileLow", "chileHigh"]
      },
      "CM": {
        "country": "Cameroon",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["cameroonLow", "cameroonHigh"]
      },
      "CN": {
        "country": "China",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["chinaLow", "chinaHigh"]
      },
      "CO": {
        "country": "Colombia",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["colombiaLow", "colombiaHigh", "colombiaMuniLow", "colombiaMuniHigh"]
      },
      "CR": {
        "country": "Costa Rica",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["costaRicaLow", "costaRicaHigh"]
      },
      "CU": {
        "country": "Cuba",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "CV": {
        "country": "Cape Verde",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["capeVerdeLow", "capeVerdeHigh"]
      },
      "CW": {
        "country": "Curacao",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["curacaoLow", "curacaoHigh"]
      },
      "CX": {
        "country": "Christmas Island",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "CY": {
        "country": "Cyprus",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["cyprusLow", "cyprusHigh", "cyprusNorthCyprusLow", "cyprusNorthCyprusHigh"]
      },
      "CZ": {
        "country": "Czech Republic",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["czechiaLow", "czechiaHigh"]
      },
      "DE": {
        "country": "Germany",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["germanyLow", "germanyHigh"]
      },
      "DJ": {
        "country": "Djibouti",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["djiboutiLow", "djiboutiHigh"]
      },
      "DK": {
        "country": "Denmark",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["denmarkLow", "denmarkHigh"]
      },
      "DM": {
        "country": "Dominica",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["dominicaLow", "dominicaHigh"]
      },
      "DO": {
        "country": "Dominican Republic",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["dominicanRepublicLow", "dominicanRepublicHigh", "dominicanRepublicMuniLow", "dominicanRepublicMuniHigh"]
      },
      "DZ": {
        "country": "Algeria",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["algeriaLow", "algeriaHigh"]
      },
      "EC": {
        "country": "Ecuador",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["ecuadorLow", "ecuadorHigh"]
      },
      "EE": {
        "country": "Estonia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["estoniaLow", "estoniaHigh"]
      },
      "EG": {
        "country": "Egypt",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["egyptLow", "egyptHigh"]
      },
      "EH": {
        "country": "Western Sahara",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "ER": {
        "country": "Eritrea",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "ES": {
        "country": "Spain",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["spainLow", "spainHigh", "spainProvincesLow", "spainProvincesHigh"]
      },
      "ET": {
        "country": "Ethiopia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "FI": {
        "country": "Finland",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["finlandLow", "finlandHigh"]
      },
      "FJ": {
        "country": "Fiji",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": ["fijiEastLow", "fijiEastHigh", "fijiWestLow", "fijiWestHigh"]
      },
      "FK": {
        "country": "Falkland Islands (Malvinas)",
        "continent_code": "SA",
        "continent": "South America",
        "maps": []
      },
      "FM": {
        "country": "Micronesia, Federated States of",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "FO": {
        "country": "Faroe Islands",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["faroeIslandsLow", "faroeIslandsHigh"]
      },
      "FR": {
        "country": "France",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["franceLow", "franceHigh", "franceDepartmentsLow", "franceDepartmentsHigh"]
      },
      "GA": {
        "country": "Gabon",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["gabonLow", "gabonHigh"]
      },
      "GB": {
        "country": "United Kingdom",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["ukLow", "ukHigh", "ukCountiesLow", "ukCountiesHigh"]
      },
      "GB-CHA": {
        "country": "Channel Islands",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["channelIslandsLow", "channelIslandsHigh"]
      },
      "GD": {
        "country": "Grenada",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "GE": {
        "country": "Georgia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["georgiaLow", "georgiaHigh", "georgiaSouthOssetiaLow", "georgiaSouthOssetiaHigh"]
      },
      "GF": {
        "country": "French Guiana",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["frenchGuianaLow", "frenchGuianaHigh"]
      },
      "GG": {
        "country": "Guernsey",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "GH": {
        "country": "Ghana",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "GI": {
        "country": "Gibraltar",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "GL": {
        "country": "Greenland",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["greenlandLow", "greenlandHigh"]
      },
      "GM": {
        "country": "Gambia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "GN": {
        "country": "Guinea",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["guineaLow", "guineaHigh"]
      },
      "GP": {
        "country": "Guadeloupe",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "GQ": {
        "country": "Equatorial Guinea",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["equatorialGuineaLow", "equatorialGuineaHigh"]
      },
      "GR": {
        "country": "Greece",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["greeceLow", "greeceHigh"]
      },
      "GS": {
        "country": "South Georgia and the South Sandwich Islands",
        "continent_code": "AN",
        "continent": "Antarctica",
        "maps": []
      },
      "GT": {
        "country": "Guatemala",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "GU": {
        "country": "Guam",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "GW": {
        "country": "Guinea-Bissau",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "GY": {
        "country": "Guyana",
        "continent_code": "SA",
        "continent": "South America",
        "maps": []
      },
      "HK": {
        "country": "Hong Kong",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["hongKongLow", "hongKongHigh"]
      },
      "HM": {
        "country": "Heard Island and McDonald Islands",
        "continent_code": "AN",
        "continent": "Antarctica",
        "maps": []
      },
      "HN": {
        "country": "Honduras",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["hondurasLow", "hondurasHigh"]
      },
      "HR": {
        "country": "Croatia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["croatiaLow", "croatiaHigh"]
      },
      "HT": {
        "country": "Haiti",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "HU": {
        "country": "Hungary",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["hungaryLow", "hungaryHigh"]
      },
      "ID": {
        "country": "Indonesia",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["indonesiaLow", "indonesiaHigh"]
      },
      "IE": {
        "country": "Ireland",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["irelandLow", "irelandHigh"]
      },
      "IL": {
        "country": "Israel",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["israelLow", "israelHigh", "israelPalestineLow", "israelPalestineHigh"]
      },
      "IM": {
        "country": "Isle of Man",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "IN": {
        "country": "India",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["indiaLow", "indiaHigh"]
      },
      "IO": {
        "country": "British Indian Ocean Territory",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "IQ": {
        "country": "Iraq",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "IR": {
        "country": "Iran, Islamic Republic of",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "IS": {
        "country": "Iceland",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["icelandLow", "icelandHigh"]
      },
      "IT": {
        "country": "Italy",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["italyLow", "italyHigh"]
      },
      "JE": {
        "country": "Jersey",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "JM": {
        "country": "Jamaica",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "JO": {
        "country": "Jordan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "JP": {
        "country": "Japan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["japanLow", "japanHigh"]
      },
      "KE": {
        "country": "Kenya",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["kenyaLow", "kenyaHigh"]
      },
      "KG": {
        "country": "Kyrgyzstan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["kyrgyzstanLow", "kyrgyzstanHigh"]
      },
      "KH": {
        "country": "Cambodia",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["cambodiaLow", "cambodiaHigh"]
      },
      "KI": {
        "country": "Kiribati",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "KM": {
        "country": "Comoros",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "KN": {
        "country": "Saint Kitts and Nevis",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "KP": {
        "country": "Korea, Democratic People's Republic of",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["northKoreaLow", "northKoreaHigh"]
      },
      "KR": {
        "country": "Korea, Republic of",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["southKoreaLow", "southKoreaHigh"]
      },
      "KT": {
        "country": "Saint Kitts and Nevis",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["stKittsNevisLow", "stKittsNevisHigh"]
      },
      "KW": {
        "country": "Kuwait",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "KY": {
        "country": "Cayman Islands",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "KZ": {
        "country": "Kazakhstan",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["kazakhstanLow", "kazakhstanHigh"]
      },
      "LA": {
        "country": "Lao People's Democratic Republic",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "LB": {
        "country": "Lebanon",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "LC": {
        "country": "Saint Lucia",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["saintLuciaLow", "saintLuciaHigh"]
      },
      "LI": {
        "country": "Liechtenstein",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["liechtensteinLow", "liechtensteinHigh"]
      },
      "LK": {
        "country": "Sri Lanka",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["sriLankaLow", "sriLankaHigh"]
      },
      "LR": {
        "country": "Liberia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "LS": {
        "country": "Lesotho",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "LT": {
        "country": "Lithuania",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["lithuaniaLow", "lithuaniaHigh"]
      },
      "LU": {
        "country": "Luxembourg",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "LV": {
        "country": "Latvia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["latviaLow", "latviaHigh"]
      },
      "LY": {
        "country": "Libya",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "MA": {
        "country": "Morocco",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["moroccoLow", "moroccoHigh"]
      },
      "MC": {
        "country": "Monaco",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "MD": {
        "country": "Moldova, Republic of",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["moldovaLow", "moldovaHigh"]
      },
      "ME": {
        "country": "Montenegro",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "MF": {
        "country": "Saint Martin (French Part)",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "MG": {
        "country": "Madagascar",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "MH": {
        "country": "Marshall Islands",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "MK": {
        "country": "North Macedonia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": []
      },
      "ML": {
        "country": "Mali",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["maliLow", "maliHigh"]
      },
      "MM": {
        "country": "Myanmar",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "MN": {
        "country": "Mongolia",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["mongoliaLow", "mongoliaHigh"]
      },
      "MO": {
        "country": "Macao",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "MP": {
        "country": "Northern Mariana Islands",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "MQ": {
        "country": "Martinique",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "MR": {
        "country": "Mauritania",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "MS": {
        "country": "Montserrat",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "MT": {
        "country": "Malta",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["maltaLow", "maltaHigh"]
      },
      "MU": {
        "country": "Mauritius",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "MV": {
        "country": "Maldives",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["maldivesLow", "maldivesHigh", "maldivesIslandsLow", "maldivesIslandsHigh"]
      },
      "MW": {
        "country": "Malawi",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "MX": {
        "country": "Mexico",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["mexicoLow", "mexicoHigh"]
      },
      "MY": {
        "country": "Malaysia",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["malaysiaLow", "malaysiaHigh"]
      },
      "MZ": {
        "country": "Mozambique",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "NA": {
        "country": "Namibia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["namibiaLow", "namibiaHigh"]
      },
      "NC": {
        "country": "New Caledonia",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "NE": {
        "country": "Niger",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "NF": {
        "country": "Norfolk Island",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "NG": {
        "country": "Nigeria",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["nigeriaLow", "nigeriaHigh"]
      },
      "NI": {
        "country": "Nicaragua",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["nicaraguaLow", "nicaraguaHigh"]
      },
      "NL": {
        "country": "Netherlands",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["netherlandsLow", "netherlandsHigh"]
      },
      "NO": {
        "country": "Norway",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["norwayLow", "norwayHigh"]
      },
      "NP": {
        "country": "Nepal",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["nepalLow", "nepalHigh"]
      },
      "NR": {
        "country": "Nauru",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "NU": {
        "country": "Niue",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "NZ": {
        "country": "New Zealand",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": ["newZealandLow", "newZealandHigh"]
      },
      "OM": {
        "country": "Oman",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["omanLow", "omanHigh"]
      },
      "PA": {
        "country": "Panama",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["panamaLow", "panamaHigh"]
      },
      "PE": {
        "country": "Peru",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["peruLow", "peruHigh"]
      },
      "PF": {
        "country": "French Polynesia",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "PG": {
        "country": "Papua New Guinea",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "PH": {
        "country": "Philippines",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["philippinesLow", "philippinesHigh"]
      },
      "PK": {
        "country": "Pakistan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["pakistanLow", "pakistanHigh"]
      },
      "PL": {
        "country": "Poland",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["polandLow", "polandHigh"]
      },
      "PM": {
        "country": "Saint Pierre and Miquelon",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["stPierreMiquelonLow", "stPierreMiquelonHigh"]
      },
      "PN": {
        "country": "Pitcairn",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "PR": {
        "country": "Puerto Rico",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["puertoRicoLow", "puertoRicoHigh"]
      },
      "PS": {
        "country": "Palestinian, State of",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["palestineLow", "palestineHigh"]
      },
      "PT": {
        "country": "Portugal",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["portugalLow", "portugalHigh", "portugalRegionsLow", "portugalRegionsHigh"]
      },
      "PW": {
        "country": "Palau",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "PY": {
        "country": "Paraguay",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["paraguayLow", "paraguayHigh"]
      },
      "QA": {
        "country": "Qatar",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["qatarLow", "qatarHigh"]
      },
      "RE": {
        "country": "Reunion",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "RO": {
        "country": "Romania",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["romaniaLow", "romaniaHigh"]
      },
      "RS": {
        "country": "Serbia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["serbiaLow", "serbiaHigh", "serbiaNoKosovoLow", "serbiaNoKosovoHigh"]
      },
      "RU": {
        "country": "Russian Federation",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["russiaLow", "russiaHigh", "russiaCrimeaLow", "russiaCrimeaHigh"]
      },
      "RW": {
        "country": "Rwanda",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "SA": {
        "country": "Saudi Arabia",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["saudiArabiaLow", "saudiArabiaHigh"]
      },
      "SB": {
        "country": "Solomon Islands",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": ["solomonIslandsLow", "solomonIslandsHigh"]
      },
      "SC": {
        "country": "Seychelles",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["seychellesLow", "seychellesHigh"]
      },
      "SD": {
        "country": "Sudan",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["sudanLow", "sudanHigh"]
      },
      "SE": {
        "country": "Sweden",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["swedenLow", "swedenHigh"]
      },
      "SG": {
        "country": "Singapore",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["singaporeLow", "singaporeHigh"]
      },
      "SH": {
        "country": "Saint Helena, Ascension and Tristan da Cunha",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["saintHelenaLow", "saintHelenaHigh"]
      },
      "SI": {
        "country": "Slovenia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["sloveniaLow", "sloveniaHigh", "sloveniaRegionsLow", "sloveniaRegionsHigh"]
      },
      "SJ": {
        "country": "Svalbard and Jan Mayen",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["svalbardLow", "svalbardHigh"]
      },
      "SK": {
        "country": "Slovakia",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["slovakiaLow", "slovakiaHigh"]
      },
      "SL": {
        "country": "Sierra Leone",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "SM": {
        "country": "San Marino",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["sanMarinoLow", "sanMarinoHigh"]
      },
      "SN": {
        "country": "Senegal",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["senegalLow", "senegalHigh"]
      },
      "SO": {
        "country": "Somalia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["somaliaLow", "somaliaHigh"]
      },
      "SR": {
        "country": "Suriname",
        "continent_code": "SA",
        "continent": "South America",
        "maps": []
      },
      "SS": {
        "country": "South Sudan",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "ST": {
        "country": "Sao Tome and Principe",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["saoTomePrincipeLow", "saoTomePrincipeHigh"]
      },
      "SV": {
        "country": "El Salvador",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["elSalvadorLow", "elSalvadorHigh"]
      },
      "SX": {
        "country": "Sint Maarten (Dutch Part)",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "SY": {
        "country": "Syrian Arab Republic",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["syriaLow", "syriaHigh"]
      },
      "SZ": {
        "country": "Swaziland",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["eswatiniLow", "eswatiniHigh"]
      },
      "TC": {
        "country": "Turks and Caicos Islands",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "TD": {
        "country": "Chad",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["chadLow", "chadHigh"]
      },
      "TF": {
        "country": "French Southern Territories",
        "continent_code": "AN",
        "continent": "Antarctica",
        "maps": []
      },
      "TG": {
        "country": "Togo",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "TH": {
        "country": "Thailand",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["thailandLow", "thailandHigh"]
      },
      "TJ": {
        "country": "Tajikistan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["tajikistanLow", "tajikistanHigh"]
      },
      "TK": {
        "country": "Tokelau",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "TL": {
        "country": "Timor-Leste",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "TM": {
        "country": "Turkmenistan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "TN": {
        "country": "Tunisia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["tunisiaLow", "tunisiaHigh"]
      },
      "TO": {
        "country": "Tonga",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "TR": {
        "country": "Turkey",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["turkeyLow", "turkeyHigh"]
      },
      "TT": {
        "country": "Trinidad and Tobago",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "TV": {
        "country": "Tuvalu",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "TW": {
        "country": "Taiwan, Province of China",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": []
      },
      "TZ": {
        "country": "Tanzania, United Republic of",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["tanzaniaLow", "tanzaniaHigh"]
      },
      "UA": {
        "country": "Ukraine",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["ukraineLow", "ukraineHigh"]
      },
      "UG": {
        "country": "Uganda",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "UM": {
        "country": "United States Minor Outlying Islands",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "US": {
        "country": "United States",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["usaLow", "usaHigh", "usaTerritoriesLow", "usaTerritoriesHigh", "usaTerritories2Low", "usaTerritories2High"]
      },
      "UY": {
        "country": "Uruguay",
        "continent_code": "SA",
        "continent": "South America",
        "maps": []
      },
      "UZ": {
        "country": "Uzbekistan",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["uzbekinstanLow", "uzbekinstanHigh"]
      },
      "VA": {
        "country": "Holy See (Vatican City State)",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["vaticanLow", "vaticanHigh"]
      },
      "VC": {
        "country": "Saint Vincent and the Grenadines",
        "continent_code": "NA",
        "continent": "North America",
        "maps": ["saintVincentLow", "saintVincentHigh"]
      },
      "VE": {
        "country": "Venezuela, Bolivarian Republic of",
        "continent_code": "SA",
        "continent": "South America",
        "maps": ["venezuelaLow", "venezuelaHigh"]
      },
      "VG": {
        "country": "Virgin Islands, British",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "VI": {
        "country": "Virgin Islands, U.S.",
        "continent_code": "NA",
        "continent": "North America",
        "maps": []
      },
      "VN": {
        "country": "Viet Nam",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["vietnamLow", "vietnamHigh"]
      },
      "VU": {
        "country": "Vanuatu",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "WF": {
        "country": "Wallis and Futuna",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": []
      },
      "WS": {
        "country": "Samoa",
        "continent_code": "OC",
        "continent": "Oceania",
        "maps": ["samoaLow", "samoaHigh"]
      },
      "YE": {
        "country": "Yemen",
        "continent_code": "AS",
        "continent": "Asia",
        "maps": ["yemenLow", "yemenHigh"]
      },
      "YT": {
        "country": "Mayotte",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": []
      },
      "ZA": {
        "country": "South Africa",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["southAfricaLow", "southAfricaHigh"]
      },
      "ZM": {
        "country": "Zambia",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["zambiaLow", "zambiaHigh"]
      },
      "ZW": {
        "country": "Zimbabwe",
        "continent_code": "AF",
        "continent": "Africa",
        "maps": ["zimbabweLow", "zimbabweHigh"]
      },
      "XK": {
        "country": "Kosovo",
        "continent_code": "EU",
        "continent": "Europe",
        "maps": ["kosovoLow", "kosovoHigh"]
      }
    };


    var continents = {
      "AF": 0,
      "AN": 1,
      "AS": 2,
      "EU": 3,
      "NA": 4,
      "OC": 5,
      "SA": 6
    }
 

    //
    //
    // STUFF FOR MAP CHART
    //

    // Create map instance
    var chartMap = am4core.create("globeChart", am4maps.MapChart);
    chartMap.projection = new am4maps.projections.Miller();

    // Create map polygon series for world map
    var worldSeries = chartMap.series.push(new am4maps.MapPolygonSeries());
    worldSeries.useGeodata = true;
    worldSeries.geodata = am4geodata_worldLow;
    worldSeries.exclude = ["AQ"];

    var worldPolygon = worldSeries.mapPolygons.template;
    worldPolygon.tooltipText = "{name}";
    worldPolygon.nonScalingStroke = true;
    worldPolygon.strokeOpacity = 0.5;
    worldPolygon.fill = am4core.color("#eee");
    worldPolygon.propertyFields.fill = "color";

    var hs = worldPolygon.states.create("hover");
    hs.properties.fill = chartMap.colors.getIndex(1);


    // Create country specific series (but hide it for now)
    var countrySeries = chartMap.series.push(new am4maps.MapPolygonSeries());
    countrySeries.useGeodata = true;
    countrySeries.hide();
    countrySeries.geodataSource.events.on("done", function (ev) {
      worldSeries.hide();
      countrySeries.show();
    });

    var countryPolygon = countrySeries.mapPolygons.template;
    countryPolygon.tooltipText = "{name}";
    countryPolygon.nonScalingStroke = true;
    countryPolygon.strokeOpacity = 0.5;
    countryPolygon.fill = am4core.color("#eee");

    var hs = countryPolygon.states.create("hover");
    hs.properties.fill = chartMap.colors.getIndex(1);

    // Set up click events
    worldPolygon.events.on("hit", function (ev) {
      ev.target.series.chart.zoomToMapObject(ev.target);
      var map = ev.target.dataItem.dataContext.map;
      if (map) {
        ev.target.isHover = false;
        countrySeries.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
        countrySeries.geodataSource.load();
      }
    });

    // Set up data for countries
    var data = [];
    for (var id in countries) {
      if (countries.hasOwnProperty(id)) {
        var country = countries[id];
        if (country.maps.length) {
          data.push({
            id: id,
            color: chartMap.colors.getIndex(continents[country.continent_code]),
            map: country.maps[0]
          });
        }
      }
    }
    worldSeries.data = data;

    // Zoom control
    chartMap.zoomControl = new am4maps.ZoomControl();

    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function () {
      worldSeries.show();
      countrySeries.hide();
      chartMap.goHome();
    });

    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    homeButton.parent = chartMap.zoomControl;
    homeButton.insertBefore(chartMap.zoomControl.plusButton);

    // map chart end
  }); // end am4core.ready()  

    //
    //
    // STUFF FOR LINE CHART
    //

  // line chart
  am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("lineChart", am4charts.XYChart);

    var data = [];
    var value = 50;
    for (let i = 0; i < 300; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: date, value: value });
    }

    chart.data = data;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();

  }); // end am4core.ready()


    //
    //
    // STUFF FOR RADAR CHART
    //


    // line chart end 
  $("#cat-pills a").click(function () {

    /* Create chart instance */
    chart.updateCurrentData;
    /* Create chart instance */
    chartEnergy.updateCurrentData;
    /* Create chart instance */
    chartEnergyCit.updateCurrentData;

  });// radar chart update end

  am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    /* Create chart instance */
    var chart = am4core.create("radar-transport", am4charts.RadarChart);
    /* Create chart instance */
    var chartEnergy = am4core.create("radar-energy", am4charts.RadarChart);
    /* Create chart instance */
    var chartEnergyCit = am4core.create("radar-energy-cit", am4charts.RadarChart);

    /* Add data */
    chart.data = [{
      "country": "Lithuania",
      "litres": 6767000
    }, {
      "country": "Czechia",
      "litres": 11124000
    }, {
      "country": "Ireland",
      "litres": 12167000
    }, {
      "country": "Germany",
      "litres": 82354555
    }, {
      "country": "Australia",
      "litres": 12657234
    }, {
      "country": "Austria",
      "litres": 22312123
    }, {
      "country": "UK",
      "litres": 78123123
    }, {
      "country": "Belgium",
      "litres": 9123857
    }, {
      "country": "The Netherlands",
      "litres": 28123412
    }];
    chartEnergy.data = [{
      "country": "Lithuania",
      "litres": 1.3
    }, {
      "country": "Czechia",
      "litres": 1.1
    }, {
      "country": "Ireland",
      "litres": 1.2
    }];
    chartEnergyCit.data = [{
      "country": "Lithuania",
      "litres": 1.3
    }, {
      "country": "Czechia",
      "litres": 1.1
    }, {
      "country": "Ireland",
      "litres": 1.2
    }];

    /* Create axes */
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    var categoryAxisEnergy = chartEnergy.xAxes.push(new am4charts.CategoryAxis());
    var categoryAxisEnergyCit = chartEnergyCit.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxisEnergy.dataFields.category = "country";
    categoryAxisEnergyCit.dataFields.category = "country";

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    var valueAxisEnergy = chartEnergy.yAxes.push(new am4charts.ValueAxis());
    var valueAxisEnergyCit = chartEnergyCit.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
    valueAxisEnergy.renderer.axisFills.template.fill = chartEnergy.colors.getIndex(2);
    valueAxisEnergyCit.renderer.axisFills.template.fill = chartEnergyCit.colors.getIndex(2);
    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;
    valueAxisEnergy.renderer.axisFills.template.fillOpacity = 0.05;
    valueAxisEnergyCit.renderer.axisFills.template.fillOpacity = 0.05;

    /* Create and configure series */
    var series = chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = "litres";
    series.dataFields.categoryX = "country";
    series.name = "Sales";
    series.strokeWidth = 3;

    /* Create and configure series */
    var seriesEnergy = chartEnergy.series.push(new am4charts.RadarSeries());
    seriesEnergy.dataFields.valueY = "litres";
    seriesEnergy.dataFields.categoryX = "country";
    seriesEnergy.name = "Sales";
    seriesEnergy.strokeWidth = 3;

    /* Create and configure series */
    var seriesEnergyCit = chartEnergyCit.series.push(new am4charts.RadarSeries());
    seriesEnergyCit.dataFields.valueY = "litres";
    seriesEnergyCit.dataFields.categoryX = "country";
    seriesEnergyCit.name = "Sales";
    seriesEnergyCit.strokeWidth = 3;

  }); // end am4core.ready()