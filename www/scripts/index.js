(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // Página 1
        document.getElementById("buscar").addEventListener('click', buscar_escuela, false);
        // Fin página 1....................................................................................

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function buscar_escuela() {
        var departamento = $('#departamento').combobox('getValue');
        var municipio = $('#municipio').combobox('getValue');

        if (departamento == "") {
            $('#no_departamento').dialog('open').dialog('center');
        } else {
            if (municipio == "") {
                $('#no_municipio').dialog('open').dialog('center');
            } else {
                var dgEstablecimientos = $('#dgEstablecimientos');
                dgEstablecimientos.datagrid('loadData', []);
                
                //$.ajax({
                //    type: 'get',
                //    url: 'data/establecimientos.json',
                //    cache: false,
                //    dataType: "json",
                //    success:function (data) {
                //        console.log(data);
                //    },
                //    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //        console.log("Status: " + textStatus);
                //        console.log("Error: " + errorThrown);
                //    } 
                //});

                $.getJSON('data/establecimientos.json', function (data) {
                    $.each(data, function (id, value) {
                        if (value.Codigo_dep == departamento && value.Codigo_mun == municipio) {
                            dgEstablecimientos.datagrid('appendRow', value);
                        }
                    });
                });
            }
        }
    }
})();