function myParser () {
    $.ajax({
        type: "GET",
        url: "sites.xml",
        dataType: "xml",
        success: function(xml) {
            $('<tr class="item_header" style="background-color:#848484" id=item_bar></tr>').appendTo('#tbl');
            $('<td class="item_header" style="background-color:#848484">Link</td>').appendTo('#item_bar');
            $('<td class="item_header" style="background-color:#848484">Brief Description</td>').appendTo('#item_bar');
            $('<td class="item_header" style="background-color:#848484">Long Description</td>').appendTo('#item_bar');
            $(xml).find('site').each(function(){
                var id = $(this).attr('id');
                var title = $(this).find('title').text();
                var url = $(this).find('url').text();
                //$('<div class="items" id="link_'+id+'"></div>').html('<a href="'+url+'">'+title+'</a>').appendTo('#page-wrap');
                $('<tr class="items" id="link_'+id+'"></tr>').appendTo('#tbl');
                $('<td class="items"><a href='+url+'>'+title+'</a></td>').appendTo('#link_'+id);
                $(this).find('desc').each(function(){
                    var brief = $(this).find('brief').text();
                    var long = $(this).find('long').text();
                    //$('<div class="items"></div>').html(brief).appendTo('#link_'+id);
                    $('<td class="items"></td>').html(brief).appendTo('#link_'+id);
                    //$('<div class="items"></div>').html(long).appendTo('#link_'+id);
                    $('<td class="items"></td>').html(long).appendTo('#link_'+id);
                });
            });
        }
    });
};