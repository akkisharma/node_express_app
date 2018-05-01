$(document).ready(function function_name(argument) {

	$(".approve_consult.btn-primary").click(function(event) {
		approveConsultant(this);
	});

});

function approveConsultant(element) {
	var consult_user_name = $(element).parents('tr').find('.consult_user_name').html()
	$.ajax({
		type: 'PUT',
		url: '/consultants/update_status',
		data: {user_name: consult_user_name},
		success: function(res) {
			if(res.status){
				var status_cell = $(element).parents('tr').find('.consult_status')
				var approve_btn = $(element).parents('tr').find('.approve_consult')
				status_cell.html('Approved');
				approve_btn.html('APPROVED').attr('disabled', true);
				approve_btn.removeClass( "btn-primary" ).addClass( "btn-success" );
			} else {
				console.log("Approve Fails!");
			}
		}
	});

}