function getStationsList() {
  var xmlhttp;

//if (Offline mode && stationsListInLocalStorage != "")
//{
//   document.getElementById("station").innerHTML="<option value='12345678' selected='selected'>Rio Uno</option>"; Station List from LocalStorage
//   return;
//}

  if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {
	// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    //alert(xmlhttp.responseText);
    document.getElementById("station").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","php/functions.php?option="+'1',true);
  xmlhttp.send();
}
function splitString() {
	//var myWindow=window.open('','_blank');
  superString = "timeDatum=AKDT&collectingAgency=other&HSTAT=X&EVENT=A&STYPE=7&ASTAT=I&P71999=100&P82398=5010&P84164=6010&P00009R=+&P72103R=+&P00003R=+&P00004R=+&P00064R=+&P00061R=+&P00061M=+&P00010R=+&P00010M=+&P00010N=+&P00063R=+&P00020R=+&P00020M=+&P00020N=+&P00065R=V&P00065M=+&P00095R=S&P00095M=+&P00095N=+&P63675R=+&P63675M=+&P63675N=+&P63676R=+&P63676M=+&P63676N=+&P63680R=A&P63680M=+&P63680N=+&P65225R=A&P65225M=+&P65225N=+&timeDatum=AKDT&collectingAgency=other&HSTAT=X&EVENT=A&STYPE=7&ASTAT=I&P71999=100&P82398=5010&P84164=6010&P00009R=+&P72103R=+&P00003R=+&P00004R=+&P00064R=+&P00061R=+&P00061M=+&P00010R=+&P00010M=+&P00010N=+&P00063R=+&P00020R=+&P00020M=+&P00020N=+&P00065R=V&P00065M=+&P00095R=S&P00095M=+&P00095N=+&P63675R=+&P63675M=+&P63675N=+&P63676R=+&P63676M=+&P63676N=+&P63680R=A&P63680M=+&P63680N=+&P65225R=A&P65225M=+&P65225N=+&timeDatum=AKDT&collectingAgency=other&HSTAT=X&EVENT=A&STYPE=7&ASTAT=I&P71999=100&P82398=5010&P84164=6010&P00009R=+&P72103R=+&P00003R=+&P00004R=+&P00064R=+&P00061R=+&P00061M=+&P00010R=+&P00010M=+&P00010N=+&P00063R=+&P00020R=+&P00020M=+&P00020N=+&P00065R=V&P00065M=+&P00095R=S&P00095M=+&P00095N=+&P63675R=+&P63675M=+&P63675N=+&P63676R=+&P63676M=+&P63676N=+&P63680R=A&P63680M=+&P63680N=+&P65225R=A&P65225M=+&P65225N=+&beginDate=2013-11-11&beginTime=02%3A02&timeDatum=AKDT&lossOnIgnition=LOI&containerBroken=No&collectingAgency=other&collectorInitials=fgs&containerNum=12345678&HSTAT=X&EVENT=A&STYPE=7&ASTAT=I&P71999=100&P82398=5010&P84164=6010&P00009=10&P00009R=+&P72103=9&P72103R=+&P00003=5&P00003R=+&P00004=4&P00004R=+&P00064=4&P00064R=+&messageToLab=Comment&P00061R=+&P00061M=+&P00010R=+&P00010M=+&P00010N=+&P00063R=+&P00020R=+&P00020M=+&P00020N=+&P00065R=V&P00065M=+&P00095R=S&P00095M=+&P00095N=+&P63675R=+&P63675M=+&P63675N=+&P63676R=+&P63676M=+&P63676N=+&P63680R=A&P63680M=+&P63680N=+&P65225R=A&P65225M=+&P65225N=+&timeDatum=AKDT&collectingAgency=other&HSTAT=X&EVENT=A&STYPE=7&ASTAT=I&P71999=100&P82398=5010&P84164=6010&P00009R=+&P72103R=+&P00003R=+&P00004R=+&P00064R=+&P00061=3&P00061R=+&P00061M=+&P00010=3&P00010R=+&P00010M=+&P00010N=+&P00063=3&P00063R=+&P00020=10&P00020R=+&P00020M=+&P00020N=+&P00065=7&P00065R=V&P00065M=+&P00095=11&P00095R=S&P00095M=+&P00095N=+&P63675=12&P63675R=+&P63675M=+&P63675N=+&P63676=9&P63676R=+&P63676M=+&P63676N=+&P63680=9&P63680R=A&P63680M=+&P63680N=+&P65225=12&P65225R=A&P65225M=+&P65225N=+";
  var STRpairs = unescape(superString.replace(/\+/g," ")).split('&');

  for (var num=0;   num<STRpairs.length;   num++){
		var STRpair = STRpairs[num].split('=');
		this[STRpair[0]]=STRpair[1];
		
  // console.log(STRpair[0]);
		//document.writeln( STRpair[0]);
	}
}

//$("select").change(function () {
//    if($(this).val() == "") $(this).addClass("empty");
 //   else $(this).removeClass("empty")
//});


//Initialize a Select object color properties. If an option is empty, font color will be gray, otherwise, black.
function initSelect(tthis) {

//	console.log("dentro de changeSel... "+$("#"+tthis).val());
    if($("#"+tthis).val() == "") $("#"+tthis).addClass("empty");
    else $("#"+tthis).removeClass("empty");

}
