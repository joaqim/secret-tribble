(function() {
    'use strict';

    var world = darlingjs.world('myApp',
                ['domModule']),
        aspectRatio = 2,
    /**
     * window.innerWidth and window.innerHeight === 0 inside iFrame at 1st moment.
     * Need to get size from documentElement
     */
        windowWidth = document.documentElement.clientWidth,
        windowHeight = document.documentElement.clientHeight;

    /**
     * fit to screen with aspect
     */
    if (windowWidth < aspectRatio * windowHeight) {
        var width = windowWidth,
            height = windowWidth / aspectRatio;
    } else {
        var width = aspectRatio * windowHeight,
            height = windowHeight;
    }

    // add view renderer system

    world.$add('domViewRenderer', {
        //target div element
        target: '#game',
        width: width,
        height: height,
        backgroundColor: '#008B9A'
    });

    var year=8250;
    var month=1;
    var day=1;

    $.getJSON('iron_islands.json', function(data) {
        $('<tr class="item_header" style="background-color:#848484" id=item_bar></tr>').appendTo('#tbl');
        $('<td class="item_header" style="background-color:#848484">Name</td>').appendTo('#item_bar');
        $('<td class="item_header" style="background-color:#848484">Birth</td>').appendTo('#item_bar');
        $('<td class="item_header" style="background-color:#848484">Age</td>').appendTo('#item_bar');
        var charData = data.characters;
        var newCharData = charData;
/*
        var date = year.toString()+'.'+month.toString()+'.'+day.toString();
        for (var i=0, len=charData.length; i<len; i++) {
            var c = charData[i];
            if (c[date] != undefined) {
                if(c[date] != undefined) {
                    newCharData[i].birth = date;
                    c.birth = date;
                }
                $('<td class="items">'+c.name+'</div>').appendTo('#tbl');
                $('<td class="items">'+c.birth+'</div>').appendTo('#tbl');
                $('<td class="items">'+(-parseInt(c.birth)-year)+'</div>').appendTo('#tbl');    
            }
            console.log(c['name']);

        }*/
    });

    world.$add('characterService', {
        target: '#tbl',
    });


    //myParser();

    world.$start();
})();

function executeFunctionByName(functionName, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}