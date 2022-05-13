import "./style.css";

import * as d3 from "d3";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const width = window.innerWidth >= 768 ? 500 : 260;
const height = window.innerWidth >= 768 ? 500 : 260;

d3.select(".svgDiagram").attr("width", width).attr("height", height);

const svg = d3.select(".svgDiagram"),
    radius = Math.min(width, height) / 1.9,
    bodyRadius = radius / 23;

const pi = Math.PI;

//Skills color
const colorCustom = [
    "rgb(222, 235, 247)",
    "rgb(198, 219, 239)",
    "rgb(158, 202, 225)",
    "rgb(107, 174, 214)",
    "rgb(66, 146, 198)",
    "rgb(33, 113, 181)",
    "rgb(8, 81, 156)",
    "rgb(8, 48, 107)",
];

const colorCustomLength = colorCustom.length;

const colorsUseds = [];

//Skills name
const fields = [
    {
        radius: 0.2 * radius,
        skill: "HTML5",
    },
    {
        radius: 0.3 * radius,
        skill: "CSS3",
    },
    {
        radius: 0.4 * radius,
        skill: "SCSS",
    },
    {
        radius: 0.5 * radius,
        skill: "Vanilla JS",
    },
    {
        radius: 0.6 * radius,
        skill: "Tailwind",
    },
    {
        radius: 0.7 * radius,
        skill: "Vue.js",
    },
    {
        radius: 0.8 * radius,
        skill: "GreenSock",
    },
    {
        radius: 0.9 * radius,
        skill: "GIT",
    },
];

const arcBody = d3
    .arc()
    .startAngle(function (d) {
        return bodyRadius / d.radius;
    })
    .endAngle(function (d) {
        return -pi - bodyRadius / d.radius;
    })
    .innerRadius(function (d) {
        return d.radius - bodyRadius;
    })
    .outerRadius(function (d) {
        return d.radius + bodyRadius;
    })
    .cornerRadius(bodyRadius);

const arcTextPath = d3
    .arc()
    .startAngle(function (d) {
        return -bodyRadius / d.radius;
    })
    .endAngle(-pi)
    .innerRadius(function (d) {
        return d.radius;
    })
    .outerRadius(function (d) {
        return d.radius;
    });

const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const body = g
    .append("g")
    .attr("class", "bodies")
    .selectAll("g")
    .data(fields)
    .enter()
    .append("g");

body.append("path").attr("d", function (d) {
    return arcBody(d);
});

body.append("path")
    .attr("class", "text-path")
    .attr("id", function (d, i) {
        return "body-text-path-" + i;
    })
    .attr("d", arcTextPath);

const bodyText = body
    .append("text")
    .attr("dy", ".35em")
    .attr("fill", "#FFF")
    .style("font-size", function () {
        return window.innerWidth >= 768 ? "1em" : "0.6em";
    })
    .append("textPath")
    .attr("xlink:href", function (d, i) {
        return "#body-text-path-" + i;
    });

fields.forEach(function (d) {
    d.angle = Math.round(Math.random() * (361 - 0) + 0);
});

//Random skills color & random skills angle
body.style("fill", function () {
    let randomColor = Math.round(Math.random() * (colorCustomLength - 0) + 0);

    while (
        colorsUseds.indexOf(randomColor) !== -1 ||
        randomColor === colorCustomLength
    ) {
        randomColor = Math.round(Math.random() * (colorCustomLength - 0) + 0);
    }

    colorsUseds.push(randomColor);
    return colorCustom[randomColor];
}).attr("transform", function (d) {
    return "rotate(" + d.angle + ")";
});

bodyText
    .attr("startOffset", function (d) {
        return d.angle <= 90 || d.angle > 270 ? "100%" : "0%";
    })
    .attr("text-anchor", function (d) {
        return d.angle <= 90 || d.angle > 270 ? "end" : "start";
    })
    .text(function (d) {
        return d.skill;
    });

//GSAP Animation

gsap.to("#mySkills h2", {
    duration: 1,
    y: 0,
    autoAlpha: 1,
    scrollTrigger: {
        trigger: "#mySkills",
        start: "top center",
    },
});

gsap.to(".skills p", {
    duration: 1,
    delay: 0.5,
    clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
    y: 0,
    scrollTrigger: {
        trigger: "#mySkills",
        start: "top center",
    },
});

gsap.to(".skills .separator span", {
    duration: 1,
    delay: 1,
    width: "20%",
    scrollTrigger: {
        trigger: "#mySkills",
        start: "top center",
    },
});

gsap.to("#mySkills .social a", {
    duration: 1,
    delay: 1.5,
    y: 0,
    autoAlpha: 1,
    stagger: 0.1,
    scrollTrigger: {
        trigger: "#mySkills",
        start: "top center",
    },
});

gsap.to(".svgDiagram", {
    duration: 1,
    delay: 2,
    autoAlpha: 1,
    scrollTrigger: {
        trigger: "#mySkills",
        start: "top center",
    },
});
