var StringUtils = Java.type("org.apache.commons.lang.StringUtils");

var codeSystems = [
     'dataElements',
     'categoryOptions',
     'options',
     'organisationUnitLevels',
     'organisationUnitGroups',
     'relationshipTypes',   
     'trackedEntityAttributes',
     'programTrackedEntityAttributes',
     'programDataElements',
     'attributes',
     'programs',
     'dataElementGroups'
];
var valueSets = [ 'categories' ];
var conceptMaps = [];

function getCodeSystemContent(codeSystems) {
    var codeSystemContent ="<h1>Code Systems</h1><ul>";
    codeSystems.forEach(function(codeSystem) {  
	var codeSystemDisplayName = StringUtils.join(StringUtils.splitByCharacterTypeCamelCase(codeSystem)," ");
	codeSystemContent += "<li><a href='CodeSystem/" + codeSystem + "'>" + codeSystemDisplayName + "</a></li>";
    });
    codeSystemContent += "</ul>\n";
    return codeSystemContent;
}

function getValueSetContent(valueSets) {
    var valueSetContent ="<h1>Code Systems</h1><ul>";
    valueSets.forEach(function(valueSet) {  
	var valueSetDisplayName = StringUtils.join(StringUtils.splitByCharacterTypeCamelCase(valueSet)," ");
	valueSetContent += "<li>" + codeSytstemDisplayName + "</a></li>";
    });
    valueSetContent += "</ul>\n";
    return valueSet;
}
function getValueSetContent(valueSets) {
    return "";
}


function display(content) {
    var html="";
    html += content;
    html +=  '</div><!-- end of tabs-- > </div></div></body></html>';
    dhisScriptContext.out.write(html);
}



content ="<div id='tabs-1'>" + getCodeSystemContent(codeSystems) +"</div>\n";
content +="<div id='tabs-2'>" + getValueSetContent(valueSets) +"</div>\n";
content +="<div id='tabs-3'></div>\n";

display(content);

// var out = "
// <html >
//   <head>
//     <title>Care Services Discovery - Meta Data Loader</title>
//     <base href='../../'/>
//     <link type='text/css' rel='stylesheet' href='../dhis-web-commons/font-awesome/css/font-awesome.min.css'/>
//     <link type='text/css' rel='stylesheet' href='../dhis-web-commons/css/menu.css'/>
//     <link type='text/css' rel='stylesheet' href='../dhis-web-commons/javascripts/jQuery/ui/css/redmond/jquery-ui.css'/>
//     <link type='text/css' rel='stylesheet' href='../dhis-web-commons/css/light_blue/light_blue.css'/>
//     <link type='text/css' rel='stylesheet' href='../api/apps/csd-loader/datetimepicker-master/jquery.datetimepicker.css'/>
//     <script type='text/javascript' src='../dhis-web-commons/javascripts/jQuery/jquery.min.js'></script>
//     <script type='text/javascript' src='../dhis-web-commons/javascripts/jQuery/ui/jquery-ui.min.js'></script>
//     <script type='text/javascript' src='../dhis-web-commons/javascripts/jQuery/ui/jquery.blockUI.js'></script>
//     <script type='text/javascript'>
//          $(function() {	
//              $.getJSON( 'manifest.webapp', function( json ) { var apiBaseUrl = json.activities.dhis.href + '/api';});
//          });
//     </script>
//     <script type='text/javascript' src='../dhis-web-commons/javascripts/dhis2/dhis2.translate.js'></script>
//     <script type='text/javascript' src='../dhis-web-commons/javascripts/dhis2/dhis2.menu.js'></script>
//     <script type='text/javascript' src='../dhis-web-commons/javascripts/dhis2/dhis2.menu.ui.js'></script>
//   </head>
//   <body>
//       <div id='header' style='background-color: #276696; '>
// 	<img id='headerBanner'
// 	     src='staticContent/logo_banner'
// 	     onclick='window.location.href='dhis-web-dashboard-integration/index.action''
// 	     style='cursor:pointer'
// 	     title='View home page'/>
	
// 	  <span
// 	      id='headerText'
// 	      onclick='window.location.href='dhis-web-dashboard-integration/index.action''
// 	      style='cursor:pointer'
// 	      title='View home page'>
// 	    DHIS 2
// 	    </span>

// 	  <div id='dhisDropDownMenu'></div>
//       </div>
	  
//       <div id='content' style='background-color: white;padding:2em; '>
// 	<p>
//              This is a server side app for mapping DHIS2 standardized lists into the 
//              HL7 FHIR using Code System, ValueSet and ConceptMap Resources.
// 	</p>

// 	<div id='tabs'>
// 	  <ul>
// 	    <li><a href='apps/csd-loader/index.html#tabs-1'>Code System</a></li>
// 	    <li><a href='apps/csd-loader/index.html#tabs-2'>Value Set</a></li>
// 	    <li><a href='apps/csd-loader/index.html#tabs-3'>Concept Map</a></li>
// 	  </ul>
// "


;