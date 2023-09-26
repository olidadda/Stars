// Sample star data (you can expand this with more stars and their coordinates)
const starData = {
  Betelgeuse: { ra: "88.8", dec: "7.4" },
  Bellatrix: { ra: "81.28", dec: "6.35" },
  Epsilon: { ra: "281.08", dec: "39.67" },
  Vega: { ra: "279.23", dec: "38.78" },
  Zeta: { ra: "281.19", dec: "37.60" },
  Delta: { ra: "283.62", dec: "36.90" },
  Sulafat: { ra: "284.73", dec: "32.69" },
  Sheliak: { ra: "282.52", dec: "33.36" },
  KappaSaif: { ra: "86.94", dec: "-9.67" },
  Rigel: { ra: "78.63", dec: "-8.20" },
  Mintaka: { ra: "83.00", dec: "-0.30" },
  EpsilonAlnilam: { ra: "84.05", dec: "-1.20" },
  Alnitak: { ra: "85.19", dec: "-1.94" },
  Heka: { ra: "83.88", dec: "10.00" },
  AlSaif: { ra: "83.86", dec: "-5.91" },
  // ... add more stars as needed
};

document.getElementById("star1Select").addEventListener("change", function () {
  const selectedStar = this.value;
  document.getElementById("star1RA").value = starData[selectedStar].ra;
  document.getElementById("star1Dec").value = starData[selectedStar].dec;
});

// Repeat for Star 2
document.getElementById("star2Select").addEventListener("change", function () {
  const selectedStar = this.value;
  document.getElementById("star2RA").value = starData[selectedStar].ra;
  document.getElementById("star2Dec").value = starData[selectedStar].dec;
});

document
  .getElementById("starForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const star1RA = parseFloat(document.getElementById("star1RA").value);
    const star1Dec = parseFloat(document.getElementById("star1Dec").value);
    const star2RA = parseFloat(document.getElementById("star2RA").value);
    const star2Dec = parseFloat(document.getElementById("star2Dec").value);

    // Calculate Δ Dec and Δ RA
    const deltaDec = star2Dec - star1Dec;
    let deltaRA = star2RA - star1RA;

    // Update the sign of Δ RA after determining the quadrant
    deltaRA = -deltaRA;

    // Determine the quadrant
    let quadrant;
    if (deltaDec >= 0 && deltaRA >= 0) {
      quadrant = "first";
    } else if (deltaDec >= 0 && deltaRA < 0) {
      quadrant = "second";
    } else if (deltaDec < 0 && deltaRA < 0) {
      quadrant = "third";
    } else {
      quadrant = "fourth";
    }

    // Store the quadrant information for later use
    window.starQuadrant = quadrant; // Saving in a global variable for now

    // Calculate the gradient m
    const gradientM = deltaDec / deltaRA;

    // Display results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
    <p><strong><em>Δ</em> Dec</strong> = ${deltaDec.toFixed(2)}</p>
    <p><strong><em>Δ</em> RA</strong> = ${deltaRA.toFixed(2)} <br><br></p>
    <p>The gradient <strong><em>m</em></strong> = ${gradientM.toFixed(2)}</p>
    <p>The second star is located in the <strong> ${quadrant} quadrant </strong> relative to the first star.</p>`;

    // Calculate the angle using arctan
    let angle = Math.atan(gradientM) * (180 / Math.PI); // Convert from radians to degrees

    // Adjust the angle based on the quadrant
    if (quadrant === "second" || quadrant === "third") {
      angle += 180;
    }

    // Display the result
    resultsDiv.innerHTML += `<p>The direction of the second star is at an angle of <strong> ${angle.toFixed(
      2
    )}° </strong> from the first star.</p>`;
  });
