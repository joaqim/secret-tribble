define(['darlingjs', 'dom', 'charmodule', 'fs', 'path'], function(Darlingjs){
    var App = (function() {
    	'use strict';

    	//var world = darlingjs.world('pong', [
    	//	'domModule',
    	//	'charModule']),
    	//    aspectRatio = 2,
    	    /**
    	     * window.innerWidth and window.innerHeight === 0 inside iFrame at 1st moment.
    	     * Need to get size from documentElement
    	     */
    	//    windowWidth = document.documentElement.clientWidth,
    	//    windowHeight = document.documentElement.clientHeight;

        var world = darlingjs.world('pong',
['domModule',
'charModule']),
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

        var year = 8225,
            month = 1,
            day = 1;

        world.$add('lifeSystem', {
            year: year,
            month: month,
            day: day
        });

    	world.$e('box', {
    		domView: {color: '#BBD401'},
        	ng2D: {x: width - 80, y: height / 2},
        	ng2DSize: {width: 160, height: 220},
	        solid: {
    	        type: 'right-paddle'
        	}
    	});

        //ck2JSON();

        var ents = [];
        $.ajax({
            dataType: "json",
            url : "files.json",
            mimeType: "application/json",
            success : function(data){
                $.each(data,function(i,item) {
                    if (item.Chars != undefined) {
                        console.log(item.Chars);
                        $.ajax({
                            dataType: "json",
                            url : item.Chars+".json",
                            mimeType: "application/json",
                            error: function(xhr, status, err) {
                                var err = eval('('+xhr.responseText + ')');
                                alert(err.Message);
                            },
                            success : function(data) {
                                $.each(($(data).attr("characters")), function(i, item) {
                                    console.log(item.aName);
                                    //console.log(item.dates['8225.1.1'][0]['birth'][0]);
                                    //console.log(item)
                                    //console.log(Object.keys(item.dates).length);
                                    
                                    /*var len = Object.keys(item.dates).length;
                                    for (var n = 0; n< len; n++){
                                        var ev = item.dates[n]
                                        console.log(ev)
                                    }*/

                                                                        
                                    var keys = [], name, dates = [],arr;
                                    for (name in item.dates) {
                                        if (item.dates.hasOwnProperty(name)) {
                                            //console.log(item.dates[name])
                                            dates[name]=[item.dates[name]]
                                            //keys.push(name);
                                        }
                                    }
                                    //console.log(keys);

                                    /*for (var k in keys) {
                                        console.log(item.dates[k]);
                                    }*/
        
                                    
                                    var e = world.$e(item.idA, {
                                        character: {
                                            //id: item.id,
                                            aName: item.aName,
                                            dynasty: item.dynasty,

                                            father: item.father
                                        },
                                        timeline: {
                                            dates: dates
                                        },
                                        status: {
                                        	id: 'alive'
                                        }
                                 	});
                                    ents.push(e);
                                });
                                console.log(world.$numEntities());
                                console.log(ents.length);
                                /*
                                for(var y = year-1; y<year+55; y++) {
                                    //console.log(y);
                                    for(var m = month; m<12; m++) {
                                        for(var d = day; d<31; d++) {
                                            for(var i = 0; i<ents.length; i++) {
                                                for (var o in ents[i].timeline.dates) {
                                                    //if (typeof(ents[i].timeline.dates[o]) === '[object Array]]') {
                                                    if (!jQuery.isArray(ents[i].timeline.dates[o])) {
                                                        console.log(ents[i].timeline.dates);
                                                    }
                                                }
                                                /*
                                                if (typeof(ents[i].timeline.dates[y+'.'+m+'.'+d]) !== 'undefined') {

                                                    //var ev = ents[i].timeline.dates[y+'.'+m+'.'+d];
                                                //if (ev != undefined) {
                                                    if (ev.birth != undefined) {
                                                        console.log(ents[i].character.aName + ' born ' + ev.birth);
                                                        ents[i].character.birth = ev.birth;
                                                        
                                                        ents[i].$add('status', {
                                                            id: 'alive',
                                                            date: y+'.'+m+'.'+d
                                                        })
                                                    } else if (ev.death != undefined) {
                                                        console.log(ents[i].character.aName + ' died '+ y+'.'+m+'.'+d +' '+ ev.death.death_reason);
                                                        if (!ents[i].$has('status')) {
                                                            ents[i].$add('status', {
                                                                id: 'dead',
                                                                date: y+'.'+m+'.'+d
                                                            })
                                                        } else {
                                                            ents[i].status.id = 'dead';
                                                        }
                                                    }
                                                }*/
                                            //}
                                            /*
                                        }
                                    }
                                }*/
                                for (i in ents.length) {
                                    var e = ents[i];
                                    if (e.character.father != 'undefined') {
                                        var fatherId = e.character.father;
                                        //console.log(world.$getByName(fatherId.toString()).character.aName);
                                        
                                        
                                        e.character.father = world.$getByName(fatherId);
                                        if (e.character.father != null ) {
                                            e.character.father.character.sons.push(e);
                                        }
                                    }
                                }
                                var balon = world.$getByName('1107');
								//balon = ents[0];  
                                selectCharacter(balon);
                                
                            }
                        });
                    }
                }) 
            }
        });

        function selectCharacter (entity) {
            addDom(entity, (width/2)- 64, height/2, 'portrait');

            if(entity.character.father != null) {
                addDom(entity.character.father, (width/4), 90, 'portrait');
            }

/*
            if(entity.character.sons != undefined) {
                var sons = entity.character.sons;
                for (var i in sons) {
                    addDom(sons[i], 0, (height/2)+200, 'portrait');
                }
            }*/
        }

        function addDom(entity, x, y, type) {
            if(!entity.$has('dowView')) {
                entity.$add('domView', {
                    color: '#BBD401'
                })
                entity.$add('ng2D', {
                    x: x,
                    y: y
                })
                entity.$add('ng2DSize', {
                    width: 128, 
                    height: 160 
                })
                entity.$add('solid', {
                    type: type
                })
            } else {
                entity.ng2D.x = x;
                entity.ng2D.y = y;
            }

        }

        function ck2JSON() {
            
            $.ajax({
                url: 'iron_islands.txt',
                success: function(data) {
                    console.log(data);
                }
            })
        }
/*
    	var balon = world.$e('1107', {
    		domView: {color: '#BBD401'},
    		ng2D: {x: (width/2) - 64, y: height /2},
    		ng2DSize: {width: 128, height: 160},
    		solid: {
    			type: 'portrait'
    		},
    		character: {
    			id: 1107,
    			aName: 'Balon',
    			dynasty: 'Greyjoy',

    			father: 107,

    		},
            status: {
                id: 'alive'
            },
    		timeline: {dates: {}}
    	});
    	balon.timeline.dates['8250.1.1'] = 'birth';
        balon.character.birth = '8250.1.1';
    	console.log(balon.character.aName);
    	console.log(balon.timeline.dates['8250.1.1']);

    	var quellon = world.$e('107', {
    		character: {
    			id: 107,
    			aName: 'Quellon',
    			dynasty: 'Greyjoy',

            },
            status: {
                id: 'dead'
            },
    		timeline: {dates: {}}
    	});
*/
    	console.log(world.$numEntities());

    	world.$update();
    });
    return App;
});