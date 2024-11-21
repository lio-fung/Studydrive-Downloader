// Immediately Invoked Function Expression (IIFE) to avoid polluting the global scope
(function() {
  // Log a message to the console to confirm the script has been injected and is running
  console.log("Injected script"); // This helps in debugging by verifying script execution

  // Create a floating "Download" button at the bottom-right corner of the page
  const button = document.createElement("button"); // Create a new button element
  button.innerHTML = "Download"; // Set the button's label to "Download"
  // Apply CSS styles to position and style the button appropriately
  button.style = "position: fixed; bottom: 10px; right: 10px; z-index: 1000; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;";
  document.body.appendChild(button); // Add the button to the webpage's body

  // Add a click event listener to the button to trigger the download function
  button.addEventListener("click", () => {
    downloadPDF(); // Call the function to download the PDF when clicked
  });

  // Function to handle the PDF download process
  function downloadPDF() {
    // Access the PDF data from the PDF.js viewer used by the website
    window.PDFViewerApplication.pdfDocument.getData().then( data => {
      const downloadLink = document.createElement("a"); // Create a temporary anchor element
      const fileName = getDocName(); // Get the document's name to use as the file name
      // Create a Blob URL containing the PDF data
      downloadLink.href = window.URL.createObjectURL(new Blob([data], {type: "application/pdf"}));
      downloadLink.download = fileName; // Set the desired file name for the download
      downloadLink.click(); // Programmatically click the link to initiate the download
    })
  }

  // Function to retrieve the document's name from the page
  function getDocName() {
    const docName = document.querySelector("h1").textContent; // Get the text content of the first <h1> element
    if(docName === "")
      return "document.pdf"; // Return a default name if no name is found
    
    if(!docName.endsWith(".pdf"))
      return `${docName}.pdf`; // Append ".pdf" if it's not already included
    else
      return docName; // Return the document name as is
  }

})(); // Execute the function immediately