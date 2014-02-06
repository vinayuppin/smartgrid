$(document).ready(function(){
	var emp = $.cookie('emp-id');
	var role = $.cookie('role');
	var verified = $.cookie('verified');		

	if(emp == null || role != 2 || verified != 1){
		$.removeCookie('emp-id', { path: '/smartgrid/' });
		$.removeCookie('role', { path: '/smartgrid/' });
		$.removeCookie('verified', { path: '/smartgrid/' }); 	
		window.location = "../";
	}
});

var newUsrTable;
var activeUsrTable;
var deniedUsrTable;

$(document).ready(function(){
	newUsrTable = $('#new-usr-tbl').dataTable({		
		"aoColumns" : [
		{
			"bVisible" : false
		},null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},null]
	});	
	activeUsrTable = $('#active-usr-tbl').dataTable({		
		"aoColumns" : [null,null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		}]
	});	
	deniedUsrTable = $('#denied-usr-tbl').dataTable({		
		"aoColumns" : [null,null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		}]
	});	
	getUsrDetails(1);
});

function getUsrDetails(status){
	$.post("../php/getUsrData.php",{
			status : status
		},
		function(response){
			if(response.success){	
				if(status == 1){
					newUsrTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						newUsrTable.fnAddData([ 
											item.id,
											parseInt(i)+parseInt(1),
											'<img src="../css/DT_bootstrap/images/details_open.png"/>',
											item.name,
											item.address,
											item.loc,
											item.email,
											item.mobile
						]);				
					}
					$('#new-usr-tbl tbody td img').on('click', function () {
						var nTr = $(this).parents('tr')[0];
						if ( newUsrTable.fnIsOpen(nTr) )
						{
							/* This row is already open - close it */
							this.src = "../css/DT_bootstrap/images/details_open.png";
							newUsrTable.fnClose( nTr );
						}
						else
						{
							/* Open this row */
							this.src = "../css/DT_bootstrap/images/details_close.png";
							newUsrTable.fnOpen( nTr, fnFormatDetails(newUsrTable, nTr), 'details' );
						}
					} );
				}else if(status ==2){
					activeUsrTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						activeUsrTable.fnAddData([ 
											parseInt(i)+parseInt(1),
											item.name,
											item.address,
											item.loc,
											item.email,
											item.mobile,
											'<button class="btn btn-danger" onclick="enableUsr('+item.id+','+3+','+0+')">Deny</button>'
						]);				
					}
				}else if(status == 3){
					deniedUsrTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						deniedUsrTable.fnAddData([ 
											parseInt(i)+parseInt(1),
											item.name,
											item.address,
											item.loc,
											item.email,
											item.mobile,
											'<button class="btn btn-success" onclick="enableUsr('+item.id+','+2+','+0+')">Active</button>'
						]);				
					}
				}
			}
			if(status == 1)
				getUsrDetails(2);
			else if(status == 2)
				getUsrDetails(3);
		},
		"json"
	);
}

function enableUsr(id,vflag,usflag){
	
	if(vflag == 2 && usflag == 1){
		
		var digits 	= /^[0-9]+$/;
		
		var fixedfee = $('#fixed-fee-'+id).val().trim();
		var due = $('#due-'+id).val().trim();
		var intondue = $('#int-on-due-'+id).val().trim();
		var others = $('#others-'+id).val().trim();
		var excesspay = $('#excess-payment-'+id).val().trim();
		var deposit = $('#deposit-'+id).val().trim();
		var disondep = $('#dis-on-dep-'+id).val().trim();
		
		if (fixedfee == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Fixed Fee.", true);
			$('#fixed-fee-'+id).focus();
			return;
		}
		
		if (!digits.test(fixedfee)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Fixed Fee.", true);
			$('#fixed-fee-'+id).focus();
			return;
		}
		
		if (due == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Due.", true);
			$('#due-'+id).focus();
			return;
		}
		
		if (!digits.test(due)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Due.", true);
			$('#due-'+id).focus();
			return;
		}
		
		if (intondue == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Interest on Due.", true);
			$('#int-on-due-'+id).focus();
			return;
		}
		
		if (!digits.test(intondue)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Interest on Due.", true);
			$('#int-on-due-'+id).focus();
			return;
		}
		
		if (others == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Others.", true);
			$('#others-'+id).focus();
			return;
		}
		
		if (!digits.test(others)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Others.", true);
			$('#others-'+id).focus();
			return;
		}
		
		if (excesspay == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Excess Payment.", true);
			$('#excess-payment-'+id).focus();
			return;
		}
		
		if (!digits.test(excesspay)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Excess Payment.", true);
			$('#excess-payment-'+id).focus();
			return;
		}
		
		if (deposit == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Deposit.", true);
			$('#deposit-'+id).focus();
			return;
		}
		
		if (!digits.test(deposit)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Deposit.", true);
			$('#deposit-'+id).focus();
			return;
		}
		
		if (disondep == ""){
			showMessage(ERROR,"rr-err-msg-"+id, "Please enter the Discount on Deposit.", true);
			$('#dis-on-dep-'+id).focus();
			return;
		}
		
		if (!digits.test(disondep)){
			showMessage(ERROR,"rr-err-msg-"+id, "Invalid Discount on Deposit.", true);
			$('#dis-on-dep-'+id).focus();
			return;
		}
	}

	$.post("../php/enableUsr.php",{
			id : id,
			flag : vflag,
			usflag : usflag,
			fixedfee : fixedfee,
			due: due,
			intondue: intondue,
			others: others,
			excesspay: excesspay,
			deposit: deposit,
			disondep: disondep			
		},
		function(response){
			if(response.success){		
				$('#fixed-fee-'+id).val('');
				$('#due-'+id).val('');
				$('#int-on-due-'+id).val('');
				$('#others-'+id).val('');
				$('#excess-payment-'+id).val('');
				$('#deposit-'+id).val('');
				$('#dis-on-dep-'+id).val('');
					
				newUsrTable.fnClearTable();
				activeUsrTable.fnClearTable();
				deniedUsrTable.fnClearTable();
				getUsrDetails(1);
			}
		},
		"json"
	);
}

function fnFormatDetails ( oTable, nTr ){
    var aData = oTable.fnGetData( nTr );
    var id = aData[0];
    var sOut = '<div class="row">'+
					'<div class="span6" style="padding:0px 75px">'+
						'<div id="print-div'+id+'">'+
							'<div align="center" style="font-weight:bold; border:1px solid #ccc;width:436px;margin-bottom:-1px;padding:10px">User Details</div>'+
							'<table style="border:1px solid #ccc"><tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Name</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc">'+aData[3]+'</div></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Address</div></td><td><textarea readonly="readonly" class="span3" style="margin-left:-1px;padding:0px;border:solid 1px #ccc; ; width:240px; height:118px;">'+aData[4]+'</textarea></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Location</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc">'+aData[5]+'</div></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Email ID</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc">'+aData[6]+'</div></td></tr>'+
							'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Mobile</div></td><td><div class="span3" style="margin-left:-1px;padding:10px;border:solid 1px #ccc">'+aData[7]+'</div></td></tr></table>'+
						'</div>'+
						'<div style="padding:10px 194px;width:75px"><input onclick="printUserDetails('+id+');" type="button" value="Print" class="btn btn-primary"></div>'+
					'</div>'+	
					'<div class="span6" style="padding:0px 60px">'+
						'<div id="rr-err-msg-'+id+'"></div>'+
						'<div align="center" style="font-weight:bold; border:1px solid #ccc;width:415px;margin-bottom:-1px;padding:10px">Enter RR Details</div>'+
						'<table style="border:1px solid #ccc"><tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Fixed Fee</div></td><td><input maxlength="10" id="fixed-fee-'+id+'" type="text" required="required" pattern="[0-9]+" placeholder="Fixed Fee"/></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Due</div></td><td><input maxlength="10" placeholder="Due" id="due-'+id+'" type="text" required="required" pattern="[0-9]+"/>  </td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Interest on Due</div></td><td><input maxlength="5" placeholder="Interest on Due" id="int-on-due-'+id+'" type="text" required="required" pattern="[0-9]+"/></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Others</div></td><td><input maxlength="10" placeholder="Others" id="others-'+id+'" type="text" required="required" pattern="[0-9]+"/></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Excess Payment</div></td><td><input maxlength="10" placeholder="Excess Payment" id="excess-payment-'+id+'" type="text" required="required" pattern="[0-9]+"/></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Deposit</div></td><td><input maxlength="10" placeholder="Deposit" id="deposit-'+id+'" type="text" required="required" pattern="[0-9]+"/></td></tr>'+
						'<tr><td><div class="span2" style="padding:10px;font-weight:bold;border:solid 1px #ccc">Dis. on Deposit</div></td><td><input maxlength="5" placeholder="Discount on Deposit" id="dis-on-dep-'+id+'" type="text" required="required" pattern="[0-9]+"/></td></tr></table>'+
						'<div style="padding:10px 184px;width:75px"><input onclick="enableUsr('+id+','+2+','+1+');" type="button" value="Submit" class="btn btn-primary"></div>'+
					'</div>'+
				'</div>';
    return sOut;
}

function printUserDetails(id){
	Popup($('#print-div'+id).html());
}

function Popup(data){
	var mywindow = window.open('', 'User Details', 'height=400,width=400');
	mywindow.document.write('<html><head><title>User Details</title>');
	mywindow.document.write('</head><body>');
	mywindow.document.write(data);
	mywindow.document.write('</body></html>');
	mywindow.print();
	mywindow.close();
	return true;
}
