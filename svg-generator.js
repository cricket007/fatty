const jsdom = require("jsdom");
const d3 = require("d3");
const fs = require("fs");

const weightData = require("./src/assets/content/weight.json");
const { JSDOM } = jsdom;

const startWeight = weightData.startWeight;
const goalWeight = weightData.goalWeight;
const currentWeight = weightData.weight[weightData.weight.length - 1].weight;
const lostWeight = weightData.startWeight - currentWeight;
const max = 147.708;
const percentageLost = (lostWeight * 100) / (startWeight - Number(goalWeight));
const dashArrowProgress = (percentageLost * max) / 100;

const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
const body = d3.select(dom.window.document.querySelector("body"));
/*@import url('https://fonts.googleapis.com/css?family=Lato:400,900&text=1234567890.fattykgtimbennikscomlostsince/');*/

const css = `
  @font-face {
    font-family: 'latobold';
    src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff2');
  }
`;

const svg = body
  .append("svg")
  .attr("viewBox", "0 0 100 52.3")
  .attr("width", 1200)
  .attr("height", 628)
  .attr("xmlns", "http://www.w3.org/2000/svg");

const defs = svg.append("defs");
defs.append("style").text(css);

svg
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .style("fill", "#0a1d2d");

const group = svg.append("g").attr("transform", "scale(0.65) translate(26 10)");

group
  .append("path")
  .attr("d", "M 50,50 m -47,0 a 47,47 0 1 1 94,0")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1)
  .attr("fill-opacity", 0);

group
  .append("path")
  .attr("d", "M 50,50 m -47,0 a 47,47 0 1 1 94,0")
  .attr("stroke", "red")
  .attr("stroke-width", 3)
  .attr("fill-opacity", 0)
  .style("stroke-dasharray", `${dashArrowProgress} ${max}`)
  .style("stroke-dashoffset", 0);

group
  .append("text")
  .attr("x", "26")
  .attr("y", "48")
  .style("fill", "#fff")
  .style("font-family", "latobold")
  .style("font-size", "14px")
  .text(`${currentWeight}kg`);

group
  .append("text")
  .attr("x", "38")
  .attr("y", "56")
  .style("fill", "#3590d5")
  .style("font-family", "latobold")
  .style("font-size", "5px")
  .text(`${Number(lostWeight.toFixed(1))}kg lost`);

group
  .append("text")
  .attr("x", "-4")
  .attr("y", "56")
  .style("fill", "#fff")
  .style("font-family", "latobold")
  .style("font-size", "4px")
  .text(`${startWeight}kg`);

group
  .append("text")
  .attr("x", "93")
  .attr("y", "56")
  .style("fill", "#fff")
  .style("font-family", "latobold")
  .style("font-size", "4px")
  .text(`${goalWeight}kg`);

const logo = group
  .append("g")
  .attr("id", "logo")
  .attr("transform", "scale(0.30) translate(140 40)");

logo
  .append("path")
  .attr(
    "d",
    "M26.101 54L27 57.923c.661.048 1.327.077 2 .077s1.339-.029 2-.077L32 54h-5.899zM9.423 39.755c-3.71-6.428-5.711-16.385-5.381-25.473A28.805 28.805 0 000 29c0 8.754 3.885 16.596 10.018 21.914v-8.926c0-.786-.202-1.552-.595-2.233zM53.957 14.233c.339 9.089-1.657 19.054-5.363 25.493a4.414 4.414 0 00-.592 2.226v8.944C54.124 45.579 58 37.745 58 29a28.86 28.86 0 00-4.043-14.767z"
  )
  .style("fill", "#c50d0d");

logo
  .append("path")
  .attr(
    "d",
    "M31.919 54H32l-1 3.924A28.803 28.803 0 0043.692 54a29.041 29.041 0 004.31-3.104v-6.821c-6.845.498-12.745 4.348-16.083 9.925z"
  )
  .style("fill", "#fbce9d");

logo
  .append("path")
  .attr(
    "d",
    "M53.957 14.233a29.133 29.133 0 00-2.043-2.997l-.104-.132a29.231 29.231 0 00-1.093-1.313l-.043-.05a29.126 29.126 0 00-2.529-2.514l-.182-.158a28.312 28.312 0 00-1.218-.998c-.053-.041-.104-.083-.157-.123a29.049 29.049 0 00-2.898-1.949c-.101-.06-.203-.117-.305-.176a29.351 29.351 0 00-1.26-.681c-.1-.051-.199-.104-.3-.154a28.747 28.747 0 00-3.18-1.34c-.142-.05-.285-.097-.428-.145-.418-.14-.841-.271-1.268-.392-.145-.041-.29-.085-.436-.124A28.763 28.763 0 0034.82.583l-.045-.008a28.44 28.44 0 00-1.664-.281C32.94.27 32.768.25 32.596.229a30.534 30.534 0 00-1.292-.131c-.174-.014-.348-.029-.523-.04A30.858 30.858 0 0029 0c-.599 0-1.193.024-1.783.06-.174.011-.346.026-.519.039-.435.034-.867.078-1.297.131-.171.021-.342.041-.512.065-.56.08-1.116.171-1.665.282l-.045.008c-.572.117-1.135.254-1.694.404-.145.039-.289.082-.433.123-.428.122-.852.253-1.271.393-.142.048-.285.094-.426.144a28.8 28.8 0 00-3.183 1.341c-.099.049-.196.101-.295.151-.428.218-.851.446-1.266.684l-.299.172a29.132 29.132 0 00-2.902 1.952l-.151.119c-.417.324-.826.658-1.224 1.004-.06.051-.12.102-.178.154a29.066 29.066 0 00-2.533 2.517l-.039.045c-.379.428-.744.869-1.098 1.319l-.1.127a29.032 29.032 0 00-2.045 3c-.339 9.101 1.664 19.082 5.38 25.522.393.681.596 1.447.595 2.233v2.088c6.846.497 12.745 4.347 16.083 9.924h5.818c3.338-5.577 9.238-9.427 16.083-9.924v-2.076-.048a4.414 4.414 0 01.592-2.226c3.707-6.44 5.703-16.405 5.364-25.494z"
  )
  .style("fill", "#fbce9d");

logo
  .append("path")
  .attr(
    "d",
    "M28.003 32c-9.043 0-13.493 1.104-20.765 3.023.643 1.727 1.372 3.323 2.185 4.732.393.681.596 1.447.595 2.233v2.088c6.846.497 12.745 4.347 16.083 9.924h5.818c3.338-5.577 9.238-9.427 16.083-9.924V42v-.048c-.003-.784.2-1.547.592-2.226.879-1.527 1.66-3.274 2.339-5.169C44.09 32.927 36.289 32 28.003 32z"
  )
  .style("fill", "#fff");

logo
  .append("circle")
  .attr("cx", "29")
  .attr("cy", "21")
  .attr("r", "2")
  .style("fill", "#f7b563");
logo
  .append("circle")
  .attr("cx", "29")
  .attr("cy", "26")
  .attr("r", "1")
  .style("fill", "#f7b563");
logo
  .append("circle")
  .attr("cx", "29")
  .attr("cy", "15")
  .attr("r", "1")
  .style("fill", "#f7b563");
logo
  .append("circle")
  .attr("cx", "25")
  .attr("cy", "26")
  .attr("r", "1")
  .style("fill", "#f7b563");
logo
  .append("circle")
  .attr("cx", "27")
  .attr("cy", "28")
  .attr("r", "1")
  .style("fill", "#f7b563");
logo
  .append("circle")
  .attr("cx", "33")
  .attr("cy", "26")
  .attr("r", "1")
  .style("fill", "#f7b563");
logo
  .append("circle")
  .attr("cx", "31")
  .attr("cy", "28")
  .attr("r", "1")
  .style("fill", "#f7b563");

logo
  .append("path")
  .attr(
    "d",
    "M26.101 54c-3.338-5.577-9.238-9.427-16.083-9.924v6.838A29.02 29.02 0 0014.308 54 28.824 28.824 0 0027 57.924L26.101 54z"
  )
  .style("fill", "#fbce9d");

logo
  .append("path")
  .attr(
    "d",
    "M45.45 36.105a1 1 0 00-.895 1.789L46.767 39l-2.211 1.105a1 1 0 00.894 1.79l2.804-1.402c.091-.263.199-.522.34-.766.296-.514.577-1.062.85-1.624l-3.994-1.998zM13.912 36.553a1.002 1.002 0 00-1.342-.447l-4 2-.01.008c.277.568.562 1.122.862 1.642.135.233.238.479.328.729l2.82 1.41a1 1 0 00.896-1.79L11.254 39l2.211-1.105a1 1 0 00.447-1.342z"
  )
  .style("fill", "#c7cac7");

fs.writeFileSync("./src/assets/weight-graph.svg", body.html());
