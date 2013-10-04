jquery-amiopen
==============

  //hours
		var myhours=	[ // sun through sat
			[0,0],
			[800,1700],
			[800,1700],
			[800,1700],
			[830,1700],
			[800,1730],
			[0,0]
		]

		//am i open stuff
		$(".hoursToday").amiopen({
			hours:myhours
		});

		//appt form checkboxes
		$(".apptFrm").amiopen({
			hours:	myhours,
			daysToShow: "*",
			showClosedDays: false,
			display:function(hours){
				/*return $("<input />",{
					name : "Day[]",
					type : "checkbox",
					value: $.fn.amiopen.format("ddd",hours.day),
					//$.fn.amiopen.format("dddd",hours.day)
				}).after("<span/>");*/
				return '<input type="checkbox" name="Day[]" value="'+$.fn.amiopen.format("ddd",hours.day)+'"/>'+$.fn.amiopen.format("dddd",hours.day)
			}
		});
