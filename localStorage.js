var ls = window.localStorage;
var setLetter = 65;
var stationSetContainerRegex = /#[0123456789]*&[A-Z]*&[0123456789]/;
var containerCounter=1;
var beginDate = $('#beginDate1');
var appCache = window.applicationCache;



function initialize() {
    //Check if browser supports localStorage
    if (!Modernizr.localstorage) {
        alert("This application will not work on your device, please change or update your current browser");
		
        return false;
    } else if (Modernizr.localstorage) {
        alert("This application may store data on your device");
    }
    if (ls.length !== 0) {
        for (i = 0; i < ls.length; i++) {
			console.log(!!ls.key(i).match(stationSetContainerRegex));
            if(!ls.key(i).match(stationSetContainerRegex)){
			load_data(ls.key(i));
			
            if ($(ls.key(i)).is(':checkbox') === true) {
                $(ls.key(i)).prop('checked', true);
                
            }
            console.log('Got'+' ' +ls.key(i)+' '+'from local storage');
        }
		}
    }
	$.validator.addMethod("custom_number", function(value, element) {
       return value.match(/^[0-9,\+-]+$/);
    }, "Please enter a valid number");
	$.validator.addMethod("custom_float",function(value, element){
	return value.match(/[0-9]+(?:\.[0-9]*)?/);
	},"Please enter a valid number");
	
	$('#page2').on('pageinit', function(){
			$('#sampleProperties').validate({
								rules:{
									station: 'required',
									date: 'required',
									singleMultiContainer: 'required',
									containerCuantity: {
										required: 'true',
										custom_number: true, //for strings
										range: [1,40],
										digits: true
									}
								}
							});
					
			$('#addSampleParameters').click(function (e) {
				
				if($('#sampleProperties').valid()){
					
					$('#sampleSets').empty();
					setLetter=65;
					for(i=0;i<ls.getItem('#containerCuantity');i++){
						$('#sampleSets').append(createButton('Set'+ ' ' + String.fromCharCode(setLetter),'#setProperties','changeSet(this.id)',String.fromCharCode(setLetter)));
						setLetter++;
					}
					
					if (ls.getItem('#singleMultiContainer') == 'multi') {
						window.location = 'newSample.html#multiSet';
			
					} else if (ls.getItem('#singleMultiContainer') == 'single') {
						window.location.href = '#setProperties';
						changeSet(ls.getItem('#set'));
						$('#multiAtributes').hide();
					}
				}
				
			});
	});
	$('#currentButton').click(function(e){
		$('#currentSamples').empty();//getJsonFromLocalStorage('"+query+"')
		var station = 0;
		for(i=0;i<ls.length;i++){
			if(ls.key(i).match(stationSetContainerRegex)){
				var query = ls.key(i);
				var data = query.split('&');
				if(data[0] !== station){
					station = data[0];
					$('#currentSamples').append(createButton(data[0].substring(1),'#multiSet',"createCurrentSets('"+data[0]+"','"+data[1]+"','"+data[2]+"')",data[0]));
				}else if(!ls.key(i).match(stationSetContainerRegex)){$('#currentSamples').append('<span> There are no samples </span>')}
				
			
			}
		}
	});
	$('#currentSamplePage').on('pageinit',function(){
		
		
	});
	
	$('#setProperties').on('pageinit',function(){
		
		$('#setAtributesForm').validate({
			rules:{
					method:'required',
					containersCuantity:{
								required: 'true',
								custom_number: true, //for strings
								range: [1,40],
								digits: true
									}
			}
		});
		$('#analysesForm').validate({
			rules:{
				analysis: { 
					required: true,
					minlength: 1
					}
			},messages: {
				analysis:{
					required:'Please select at least one analysis'
					}	
			}
		});
		$('#linkToContainers').click(function (){
		if($('#setAtributesForm').valid() && $('#analysesForm').valid()){
			containerCounter=1;
			console.log('Forms multiAttributes and analysesForm were valid');
			if(ls.getItem('#singleMultiContainer') == 'multi'){
			$('#sampleParametersPageHeader').text('Set'+' '+ ls.getItem('#set')+', '+'Container'+' '+ containerCounter);
			}
			if(ls.getItem('#singleMultiContainer')== 'single'){
			$('#sampleParametersPageHeader').text('Single'+' '+'container'+' '+containerCounter);	
			}
			$.mobile.changePage('#sampleParametersPage');
		}
		});
	});
	$('#sampleParametersPage').on('pageinit',function(){
		
		//console.log($('form select[name=singleMultiContainer] option:selected').val());
		if(ls.getItem('#singleMultiContainer') == 'multi'){
				$('#sampleParametersPageHeader').text('Set '+ls.getItem('#set')+', '+'container'+' '+ containerCounter);
					
			}else if(ls.getItem('#singleMultiContainer') =='single'){	
				$('#sampleParametersPageHeader').text('Single'+' '+'container'+' '+containerCounter);
				
			}
		$('#sampleParameters').validate({
			rules:{
				beginDate:'required',
				beginTime:'required'
			}
			});	
		$('#sampleParameters2').validate({
			
			rules:{
				
				//P82073:{
					//custom_float:true,
				//},
				P04121:{
					required:false,
					custom_float:true,
				},
				P04120:{
					required:false,
					custom_float:true,
				},
				P04119:{
					required:false,
					custom_float:true,
				},
				P04118:{
					required:false,
					custom_float:true,
				},
				P04117:{
					required:false,
					custom_float:true,
				},
				P30333:{
					required:false,
					custom_float:true,
				},
				P65225:{
					required:false,
					custom_float:true,
				},
				P63680:{
					required:false,
					custom_float:true,
				},
				P63676:{
					required:false,
					custom_float:true,	
				},
				P63675:{
					required:false,
					custom_float:true,	
				},
				P00095:{
					required:false,
					custom_float:true,	
				},
				P00020:{
					required:false,
					custom_float:true,	
				},
				P00061:{
					required:false,
					custom_float:true,
				},
				M2LAB:{
						
				},
				P00064:{
					required:false,
					custom_float:true,	
				},
				P00003:{
					required:false,
					custom_float:true,	
				},
				P72103:{
					required:false,
					custom_float:true,
				},
				P00009:{
					required:false,
					custom_float:true,
				},
				P00061:{
					required:true,
					custom_float:true,
				},
				P00010:{
					required:true,
					custom_float:true,
				},
				P00063:{
					required:true,
					custom_float:true,
				},
				P00065:{
					required:true,
					custom_float:true,
				}
			},
			submitHandler: function (form) {
				   // serialize and join data for all forms
				   var data = $('#setAtributesForm').serialize()+ '&' + $('#sampleProperties').serialize() + '&' + $('#analysesForm').serialize() + '&' + $('#sampleParameters').serialize()+ '&' +$('#sampleParameters2 ').serialize();
				   // ajax submit
				   console.log(data);
				   save_data($('form select[name=station] option:selected').val()+'&'+ls.getItem('#set')+'&'+containerCounter,data);
				   //alert(data);
				   return false;
			}
			});
	$('#xmlNext').click(function () {
		if($('#sampleParameters').valid() && $('#sampleParameters2').valid()){
			loopTroughContainers();
			containerCounter++;
			
			if(ls.getItem('#singleMultiContainer') == 'multi'){
				$('#sampleParametersPageHeader').text('Set '+ls.getItem('#set')+', '+'container'+' '+ containerCounter);
				//containerCounter++;	
			}else if(ls.getItem('#singleMultiContainer') =='single'){	
				$('#sampleParametersPageHeader').text('Single'+' '+'container'+' '+containerCounter);
				//containerCounter++;	
			}

			$("html, body").animate({ scrollTop: 0 }, "slow");
				
		}
				
	     });
     });
	$('#multiSet').on('pageinit', function(){
		
		$('#addSampleSet').click(function (e) {
			var containerCuantity = $('#containerCuantity').val();
			console.log(containerCuantity);
			$('#sampleSets').append(createButton('Set' + ' ' + String.fromCharCode(setLetter),'#setProperties','changeSet(this.id)',String.fromCharCode(setLetter)));
			setLetter++;
			containerCuantity++;
			$('#containerCuantity').val(containerCuantity);
			save_data('containerCuantity',$('#containerCuantity').val());
		});

	});
    
	//$('#beginDate').change(function(){
	//	beginDate.val(this.value);
	//});
	
}

//Store the data as a key|value pair in localStorage
function save_data(id, value) {
   
   try{ ls.setItem('#' + id, value);
	console.log('Saved '+id+':'+value);
   }catch (exception) {
        if ((exception != QUOTA_EXCEEDED_ERR) && 
            (exception != NS_ERROR_DOM_QUOTA_REACHED)) {
        throw exception;
        }
      }
	  
}
//get the data from localStorage and send it to the form
function load_data(id) {
	if(id !== null){
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
	save_data(id,value);
	$('#page2Header').text(ls.getItem('#'+id));
	if(ls.getItem('#'+id) == 'Bedload'){
		$('.suspendedAdditionalFields, .bottomAdditionalFields').hide();
	}else if (ls.getItem('#'+id) == 'Bottom Material'){
		$('.suspendedAdditionalFields, .bedloadAdditionalFields, #bedloadAdditionalFields').hide();	
	}else if(ls.getItem('#'+id) == 'Suspended Sediment'){
		$('.bedloadAdditionalFields, #bedloadAdditionalFields, .bottomAdditionalFields').hide();	
	}
}

//Create button elements and appends it to the div block
function createButton(buttonText,hrefLink,onclk,id) {
	console.log('=>'+onclk);
    var button = '<a href="'+hrefLink+'" onClick="'+onclk+'" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c" data-role="button" data-theme="c"' + '' + 'id="' + id + '"' + '>' +
        '<span class="ui-btn-inner ui-btn-corner-all">' +
        '<span class="ui-btn-text">' + buttonText + '</span>' +
        '</span>' +
        '</a>';
    return button;
}
function createCollapsible(collapsibleText,id){
	
        var collapsible = "<div data-role='collapsible' data-theme='a' id='set" + id + "'><h3>" + collapsibleText + "</h3></div>";
	return collapsible;
}

function createCurrentSets(station,set,container){
	$('#sampleSets').empty();
		if(set === 'SNGL'){
			save_data('singleMultiContainer','single');
			save_data('set',set);
			//$('#multiAtributes').hide();
			$('#sampleSets').append(createCollapsible('Single',set));
			for(i=0;i<ls.length;i++){
				if(ls.key(i).match(stationSetContainerRegex)){
				var query = ls.key(i);
				var data = query.split('&');
				if(data[0]===station && data[1] === set){
				$('#set'+set).append(createButton(data[2],'#sampleParametersPage',"getJsonFromLocalStorage('"+station+'&'+set+'&'+data[2]+"')",data[2])).trigger('create');//createButton(set,'#setProperties',"changeSet(this.id)",set));
				}
				}
			}
			//getJsonFromLocalStorage(station+'&'+set+'&'+container);
			save_data('containerCuantity',parseInt(container));
		}else if ( set!== 'SNGL'){
			$('#sampleSets').append(createCollapsible('Set ' + set, set));
			for(i=0;i<ls.length;i++){
				if(ls.key(i).match(stationSetContainerRegex)){
				var query = ls.key(i);
				var data = query.split('&');
				if(data[0]===station && data[1] === set){
				$('#set'+set).append(createButton(data[2],'#sampleParametersPage',"getJsonFromLocalStorage('"+station+'&'+set+'&'+data[2]+"')",data[2])).trigger('create');//createButton(set,'#setProperties',"changeSet(this.id)",set));
				}
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
	if(ls.getItem('#singleMultiContainer') == 'multi'){
    save_data('set', id);
	$('#setHeader').text('Set '+id);
	}
	else if(ls.getItem('#singleMultiContainer') == 'single'){
	save_data('set','SNGL');
	ls.setItem('#containersCuantity',ls.getItem('#containerCuantity'));
	$('#setHeader').text(ls.getItem('#containerCuantity')+' '+'single container(s)');
	
		
	}
}

//loop trought the desired amount of container
function loopTroughContainers(){
	 console.log('Container counter = '+containerCounter);
	 //containerCounter++;
	if(containerCounter<=ls.getItem('#containersCuantity')){
				$('#sampleParameters2').submit();//Submit handler takes care of storing data
				
	}
				if(containerCounter >= ls.getItem('#containersCuantity')){
					//containerCounter=1;
					$('#sampleParameters2').submit();
					//$('#currentSamples').append(createButton($('form select[name=station] option:selected').text(),'#setProperties',$('form select[name=station] option:selected').val()+ls.getItem('#set')));
					if(ls.getItem('#singleMultiContainer') == 'multi'){
					$.mobile.changePage('#multiSet');
					//containerCounter=1;
					}else if(ls.getItem('#singleMultiContainer') == 'single'){
						//containerCounter=1;
						$.mobile.changePage('#HomePage');
						
					}
					
				}	
	rmvData(ls.getItem('#beginTime'));
}
function addOnLogic(){
	if($('#analysesZ:checked') === true){
		$('#fullSizeFraction').hide();	
	}
}
//Determines User type
function login(text){
	save_data('userType',text);
	//alert(text);
	$('#HomePageHeader').text(text);
	if(text == 'Observer'){
		//alert(text);
		$(' .hide,.div div select ui-block-c,.ui-block-d').hide();
		
		$('#messageToLab').attr('placeholder','Remarks');
	}
}
function getJsonFromLocalStorage(key) {
	console.log(key);
  var query = ls.getItem(key); 
  var data = query.split("&");
  var result = {};
  for(var i=0; i<data.length; i++) {
    var item = data[i].split("="); 
	console.log($("#"+String(item[0])).val()+'==>'+item[1]);
	$("#"+String(item[0])).val(String(item[1]));
   // result[item[0]] = item[1];
	//console.log(item[0]+'='+item[1]);
	//setDataInForm(result[item[0]],item[1]);
	console.log('Array index ' + i + ' ' +$("#"+String(item[0])).val() );
  }
  
  //return result;
}



//Loads localStorage to set defaults 
$(document).ready(function (e) {
 	//login(ls.getItem('#userType'));
	//ls.clear();
	//console.log(appCache.status);
	initialize();
	//getJsonFromUrl();
	
	
  });