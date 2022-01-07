console.log('fetching data')

const performApiAction = method => {
    if(method==="POST") {
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
        if(!navigator.onLine){alert("Please check your internet connection")}
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
            .then(data => append_table(data))
        
        // append function to append on successful response
        function append_table(data) {
            const table=document.getElementById('data');
                    const tr = document.createElement('tr');
                    tr.innerHTML = '<td>' + data['title'] + '</td>' +
                    '<td>' + data['body'] + '</td>';
                    table.appendChild(tr);
                    alert("Value added successfully scroll down to check")
                    document.querySelector(".popup").style.display="none";
                    
        }
    } else if(method==="GET") {
        url="https://jsonplaceholder.typicode.com/posts";
        if(!navigator.onLine){alert("Please check your internet connection")}
        fetch(url).then((response)=>{
            if(!response.ok){
            alert("Could not fetch details from the API. Please check the URL")
        }
            return response.json();
        }).then((data)=>{
            console.log(data)
            if(data.length > 0){
                var temp = ''      
                //var is used here as the value of temp will change as and when it fetches new entries from the api. 
                //Thus temp has global scope and if anywhere in the code, temp is used, it will be overwritten by the value it is specified here.
                for (key in data) {
                    temp += `
                        <tr>
                            
                            <td> ${data[key].title} </td>
                            <td> ${data[key].body} </td>
                        </tr>            
                    `
                }
                //  displaying the data in tabular format 
                document.getElementById("data").innerHTML=temp; 
            }
        }).catch(error =>{
            console.log(error)
        });
    } else console.log('error in api action');
};

performApiAction('GET');
