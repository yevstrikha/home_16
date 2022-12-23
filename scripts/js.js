let cartInformation;
let shopping = [];
document.querySelector('#cart').addEventListener('click', showList);

function showCategories() {
    const container = document.querySelector('.categories');

    for (let i = 0; i < data.length; i++) {
        document.querySelector('#order_list').style.display = 'none'

        const elem = document.createElement('div');
        elem.textContent = data[i].name;
        elem.setAttribute('data-category', i);
        elem.addEventListener('click', showProducts);
        container.appendChild(elem);
    }
}

// handler of click on categories
function showProducts(event) {
    const categoryIndex = event.target.getAttribute('data-category');
    const products = data[categoryIndex].products;
    const container = document.querySelector('.products');
    container.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        const elem = document.createElement('div');
        elem.textContent = products[i].name;
        elem.setAttribute('data-product', i);
        elem.setAttribute('data-category', categoryIndex);
        elem.addEventListener('click', showDetails);
        container.appendChild(elem);
    }
}

function showDetails(event) {
    const container = document.querySelector('.details');
    container.innerHTML = '';

    const categoryIndex = event.target.getAttribute('data-category');
    const productIndex = event.target.getAttribute('data-product');

    const info = document.createElement('div');
    const aboutProduct = data[categoryIndex].products[productIndex]

    info.innerText = `Your price is: ${aboutProduct.price} $ \n  Description : ${aboutProduct.description}`;
    container.appendChild(info);
    cartInformation = aboutProduct.name + ' ' + info.innerText
    const buy = document.createElement('button');
    buy.setAttribute('class', 'final');
    buy.textContent = 'Press to buy'
    container.appendChild(buy);
    buy.addEventListener('click', cart)
}

function cart() {
    const submitInfo = document.querySelector('.result');
    submitInfo.classList.add('red');
    shopping.push({value: cartInformation});
    submitInfo.textContent = 'товар куплен';

    console.log(shopping)
    setTimeout(clear, 1000);

    function clear() {
        document.querySelector('.details').innerHTML = '';
        document.querySelector('.products').innerHTML = '';
        submitInfo.textContent = '';
        submitInfo.classList.remove('red');
    }
    localStorage.setItem('inform', JSON.stringify(shopping));

}



function showList() {
    let cartInfo = JSON.parse(localStorage.getItem('inform'));
    const orderList = document.querySelector('#order_list');
    orderList.innerHTML = "";

    const okay = document.createElement('button');
    okay.setAttribute('class', 'okay');
    okay.textContent = 'OK';
    okay.addEventListener('click', backToOrders)
    orderList.appendChild(okay)

    for (let i = 0; i < cartInfo.length; i++) {
        const cartList = document.createElement('li');
        cartList.innerText = cartInfo[i].value ;
        orderList.appendChild(cartList);
        const remove = document.createElement('button');
        cartList.setAttribute('data-index', i);
        remove.setAttribute('del_index', i);
        remove.addEventListener('click', delItem)
        cartList.appendChild(remove);

    }

    function delItem(event) {
        const IndexOfArr = event.target.getAttribute('del_index')
        cartInfo.splice(IndexOfArr, 1);
        const list = document.querySelector('li');
        list.remove();
        localStorage.setItem('inform', JSON.stringify(cartInfo));

    }

    function backToOrders() {
        document.querySelector('#order_list').style.display = 'none';
        document.querySelector('.container').style.display = 'flex';

    }

    document.querySelector('.container').style.display = 'none';
    document.querySelector('#order_list').style.display = "block";

}


showCategories();


// const date = new Date();
// console.log(date)














