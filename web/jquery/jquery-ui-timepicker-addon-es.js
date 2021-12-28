
/* Spanish initialisation for the jQuery UI time picker plugin. */
/* Written by Keith Wood (kbwood@virginbroadband.com.au) and Stéphane Nahmani (sholby@sholby.net). */
jQuery(function ($) {
    $.timepicker.regional['es'] = {
    	timeOnlyTitle: 'Elija Hora',
    	timeText: 'HORA',
    	hourText: 'Hora',
    	minuteText: 'Minuto',
    	secondText: 'Segundo',
    	millisecText: 'Milisegundo',
    	timezoneText: 'Zona Horaria',
    	currentText: 'Ahora',
    	closeText: 'Cerrar',
    	timeFormat: 'HH:mm:ss',
    	amNames: ['AM', 'A'],
    	pmNames: ['PM', 'P'],
    	isRTL: false
    };
    $.timepicker.setDefaults($.timepicker.regional['es']);
});