app.directive('pieChart', function (d3Service) {
	return {
		restrict: 'E',
		scope: { data: '=data', valueField: '=valueField', title: '=title' },
		link: function (scope, ele, attrs) {
			//must have value field as an attribute
			d3Service.d3().then(function (d3) {
				var w, h, r, color;
					w = 254;
					h = 160;
					r = Math.min(w, h) / 2;
					color = d3.scale.category20();

				var svg = d3.select(ele[0])
							.append('svg')
							.attr('width', w)
							.attr('height', h)
						.append('g')
							.attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')');

				svg.append('text')
					.attr('dy', '0em')
					.style('text-anchor', 'middle')
					.attr('class', 'chart-title')
					.text(function (d) { return scope.title; })
				
				var arc = d3.svg.arc()
					.innerRadius(r - 30)
					.outerRadius(r - 1);

				var pie = d3.layout.pie()
						.value(function (d) { return d[scope.valueField]; })
						.sort(null);

				var path = svg.selectAll('path');

				scope.$watch(function () {
					return scope.data;
				}, function (n, o) { 
					if (n) {
						scope.render(n); 
					}
				});

				scope.$watch(function () {
					return scope.valueField;
				}, function (n, o) {
					console.log(n);
					pie.value(function (d) { return d[n]; })

					if (scope.data) {
						scope.render(scope.data);
					}
				});

				function findNeighborArc(i, data0, data1, key) {
					var d;
					return (d = findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
						: (d = findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
						: null;
				}

				// Find the element in data0 that joins the highest preceding element in data1.
				function findPreceding(i, data0, data1, key) {
					var m = data0.length;
					while (--i >= 0) {
						var k = key(data1[i]);
						for (var j = 0; j < m; ++j) {
							if (key(data0[j]) === k) return data0[j];
						}
					}
				}

				// Find the element in data0 that joins the lowest following element in data1.
				function findFollowing(i, data0, data1, key) {
					var n = data1.length, m = data0.length;
					while (++i < n) {
					    var k = key(data1[i]);
					    for (var j = 0; j < m; ++j) {
							if (key(data0[j]) === k) return data0[j];
						}
					}
				}

				function arcTween(d) {
					var i = d3.interpolate(this._current, d);
					this._current = i(0);
					return function(t) { return arc(i(t)); };
				}

				scope.render = function (data) {
					var data0 = path.data();
						data1 = pie(data);

					path = path.data(data1, function (d) { return d.data.region; });

					path.enter().append('path')
						.each(function (d, i) { this._current = findNeighborArc(i, data0, data1, function (d) { return d.data.region; }) || d; })
						.attr('fill', function (d) { return color(d.data.region); })

					path.exit()
						.datum(function (d, i) { return findNeighborArc(i, data1, data0, function (d) { return d.data.region; }) || d; })
						.transition()
							.duration(800)
							.attrTween('d', arcTween)
							.remove()

					d3.select('svg text').text(function (d) { return scope.title; });

					path.transition()
						.duration(800)
						.attrTween('d', arcTween);

				};
			})
		}
	}
})