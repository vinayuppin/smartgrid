$(document).ready(function(){
	var emp = $.cookie('emp-id');
	var role = $.cookie('role');
	var verified = $.cookie('verified');		

	if(emp == null || role != 1 || verified != 1){
		$.removeCookie('emp-id', { path: '/smartgrid/' });
		$.removeCookie('role', { path: '/smartgrid/' });
		$.removeCookie('verified', { path: '/smartgrid/' }); 	
		window.location = "../";
	}
});

var newEmpTable;
var activeEmpTable;
var deniedEmpTable;

$(document).ready(function(){
	newEmpTable = $('#new-emp-tbl').dataTable({		
		"aoColumns" : [null,null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		}]
	});	
	activeEmpTable = $('#active-emp-tbl').dataTable({		
		"aoColumns" : [null,null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		}]
	});	
	deniedEmpTable = $('#denied-emp-tbl').dataTable({		
		"aoColumns" : [null,null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		},null,
		{
			"bSortable" : false
		},
		{
			"bSortable" : false
		}]
	});	
	getEmpDetails(1);
});

function getEmpDetails(status){
	$.post("../php/getEmpData.php",{
			status : status
		},
		function(response){
			if(response.success){	
				if(status == 1){
					newEmpTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						newEmpTable.fnAddData([ 
											parseInt(i)+parseInt(1),
											item.name,
											item.address,
											item.email,
											item.mobile,
											'<select id="emp-reg-loc'+item.id+'" onchange="enablebtn('+item.id+');"></select>',
											'<button disabled="disabled" class="btn btn-success" id="btn-enable-'+item.id+'" onclick="enableEmp('+item.id+','+2+','+1+')">Active</button>'
						]);
						var loccode = '<option value="0"></option>';
						for(j in response.loclist){
							loccode += '<option value="'+response.loclist[j].id+'">'+response.loclist[j].location+'</option>';
						}
						$('#emp-reg-loc'+item.id).html(loccode);
					}
				}else if(status ==2){
					activeEmpTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						activeEmpTable.fnAddData([ 
											parseInt(i)+parseInt(1),
											item.name,
											item.address,
											item.email,
											item.mobile,
											item.location,
											'<button class="btn btn-danger" onclick="enableEmp('+item.id+','+3+','+0+')">Deny</button>'
						]);				
					}
				}else if(status == 3){
					deniedEmpTable.fnClearTable();
					for(i in response.list){					
						var item = response.list[i];		
						deniedEmpTable.fnAddData([ 
											parseInt(i)+parseInt(1),
											item.name,
											item.address,
											item.email,
											item.mobile,
											item.location,
											'<button class="btn btn-success" onclick="enableEmp('+item.id+','+2+','+0+')">Active</button>'
						]);				
					}
				}
			}
			if(status == 1)
				getEmpDetails(2);
			else if(status == 2)
				getEmpDetails(3);
		},
		"json"
	);
}

function enablebtn(id){
	if($('#emp-reg-loc'+id+' option:selected').val() == 0){
		$('#btn-enable-'+id).prop("disabled", true);
	}else{
		$('#btn-enable-'+id).prop("disabled", false);
	}

}

function enableEmp(id,vflag,enflag){
	$.post("../php/phpseclib0.3.5/enableEmp.php",{
			id : id,
			flag : vflag,
			enflag : enflag,
			loc_id: $('#emp-reg-loc'+id+' option:selected').val()
		},
		function(response){
			if(response.success){			
				newEmpTable.fnClearTable();
				activeEmpTable.fnClearTable();
				deniedEmpTable.fnClearTable();
				getEmpDetails(1);
			}
		},
		"json"
	);
}
