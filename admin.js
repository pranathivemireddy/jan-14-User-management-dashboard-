async function getData() {
    try {
        let response = await fetch('https://long-exultant-roquefort.glitch.me/PRODUCTS')
        if(!response.ok){
            throw new Error('DATA FAILED TO FETCH')
        }
        let result = await response.json()
        // console.log(result)
        getItems(result)
    } catch (err) {
        console.error(err)
    }
}


let itemContainer = document.getElementById('itemContainer')
function getItems(data){
    data.forEach((obj,index) => {
        let productContainer = document.createElement('div')
        productContainer.className = 'productContainer'
        productContainer.innerHTML = `
        <div id='imageContainer'>
            <img src=${obj.image}> 
        </div>
        <div id='productDetails'>
            <h3>${obj.title}</h3>
            <p>Price: ${obj.price}</p>
            <p>Category: ${obj.category}</p>
            <p>Rating: ${obj.rating.rate}</p>
            <p>Count: ${obj.rating.count}</p>
        </div>
        <div id='buttonContainer'>
            <button id='updateBtn-${index}' class='updateBtn'>UPDATE</button>
            <button id='deleteBtn-${index}' class='deleteBtn'>DELETE</button>
        </div>
        `
        itemContainer.appendChild(productContainer)
        let deleteBtn = document.getElementById(`deleteBtn-${index}`)
        deleteBtn.onclick = ()=>{
            deleteData(obj.id)
        }
        let updateBtn = document.getElementById(`updateBtn-${index}`)
        updateBtn.onclick = ()=>{
            updateData(obj.id)
        }
    });
}
//DELETE THE DATA FROM THE DATA BASE
async function deleteData(id){
    let response = await fetch(`https://long-exultant-roquefort.glitch.me/PRODUCTS/${id}`, { "method": "DELETE" });
    try {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        alert("Deleted Successfully");
        getData()
    } catch (error) {
        alert("Something Went Wrong");
        console.error(error);
    }
}

//ADD THE EXISTING PRODUCT DATA TO INPUT FEILDS
async function updateData(id){
    let productId = document.getElementById('productID')
    let titleEl = document.getElementById('title')
    let categoryEl = document.getElementById('category')
    let URLEl = document.getElementById('URL')
    let priceEl = document.getElementById('price')
    let rateEl = document.getElementById('rate')
    let countEl = document.getElementById('count')
    let response = await fetch(`https://long-exultant-roquefort.glitch.me/PRODUCTS/${id}`);
    try {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        let product = await response.json();
        productId.value = product.id
        console.log(productId.value)
        titleEl.value = product.title;
        console.log(titleEl.value)
        categoryEl.value = product.category;
        URLEl.value = product.image;
        priceEl.value =product.price
        rateEl.value = product.rating.rate
        countEl.value = product.rating.count
    } catch (error) {
        console.error(error)
    }
}

//UPDATES THE DATA OF EXISTING PRODUCTS IN THE DATABASE
async function submitData(){
    let productId = document.getElementById('productID').value
    console.log(productId)
    let titleEl = document.getElementById('title').value
    console.log(titleEl)
    let categoryEl = document.getElementById('category').value
    let URLEl = document.getElementById('URL').value
    let priceEl = document.getElementById('price').value
    let rateEl = document.getElementById('rate').value
    let countEl = document.getElementById('count').value

    let obj = {
        'title':titleEl,
        'category':categoryEl,
        'image':URLEl,
        'price':priceEl,
        'rating':{
            'rate':rateEl,
            'count':countEl
        }
    }
    let methodType = productId ? 'PUT':'POST'
    let URL = productId ?`https://long-exultant-roquefort.glitch.me/PRODUCTS/${productId}`:`https://long-exultant-roquefort.glitch.me/PRODUCTS`

    let result = await fetch(URL,{
        "method":methodType,
        "headers":{
            'Content-Type':'application/json'
        },
        "body":JSON.stringify(obj)
    })
    try {
        if (!result.ok) {
            throw new Error(result.statusText);
        }
        alert("Data Updated Succesfully");
        titleEl.value='';
        getData();
    } catch (error) {
        console.error('DATA FAILED TO FETCH',error);
    }
}

getData();