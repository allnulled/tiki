const main = async function() {
  try {

    // VARIABLES DE ENTORNO:
    await Sistema_de_modulos.cargar_script("lib/variables_de_entorno/variables_de_entorno.js");
    const envvars = await Sistema_de_modulos.cargar_modulo("lib/variables_de_entorno");

    // VUEJS Y COMPAÑEROS:
    await Sistema_de_modulos.cargar_script(envvars.NODE_ENV === "test" ? "lib/vue2/vue2.js" : "lib/vue2/vue2.min.js");
    await Sistema_de_modulos.cargar_script("lib/externos/vue-router/vue-router.js");
    await Sistema_de_modulos.cargar_script("lib/externos/vue-i18n/vue-i18n.js");

    // OTRAS LIBRERÍAS DE TERCEROS:
    await Sistema_de_modulos.cargar_script("lib/externos/jquery/jquery.js");
    await Sistema_de_modulos.cargar_script("lib/externos/jquery-ui/jquery-ui.js");
    await Sistema_de_modulos.cargar_script("lib/externos/ejs/ejs.js");
    await Sistema_de_modulos.cargar_script("lib/externos/socket.io/socket.io.js");
    
    // LÓGICAS:
    await Sistema_de_modulos.cargar_script("lib/sistema_de_hooks/sistema_de_hooks.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_aleatorizacion/sistema_de_aleatorizacion.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_base_de_datos_indexeddb/sistema_de_base_de_datos_indexeddb.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_fechas/sistema_de_fechas.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_almacenamiento_sincronizable/sistema_de_almacenamiento_sincronizable.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_plantillas/sistema_de_plantillas.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_dialogos/sistema_de_dialogos.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_comunicaciones/sistema_de_comunicaciones.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_refresco_automatico/sistema_de_refresco_automatico.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_gestion_de_errores/sistema_de_gestion_de_errores.js");
    await Sistema_de_modulos.cargar_script("lib/sistema_de_rutas/sistema_de_rutas.js");
    await Sistema_de_modulos.cargar_script("lib/utilidades_de_texto/utilidades_de_texto.js");
    await Sistema_de_modulos.cargar_script("lib/utilidades_de_array/utilidades_de_array.js");
    await Sistema_de_modulos.cargar_script("lib/traducciones/traducciones.js");

    // COMPONENTES GRÁFICOS:
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_button/mi_button.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_breadcrumb/mi_breadcrumb.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_breadcrumb2/mi_breadcrumb2.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_checkbox/mi_checkbox.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_datepicker/mi_datepicker.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_fieldset/mi_fieldset.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_hourpicker/mi_hourpicker.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input/mi_input.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_label/mi_label.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_layout/mi_layout.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_loading_bar/mi_loading_bar.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_options/mi_options.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_paragraph/mi_paragraph.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_radiobuttons/mi_radiobuttons.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_responsive_page/mi_responsive_page.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_subtitle/mi_subtitle.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_tabs/mi_tabs.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_textarea/mi_textarea.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_timepicker/mi_timepicker.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_title/mi_title.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_window/mi_window.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_view_according_to_screen/mi_view_according_to_screen.js");
    //////////////////////////////////////////////////////////////////////////////////////////////////
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_boolean_checkbox/mi_input_boolean_checkbox.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_boolean_combobox/mi_input_boolean_combobox.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_color/mi_input_color.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_date/mi_input_date.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_date_hour/mi_input_date_hour.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_email/mi_input_email.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_float/mi_input_float.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_hour/mi_input_hour.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_integer/mi_input_integer.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_long_text/mi_input_long_text.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_option_combobox/mi_input_option_combobox.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_option_selector/mi_input_option_selector.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_options_checkbox/mi_input_options_checkbox.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_password/mi_input_password.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/mi_input_text/mi_input_text.js");
    await Sistema_de_modulos.cargar_script("lib/vue2/componentes/reusables/vuejs_calendario/vuejs_calendario.js");
    //////////////////////////////////////////////////////////////////////////////////////////////////
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/app/app.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_inicio/pagina_de_inicio.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_registrarse/pagina_de_registrarse.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_olvido/pagina_de_olvido.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_bienvenida/pagina_de_bienvenida.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_base_de_datos/pagina_de_base_de_datos.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_tabla_de_base_de_datos/pagina_de_tabla_de_base_de_datos.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_crear_registro_de_base_de_datos/pagina_de_crear_registro_de_base_de_datos.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_actualizar_registro_de_base_de_datos/pagina_de_actualizar_registro_de_base_de_datos.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/pagina_de_configuraciones/pagina_de_configuraciones.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/paginador/paginador.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/configurador_de_consulta/configurador_de_consulta.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/formulario_de_tabla/formulario_de_tabla.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/explorador_de_tabla/explorador_de_tabla.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/mi_input_reference/mi_input_reference.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/mis_dialogos/mis_dialogos.js");
    await Sistema_de_modulos.cargar_script_como_texto("lib/vue2/componentes/no_reusables/mis_errores/mis_errores.js");

    // ESTILOS:
    await Sistema_de_modulos.cargar_estilo("lib/externos/win7/win7.css");
    await Sistema_de_modulos.cargar_script("lib/aplicacion/estilos/variables.js");
    await Sistema_de_modulos.cargar_estilo_dinamico("lib/aplicacion/estilos/framework.jcss");
    await Sistema_de_modulos.cargar_estilo_dinamico("lib/aplicacion/estilos/aplicacion.jcss");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_button/mi_button.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_checkbox/mi_checkbox.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_breadcrumb/mi_breadcrumb.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_breadcrumb2/mi_breadcrumb2.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_datepicker/mi_datepicker.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_fieldset/mi_fieldset.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_hourpicker/mi_hourpicker.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input/mi_input.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_label/mi_label.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_layout/mi_layout.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_loading_bar/mi_loading_bar.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_options/mi_options.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_paragraph/mi_paragraph.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_radiobuttons/mi_radiobuttons.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_responsive_page/mi_responsive_page.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_subtitle/mi_subtitle.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_tabs/mi_tabs.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_textarea/mi_textarea.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_timepicker/mi_timepicker.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_title/mi_title.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_window/mi_window.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_view_according_to_screen/mi_view_according_to_screen.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/app/app.css");
    ////////////////////////////////////////////////////////////////////////////////////////
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_boolean_checkbox/mi_input_boolean_checkbox.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_boolean_combobox/mi_input_boolean_combobox.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_color/mi_input_color.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_date/mi_input_date.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_date_hour/mi_input_date_hour.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_email/mi_input_email.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_float/mi_input_float.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_hour/mi_input_hour.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_integer/mi_input_integer.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_long_text/mi_input_long_text.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_option_combobox/mi_input_option_combobox.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_option_selector/mi_input_option_selector.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_options_checkbox/mi_input_options_checkbox.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_password/mi_input_password.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/mi_input_text/mi_input_text.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/reusables/vuejs_calendario/vuejs_calendario.css");
    ////////////////////////////////////////////////////////////////////////////////////////
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_inicio/pagina_de_inicio.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_bienvenida/pagina_de_bienvenida.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_base_de_datos/pagina_de_base_de_datos.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_tabla_de_base_de_datos/pagina_de_tabla_de_base_de_datos.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_crear_registro_de_base_de_datos/pagina_de_crear_registro_de_base_de_datos.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_actualizar_registro_de_base_de_datos/pagina_de_actualizar_registro_de_base_de_datos.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/pagina_de_configuraciones/pagina_de_configuraciones.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/formulario_de_tabla/formulario_de_tabla.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/explorador_de_tabla/explorador_de_tabla.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/paginador/paginador.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/mi_input_reference/mi_input_reference.css");
    await Sistema_de_modulos.cargar_estilo("lib/vue2/componentes/no_reusables/configurador_de_consulta/configurador_de_consulta.css");
    await Sistema_de_modulos.cargar_estilo_dinamico("lib/aplicacion/estilos/theme.jcss");
    
    // MÓDULOS DE INICIO:
    await Sistema_de_modulos.cargar_script("lib/traducciones/traducciones.js");
    await Sistema_de_modulos.cargar_script("lib/externos/externos.js");
    await Sistema_de_modulos.cargar_script("lib/aplicacion/aplicacion.js");
    
    // ARRANQUE:
    await Sistema_de_modulos.cargar_modulo("lib/sistema_de_dialogos");
    await Sistema_de_modulos.cargar_modulo("lib/aplicacion");
    await Sistema_de_modulos.cargar_modulo("lib/sistema_de_refresco_automatico");

  } catch (error) {
    console.log(error);
    alert("Hubo errores en el despliegue de la aplicación");
  }
};

main();