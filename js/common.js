(function(darlingjs, darlingutil) {
	'use strict';

	var m = darlingsjs.module('myApp');


	m.$c('ngCollision', {
		fixed: false
	});

	m.$c('ngScan', {
		target: 'ngPlayer'
	});

	m.$c('ngPlayer', {
	});

	m.$c('ngDOM', {
		color: 'rgb(255,0,0)'
	});

	m.$system('ng2DScan', {
		$require: ['ng2D', 'ngScan'],
		$update : ['$nodes', function($nodes) {
	 	//TODO brute-force. just push away after collision
	 	for (var j = 0, lj = $nodes.length; j < lj; j++) {
	 		for ( var i = 0, li = $nodes.length; i < li; i++) {
	 		}
	 	}
	 }]
	})

	m.$system('ngDOMSystem', {
		$require: ['ngDOM', 'ng2D'],
		_targetElementID: 'game',
		_target: null,
		_element: null,
		_style: null,
		$added: function() {
			this._target = this.target;
			if (darlingutil.isUndefined(this._target)) {
				this._target = document.getElementById(this.targetId);
			}
		},
		$addNode: function($entity) {
			var element = document.createElement("div");
			var style = element.style;
			style.position = 'relative';
			$entity._style = style;
			$entity._element = element;
			this._target.appendChild(element);
		},
		$removeNode: function($entity) {
			//TODO:
			this._target.removeChild($entity._element);
		},
		$update: ['$entity', function($entity) {
			var style = $entity._style;
			style.left = $entity.ng2D.x + 'px';
			style.top = $entity.ng2D.y + 'px';
			var ng2DSize = $entity.ng2DSize;
			if (ng2DSize) {
				style.width = ng2DSize.width + 'px';
				style.height = ng2DSize.height + 'px';
			}
			var ng2DRotation = $entity.ng2DRotation;
			if (ng2DRotation) {
				style['-ms-transform'] = style['-o-transform'] = style['-moz-transform'] = style['-webkit-transform'] = 'rotate(' + (ng2DRotation.rotation * 180/Math.PI) + 'deg)';
			}
			style.backgroundColor = $entity.ngDOM.color;
		}]
	});

}) (darlingjs, darlingutil);