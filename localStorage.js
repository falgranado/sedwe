var ls = window.localStorage;
var setLetter = 65;
var stationSetContainerRegex = /#[0123456789]*&[A-Z]*&[0123456789]/;
var containerCounter = 1;
//var appCache = window.applicationCache;



function initialize() {
    //Check if browser supports localStorage
    if (!Modernizr.localstorage) {
        alert("This application will not work on your device, please change or update your current browser");

        return false;
    } else if (Modernizr.localstorage) {
        alert("This application may store data on your device");
    }
	
	//Code commented on request of Dianne Lopez following Jeb Brown suggestion
    /*if (ls.length !== 0) {
        for (i = 0; i < ls.length; i++) {
            console.log( !! ls.key(i).match(stationSetContainerRegex));
            if (!ls.key(i).match(stationSetContainerRegex)) {
                load_data(ls.key(i));

                if ($(ls.key(i)).is(':checkbox') === true) {
                    $(ls.key(i)).prop('checked', true);

                }
                console.log('Got' + ' ' + ls.key(i) + ' ' + 'from local storage');
            }
        }
    }*/
    //Add custom rules for validation
    $.validator.addMethod("custom_number", function (value, element) {
        return value.match(/^([0-9,\+-]+|)$/);//Accepts only numbers or blank space
    }, "Please enter a valid custom number");
    $.validator.addMethod("custom_float", function (value, element) {
        return value.match(/^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)|)$/);//Accepts only floats or blank space
    }, "Please enter a valid float number");


    $('#page2').on('pageinit', function () {
        $('#sampleProperties').validate({
            rules: {
                station: 'required',
                date: 'required',
                singleMultiContainer: 'required',
                setQuantity: {
                    required: 'true',
                    custom_number: true, //for strings
                    range: [1, 40],
                    digits: true
                }
            }
        });

        $('#addSampleParameters').click(function (e) {

            if ($('#sampleProperties').valid()) {

                $('#sampleSets').empty();
                setLetter = 65;
                for (i = 0; i < $('#setQuantity').val(); i++) {
                    $('#sampleSets').append(createButton('Set' + ' ' + String.fromCharCode(setLetter), '#setProperties', 'changeSet(this.id)', String.fromCharCode(setLetter)));
                    setLetter++;
                }

                if ($('#singleMultiContainer').val() == 'multi') {
                    //window.location.href = '#multiSet';
					$.mobile.changePage('#multiSet');
					$('#multiAtributes').show();
                } else if ($('#singleMultiContainer').val() == 'single') {
                    //window.location.href = '#setProperties';
					$.mobile.changePage('#setProperties');
                    changeSet(ls.getItem('#set'));
                    $('#multiAtributes').hide();
                }
            }

        });
    });
    $('#currentButton').click(function (e) {
        $('#currentSamples').empty(); //getJsonFromLocalStorage('"+query+"')
        var station = 0;
        for (i = 0; i < ls.length; i++) {
            if (ls.key(i).match(stationSetContainerRegex)) {
                var query = ls.key(i);
                var data = query.split('&');
                if (data[0] !== station) {
                    station = data[0];
                    $('#currentSamples').append(createButton(data[0].substring(1), '#currentShipmentContainer', "createCurrentSets('" + data[0] + "')", data[0]));
                } else if (!ls.key(i).match(stationSetContainerRegex)) {
                    $('#currentSamples').append('<span> There are no samples </span>')
                }


            }
        }
    });
    $('#currentShipmentPage').on('pageinit', function () {


    });

    $('#setProperties').on('pageinit', function () {

        $('#setAtributesForm').validate({
            rules: {
                method: 'required',
                containersQuantity: {
                    required: 'true',
                    custom_number: true, //for strings
                    range: [1, 40],
                    digits: true
                }
            }
        });
        $('#analysesForm').validate({
            rules: {
                analysis: {
                    required: true,
                    minlength: 1
                }
            },
            messages: {
                analysis: {
                    required: 'Please select at least one analysis'
                }
            }
        });
        $('#linkToContainers').click(function () {
            if ($('#setAtributesForm').valid() && $('#analysesForm').valid()) {
                containerCounter = 1;
                console.log('Forms multiAttributes and analysesForm were valid');
                if (ls.getItem('#singleMultiContainer') == 'multi') {
                    $('#sampleParametersPageHeader').text('Set' + ' ' + ls.getItem('#set') + ', ' + 'Container' + ' ' + containerCounter);
                }
                if (ls.getItem('#singleMultiContainer') == 'single') {
                    $('#sampleParametersPageHeader').text('Single' + ' ' + 'container' + ' ' + containerCounter);
                }
                $.mobile.changePage('#sampleParametersPage');
            }
        });
    });
    $('#beginDate').on('change', function () {

        var value = $('#beginDate').val();
        console.log(value);
        $('#beginDate1').val(value);
    });

    $('#sampleParametersPage').on('pageinit', function () {
        $('#beginDate1').val($('#beginDate').val());
        //console.log($('form select[name=singleMultiContainer] option:selected').val());
        if ($('#singleMultiContainer').val() == 'multi') {
            $('#sampleParametersPageHeader').text('Set ' + ls.getItem('#set') + ', ' + 'container' + ' ' + containerCounter);

        } else if ($('#singleMultiContainer').val() == 'single') {
            $('#sampleParametersPageHeader').text('Single' + ' ' + 'container' + ' ' + containerCounter);

        }
        $('#sampleParameters').validate({
            rules: {
                beginDate: 'required',
                beginTime: 'required'
            }
        });
        $('#sampleParameters2').validate({

            rules: {

                P82073: {
                    custom_float: true,
                },

                P04121: {

                    custom_float: true,
                },
                P04120: {

                    custom_float: true,
                },
                P04119: {

                    custom_float: true,
                },
                P04118: {

                    custom_float: true,
                },
                P04117: {

                    custom_float: true,
                },
                P30333: {

                    custom_float: true,
                },
                P65225: {

                    custom_float: true,
                },
                P63680: {

                    custom_float: true,
                },
                P63676: {

                    custom_float: true,
                },
                P63675: {

                    custom_float: true,
                },
                P00095: {

                    custom_float: true,
                },
                P00020: {
                    custom_float: true,
                },
                P00061: {
                    custom_float: true,
                },
                M2LAB: {

                },
                P00064: {

                    custom_float: true,
                },
                P00003: {

                    custom_float: true,
                },
                P72103: {

                    custom_float: true,
                },
                P00009: {

                    custom_float: true,
                },
                P00061: {
                    custom_float: true,
                },
                P00010: {
                    custom_float: true
                },
                P00063: {
                    custom_float: true,
                },
                P00065: {
                    custom_float: true,
                },
                P71999: {
                    required: true,

                },
                P82398: {
                    required: true
                },
                P84164: {
                    required: true
                },


            },
            submitHandler: function (form) {
                // serialize and join data for all forms
                var data = $('#setAtributesForm').serialize() + '&' + $('#sampleProperties').serialize() + '&' + $('#analysesForm').serialize() + '&' + $('#sampleParameters').serialize() + '&' + $('#sampleParameters2 ').serialize();
                // ajax submit
                console.log(data);
                save_data($('form select[name=station] option:selected').val() + '&' + ls.getItem('#set') + '&' + containerCounter, data);
                //alert(data);
                return false;
            }
        });
        $('#xmlNext').click(function () {
            if ($('#sampleParameters').valid() && $('#sampleParameters2').valid()) {
                loopTroughContainers();
                containerCounter++;

                if ($('#singleMultiContainer').val() == 'multi') {
                    $('#sampleParametersPageHeader').text('Set ' + ls.getItem('#set') + ', ' + 'container' + ' ' + containerCounter);
                    //containerCounter++;	
                } else if ($('#singleMultiContainer').val() == 'single') {
                    $('#sampleParametersPageHeader').text('Single' + ' ' + 'container' + ' ' + containerCounter);
                    //containerCounter++;	
                }

                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                //	$.mobile.showToast(containerCounter +'/'+ $('#containersCuantity').val()+' '+ 'containers',2000,function(){alert('End')});	
            }

        });
    });
    $('#multiSet').on('pageinit', function () {

        $('#addSampleSet').click(function (e) {
            var setQuantity = $('#setQuantity').val();
            console.log(setQuantity);
            $('#sampleSets').append(createButton('Set' + ' ' + String.fromCharCode(setLetter), '#setProperties', 'changeSet(this.id)', String.fromCharCode(setLetter)));
            setLetter++;
            setQuantity++;
            $('#setQuantity').val(setQuantity);
            save_data('setQuantity', $('#setQuantity').val());
        });

    });


}

//Store the data as a key|value pair in localStorage
function save_data(id, value) {

    try {
        ls.setItem('#' + id, value);
        console.log('Saved ' + id + ':' + value);
    } catch (exception) {
        if ((exception != QUOTA_EXCEEDED_ERR) && (exception != NS_ERROR_DOM_QUOTA_REACHED)) {
            throw exception;
        }
    }

}
//get the data from localStorage and send it to the form
function load_data(id) {
    if (id !== null) {
        $(id).val(ls.getItem(id));
    }
}
//
//Eliminates the data of the local Storage
function rmvData(id) {
    ls.removeItem(id);
}
//Validates Check boxes
function chkBox(id, value) {
    if (document.getElementById(id).checked === true) {
        save_data(id, value);
    } else if (document.getElementById(id).checked === false) {
        rmvData('#' + id);
    }
}
//Sets the title of the header page
function setTitle(id, value) {
    save_data(id, value);
    $('#page2Header').text(ls.getItem('#' + id));
    if (ls.getItem('#' + id) == 'Bedload') {
        $('.suspendedAdditionalFields, .bottomAdditionalFields').hide();
    } else if (ls.getItem('#' + id) == 'Bottom Material') {
        $('.suspendedAdditionalFields, .bedloadAdditionalFields, #bedloadAdditionalFields').hide();
    } else if (ls.getItem('#' + id) == 'Suspended Sediment') {
        $('.bedloadAdditionalFields, #bedloadAdditionalFields, .bottomAdditionalFields').hide();
    }
}

//Create button elements and appends it to the div block
function createButton(buttonText, hrefLink, onclk, id) {
    console.log('=>' + onclk);
    if (buttonText === 'View' ) {
       var button = '<a href="' + hrefLink + '" onClick="' + onclk + '" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c" data-rel="dialog" data-role="button" data-theme="c"' + '' + 'id="' + id + '"' + '>' +
            '<span class="ui-btn-inner ui-btn-corner-all">' +
            '<span class="ui-btn-text">' + buttonText + '</span>' +
            '</span>' +
            '</a>';
		} else {
        var button = '<a href="' + hrefLink + '" onClick="' + onclk + '" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c" data-role="button" data-theme="c"' + '' + 'id="' + id + '"' + '>' +
            '<span class="ui-btn-inner ui-btn-corner-all">' +
            '<span class="ui-btn-text">' + buttonText + '</span>' +
            '</span>' +
            '</a>';
    }
    return button;
}

function createCollapsible(collapsibleText, id) {
    var collapsible = "<div data-role='collapsible' data-theme='a' data-content-theme='c' id='set" + id + "'><h3>" + collapsibleText + "</h3></div>";
    return collapsible;
}

function createCurrentSets(station) {
    console.log('c123');
    $('#currentShipmentSamples').empty();
    //$('#addSampleSet').hide();
    console.log('c1234');
    var counter = 1;
    for (i = 0; i < ls.length; i++) {
        if (ls.key(i).match(stationSetContainerRegex)) {
            //console.log('c123'+i);
            var query = ls.key(i);
            var data = query.split('&');
            var nextQuery = ls.key(i + 1);
            var nextData = nextQuery.split('&');
            var set = data[1];

            //if (typeof nextData[1] !== "undefined") {
                if (data[0] === station && data[1] !== nextData[1]) {

                    if (data[1] === 'SNGL') {
                        $('#currentShipmentSamples').append(createCollapsible('Single set', data[1]));
                    } else {
                        $('#currentShipmentSamples').append(createCollapsible('Set' + data[1], data[1]));
                    }
                    //$('#set'+data[1]).collapsible();
                    counter = 1;
                    var bool = true;
                    while (bool) {
                        var key = data[0] + '&' + data[1] + '&' + counter;
                        var startGrid = '<div class="ui-grid-A">';
                        var blockA = '<div class="ui-block-a">';
                        var blockB = '</div><div class="ui-block-b">';
						var controlGroup = '<div data-role="controlgroup" data-type="horizontal">';
                        var endGrid = '</div></div><!-- /grid-b -->';

                        if (key in ls) {
                            console.log('Typeof: ' + typeof (key) + ' counter: ' + counter + ' data[2]: ' + data[2] + ' data[0]: ' + data[0] + ' key: ' + key);
                            $('#set' + data[1]).append(startGrid + blockA + 'Container ' + counter + '' + blockB +controlGroup+ createButton('Edit', '#sampleParametersPage', "getJsonFromLocalStorage('" + station + '&' + data[1] + '&' + counter + "');changeSet('" + data[1] + "')", counter)+ createButton('View', '#reportPage', "createReport('" + station + '&' + data[1] + '&' + counter + "');", 'view' + counter) + endGrid).trigger('create');
                            counter++;
                        } else {
                            bool = false
                        }
                        //bool = false;
                    }
                    $('#set' + data[1]).collapsible();
                    $('#currentShipmentSamples').collapsibleset({
                        inset: false
                    });
                //}
            }
        }

    }
    /*for(i=0;i<ls.length;i++){
			if(ls.key(i).match(stationSetContainerRegex)){
				var query = ls.key(i);
				var data = query.split('&');*/

}

//Changes the set and the header
function changeSet(id) {
    if ($('#singleMultiContainer').val() == 'multi') {
        save_data('set', id);
        $('#setHeader').text('Set ' + id);
    } else if ($('#singleMultiContainer').val() == 'single') {
        save_data('set', 'SNGL');
        $('#containersQuantity').val($('#setQuantity').val());
        $('#setHeader').text($('#setQuantity').val() + ' ' + 'single container(s)');


    }
}

//loop trought the desired amount of containers
function loopTroughContainers() {
    console.log('Container counter = ' + containerCounter);
    //containerCounter++;
    if (containerCounter <= $('#containersQuantity').val()) {
        $('#sampleParameters2').submit(); //Submit handler takes care of storing data

    }
    if (containerCounter >= $('#containersQuantity').val()) {
        $('#sampleParameters2').submit();//Submit handler takes care of storing data
		
                if ($('#singleMultiContainer').val() == 'multi') {
           			$.mobile.changePage('#multiSet');//Redirects the page to #multiSet
        		} else if ($('#singleMultiContainer').val() == 'single') {
           			$.mobile.changePage('#HomePage');//Redirects the page to #HomePage
       			}

    }
    //rmvData(ls.key('#beginTime'));
}

function addOnLogic() {
    if ($('#analysesZ:checked') === true) {
        $('#fullSizeFraction').hide();
    }
}
//Determines User type and style the form depending of the type of user.
function login(text) {
    save_data('userType', text);
    //alert(text);
    $('#HomePageHeader').text(text);//change text of header to the type of user selected
    if (text == 'Observer') {
        $(' .hide,.div div select ui-block-c,.ui-block-d').hide(); // hides every div containing hide, .div div select ui-block-c and .ui-block-d class
		$('#messageToLab').attr('placeholder', 'Remarks');//Sets the placeholder of the messageToLab text area
		
    } else if (text !== 'Observer') {
        $(' .hide,.div div select ui-block-c,.ui-block-d').show();// In case of user type change it makes sure the elemnts hidden shows up again
        $('#messageToLab').attr('placeholder', 'Message to lab');//Sets the placeholder of the messageToLab text area
    }
}
//Get the form data of past unfinished forms(i.e Current Samples).
function getJsonFromLocalStorage(key) {
	
	keysplit = key.split('&');
	console.log(keysplit[2]);
	containerCounter = parseInt(String(keysplit[2]));
	if(keysplit[1]!=='SNGL'){
		$('#sampleParametersPageHeader').text('Set ' + String(keysplit[1]) + ', ' + 'container' + ' ' + containerCounter);
	}else{
		$('#sampleParametersPageHeader').text('Single container' + ' ' + containerCounter);
		}
    var query = ls.getItem(key);//looks for  the key in localStorage
    var data = query.split("&");//search and split each element in the local storage by '&' delimiter 
    for (var i = 0; i < data.length; i++) {
        var item = data[i].split("=");
        //console.log($("#" + String(item[0])).val() + '==>' + item[1]);
		if(String(item[0]) == 'beginTime'){
			$("#" + String(item[0])).val(String(item[1].replace('%3A',':')));
			console.log($("#" + String(item[0])).val());
		}else{
        $("#" + String(item[0])).val(String(item[1]));
    	}
	}

    //return result;
}
//Checks the local storage and create a user friendly report of the data stored
function createReport(key) {
    $('#reportTable').empty();
    var query = ls.getItem(key);
    var data = query.split("&");
	var analyses= [];
    $('#reportHeader h3').text(key);

    //$('#reportContent').append('<table></table>');
    for (var i = 0; i < data.length; i++) {
		
        var table = $('#reportTable');
        var item = data[i].split("=");
		
		if(item[1] === '+' || item[1] ===''){
		}else{
		switch(item[0]){
			case 'method':
				table.append('<tr><td>' + 'Method' + '</td><td>' + String(item[1]) + '</td></tr>'); 
				break;
			case 'containersQuantity':
				table.append('<tr><td>' + 'Container Quantity' + '</td><td>' + String(item[1]) + '</td></tr>');
				break;
			case 'compositeOrIndividual':
				if(item[1] === 'composite'){
					table.append('<tr><td>' + 'Composite' + '</td><td>' + 'true' + '</td></tr>');
				}else{
					table.append('<tr><td>' + 'Composite' + '</td><td>' + 'false' + '</td></tr>');
				}
				break;
			case 'station':
				table.append('<tr><td>' + 'Station' + '</td><td>' + String(item[1]) + '</td></tr>');
				break;
			case 'sampleMediumDropdown':
				table.append('<tr><td>' + 'Sample Medium ' + '</td><td>' + String(item[1]) + '</td></tr>');
				break;
			case 'date':
				table.append('<tr><td>' + 'Date' + '</td><td>' + String(item[1]) + '</td></tr>');
				break;
			case 'EVENT':
				if($('#eventTD').length > 0){
					$('#eventTD,#eventTDR').empty();
					$('#eventTD').text('Event');
					$('#eventTDR').text(item[1]);
				}else{
					table.append('<tr><td id="eventTD">' + 'Event' + '</td><td id="eventTDR">' + String(item[1]) + '</td></tr>');
				}
					
				
				break;
			case 'setQuantity':
				table.append('<tr><td>' + 'Set Quantity' + '</td><td>' + String(item[1]) + '</td></tr>');
				break;
			case 'singleMultiContainer':
				table.append('<tr><td>' + 'Single or multiple' + '</td><td>' + String(item[1]) + '</td></tr>');
				break;
			case 'analysis':
			
				if(analyses.length === 0){
					analyses.push(item[1]);
					table.append('<tr><td id="analysesTD">' + 'Analysis' + '</td><td id="analysesTDR">' + analyses + '</td></tr>');
				}else{
						if(item[1] in analyses){
							}else{
								analyses.push(item[1]);
								$('#analysesTD, #analysesTDR').empty();
								$('#analysesTD').text('Analyses');
								$('#analysesTDR').text(analyses);
								}
				}
				//console.log(analyses);
				//table.append('<tr><td id="analysesTD">' + 'Single or multiple' + '</td><td id="analysesTDR">' + analyses + '</td></tr>');
				break;
			case 'beginDate':
				table.append('<tr><td>' + 'Begin date' + '</td><td>' + item[1] + '</td></tr>');
				break;
				
			case 'beginTime':
				table.append('<tr><td>' + 'Begin time' + '</td><td>' + item[1].replace('%3A',':') + '</td></tr>');
				break;
			case 'timeDatum':
				table.append('<tr><td>' + 'Time datum' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'collectingAgency':
				table.append('<tr><td>' + 'Collecting agency' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'collectorsInitials':
				table.append('<tr><td>' + 'Collectors initials' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'containerNum':
				table.append('<tr><td>' + 'Container number' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'HSTAT':
				table.append('<tr><td>' + 'Hydrologic condition' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'STYPE':
				table.append('<tr><td>' + 'Sample type' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'ASTAT':
				table.append('<tr><td>' + 'Analysis status' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'P71999':
				table.append('<tr><td>' + 'Sample purpose' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'P82398':
				table.append('<tr><td>' + 'Sampling method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'P84164':
				table.append('<tr><td>' + 'Sampler Type' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'P00009':
				table.append('<tr><td>' + 'Location in cross section: Left' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case 'P00009R':
				table.append('<tr><td>' + 'Location in cross section: Left Remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P72103':
				table.append('<tr><td>' + 'Location in cross section: Right' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P72103R':
				table.append('<tr><td>' + 'Location in cross section: Right remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00003':
				table.append('<tr><td>' + 'Sampling depth' + '</td><td>' + item[1]+' ft'  + '</td></tr>');
				break;
			case'P00003R':
				table.append('<tr><td>' + 'Sampling depth remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00004':
				table.append('<tr><td>' + 'Stream width' + '</td><td>' + item[1]+' ft' + '</td></tr>');	
				break;
			case'P00004R':
				table.append('<tr><td>' + 'Stream width remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00064':
				table.append('<tr><td>' + 'Mean depth of stream' + '</td><td>' + item[1]+' ft' + '</td></tr>');
				break;
			case'P00064R':
				table.append('<tr><td>' + 'Mean depth of stream remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'M2LAB':
				table.append('<tr><td>' + 'Message to lab' + '</td><td>' + item[1].replace(/\+/g, ' ') + '</td></tr>');
				break;
			case'P00061':
				table.append('<tr><td>' + 'Instantaneous discharge' + '</td><td>' + item[1]+' cfs' + '</td></tr>');
				break;
			case'P00061R':
				table.append('<tr><td>' + 'Instantaneous discharge remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00061M':
				table.append('<tr><td>' + 'Instantaneous discharge method' + '</td><td>' + item[1] + '</td></tr>');
				break;	
			case'P00010':
				table.append('<tr><td>' + 'Water temperature' + '</td><td>' + item[1] +String.fromCharCode(176)+'C'+ '</td></tr>');
				break;
			case'P00010R':
				table.append('<tr><td>' + 'Water temperature remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00010M':
				table.append('<tr><td>' + 'Water temperature method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00010N':
				table.append('<tr><td>' + 'Water temperature null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00063':
				table.append('<tr><td>' + 'Number of sampling points' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00063R':
				table.append('<tr><td>' + 'Number of sampling points remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00020':
				table.append('<tr><td>' + 'Air temperature' + '</td><td>' +  item[1] +String.fromCharCode(176)+'C' + '</td></tr>');
				break;
			case'P00020R':
				table.append('<tr><td>' + 'Air temperature remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00020M':
				table.append('<tr><td>' + 'Air temperature method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00020N':
				table.append('<tr><td>' + 'Air temperature null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00065':
				table.append('<tr><td>' + 'Gage height' + '</td><td>' + item[1] +' ft'+ '</td></tr>');
				break;
			case'P00065R':
				table.append('<tr><td>' + 'Gage height remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00065M':
				table.append('<tr><td>' + 'Gage height method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00095':
				table.append('<tr><td>' + 'Specific conductance' + '</td><td>' + item[1]+' per cm at 25'+String.fromCharCode(176)+'C' + '</td></tr>');
				break;
			case'P00095R':
				table.append('<tr><td>' + 'Gage height remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00095M':
				table.append('<tr><td>' + 'Gage height method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P00095N':
				table.append('<tr><td>' + 'Gage height null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63675':
				table.append('<tr><td>' + 'Turbidity' + '</td><td>' + item[1]+' NTU, 400-600nm, 90'+String.fromCharCode(177)+'30'+String.fromCharCode(176) + '</td></tr>');
				break;
			case'P63675R':
				table.append('<tr><td>' + 'Turbidity remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63675M':
				table.append('<tr><td>' + 'Turbidity method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63675N':
				table.append('<tr><td>' + 'Turbidity null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63676':
				table.append('<tr><td>' + 'Turbidity' + '</td><td>' + item[1]+' NTU,400-600nm, multiple angles' + '</td></tr>');
				break;
			case'P63676R':
				table.append('<tr><td>' + 'Turbidity remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63676M':
				table.append('<tr><td>' + 'Turbidity  method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63676N':
				table.append('<tr><td>' + 'Turbidity null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63680':
				table.append('<tr><td>' + 'Turbidity' + '</td><td>' + item[1]+' NTU,780-900nm,90'+String.fromCharCode(177)+'2.5'+String.fromCharCode(176) + '</td></tr>');
				break;
			case'P63680R':
				table.append('<tr><td>' + 'Turbidity remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63680M':
				table.append('<tr><td>' + 'Turbidity  method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P63680N':
				table.append('<tr><td>' + 'Turbidity null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P65225':
				table.append('<tr><td>' + 'Transparency, transparecy tube' + '</td><td>' + item[1]+' cm' + '</td></tr>');
				break;
			case'P65225R':
				table.append('<tr><td>' + 'Transparency remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P65225M':
				table.append('<tr><td>' + 'Transparency method' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P65225N':
				table.append('<tr><td>' + 'Transparency null value qualifier' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P30333':
				table.append('<tr><td>' + 'Bag mesh, bedload sampler' + '</td><td>' + item[1] +'mm' + '</td></tr>');
				break;
			case'P30333R':
				table.append('<tr><td>' + 'Bag mesh, bedload sampler remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P04117':
				table.append('<tr><td>' + 'Thether line used for collecting sample' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P04118':
				table.append('<tr><td>' + 'Composite samples in cross-sectional bedload measurement' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P04119':
				table.append('<tr><td>' + 'Vertical in composite sample' + '</td><td>' + item[1] +' s' + '</td></tr>');
				break;
			case'P04120':
				table.append('<tr><td>' + 'Rest time on bed for Bedload sample' + '</td><td>' + item[1]+' s' + '</td></tr>');
				break;
			case'P04120R':
				table.append('<tr><td>' + 'Rest time on bed for Bedload sample remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P04121':
				table.append('<tr><td>' + 'Horizontal width of vertical' + '</td><td>' + item[1]+' ft' + '</td></tr>');
				break;
			case'P04121R':
				table.append('<tr><td>' + 'Horizontal width of vertical remark' + '</td><td>' + item[1] + '</td></tr>');
				break;	
			case'P82073':
				table.append('<tr><td>' + 'Starting time' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P82073R':
				table.append('<tr><td>' + 'Starting time remark' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P82074':
				table.append('<tr><td>' + 'Ending time' + '</td><td>' + item[1] + '</td></tr>');
				break;
			case'P82074R':
				table.append('<tr><td>' + 'Ending time remark' + '</td><td>' + item[1] + '</td></tr>');
				break;	
	
			
			
        }
        console.log('createReport(): Excuted');
    }
	//Checks for table data containing '+' values (+ = null) and remove from table to optimize space
	//$('#reportTable tr td:contains('+')').each(function(index, element) {
      //      if($(this).text() === '+'){
		//		$(this).parent().remove();	
			//	console.log('removed');
			//}
      //  });
 }
    $('#reportTable tr:odd').css("background-color", '#9FF'); //paints odd rows with cyan 
}
//Checks cache status
function checkCache() {

    var appCache = window.applicationCache;
    //appCache.update();
    //console.log(appCache.status);
    switch (appCache.status) {
        case appCache.UNCACHED:
            // UNCACHED == 0
            return 'UNCACHED';
            break;
        case appCache.IDLE:
            // IDLE == 1
            return 'IDLE';
            break;
        case appCache.CHECKING:
            // CHECKING == 2
            return 'CHECKING';
            break;
        case appCache.DOWNLOADING:
            // DOWNLOADING == 3
            return 'DOWNLOADING';
            break;
        case appCache.UPDATEREADY:
            // UPDATEREADY == 4
            return 'UPDATEREADY';
            break;
        case appCache.OBSOLETE:
            // OBSOLETE == 5
            return 'OBSOLETE';
            break;
        default:
            return 'UKNOWN CACHE STATUS';
            break;
    };
}

//Loads localStorage to set defaults 
$(document).ready(function (e) {
    //login(ls.getItem('#userType'));
    //ls.clear();
    //console.log(appCache.status);
    if (checkCache() === 'UPDATEREADY') {
        window.applicationCache.update();
    }
	
    initialize()
    //getJsonFromUrl();


});