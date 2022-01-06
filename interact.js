console.log('fetching data')

// A function to Fetch a list of posts from an api 
function getData()
{
    url="https://jsonplaceholder.typicode.com/posts";
    fetch(url).then((response)=>{
        if(!response.ok){
        alert("Could not fetch details from the API. Please check the URL")
    }
        return response.json();
    }).then((data)=>{
        console.log(data)
        if(data.length > 0){
            var temp="";
            data.forEach(element => {
                temp+="<tr>";
                temp+="<td>"+ element.title +"</td>";
                temp+="<td>"+ element.body +"</td> </tr>";
                 })

                //  displaying the data in tabular format 
            document.getElementById("data").innerHTML=temp; 
        }
    }).catch(error =>{
        console.log(error)
    });
}


// A function to POST the user input to the server and append those details to the table 
getData();
function post_form(){
const user = {
    title:document.getElementById('title').value,
    body:document.getElementById('body').value
};

// request options
const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
}

// Error handling in case of bad server response 
function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
        alert("Your request could not be processed. Please check the URL to which the request is being sent to")
    }
  }


// send POST request
fetch(url, options).then(CheckError)
    .then(data => append_table(data),alert("Value added successfully scroll down to check"))

    // append function to append on successful response
    function append_table(data){
        var table=document.getElementById('data');
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + data['title'] + '</td>' +
                '<td>' + data['body'] + '</td>';
                table.appendChild(tr);
    }
          
}
