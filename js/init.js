/**
 * Created by rodrigo_chaves on 18/03/15.
 */

new_input_model = function(labelname,type_input,name,placeholder,val,extras){
    var model_input = "<label><span class='title_input'>"+labelname+"</span><input type='"+type_input+"' name='"+name+"' placeholder='"+placeholder+"' value='"+val+"' "+extras+"/></label>";
    return model_input;
};

new_select_model = function(labelname,options,name,extras){
    var select_model  = "<label><span class='title_input'>"+labelname+"</span>";
    select_model +="<select name='"+name+"'>";

    for(var i=0; i<options.length;i++){
        select_model+="<option value='"+options[i]+"'>"+options[i]+"</option>";
    }
    select_model +="</select></label>";

    return select_model;
};

change_method_name = function(index,config){
    var list_params = config.values_methods[index];

    var inputs_form = "<div id='params'>";
    for(var i=0;i<list_params.length;i++){
        inputs_form += new_input_model(list_params[i],'text',list_params[i],'','','');
    }
    inputs_form+="</div>";

    $('form#api_test').children("div#params").remove();
    $('form#api_test').append(inputs_form);
};

populate_form = function(config){
    var form_api = new_input_model('URL','text','url_api','',config.url_init,'disabled=disabled');
    form_api += new_select_model('MÃ©todos',config.methods,'methods','');
    $('form#api_test').append(form_api);

    $("select[name=methods]").change(function(){
        var name = $(this).children("option:selected").val();
        change_method_name(name,config);
    });
};

$(function(){
    var json_config = $.getJSON('js/config.json',
        function(response){
            console.log(response);
            populate_form(response);
        });
});