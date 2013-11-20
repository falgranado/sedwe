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
			console.log(ls.key(i).match(stationSetContainerRegex));
            if(!ls.key(i).match(stationSetContainerRegex)){
			load_data(ls.key(i));
			
            if ($(ls.key(i)).is(':checkbox') === true) {
                $(ls.key(i)).prop('checked', true);
                
            }
            console.log('Got'+' ' +ls.key(i)+' '+'from local storage');
        }
		}
    }
	$('#page2').on('pageinit', function(){

			$('#sampleProperties').validate({
					rules:{
						station: 'required',
						date: 'required',
						singleMultiContainer: 'required',
						containerCuantity: {
							required: 'true',
							minlength: 1,
							maxlength: 40
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
		$('#currentSamples').empty();
		var station = 0;
		for(i=0;i<ls.length;i++){
			if(ls.key(i).match(stationSetContainerRegex)){
				var query = ls.key(i);
				console.log('1f');
				var data = query.split('&');
				console.log(data[1]);
				if(data[0] !== station){
				station = data[0];
				console.log('"getJsonFromLocalStorage('+query+')"');
				$('#currentSamples').append(createButton(data[0].substring(1),'#multiSet',"getJsonFromLocalStorage('"+query+"')",data[0]));
				//$(data[0]).attr('onClick',function(){});
				console.log(station);
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
						required:true,
						minlength:1,
						maxlength:40
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
			console.log('Forms multiAttributes and analysesForm were valid');
			if(ls.getItem('#singleMultiContainer') == 'multi'){
			$('#sampleParametersPageHeader').text('Set'+' '+ ls.getItem('#set')+', '+'container'+' '+ containerCounter);
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
				//containerCounter++;	
			}else if(ls.getItem('#singleMultiContainer') =='single'){	
				$('#sampleParametersPageHeader').text('Single'+' '+'container'+' '+containerCounter);
				//containerCounter++;	
			}
		$('#sampleParameters').validate({
			rules:{
				beginDate:'required',
				beginTime:'required'
			}
			});	
		$('#sampleParameters2').validate({
			
			rules:{
				P00061:'required',
				P00010:'required',
				P00063:'required',
				P00065:'required'
			},
			submitHandler: function (form) {
				   // serialize and join data for all forms
				   var data = $('#sampleProperties').serialize() + '&' + $('#setAtributesForm').serialize() + '&' + $('#analysesForm').serialize() + '&' + $('#sampleParameters').serialize()+ '&' +$(form).serialize();
				   // ajax submit
				   console.log($('form select[name=station] option:selected').val());
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

function removeButton(buttonName) {


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
				if(containerCounter > ls.getItem('#containersCuantity')){
					$('#sampleParameters2').submit();
					//$('#currentSamples').append(createButton($('form select[name=station] option:selected').text(),'#setProperties',$('form select[name=station] option:selected').val()+ls.getItem('#set')));
					if(ls.getItem('#singleMultiContainer') == 'multi'){
					$.mobile.changePage('#multiSet');
					}else if(ls.getItem('#singleMultiContainer') == 'single'){
						$.mobile.changePage('#HomePage');
					}
					containerCounter= 1;
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
	if(text == 'Observer'){
		//alert(text);
		$(' .hide,.div div select ui-block-c,.ui-block-d').hide();
		
		$('#messageToLab').attr('placeholder','Remarks');
	}
}
function getJsonFromLocalStorage(key) {
	//console.log(key);
	//console.log(1);
  var query = ls.getItem(key); 
  //console.log(2);
  var data = query.split("&");
 // console.log(3);
  var result = {};
 // console.log(4);
  for(var i=0; i<data.length; i++) {
    var item = data[i].split("="); 
	$('#'+item[0]).val(item[1]);
    result[item[0]] = item[1];
	//console.log(result);
	//setDataInForm(result[item[0]],item[1]);
	//console.log('Array index ' + i + ' ' + result[item[0]]+ item[1]);
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