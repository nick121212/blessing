/**
 * Created by NICK on 16/8/10.
 */

import * as d3 from 'd3';

export class D3Controller {
    static $inject = ["$stateParams"];

    constructor(private $stateParams: ng.ui.IStateParamsService) {
        let i = 0;
        const width = innerWidth || Math.max(960, innerWidth),
            height = innerHeight || Math.max(500, innerHeight);
        const svg = d3.select("#homed3");

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

        function particle() {
            var m = d3.mouse(this);

            svg.insert("circle", "rect")
                .attr("cx", m[0])
                .attr("cy", m[1])
                .attr("r", 1e-6)
                .style("stroke", d3.hsl((i = (i + 1) % 360), 1, 0.5).toString())
                .style("stroke-opacity", 1)
                .transition()
                .duration(2000)
                .ease(Math.sqrt)
                .attr("r", 100)
                .style("stroke-opacity", 1e-6)
                .remove();

            (d3.event as Event).preventDefault();
        }
    }
}