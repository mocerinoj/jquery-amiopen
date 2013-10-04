/* jquery.amiopen 1.0.0, joe mocerino */
(function( $ ) {

	$.fn.amiopen = function( options ) {

		var defaults = {
			hours:			[ // sun through sat
								[0,0],
								[800,1700],
								[800,1700],
								[800,1700],
								[800,1700],
								[800,1700],
								[0,0]
							],
			showOpenNow :	false,
			showClosedDays:	true,
			openNow :		function(status){
								return $("<span />",{
									html : 'We are '+status,
									class: 'openStatus '+status
								});
							},
			daysToShow :	[0], // 0=today, 1=tomorrow, -1=yesterday, etc.. also, *=all
			display :		function(hours){
								return $("<span />",{
									html : $.fn.amiopen.format("dddd",hours.day) + ' ' + $.fn.amiopen.format("h:nntt",hours.open) + ' - ' + $.fn.amiopen.format("h:nntt",hours.close)
								});
							},
			statusWords :	{true:"open",false:"closed"}, //opened, closed
			weekdays:		["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] //sun through sat
			/*
				d - first letter, ex: M
				dd - two letter, ex: Mo
				ddd - three letter, ex: Mon
				dddd - full day, ex: Monday

				h - hour, 12-hour, ex: 2
				H - hour, 24-hour, ex: 14

				nn - minute, ex: 17

				t - 12-hour period, ex: a
				tt - 12-hour period, ex: am
			*/

		}

		var settings = $.extend( {}, defaults, options );

		return this.each(function() {
			var today = new Date(),
				currentTime = today.getHours()+''+today.getMinutes(),
				todaysHours = settings.hours[today.getDay()],
				html="",
				isOpen=false,
				$this=$(this);

			//are we open?
			if(currentTime >= todaysHours[0] && currentTime <= todaysHours[1]){
				var isOpen = true;
			}

			//show open status?
			if(settings.showOpenNow) {
				$this.append(settings.openNow(eval("settings.statusWords."+isOpen)));
			}

			var loop = settings.daysToShow == "*" ? settings.hours.length : settings.daysToShow.length;
			for(i=0;i<loop;i++){
				var date = settings.daysToShow == "*" ? i : today.getDay()+i;
				//figure out to hide
				if((!settings.showClosedDays&&(settings.hours[date][0]>0||settings.hours[date][1]>0))||settings.showClosedDays){
					$this.append(settings.display({
						"day":settings.weekdays[date],
						"open":settings.hours[date][0],
						"close":settings.hours[date][1]
					}));
				}
			}

	    });

	};

	$.fn.amiopen.format = function(format,value){
	 	var map ={
	 		"dddd":value,
	 		"ddd":value.toString().substring(0,3),
	 		"dd":value.toString().substring(0,2),
	 		"d":value.toString().substring(0,1),
	 		"H":value,
	 		"h":value < 1200 ? value.toString().substring(0,value.toString().length-2) : (value.toString().substring(0,value.toString().length-2))-12,
	 		"nn":value.toString().substring(value.toString().length-2),
	 		"tt":value <= 1200 ? "am" : "pm",
	 		"t":value <= 1200 ? "a" : "p"
	 	}
	 	return format.replace(/dddd|ddd|dd|d|tt|t|H|h|nn/g,function(matched){
	 		return map[matched];
	 	});
    }

})( jQuery );