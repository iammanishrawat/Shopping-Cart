let shopList = document.getElementById("shopList");

let shopListData = [
    {
        id: "one",
        thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: "549",

    },
    {
        id: "two",
        thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
        title: "iPhone X",
        description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        price: "899",
    },
    {
        id: "three",
        thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
        title: "Samsung Universe 9",
        description: "Samsung's new variant which goes beyond Galaxy to the Universe",
        price: "1429",
    },
    {
        id: "four",
        thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
        title: "OPPO F19",
        description: "OPPO F19 is officially announced on April 2021.",
        price: "280",
    },
    {
        id: "five",
        thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
        title: "Huawei P30",
        description: "Huaweis re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
        price: "499",
    },
];

let basket = JSON.parse(localStorage.getItem("data")) || [] ;

let productData = () => {
    return(shopList.innerHTML = shopListData
        .map((i)=>{
            let {id, thumbnail, title, description, price} = i;
            let search = basket.find((x)=>x.id === id) || [];
            return`
            <div class="inner" id="product-inner-data-${id}">
                <div class="thumbnail">
                    <img src="${thumbnail}"  alt="">
                </div>
                <div class="productName">
                    <h3>${title}</h3>
                </div>
                <div class="productDesc">
                    <p>${description}</p>
                </div>
                <div class="productPrice">
                    <h4>${price}</h4>
                </div>
                <div class="Changer">
                    <div class="minus">
                        <button class="button" onclick="decrement(${id})">-</button>
                    </div>
                    <div class="counter">
                        <p id="${id}">${search.item === undefined ? 0 : search.item}</p>
                    </div>
                    <div class="plus">
                        <button class="button" onclick="increment(${id})">+</button>
                    </div>
                </div>
            </div>
            `
        })
    .join(""));
};

productData();

let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((x)=>x.id === selectedItem.id);
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    // console.log(basket);
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=>x.id === selectedItem.id);

    if(search === undefined)return;
    else if (search.item === 0) return;
    else{
        search.item -= 1;
    }
    // console.log(basket);
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x)=>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation =  () => {
    let cartIcon = document.getElementById("cartCounter");
    // console.log("working fine");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    // console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
};

calculation();