export default (url, method = 'GET', callback, body=null) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(null, data);
      } else {
        callback(new Error(`Request failed with status ${xhr.status}`), null);
      }
    }
  };

  xhr.open(method, url);
  if(body){
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(JSON.stringify(body))
  }else{
  xhr.send();
  }
};