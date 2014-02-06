var newSmartMeterTable;
var oldSmartMeterTable;

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

$(document).ready(function(){
	timedRefresh(600000);
	newSmartMeterTable = $('#new-smart-meter-tbl').dataTable({		
		"aoColumns" : [
		{
			"bVisible" : false
		},null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		},null,
		{
			"bVisible" : false
		},
		{
			"bVisible" : false
		},
		{
			"bVisible" : false
		}]
	});	
	oldSmartMeterTable = $('#old-smart-meter-tbl').dataTable({		
		"aoColumns" : [
		{
			"bVisible" : false
		},null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		},null,
		{
			"bVisible" : false
		},
		{
			"bVisible" : false
		},
		{
			"bVisible" : false
		}]
	});	
	getSmartMeterDetails(0);
});

function getSmartMeterDetails(status){
	$.post("../php/getSmartMeterData.php",{
			status : status
		},
		function(response){
			if(response.success){	
				if(status == 0){
					newSmartMeterTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						newSmartMeterTable.fnAddData([ 
											item.id,
											parseInt(i)+parseInt(1),
											'<img src="../css/DT_bootstrap/images/details_open.png"/>',
											item.name,
											item.address,
											item.email,
											item.mobile,
											item.rr_number,
											item.cc_pub_key,
											item.req_pub_key
						]);				
					}
					$('#new-smart-meter-tbl tbody td img').on('click', function () {
						var nTr = $(this).parents('tr')[0];
						if ( newSmartMeterTable.fnIsOpen(nTr) )
						{
							/* This row is already open - close it */
							this.src = "../css/DT_bootstrap/images/details_open.png";
							newSmartMeterTable.fnClose( nTr );
						}
						else
						{
							/* Open this row */
							this.src = "../css/DT_bootstrap/images/details_close.png";
							newSmartMeterTable.fnOpen( nTr, fnFormatDetails(newSmartMeterTable, nTr), 'details' );
						}
					} );
				}else if(status ==1){
					oldSmartMeterTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						oldSmartMeterTable.fnAddData([ 
											item.id,
											parseInt(i)+parseInt(1),
											'<img src="../css/DT_bootstrap/images/details_open.png"/>',
											item.name,
											item.address,
											item.email,
											item.mobile,
											item.rr_number,
											item.cc_pub_key,
											item.req_pub_key
						]);				
					}
				}
				$('#old-smart-meter-tbl tbody td img').on('click', function () {
						var nTr = $(this).parents('tr')[0];
						if ( oldSmartMeterTable.fnIsOpen(nTr) )
						{
							/* This row is already open - close it */
							this.src = "../css/DT_bootstrap/images/details_open.png";
							oldSmartMeterTable.fnClose( nTr );
						}
						else
						{
							/* Open this row */
							this.src = "../css/DT_bootstrap/images/details_close.png";
							oldSmartMeterTable.fnOpen( nTr, dnFormatDetails(oldSmartMeterTable, nTr), 'details' );
						}
				} );
			}
			if(status == 0)
				getSmartMeterDetails(1);
			},
		"json"
	);
}

function enableSmartMeter(id,status){
	$.post("../php/enableSmartMeter.php",{
			id : id,
			flag : status
		},
		function(response){
			if(response.success){		
	
				newSmartMeterTable.fnClearTable();
				oldSmartMeterTable.fnClearTable();
				getSmartMeterDetails(0);
			}
		},
		"json"
	);
}

function fnFormatDetails ( oTable, nTr ){
    var aData = oTable.fnGetData( nTr );
    var id = aData[0];
    var sOut = '<div class="row">'+
					'<div align="center" class="span6" style="padding:0px 63px">'+
						'<div id="print-div'+id+'">'+
							'<div align="center" style="font-weight:bold; border:1px solid #ccc;width:436px;margin-bottom:-1px;padding:10px">User Details</div>'+
							'<table style="border:1px solid #ccc">'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Name</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc;">'+aData[3]+'</div></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Address</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; width:240px; height:118px;">'+aData[4]+'</textarea></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Email ID</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc;">'+aData[5]+'</div></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Mobile</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc;">'+aData[6]+'</div></td></tr></table>'+
						'</div>'+
						'<div style="padding:10px 185px;"><input align="center" onclick="printUserDetails('+id+');" type="button" value="Print" class="btn btn-primary"></div>'+
					'</div>'+
					'<div align="center" id="div-'+id+'" class="span6" style="padding:0px 0px">'+
						'<div align="center" style="font-weight:bold; border:1px solid #ccc;width:436px;margin-bottom:-1px;padding:10px; width: 507.5px;">Seed Data</div>'+
						'<table style="border:1px solid #ccc">'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">RR_Number</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc; width: 290px;">'+aData[7]+'</div></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Control_Center Public Key</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; width:311px; height:126px;">'+aData[8]+'</textarea></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Requester Public Key</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; width:311px; height:126px;">'+aData[9]+'</textarea></td></tr></table>'+
						'<div style="padding:10px 225px;"><input onclick="enableSmartMeter('+id+','+1+');" type="button" value="Submit" class="btn btn-primary"></div>'+
					'</div>'+	
				'</div>';
    return sOut;
}

function dnFormatDetails ( oTable, nTr ){
    var aData = oTable.fnGetData( nTr );
    var id = aData[0];
    var sOut = '<div class="row">'+
					'<div align="center" id="print-div'+id+'" class="span6" style="padding:0px 63px">'+
						'<div align="center" style="font-weight:bold; border:1px solid #ccc;width:436px;margin-bottom:-1px;padding:10px">User Details</div>'+
						'<table style="border:1px solid #ccc">'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Name</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc;">'+aData[3]+'</div></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Address</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; width:240px; height:118px;">'+aData[4]+'</textarea></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Email ID</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc;">'+aData[5]+'</div></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Mobile</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc;">'+aData[6]+'</div></td></tr></table>'+
					'</div>'+
					'<div align="center" id="div-'+id+'" class="span6" style="padding:0px 0px">'+
						'<div align="center" style="font-weight:bold; border:1px solid #ccc;width:436px;margin-bottom:-1px;padding:10px; width: 507.5px;">Seed Data</div>'+
						'<table style="border:1px solid #ccc">'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">RR_Number</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc; width: 290px;">'+aData[7]+'</div></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Control_Center Public Key</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; width:311px; height:126px;">'+aData[8]+'</textarea></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Requester Public Key</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; width:311px; height:126px;">'+aData[9]+'</textarea></td></tr></table>'+
					'</div>'+	
				'</div>';
    return sOut;
}

function printUserDetails(id){
	Popup($('#print-div'+id).html());
}

function Popup(data){
	var mywindow = window.open('','User Details','height=400,width=400');
	mywindow.document.write('<html><head><title>User Details</title>');
	mywindow.document.write('</head><body>');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.print();
	mywindow.close();
	return true;
}
