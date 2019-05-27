(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // Página 1
        document.getElementById("buscar").addEventListener('click', buscar_escuela, false);
        document.getElementById("limpiar").addEventListener('click', limpiar_formulario, false);
        // Fin página 1....................................................................................

        // Página 2
        $('#dgEstablecimientos').datagrid({
            onClickRow: getDetailSchool
        });
        // Fin página 2....................................................................................
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
        var nivel = $('#nivel').combobox('getText');
        var sector = $('#sector').combobox('getText');
        var nombre_escuela = $('#nombre_escuela').textbox('getValue');

        if (departamento == "") {
            $('#no_departamento').dialog('open').dialog('center');
        } else {
            if (municipio == "") {
                $('#no_municipio').dialog('open').dialog('center');
            } else {
                var dgEstablecimientos = $('#dgEstablecimientos');
                dgEstablecimientos.datagrid('loadData', []);
                $.getJSON('data/establecimientos.json', function (data) {
                    $.each(data, function (id, value) {
                        if (value.Codigo_dep == departamento && value.Codigo_mun == municipio) {
                            if (nivel == "" && sector == "" && nombre_escuela == "") {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel == "" && sector == "" && nombre_escuela != "" && String(nombre_escuela.toLowerCase().trim()) == String(value.Nombre_Est.toLowerCase().trim())) {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel == "" && sector != "" && sector == value.Sector && nombre_escuela == "") {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel == "" && sector != "" && sector == value.Sector && nombre_escuela != "" && String(nombre_escuela.toLowerCase().trim()) == String(value.Nombre_Est.toLowerCase().trim())) {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel != "" && nivel == value.Nivel && sector == "" && nombre_escuela == "") {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel != "" && nivel == value.Nivel && sector == "" && nombre_escuela != "" && String(nombre_escuela.toLowerCase().trim()) == String(value.Nombre_Est.toLowerCase().trim())) {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel != "" && nivel == value.Nivel && sector != "" && sector == value.Sector && nombre_escuela == "") {
                                dgEstablecimientos.datagrid('appendRow', value);
                            } else if (nivel != "" && nivel == value.Nivel && sector != "" && sector == value.Sector && nombre_escuela != "" && String(nombre_escuela.toLowerCase().trim()) == String(value.Nombre_Est.toLowerCase().trim())) {
                                dgEstablecimientos.datagrid('appendRow', value);
                            }
                        }
                    });
                });
            }
        }
    }

    function getDetailSchool() {
        var row = $('#dgEstablecimientos').datagrid('getSelected');
        if (row) {
            $.getJSON("data/general/" + $('#departamento').combobox('getValue') + ".json", function (data) {
                $.each(data, function (key, val) {                    
                    if (row.Codigo_Est == val.CODIGO) {
                        $('#esc_codigo').textbox('setValue', val.CODIGO);
                        $('#esc_departamento').textbox('setValue', val.DEPARTAMENTO);
                        $('#esc_municipio').textbox('setValue', val.MUNICIPIO);
                        $('#esc_nombre').textbox('setValue', val.ESTABLECIMIENTO);
                        $('#esc_direccion').textbox('setValue', val.DIRECCION);
                        $('#esc_telefono').textbox('setValue', val.TELEFONO);
                        $('#esc_dist_supervision').textbox('setValue', val.DISTRITO);
                        $('#esc_supervisor').textbox('setValue', val.SUPERVISOR);
                        //$('#esc_director').textbox('setValue', val.DIRECTOR);
                        $('#esc_departamental').textbox('setValue', val.DEPARTAMENTAL);
                        $('#esc_nivel').textbox('setValue', val.NIVEL);
                        $('#esc_sector').textbox('setValue', val.SECTOR);
                        $('#esc_area').textbox('setValue', val.AREA);
                        $('#esc_jornada').textbox('setValue', val.JORNADA);
                        $('#esc_plan').textbox('setValue', val.PLAN);
                        $('#esc_modalidad').textbox('setValue', val.MODALIDAD);
                        $('#esc_estado_actual').textbox('setValue', val.STATUS);
                    }
                });
            });

            var dgMatriculaEstablecimiento = $('#dgMatriculaEstablecimiento');
            dgMatriculaEstablecimiento.datagrid('loadData', []);
            $.getJSON("data/matricula_2013_2017.json", function (data) {
                $.each(data, function (key, val) {
                    if (row.Codigo_Est == val.Codigo_Est) {
                        dgMatriculaEstablecimiento.datagrid('appendRow', val);
                    }
                });
            });
        } else {
            console.log("No row selected...");
        }
    }

    function limpiar_formulario() {
        $('#nombre_escuela').textbox('clear');
        $('#sector').combobox('clear');
        $('#nivel').combobox('clear');
        $('#municipio').combobox('clear');
        $('#departamento').combobox('clear');       
    }
})();