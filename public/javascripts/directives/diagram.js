app.directive('diagram', function (d3Service) {
	var margin = { top: 20, right: 120, bottom: 20, left: 120 },
		width = 960 - margin.right - margin.left,
		height = 800 - margin.top - margin.bottom;


	return {
		restrict: 'E',
		scope: { data: '=data'},
		link: function (scope, ele, attrs) {
			//must have value field as an attribute
			d3Service.d3().then(function (d3) {
				var rectW = 60,
					rectH = 30;

				var tree = d3.layout.tree().nodeSize([70, 40]);
			
				var diagonal = d3.svg.diagonal()
					.projection(function (d) {
						return [d.x + rectW / 2, d.y + rectH /2];
					});

				var svg = d3.select(ele[0]).append("svg").attr('width', 1000).attr('height', 1000);

				function render(data) {
					var nodes = tree.nodes(data).reverse(),
						links = tree.links(nodes);

					nodes.forEach(function (d) {
						d.y = d.depth * 180;
					});
					

					var node = svg.selectAll('g.node')
						.data(nodes, function (d) {
							return d.id;
					});

					var nodeEnter = node.enter().append('g')
						.attr('class', 'node')
						.attr('transform', function (d) {
							return 'translate(' + d.x0 + ',' + d.y0 + ')';
						});

					nodeEnter.append('rect')
						.attr('width', rectW)
						.attr('height', rectH)
						.attr('stroke', 'black')
						.attr('stroke-width', 1)
						.style('fill', function (d) {
							return "red";
						});


					/*var nodeEnter = node.enter().append('g')
						.attr('class', 'node')
						.attr('transform', function (d) {
							return 'translate(' + )
						})
*/
				}

				render(scope.data);
			});
		}
	}			
})