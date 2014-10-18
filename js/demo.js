(function() {    
    var world = darlingjs.world('myGame', [
        'renderModule'
        ], {
            fps: 60
        }),
    aspectRatio = 1.6,
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


    // renderer

    var dom = world.$add('renderer', {
        target: '#gameStage',
        width: width,
        height: height,
        backgroundColor: '#008B9A'
    });

    world.$e('box', {
        domView: {color: '#BBD401'},
        ng2D: {x: width - 200, y: height/2},
        ng2DSize: {width: 40, height: 40},
        solid: {
            type: 'box'
        }
    });

    
    world.$start();
})();