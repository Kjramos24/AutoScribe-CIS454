function findSources() {
    var inputText = document.getElementById("currText").value;
    fetch('/dashboard', {
        method: 'POST',
        body: JSON.stringify({inputText: inputText})
    })
    .then(response => response.json())
    .then(resultList => showResult(resultList))
}

function showResult(resultList) {
    var resultDiv = document.getElementById("resultDiv");
    for (var i = 0; i < resultList.length; i++) {
      var resultItem = document.createElement("p");
      resultItem.innerHTML = resultList[i];
      resultDiv.appendChild(resultItem);
    }
  }
  