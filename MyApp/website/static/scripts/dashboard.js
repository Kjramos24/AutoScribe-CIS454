// This function sends information to the server and then deletes it
function deleteSource(title, link, desc, result_id) {
    console.log(title, link, desc, result_id)
      fetch('/delete-source', {
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