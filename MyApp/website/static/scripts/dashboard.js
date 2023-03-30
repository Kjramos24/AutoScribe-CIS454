function changeColor(button) {
  button.style.backgroundColor = "green";
}
// This function sends information to the server and then saves it
function saveSource(title, link, desc, result_id) {
  console.log(title, link, desc, result_id)
  fetch('/save-source', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  title: title,
  link: link,
  desc: desc,
  result_id: result_id
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));
return true;
}
// This function clears the current sources per search
function removeElementsByClass(className) {
  // Document section to remove from
  var currList = document.getElementById("list");
  // Get all child elements with the specified class name
  var elements = currList.getElementsByClassName(className);
  // Iterate over child elements
  var i = elements.length;
  while (i--) {
      var element = elements[i];
      // Remove child element
      element.parentNode.removeChild(element);
  }
}
// This function counts the words in a text box
function countWords(self) {
  var spaces = self.value.match(/\S+/g);  // This is for empty spaces
  var words = spaces ? spaces.length: 0;
  document.getElementById("currLength").innerHTML = words + " words";
  return words;
}
// This function calls the python script to find sources and then sends the results to another function
function findSources() {
  var inputText = document.getElementById("pageInput").value;
  var numWords = countWords(document.getElementById("pageInput"))
  console.log(countWords(document.getElementById("pageInput")))
  // Short texts cannot be processed
  // if (numWords < 100) {
  //     return alert("Cannot find sources. Please input at least 100 words.")
  // }
  // Continue otherwise
  fetch('/dashboard', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({inputText: inputText})
  })
  .then(response => response.json())
  .then(resultList => showResult(resultList))
}
// This function shows the results of the python script to the user in box elements
function showResult(resultList) {
  // Document section to be appended to
  var resultDiv = document.getElementById("list");
  // Iterate through the results from the Python script
  for (var i = 0; i < resultList.length; i++) {
      // Define elements and replace apostrophes with escaped ones
      var title = resultList[i][0].replace(/'/g, "\\'")
      var link = resultList[i][1].replace(/'/g, "\\'")
      var desc = resultList[i][2].replace(/'/g, "\\'")
      var result_id = resultList[i][3].replace(/'/g, "\\'")
      console.log(result_id)
      // Create a form tag to send information
      var innerForm = document.createElement("form")
      innerForm.setAttribute("id", "card" + i)  // Use i as the unique identifier
      innerForm.setAttribute("onsubmit", "return false;")
      // Create a div tag in this section
      var resultItem = document.createElement("div");
      // Make the white squares source-card bg-white m-[10px] h-[150px] rounded-md p-[10px] flex"
      resultItem.setAttribute("class", "source-card bg-white m-[10px] rounded-md p-[10px] flex")
      /////// could be made unique to access for sources or save resultItem.setAttribute("id", "card")
      // Create the main container section
      var innerContent = document.createElement("div")
      innerContent.setAttribute("class", "sc-content")
      // innerContent.setAttribute("style", "height: auto;")
      // Title container
      var titleContainer = document.createElement("div")
      titleContainer.setAttribute("class", "sc-title-expand flex items-center")
      titleContainer.setAttribute("style", "justify-content: center;")
      // Title elements
      var innerTitle = document.createElement("h2")
      innerTitle.setAttribute("class", "font-bold text-base") // mr-[10px] was in
      innerTitle.setAttribute("style", "text-align: center;")
      innerTitle.setAttribute("id", "title")                  // Store the id for the title with identifier
      innerTitle.appendChild(document.createTextNode(title))
      // Add the title elements to the title container and the main container section
      titleContainer.appendChild(innerTitle)
      innerContent.appendChild(titleContainer)
      // Create a break and add it beneath the title element in the container section
      var textBreak = document.createElement("hr")
      textBreak.setAttribute("class", "w-[100%] border-[#797979]")
      innerContent.appendChild(textBreak)
      // Create a small leading text for the link
      var leadText = document.createElement("p")
      leadText.setAttribute("class", "text-[#000000] text-xs mt-[5pt]")
      leadText.setAttribute("style", "text-align: center;")
      leadText.innerHTML="Full source: "
      // "w-[75%] border-[#797979]">
      //         <a class="text-[#040cda] text-sm" href="#">https://meepmoop.com</a>
      //         <p class="w-[90%] text-xs mt-[10px]"
      // Create the link section and add attributes
      var innerLink = document.createElement("a")
      innerLink.setAttribute("class", "text-[#040cda] text-xs")        // Font and size
      innerLink.setAttribute("href", link)                 // Add text from script
      innerLink.setAttribute("target", "_blank")                       // Open link in new tab
      innerLink.setAttribute("rel", "noopener noreferrer")             // Prevent click phishing
      innerLink.setAttribute("id", "link")                         // Store the link with identifier
      innerLink.appendChild(document.createTextNode("click here."))
      // Add the link to the small text line and then the main container section
      leadText.append(innerLink)
      innerContent.appendChild(leadText)
      // Create the description section and add attributes
      var innerDesc = document.createElement("p")
      innerDesc.setAttribute("class", "w-[100%] text-sm mt-[5pt]")
      innerDesc.setAttribute("id", "desc")
      innerDesc.appendChild(document.createTextNode(desc))
      // Add the description to the main container section
      innerContent.appendChild(innerDesc)
      // Create the area where the buttons are going to be shown
      var buttonArea = document.createElement("div")
      buttonArea.setAttribute("class", "button-container m-[5pt]")
      // Create all buttons to save, cite, and see related sources
      var saveButton = document.createElement("button")          // Save button
      saveButton.setAttribute("class", "button")
      saveButton.setAttribute("type", "submit")
      saveButton.setAttribute("onclick", "if (saveSource('" + title + "', '" + link + "', '" + desc + "', '" + result_id + "')) {changeColor(this); }")
      saveButton.innerHTML = "Save"
      var citeButton = document.createElement("button")          // Cite button
      citeButton.setAttribute("class", "button")
      citeButton.setAttribute("type", "submit")
      citeButton.innerHTML = "Cite"
      var relatedButton = document.createElement("button")       // More button
      relatedButton.setAttribute("class", "button")
      relatedButton.setAttribute("type", "submit")
      relatedButton.innerHTML = "More"
      // Add the buttons to the corresponding section
      buttonArea.appendChild(saveButton)
      buttonArea.appendChild(citeButton)
      buttonArea.appendChild(relatedButton)
      // Add the cards to the corresponding document sections
      innerContent.appendChild(buttonArea)
      resultItem.appendChild(innerContent)
      innerForm.appendChild(resultItem)
      resultDiv.appendChild(innerForm)
  }
}