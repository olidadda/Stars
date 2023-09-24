document
  .getElementById("starForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the input fields
    const star1RA = parseFloat(document.getElementById("star1RA").value);
    const star1Dec = parseFloat(document.getElementById("star1Dec").value);
    const star2RA = parseFloat(document.getElementById("star2RA").value);
    const star2Dec = parseFloat(document.getElementById("star2Dec").value);

    // Calculate Δ Dec and Δ RA
    const deltaDec = star2Dec - star1Dec;
    let deltaRA = star2RA - star1RA;

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

    // Update the sign of Δ RA after determining the quadrant
    deltaRA = -deltaRA;

    // Calculate the gradient m
    const gradientM = deltaDec / deltaRA;

    // Display results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
    <p><strong><em>Δ</em></strong> Dec = ${deltaDec.toFixed(2)}</p>
    <p><strong><em>Δ</em></strong> RA = ${deltaRA.toFixed(
      2
    )} <br><br>(Note: The sign of Δ RA is updated to reflect the right-to-left calculation of Right Ascension and to facilitate subsequent calculations.)</p>
    <p>The gradient <strong><em>m</em></strong> = ${gradientM.toFixed(2)}</p>
    <p>The second star is located in the ${quadrant} quadrant relative to the first star.</p>
`;
  });
