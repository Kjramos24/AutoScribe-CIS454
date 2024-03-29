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
  var numWords = countWords(document.getElementById("pageInput"));
  console.log(countWords(document.getElementById("pageInput")));
  // Short texts cannot be processed
  if (numWords < 200) {
      return alert("Cannot find sources. Please input at least 200 words.")
  }
  // Continue otherwise
  fetch('/home', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({inputText: inputText})
  })
  .then(response => response.json())
  .then(resultList => showSearchResult(resultList))
}

// This function calls the python script to find related sources and then sends the results to another function
function findRelatedSources(link) {
  // Continue otherwise
  console.log(link)
  fetch('/more-results', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({link: link})
  })
  .then(response => response.json())
  .then(resultList => showSearchResult(resultList))
}

// This function calls the python script to create source citations
function citeSources(result_id) {
  // Continue otherwise
  console.log(result_id)
  fetch('/cite', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({result_id: result_id})
  })
  .then(response => response.json())
  .then(content => openPopup(content))
}

// This function opens a popup window to display the citation text
function openPopup(content) {
  var popup = document.getElementById('popup');
  popup.innerHTML = `
    <div class="close-btn" onclick="closePopup()">x</div>
    <h1>Citation:</h1>
    <p>${content}</p>
    <button class="copy-all" onclick="copyToClipboard('${content}')">Copy</button>
  `;
  popup.style.display = 'block';
}

// This function closes the popup window
function closePopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
}

// This function copies the contents of the popup window to the user's clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

//Recursive card generation for home.html
function showSearchResult(resultList){
  //identify where to place cards
  var container = document.getElementById("list");

  resultList.forEach((result) => {
    // Unpack elements
    var title = result[0].replace(/'/g, '`').replace(/"/g, '`')
    var link = result[1].replace(/'/g, "`").replace(/"/g, '`')
    var desc = result[2].replace(/'/g, "`").replace(/"/g, '`')
    var result_id = result[3].replace(/'/g, "`").replace(/"/g, '`')
    // Create card element
    console.log(result)
    const card = document.createElement('div');
    card.classList = 'cardbody';

    //making var interchangeable card content
    const content = `
    <div class="source-card bg-white m-[10px] rounded-md p-[10px] flex">
      <div class="sc-content w-[80%]">
        <div class="sc-title-expand flex items-center">
          <h2 class="font-bold text-xl mr-[10px]">${title}</h2>
        </div>
        <hr class= "border-[#797979]">
        <p class= text-[#000000] text-xs mt-[5pt] items-center">Full source: <a class="text-[#040cda] text-sm items-center" target="_blank" rel="noopener noreferrer" href="${link}">click here</a> for more.</p>
        <p class = "text-xs mt-[10px] text-ellipsis">${desc}</p>
      </div>
      <div class="w-[5%]"></div>
      <div class="w-[10%] sc-button items-stretch flex flex-col justify-center"">
        <button onclick="citeSources('${result_id}')">
          <svg class="align-middle"width="63" height="58.5" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="39" height="36" rx="3.5" fill="white" stroke="#E3443B" stroke-width="3"/>
              <path d="M17.1477 33.0746C16.7566 33.0746 16.4202 32.9917 16.1385 32.826C15.8584 32.6586 15.643 32.4266 15.4922 32.13C15.343 31.8333 15.2685 31.492 15.2685 31.1058C15.2685 30.7147 15.3439 30.3717 15.4947 30.0767C15.6471 29.7801 15.8634 29.5489 16.1435 29.3832C16.4235 29.2158 16.7566 29.1321 17.1428 29.1321C17.4759 29.1321 17.7675 29.1926 18.0178 29.3136C18.268 29.4345 18.466 29.6044 18.6119 29.8232C18.7577 30.0419 18.8381 30.2988 18.853 30.5938H17.8537C17.8255 30.4032 17.7509 30.2499 17.63 30.1339C17.5107 30.0162 17.354 29.9574 17.1602 29.9574C16.9961 29.9574 16.8527 30.0021 16.7301 30.0916C16.6091 30.1795 16.5147 30.3079 16.4467 30.4769C16.3788 30.646 16.3448 30.8506 16.3448 31.0909C16.3448 31.3345 16.378 31.5417 16.4442 31.7124C16.5122 31.883 16.6075 32.0131 16.7301 32.1026C16.8527 32.1921 16.9961 32.2369 17.1602 32.2369C17.2811 32.2369 17.3897 32.212 17.4858 32.1623C17.5836 32.1126 17.6639 32.0405 17.7269 31.946C17.7915 31.8499 17.8338 31.7347 17.8537 31.6005H18.853C18.8364 31.8922 18.7569 32.149 18.6143 32.3711C18.4735 32.5915 18.2788 32.7638 18.0302 32.8881C17.7816 33.0124 17.4875 33.0746 17.1477 33.0746ZM19.531 33V29.1818H20.5899V33H19.531ZM20.0629 28.6896C19.9055 28.6896 19.7704 28.6374 19.6578 28.533C19.5467 28.427 19.4912 28.3002 19.4912 28.1527C19.4912 28.0069 19.5467 27.8817 19.6578 27.7773C19.7704 27.6713 19.9055 27.6183 20.0629 27.6183C20.2204 27.6183 20.3546 27.6713 20.4656 27.7773C20.5783 27.8817 20.6347 28.0069 20.6347 28.1527C20.6347 28.3002 20.5783 28.427 20.4656 28.533C20.3546 28.6374 20.2204 28.6896 20.0629 28.6896ZM23.4691 29.1818V29.9773H21.1697V29.1818H23.4691ZM21.6918 28.267H22.7507V31.8267C22.7507 31.9245 22.7656 32.0007 22.7955 32.0554C22.8253 32.1084 22.8667 32.1457 22.9197 32.1673C22.9744 32.1888 23.0374 32.1996 23.1087 32.1996C23.1584 32.1996 23.2081 32.1954 23.2578 32.1871C23.3075 32.1772 23.3456 32.1697 23.3722 32.1648L23.5387 32.9528C23.4857 32.9693 23.4111 32.9884 23.315 33.0099C23.2189 33.0331 23.102 33.0472 22.9645 33.0522C22.7093 33.0621 22.4856 33.0282 22.2933 32.9503C22.1027 32.8724 21.9544 32.7514 21.8484 32.5874C21.7423 32.4233 21.6901 32.2161 21.6918 31.9659V28.267ZM25.858 33.0746C25.4652 33.0746 25.1271 32.995 24.8438 32.8359C24.562 32.6752 24.3449 32.4482 24.1925 32.1548C24.04 31.8598 23.9638 31.511 23.9638 31.1083C23.9638 30.7156 24.04 30.3709 24.1925 30.0742C24.3449 29.7776 24.5595 29.5464 24.8363 29.3807C25.1147 29.215 25.4412 29.1321 25.8157 29.1321C26.0676 29.1321 26.3021 29.1727 26.5192 29.2539C26.7379 29.3335 26.9285 29.4536 27.0909 29.6143C27.255 29.7751 27.3826 29.9773 27.4737 30.2209C27.5649 30.4628 27.6104 30.7462 27.6104 31.071V31.3619H24.3864V30.7056H26.6136C26.6136 30.5531 26.5805 30.4181 26.5142 30.3004C26.4479 30.1828 26.3559 30.0908 26.2383 30.0245C26.1223 29.9566 25.9872 29.9226 25.8331 29.9226C25.6723 29.9226 25.5298 29.9599 25.4055 30.0344C25.2829 30.1074 25.1868 30.206 25.1172 30.3303C25.0476 30.4529 25.012 30.5896 25.0103 30.7404V31.3643C25.0103 31.5533 25.0451 31.7165 25.1147 31.854C25.186 31.9916 25.2862 32.0977 25.4155 32.1722C25.5447 32.2468 25.698 32.2841 25.8754 32.2841C25.993 32.2841 26.1007 32.2675 26.1985 32.2344C26.2963 32.2012 26.38 32.1515 26.4496 32.0852C26.5192 32.0189 26.5722 31.9377 26.6087 31.8416L27.5881 31.9062C27.5384 32.1416 27.4364 32.3471 27.2823 32.5227C27.1299 32.6967 26.9326 32.8326 26.6907 32.9304C26.4504 33.0265 26.1728 33.0746 25.858 33.0746Z" fill="black"/>
              <g clip-path="url(#clip0_0_1)">
                <path d="M30.9713 18.4143L25.4142 23.9714C25.2133 24.1721 24.941 24.2848 24.657 24.2848C24.3731 24.2848 24.1008 24.1721 23.8999 23.9714L12.8713 12.9429C12.8159 12.8899 12.773 12.8252 12.7458 12.7535C12.7186 12.6818 12.7078 12.605 12.7142 12.5286L13.557 7.05714C13.5639 6.92677 13.6188 6.80355 13.7111 6.71123C13.8034 6.61891 13.9266 6.56402 14.057 6.55714L19.5285 5.71429C19.6049 5.70795 19.6817 5.71877 19.7534 5.74595C19.8251 5.77314 19.8898 5.81601 19.9427 5.87143L30.9713 16.9C31.172 17.1009 31.2847 17.3732 31.2847 17.6571C31.2847 17.9411 31.172 18.2134 30.9713 18.4143Z" stroke="black" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17.8715 11.5857C18.266 11.5857 18.5858 11.2659 18.5858 10.8714C18.5858 10.4769 18.266 10.1571 17.8715 10.1571C17.477 10.1571 17.1572 10.4769 17.1572 10.8714C17.1572 11.2659 17.477 11.5857 17.8715 11.5857Z" stroke="black" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_0_1">
                  <rect width="20" height="20" fill="white" transform="translate(12 5)"/>
                </clipPath>
              </defs>
          </svg>
        </button>
        <button onclick="removeElementsByClass('source-card');findRelatedSources('${link}')">
          <svg class="mt-[10px] mb-[10px]" width="63" height="58.5" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="39" height="36" rx="3.5" fill="white" stroke="#E3443B" stroke-width="3"/>
              <path d="M12.4226 34V30.1818H13.4318V30.8555H13.4766C13.5561 30.6317 13.6887 30.4553 13.8743 30.326C14.0599 30.1967 14.282 30.1321 14.5405 30.1321C14.8023 30.1321 15.0252 30.1976 15.2092 30.3285C15.3931 30.4577 15.5157 30.6334 15.5771 30.8555H15.6168C15.6947 30.6367 15.8356 30.4619 16.0394 30.331C16.2449 30.1984 16.4877 30.1321 16.7678 30.1321C17.1241 30.1321 17.4132 30.2456 17.6353 30.4727C17.859 30.698 17.9709 31.0179 17.9709 31.4322V34H16.9144V31.641C16.9144 31.4289 16.8581 31.2698 16.7454 31.1637C16.6327 31.0576 16.4918 31.0046 16.3228 31.0046C16.1306 31.0046 15.9806 31.0659 15.8729 31.1886C15.7652 31.3095 15.7113 31.4695 15.7113 31.6683V34H14.6847V31.6186C14.6847 31.4313 14.6308 31.2822 14.5231 31.1712C14.417 31.0601 14.277 31.0046 14.103 31.0046C13.9853 31.0046 13.8793 31.0344 13.7848 31.0941C13.692 31.1521 13.6183 31.2341 13.5636 31.3402C13.5089 31.4446 13.4815 31.5672 13.4815 31.7081V34H12.4226ZM20.5325 34.0746C20.1464 34.0746 19.8124 33.9925 19.5307 33.8285C19.2507 33.6628 19.0344 33.4324 18.8819 33.1374C18.7295 32.8408 18.6532 32.4969 18.6532 32.1058C18.6532 31.7114 18.7295 31.3667 18.8819 31.0717C19.0344 30.7751 19.2507 30.5447 19.5307 30.3807C19.8124 30.215 20.1464 30.1321 20.5325 30.1321C20.9186 30.1321 21.2517 30.215 21.5318 30.3807C21.8135 30.5447 22.0306 30.7751 22.1831 31.0717C22.3355 31.3667 22.4118 31.7114 22.4118 32.1058C22.4118 32.4969 22.3355 32.8408 22.1831 33.1374C22.0306 33.4324 21.8135 33.6628 21.5318 33.8285C21.2517 33.9925 20.9186 34.0746 20.5325 34.0746ZM20.5375 33.2543C20.7131 33.2543 20.8598 33.2045 20.9775 33.1051C21.0951 33.004 21.1838 32.8665 21.2434 32.6925C21.3047 32.5185 21.3354 32.3204 21.3354 32.0984C21.3354 31.8763 21.3047 31.6783 21.2434 31.5043C21.1838 31.3303 21.0951 31.1927 20.9775 31.0916C20.8598 30.9905 20.7131 30.94 20.5375 30.94C20.3601 30.94 20.211 30.9905 20.09 31.0916C19.9707 31.1927 19.8804 31.3303 19.8191 31.5043C19.7594 31.6783 19.7296 31.8763 19.7296 32.0984C19.7296 32.3204 19.7594 32.5185 19.8191 32.6925C19.8804 32.8665 19.9707 33.004 20.09 33.1051C20.211 33.2045 20.3601 33.2543 20.5375 33.2543ZM23.1003 34V30.1818H24.127V30.848H24.1667C24.2363 30.611 24.3532 30.4321 24.5172 30.3111C24.6813 30.1884 24.8702 30.1271 25.084 30.1271C25.137 30.1271 25.1942 30.1304 25.2555 30.1371C25.3168 30.1437 25.3707 30.1528 25.4171 30.1644V31.104C25.3674 31.0891 25.2986 31.0759 25.2108 31.0643C25.1229 31.0527 25.0426 31.0469 24.9696 31.0469C24.8139 31.0469 24.6747 31.0808 24.552 31.1488C24.431 31.2151 24.3349 31.3079 24.2637 31.4272C24.1941 31.5465 24.1593 31.6841 24.1593 31.8398V34H23.1003ZM27.5269 34.0746C27.1341 34.0746 26.7961 33.995 26.5127 33.8359C26.231 33.6752 26.0139 33.4482 25.8614 33.1548C25.709 32.8598 25.6327 32.511 25.6327 32.1083C25.6327 31.7156 25.709 31.3709 25.8614 31.0742C26.0139 30.7776 26.2285 30.5464 26.5052 30.3807C26.7836 30.215 27.1101 30.1321 27.4846 30.1321C27.7365 30.1321 27.971 30.1727 28.1881 30.2539C28.4069 30.3335 28.5974 30.4536 28.7599 30.6143C28.9239 30.7751 29.0515 30.9773 29.1427 31.2209C29.2338 31.4628 29.2794 31.7462 29.2794 32.071V32.3619H26.0553V31.7056H28.2826C28.2826 31.5531 28.2494 31.4181 28.1831 31.3004C28.1169 31.1828 28.0249 31.0908 27.9072 31.0245C27.7912 30.9566 27.6562 30.9226 27.502 30.9226C27.3413 30.9226 27.1988 30.9599 27.0745 31.0344C26.9519 31.1074 26.8557 31.206 26.7861 31.3303C26.7165 31.4529 26.6809 31.5896 26.6792 31.7404V32.3643C26.6792 32.5533 26.714 32.7165 26.7836 32.854C26.8549 32.9916 26.9552 33.0977 27.0844 33.1722C27.2137 33.2468 27.367 33.2841 27.5443 33.2841C27.662 33.2841 27.7697 33.2675 27.8675 33.2344C27.9652 33.2012 28.0489 33.1515 28.1185 33.0852C28.1881 33.0189 28.2412 32.9377 28.2776 32.8416L29.257 32.9062C29.2073 33.1416 29.1054 33.3471 28.9513 33.5227C28.7988 33.6967 28.6016 33.8326 28.3596 33.9304C28.1193 34.0265 27.8418 34.0746 27.5269 34.0746Z" fill="black"/>
              <path d="M25.6155 15.4615L21.0001 20.0769L16.3848 15.4615" stroke="black" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 27C26.5228 27 31 22.5228 31 17C31 11.4772 26.5228 7 21 7C15.4772 7 11 11.4772 11 17C11 22.5228 15.4772 27 21 27Z" stroke="black" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="bg-[#E3343B] rounded-full" onclick="if (saveSource('${title}', '${link}', '${desc}', '${result_id}')) {changeColor(this);}">
        Save
        </button>
      </div>
    </div>
    `;

    container.innerHTML += content;
  })
}


//Shows group result
//example group
const exGroup = [{
  groupName: "title1",
  numSources: "10 sources",
}, {
  groupName: "title2",
  numSources: "15 sources",
}, {
  groupName: "title1",
  numSources: "13 sources",
}];



function showGroupResult(resultList) {
  //identify where to place cards
  var container = document.getElementById("");

  resultList.forEach((result) => {
    //create card element
    const card = document.createElement('div');
    card.classList = 'cardbody'; 

    //making var interchangeable card content
    const content = `
    <div class="card bg-[#F0F0F0] min-w-[200px] h-[200px] m-[15px] rounded-md overflow-hidden">
            <div class="menu">
              <button class="float-right mr-[10px] mt-[5px]" onclick="toggleCardMenu(this)">
                  <svg width="8.25" height="42" viewBox="0 0 11 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 41.47H10.3675V31.1025H0L0 41.47ZM0 25.9187H10.3675L10.3675 15.5512H0L0 25.9187ZM0 10.3675H10.3675V-2.80458e-05H0L0 10.3675Z" fill="black"/>
                    </svg>                    
              </button>
              <div id = "menu-content" class="hidden menu-content bg-[#FFFFFF] min-w-[100px] shadow-md z-40 mt-[10px] ml-[0px]">
                  <button class="float-none p-[5px] block text-left font-semibold" onclick="showPopUp('edit-popup')">Edit</button>
                  <button class = "float-none p-[5px] block text-left font-semibold" onclick="showPopUp('rename-popup')">Rename</button>
                  <button class = "float-none p-[5px] block text-left font-semibold" onclick="showPopUp('edit-popup')">Add Sources</button>
                  <a class = "float-none p-[5px] block text-left text-[#E3343B] font-semibold"href="">Delete</a>
            </div>
            </div>
            <div class="content mt-[75px] flex justify-center items-center">
              <button class="">
                <h3 class="text-center font-bold">${result.title}</h3>
                <p class="text-center font-medium">${result.numSources}</p>
              </button>
            </div>
          </div>
    `;

    container.innerHTML += content;
  })
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