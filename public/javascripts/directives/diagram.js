app.directive('diagram', function (d3Service) {
	var margin = { top: 60, right: 10, bottom: 20, left: 10 },
		width = 1000 - margin.right - margin.left,
		height = 350 - margin.top - margin.bottom;


	return {
		restrict: 'E',
		scope: { data: '=data', onClick: '&'},
		link: function (scope, ele, attrs) {
			//must have value field as an attribute
			d3Service.d3().then(function (d3) {
				var i = 0;
				var tree = d3.layout.tree().nodeSize([100, 200]);
			
				var diagonal = d3.svg.diagonal()
					.projection(function (d) { return [d.x, d.y]; });

				var svg = d3.select(ele[0]).append("svg")
						.attr('width', width + margin.right + margin.left)
						.attr('height', height + margin.top + margin.bottom)
					.append('g')
						.attr('transform', 'translate(' + 450 + ',' + 70 + ')');

				render(scope.data);

				function render(data) {
					var nodes = tree.nodes(data).reverse(),
						links = tree.links(nodes);

					nodes.forEach(function (d) { d.y = d.depth * 100; });

					var node = svg.selectAll('g.node')
						.data(nodes, function (d) { return d.id || (d.id = ++i); });

					var nodeEnter = node.enter().append('g')
					.on('click', function (d, i) {
							return scope.onClick({item: d});
						})
						.attr('class', 'node')
						.attr('transform', function (d) {
							return 'translate(' + d.x + ',' + d.y + ')'; 
						});

					nodeEnter.append('circle')
						.attr('r', 10)
						.style('fill', '#fff');

					nodeEnter.append('text')
						.attr('y', function (d) {
							return d.children || d._children ? -18 : 18; })
						.attr('dy', '.45em')
						.attr('text-anchor', 'middle')
						.text(function (d) { return d.name; })
						.style('fill-opacity', 1);

					var link = svg.selectAll('path.link')
						.data(links, function (d) { return d.target.id; });

					link.enter().insert('path', 'g')
						.attr('class', 'link')
						.attr('d', diagonal);
				}				

			});
		}
	}			
})