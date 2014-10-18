
(function() {
    'use strict';

    //create DOM module
    var m = darlingjs.module('charModule', []);

    /**
     * DOM component
     */
    m.$c('character', {
        id: null,
        aName: 'undefined',
        dynasty: null,

        father: null,
        mother: null,
        sons: [],

        birth: null
    });

    m.$c('status', {
        id: null,
        date: null
    });

    m.$c('timeline', {
        dates: {}
    });



    m.$s('lifeSystem', {
        $require: ['character', 'timeline'],

        alives: null,
        deads: null,

        year: null,
        month: null,
        day: null,

        date: null,

        $added: function() {
            this.alives = new darlingutil.List('alives');
            this.deads = new darlingutil.List('deads');
            console.log('Added');
        },

        $addEntity: ['$entity', function($entity) {
            var character = $entity.character;
            console.log('Added Entity');
            for (var key in $entity.timeline.dates) {
                console.log(key);
                if ($entity.timeline.dates[key] == 'birth') {
                    character.birth = 'alive';
                    $entity.$add('status', {
                        id: 'alive' 
                    });
                }
            }
            $entity.$add('status', {
                        id: 'alive' 
                    });

            if((character.birth != null) && ($entity.status.id != 'dead')) {
                this.alives.add($entity);
            } else {
                this.deads.add($entity);
            }
        }],

        $update: ['$entity', function($entity) {
            console.log($entity.character.aName)
        }]
    });

})();