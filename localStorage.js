var ls = window.localStorage;
var setLetter = 65;

function initialize(){
	//Check if browser supports localStorage
	if(!Modernizr.localstorage){
		alert("Your browser will not store data, please change or update your current browser");
		return false;
		}else if(Modernizr.localstorage){
			alert("This application may store data in your device");
		}
	if(ls.length!= 0){
		for(i=0;i<ls.length;i++){
			getData(ls.key(i));
			if($(ls.key(i)).is(':checkbox')==true){
				//alert('if');
			    $(ls.key(i)).prop('checked',true);
				//alert("Checkbox");
			}
			//alert(ls.key(i));
		}
	}
	$('#addSampleInfo').click( function(e) {
		
		if(ls.getItem('#singleMultiContainer')== 'multi'){
			window.location='newSample.html#multiSet';
	
		}else if(ls.getItem('#singleMultiContainer')== 'single'){
			window.location.href = '#sampleInfo';
			$('#multiAtributes').hide();
		}
	
	});	
	$('#addSampleSet').click(function(e) {
		
        setButtons(setLetter);
		setLetter++;
    });
	saveSamples();
	alert("initialize complete");
}
//Store the data as a key|value pair in localStorage
function storeData(id,value){
	ls.setItem('#'+id,value);

}
//get the data from localStorage
function getData(id){
	$(id).val(ls.getItem(id));
	
}
//Eliminates the data of the local Storage
function rmvData(id){
	ls.removeItem(id);
	//alert("item removed");
}
//Validates Check boxes
function chkBox(id,value){
  // alert(id);
   if(document.getElementById(id).checked == true){
	  // alert('true');
	   storeData(id,value);
   }else if(document.getElementById(id).checked == false){
	 //  alert('false');
	   rmvData('#'+id);
   }	
}
//Sets the title of the header page
function setText(id,value){
	
}
//Create button elements and appends it to the div block
function createButton(buttonName){
    var button = '<a href="#sampleInfo" onclick="setText(sampleInfoHeader,Set'+ ' '+buttonName+'")'+' class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-c" data-role="button" data-theme="c"'+''+'id="'+ buttonName+'"' + '>' + 
               '<span class="ui-btn-inner ui-btn-corner-all">' + 
                 '<span class="ui-btn-text">'+'Set'+ ' '+ buttonName + '</span>' + 
               '</span>' +
             '</a>';
			 $('#sampleSets').append(button);		
}
function removeButton(buttonName){
	
	
}
//Creates buttons depending on the number entered by the user
function setButtons(cuantity){
	//var sampleLetter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
		  createButton(String.fromCharCode(setLetter));
	 
}

function saveSamples(setId,containerId,parameters){
	var parameters=[];
	for(i=0;i<ls.length;i++){
		parameters[i]= ls.key(i)+'='+'"'+ls.getItem(ls.key(i))+'"';
			alert(parameters);
	}
		
	storeData('SET_A',parameters);	
}



//Loads localStorage to set defaults 
$(document).ready(function(e) {
    initialize();
});