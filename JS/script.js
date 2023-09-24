document
  .getElementById("starForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the input fields
    const star1RA = parseFloat(document.getElementById("star1RA").value);
    const star1Dec = parseFloat(document.getElementById("star1Dec").value);
    const star2RA = parseFloat(document.getElementById("star2RA").value);
    const star2Dec = parseFloat(document.getElementById("star2Dec").value);

    // Calculate Delta Dec and Delta RA
    const deltaDec = star2Dec - star1Dec;
    const deltaRA = star2RA - star1RA;

    // Determine star positions
    const decPosition = deltaDec < 0 ? "lower" : "higher";
    const raPosition = deltaRA < 0 ? "to the right" : "to the left";

    // Display results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p>Delta Dec = ${deltaDec.toFixed(2)}</p>
        <p>Delta RA = ${deltaRA.toFixed(2)}</p>
        <p>The second star is ${decPosition} than the first star.</p>
        <p>The second star is ${raPosition} of the first star.</p>
    `;
  });
