/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood@virginbroadband.com.au) and Stéphane Nahmani (sholby@sholby.net). */
jQuery(function ($) {
    $.datepicker.regional['es'] = { 
        clearText: 'Limpiar', clearStatus: '',
        closeText: 'Cerrar', closeStatus: 'Cerrar sin modificar',
        prevText: '<Anterior', prevStatus: 'Ir al mes anterior',
        nextText: 'Siguiente>', nextStatus: 'Ir al mes siguiente',
        currentText: 'Actual', currentStatus: 'Ir al mes actual',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthStatus: 'Ver otro año', yearStatus: 'Ver otro año',
        weekHeader: 'Sem', weekStatus: '',
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        dayStatus: 'Utilizar el dia DD como el primer día de la semana', dateStatus: 'Eleja el DD, MM d',
        dateFormat: 'dd/mm/yy', firstDay: 0,
        initStatus: 'Elija la fecha', isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});