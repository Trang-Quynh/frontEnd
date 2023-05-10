const html =`<div class="container" id="LoginSignup">

   <div class="row">
      <div class="col-xl-3 col-lg-4 col-md-5">
         <div class="sidebar-categories">
            <div class="head">Browse Categories</div>

            <div id="category"></div>

         </div>
         <div class="sidebar-filter mt-50">
            <div class="top-filter-head">Product Filters</div>
            <div class="common-filter">
               <div class="head">Brands</div>
                  <div id="brand"></div>
            </div>
            <div class="common-filter">
               <div class="head">Color</div>
               <div id="color"></div>
            </div>
            <div class="common-filter">
               <div class="head">Price</div>
               <div class="price-range-area">
                  <div id="price-range"></div>
                  <div class="value-wrapper d-flex">
                     <div class="price">Price:</div>
                     <span>$</span>
                     <div id="lower-value"></div>
                     <div class="to">to</div>
                     <span>$</span>
                     <div id="upper-value"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="col-xl-9 col-lg-8 col-md-7">
         <!-- Start Filter Bar -->
         <div class="filter-bar d-flex flex-wrap align-items-center">
            <div class="sorting">
               <select>
                  <option value="1">Default sorting</option>
                  <option value="1">Default sorting</option>
                  <option value="1">Default sorting</option>
               </select>
            </div>
            <div class="sorting mr-auto">
               <select>
                  <option value="1">Show 12</option>
                  <option value="1">Show 12</option>
                  <option value="1">Show 12</option>
               </select>
            </div>
            <div class="pagination">
               <a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
               <a href="#" class="active">1</a>
               <a href="#">2</a>
               <a href="#">3</a>
               <a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
               <a href="#">6</a>
               <a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
            </div>
         </div>
         <!-- End Filter Bar -->
         <!-- Start Best Seller -->
         <section class="lattest-product-area pb-40 category-list">
            <div id="product"></div>
         </section>
      </div>
   </div>
</div>`


function showHome() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let listProduct = data.listProduct;
            let listCategory = data.listCategory;
            let listBrand = data.listBrand;
            let listColor = data.listColor
            showNavbarGuest()
            showProductUser(listProduct)
            showCategory(listCategory)
            showBrand(listBrand)
            showColor(listColor)
        }
    })
}
function showHomeAdmin() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            console.log(data)
            let listProduct = data.listProduct;
            let listCategory = data.listCategory;
            let listBrand  = data.listBrand;
            let listColor = data.listColor
            showNavbarAdmin()
            showProductAdmin(listProduct)
            showCategory(listCategory)
            showBrand(listBrand)
            showColor(listColor)
        }
    })
}

function showHomeUser() {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            console.log(data)
            let listProduct = data.listProduct;
            let listCategory = data.listCategory;
            let listBrand  = data.listBrand;
            let listColor = data.listColor
            showNavbarUser()
            showProductUser(listProduct)
            showCategory(listCategory)
            showBrand(listBrand)
            showColor(listColor)
        }
    })
}


function show(){
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role')
    if(token){
        if(role === 'admin'){
            showHomeAdmin()
        }else if(role === 'user'){
            showHomeUser()
        }
    }else{
        showHome();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    show()
});



function showProductUser(listProduct){
    let htmlProduct = `<div class="row">`;
    listProduct.forEach(item =>{
        htmlProduct += `
                 <div class="col-lg-4 col-md-6">
              <div class="single-product">
                <img class="img-fluid" src="${item.image}" alt="">
                <div class="product-details">
                  <h6>${item.name}</h6>
                  <div class="price">
                    <h6>${item.price}</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                  <div class="prd-bottom">

                    <a  class="social-info" onclick="buyProduct(${item.id})" >
                      <span class="ti-bag"></span>
                      <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-heart"></span>
                      <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>        
`
    })
    htmlProduct += `</div>`
    $('#product').html(htmlProduct);
}

function buyProduct(productId, productName){
    console.log(1)
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/product/${productId}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data)=>{
            console.log(data)
        }
    })

}






function showProductAdmin(listProduct){
    let htmlProduct = `<div class="row">`;
    listProduct.forEach(item =>{
        htmlProduct += `
                 <div class="col-lg-4 col-md-6">
              <div class="single-product">
                <img class="img-fluid" src="${item.image}" alt="">
                <div class="product-details">
                  <h6>${item.name}</h6>
                  <div class="price">
                    <h6>${item.price}</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                  <div class="prd-bottom">
                    <a class="social-info" onclick="showFormUpdate(${item.id})">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">update</p>
                    </a>
                    <a class="social-info" onclick="deleteProduct(${item.id})">
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">delete</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>     
             
`
    })
    htmlProduct += `</div>`
    $('#product').html(htmlProduct);
}









function showCategory(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let htmlCategory = `  <ul class="main-categories">`;
            data.listCategory.forEach(item =>{
                htmlCategory += `
					<li class="main-nav-list"><a data-toggle="collapse" onclick="filterByCategory(${item.id})" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable"><span
							class="lnr lnr-arrow-right"></span>${item.name}<span class="number">(53)</span></a>
					</li>	
`
            })
            htmlCategory += ` </ul>`
            $('#category').html(htmlCategory);
        }
    })
}

function showColor(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let htmlColor = `<ul> `;
            data.listColor.forEach(item =>{
                htmlColor += `
							<li class="filter-list"><input class="pixel-radio" type="radio" id="black" name="color" onclick="filterByColor(${item.id})"><label for="black">${item.color}<span>(29)</span></label></li>
`
            })
            htmlColor += `</ul>`
            $('#color').html(htmlColor);
        }
    })
}


function showBrand(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let htmlBrand = `<ul>`;
            data.listBrand.forEach(item =>{
                htmlBrand += `
                <li class="filter-list"><input class="pixel-radio" type="radio" id="black" name="color" onclick="filterByBrand(${item.id})"><label for="black">${item.brand}<span>(29)</span></label></li>
`
            })
            htmlBrand += ` </ul>`
            $('#brand').html(htmlBrand);
        }
    })
}




function filterByCategory(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/category/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (products) => {
            showProductAdmin(products)
        }
    })
}

function filterByColor(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/color/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (products) => {
            showProductAdmin(products)
        }
    })
}

function filterByBrand(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/brand/${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        success: (products) => {
            showProductAdmin(products)
        }
    })
}




function showFilterProduct(products){
    let htmlProduct = `<div class="row">`;
    products.forEach(item =>{
        htmlProduct += `
                 <div class="col-lg-4 col-md-6">
              <div class="single-product">
                <img class="img-fluid" src="${item.image}" alt="">
                <div class="product-details">
                  <h6>${item.name}</h6>
                  <div class="price">
                    <h6>${item.price}</h6>
                    <h6 class="l-through">$210.00</h6>
                  </div>
                  <div class="prd-bottom">

                    <a href="" class="social-info">
                      <span class="ti-bag"></span>
                      <p class="hover-text">add to bag</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-heart"></span>
                      <p class="hover-text">Wishlist</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">compare</p>
                    </a>
                    <a href="" class="social-info">
                      <span class="lnr lnr-move"></span>
                      <p class="hover-text">view more</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>        
`
    })
    htmlProduct += `</div>`
    $('#product').html(htmlProduct);
}
// làm thế nào để sau khi đăng nhập vào rồi thì sau khi tắt trình duyệt đi vẫn ở trang đã login





function showNavbarGuest(){
    let htmlnavbar = `

      <div class="main_menu">
         <nav class="navbar navbar-expand-lg navbar-light main_box">
            <div class="container">
               <!-- Brand and toggle get grouped for better mobile display -->
               <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <!-- Collect the nav links, forms, and other content for toggling -->
               <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                  <ul class="nav navbar-nav menu_nav ml-auto">
                     <li class="nav-item submenu dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false" onclick="showFormLogin()">Login</a>
                     </li>

                     <li class="nav-item submenu dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false" onclick="showFormSignUp()">Signup</a>
                     </li>
                     <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Contact</a>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
      <div class="search_input" id="search_input_box">
      <div class="container">
      <form class="d-flex justify-content-between">
        <input type="text" class="form-control" id="search_input" placeholder="Search Here">
        <button type="submit" class="btn"></button>
        <span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
      </form>
    </div>
  </div>

    `
    $('#navbar').html(htmlnavbar)
}






function showNavbarUser(){
    let htmlnavbar = `
      <div class="main_menu">
         <nav class="navbar navbar-expand-lg navbar-light main_box">
            <div class="container">
               <!-- Brand and toggle get grouped for better mobile display -->
               <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <!-- Collect the nav links, forms, and other content for toggling -->
               <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                  <ul class="nav navbar-nav menu_nav ml-auto">
                     <li class="nav-item"><a class="nav-link" onclick="showCart()">Cart</a></li>
                     <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Shopping history</a>
                     </li>
                     <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Contact</a>
                     </li>
                     <li class="nav-item submenu dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false" onclick="logout()">Logout</a>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
      <div class="search_input" id="search_input_box">
      <div class="container">
      <form class="d-flex justify-content-between">
        <input type="text" class="form-control" id="search_input" placeholder="Search Here">
        <button type="submit" class="btn"></button>
        <span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
      </form>
    </div>
  </div>

    `
    $('#navbar').html(htmlnavbar)
}

function showCart(){
        $.ajax({
        type: 'GET',
        url: `http://localhost:3000/cart`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function(order) {

            let htmlCart = `<div id="replacee" class="Replaceee"><section class="cart_area">
        <div class="container">
            <div class="cart_inner">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th class="text-center align-middle py-3 px-0" style="width: 40px;"><a href="#" class="shop-tooltip float-none text-light" title="" data-original-title="Clear cart"><i class="ino ion-md-trash"></i></a></th>
                            </tr>
                        </thead>
                        <tbody>`;
            order.orderDetail.forEach(item =>{
                htmlCart += `
                             <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="${item.idProduct.image}" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${item.idProduct.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5 id="unitPrice${item.id}">${item.unitPrice}</h5>
                                </td>
                                <td>
                                    <div class="product_count">
                                        <input type="text" name="qty" id="sst${item.id}" maxlength="12" value="${item.quantity}" title="Quantity:"
                                            class="input-text qty">
                                        <button onclick="increaseQuantity(${order.id}, ${item.id})" class="increase items-count" type="button"><i class="lnr lnr-chevron-up"></i></button>
                                        <button onclick="decreaseQuantity(${order.id}, ${item.id})" class="reduced items-count" type="button"><i class="lnr lnr-chevron-down"></i></button>
                                    </div>
                                </td>
                                <td>
                                    <h5 id="totalPrice${item.id}">${item.totalPrice}</h5>
                                </td>
                                <td class="text-center align-middle px-0">
<!--                                    <form action="" method="POST">-->
                                        <button class="shop-tooltip close float-none text-danger"  name="idDelete" onclick="deleteOrderDetail(${item.id})" data-original-title="Remove">×</button>
<!--                                    </form>-->
                                </td>
                            </tr>
`
            })
            htmlCart += `
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                <div id="totalPrice"><h5 >${order.orderTotalPrice}</h5></div>
                                    
                                </td>
                            </tr>
                            <tr class="out_button_area">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="checkout_btn_inner d-flex align-items-center">
                                        <a class="gray_btn" href="#">Continue Shopping</a>
                                        <a class="primary-btn" href="checkout.html">Proceed to checkout</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    </div> 

            `
            $("#LoginSignup").replaceWith(htmlCart);

        }
    });

}


function increaseQuantity(orderId, orderDetailId){
    let result = document.getElementById(`sst${orderDetailId}`);
    let unitPrice = parseInt(document.getElementById(`unitPrice${orderDetailId}`).innerHTML)
    let sst = result.value;
    if( !isNaN( sst )){
        result.value++;
        // return false;
    }
    let quantity = result.value;
    let newTotalPrice = quantity * unitPrice;
    let updateOrderDetail = {
        id:orderDetailId,
        quantity: quantity,
        totalPrice: newTotalPrice
    }
    console.log(quantity)

    document.getElementById(`totalPrice${orderDetailId}`).innerHTML = newTotalPrice;
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/cart/${orderId}`,
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },

        data: JSON.stringify(updateOrderDetail),
        success: (total)=>{
            let html = `<h5 >${total}</h5>`
            $('#totalPrice').html(html)
        }
    })


}





function decreaseQuantity(orderId, orderDetailId){
   let result = document.getElementById(`sst${orderDetailId}`);
    let unitPrice = parseInt(document.getElementById(`unitPrice${orderDetailId}`).innerHTML)
   let sst = result.value;
   if( !isNaN( sst ) && sst > 0 ) {
       result.value--;
       // return false;
   }
    let quantity = result.value;
    let newTotalPrice = quantity * unitPrice;
    let updateOrderDetail = {
        id:orderDetailId,
        quantity: quantity,
        totalPrice: newTotalPrice
    }
    console.log(quantity)
    document.getElementById(`totalPrice${orderDetailId}`).innerHTML = newTotalPrice;
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/cart/${orderId}`,
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },

        data: JSON.stringify(updateOrderDetail),
        success: (total)=>{
            let html = `<h5 >${total}</h5>`
            $('#totalPrice').html(html)
        }
    })

}

function deleteOrderDetail(orderDetailId){
    if(confirm('Ban co chac chan muon xoa khong')) {
        $.ajax({
            type:'DELETE',
            url: `http://localhost:3000/cart/${orderDetailId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: (message)=>{

                $('#replacee').replaceWith(html)
                showCart();
            }
        })
    }
}









function showNavbarAdmin(){
    let htmlnavbar = `

      <div class="main_menu">
         <nav class="navbar navbar-expand-lg navbar-light main_box">
            <div class="container">
             
               <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
               <!-- Collect the nav links, forms, and other content for toggling -->
               <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                  <ul class="nav navbar-nav menu_nav ml-auto">
                     <li class="nav-item"><a class="nav-link" onclick="showFormAdd()">Add Product</a></li>

                     <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false" onclick="logout()">Logout</a>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
      <div class="search_input" id="search_input_box">
      <div class="container">
      <form class="d-flex justify-content-between">
        <input type="text" class="form-control" id="search_input" placeholder="Search Here">
        <button type="submit" class="btn"></button>
        <span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
      </form>
    </div>
  </div>

    `
    $('#navbar').html(htmlnavbar)
}





function showFormAdd(){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/add`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function(data) {
            let listCategoryOptions = data.listCategory.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
            let listColorOptions = data.listColor.map(item => `<option value="${item.id}">${item.color}</option>`).join('');
            let listBrandOptions = data.listBrand.map(item => `<option value="${item.id}">${item.brand}</option>`).join('');

            let htmlFormAdd = `<div id="htmlFormAdd" class="Replaceee">
  <section class="login_box_area section_gap">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="login_box_img" >
          <div id="imgDiv">
         <img class="img-fluid" src="https://cdn.pixabay.com/photo/2013/07/12/17/21/clock-152067_1280.png" alt="">
        </div>

        </div>
      </div>
      <div class="col-lg-6">
        <div class="login_form_inner">
          <h3>Add new product</h3>

          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="name" placeholder="name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'name'">
          </div>
          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="price" placeholder="price" onfocus="this.placeholder = ''" onblur="this.placeholder = 'price'">
          </div>
          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="quantity" placeholder="quantity" onfocus="this.placeholder = ''" onblur="this.placeholder = 'quantity'">
          </div>
          <div class="col-md-12 form-group">
            <input type="file" class="form-control" id="" onfocus="this.placeholder = ''" onblur="this.placeholder = ''"  onchange="uploadImage(event)" >
          </div>
          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="image" >
          </div>
          <div class="form-group">
            <h3>category</h3>
            <select class="form-control" id="category" >
              ${listCategoryOptions}
            </select>
          </div>
          <div class="form-group">
            <h3>color</h3>
            <select class="form-control" id="color" >
              ${listColorOptions}
            </select>
          </div>
          <div class="form-group">
            <h3>brand</h3>
            <select class="form-control" id="brand" >
              ${listBrandOptions}
            </select>
          </div>
          <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick="add()">ADD</button>
          </div>
`
            htmlFormAdd += `
        </div>
      </div>
    </div>
  </div>
</section>
</div>`
            $('#LoginSignup').html(htmlFormAdd)
        }
    });
}






function add(){
    let price = $('#price').val();
    if(price === ''){
        alert('vui long nhap price');
        return false;
    }
    let image = $('#image').val();
    if(image === ''){
        alert('vui long chon file');
        return false;
    }
    let name = $('#name').val()
    if(name === ''){
        alert('vui long nhap name');
        return false;
    }
    let quantity = $('#quantity').val()
    if(quantity === ''){
        alert('Vui long nhap price');
        return false;
    }
    let category = $('#category').val()
    let color = $('#color').val()
    let brand = $('#brand').val()
    let product = {
        name: name,
        price: price,
        quantity: quantity,
        image: image,
        category: category,
        color: color,
        brand: brand
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/products/add',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data: JSON.stringify(product),
        success: (message) => {


            $('#htmlFormAdd').replaceWith(html);
            showHomeAdmin()
        }
    })
}






function showFormUpdate(id){
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/products/update/${id}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function(data) {
            let listCategoryOptions = data.listCategory.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
            let listColorOptions = data.listColor.map(item => `<option value="${item.id}">${item.color}</option>`).join('');
            let listBrandOptions = data.listBrand.map(item => `<option value="${item.id}">${item.brand}</option>`).join('');

            let htmlFormUpdate = ` <div id="htmlFormUpdate" class="Replaceee">
  <section class="login_box_area section_gap">
  <div class="container">
    <div class="row">
      <div class="col-lg-6">
        <div class="login_box_img">
        <div id="imgDiv">
         <img class="img-fluid" src="${data.product[0].image}" alt="">
        </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="login_form_inner">
          <h3>Update product</h3>

          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="name" value="${data.product[0].name}">
          </div>
          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="price" value="${data.product[0].price}">
          </div>
           <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="quantity" value="${data.product[0].quantity}">
          </div>
          <div class="col-md-12 form-group">
            <input type="file" class="form-control" onchange="uploadImage(event)" >
          </div>
          <div class="col-md-12 form-group">
            <input type="text" class="form-control" id="image" >
          </div>
          <div class="form-group">
            <h3>category</h3>
            <select class="form-control" id="category" >
              ${listCategoryOptions}
            </select>
          </div>
          <div class="form-group">
            <h3>color</h3>
            <select class="form-control" id="color" >
              ${listColorOptions}
            </select>
          </div>
          <div class="form-group">
            <h3>brand</h3>
            <select class="form-control" id="brand" >
              ${listBrandOptions}
            </select>
          </div>
          <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick="update(${data.product[0].id})">Update</button>
          </div>
`
            htmlFormUpdate += `
        </div>
      </div>
    </div>
  </div>
</section>
</div>`
            $('#LoginSignup').html(htmlFormUpdate)


        }
    });
}

function update(id){
    let price = $('#price').val();
    if(price === ''){
        alert('vui long nhap price');
        return false;
    }
    let image = $('#image').val();
    if(image === ''){
        alert('vui long chon file');
        return false;
    }
    let name = $('#name').val();
    if(name === ''){
        alert('vui long nhap name');
        return false;
    }
    let quantity = $('#quantity').val();
    if(quantity === ''){
        alert('vui long nhap quantity');
        return false;
    }

    let category = $('#category').val();
    let color = $('#color').val();
    let brand = $('#brand').val();
    let productToUpdate = {
        name: name,
        price: price,
        quantity: quantity,
        image: image,
        category: category,
        color:color,
        brand:brand
    }
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/products/update/${id}`,
        headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        data:JSON.stringify(productToUpdate),
        success: (message)=>{
            console.log('message' + message)
        $('#htmlFormUpdate').replaceWith(html)

            showHomeAdmin()
        }
    })
}


function showNavbarSignInSignUp(){
    let htmlnavbarSignUp = `
<header class="header_area sticky-header">
      <div class="main_menu">
         <nav class="navbar navbar-expand-lg navbar-light main_box">
            <div class="container">
          
               <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
               </button>
              
               <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                  <ul class="nav navbar-nav menu_nav ml-auto">
                     <li class="nav-item"><a class="nav-link" href="index.html">Home Page</a></li>

                     <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">abc</a>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </div>
   </header>
    `
    $('#navbar').html(htmlnavbarSignUp)
}
function showFormSignUp(){
    showNavbarSignInSignUp();

    let htmlFormSignUp = `
    <section class="login_box_area section_gap">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="login_box_img">
            <img class="img-fluid" src="img/login.jpg" alt="">
            <div class="hover">
              <h4>abc</h4>
              <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
              <button class="primary-btn" onclick="showFormLogin()">Have you have an account</button>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="login_form_inner">
            <h3>Sign up to enter</h3>

              <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="username"  placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'">
              </div>
              <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
              </div>
              <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="role" placeholder="role" value="user">
              </div>
              <div class="col-md-12 form-group">
                <div class="creat_account">
                  <input type="checkbox" id="f-option2" name="selector">
                  <label for="f-option2">Keep me logged in</label>
                </div>
              </div>
              <div class="col-md-12 form-group">
                <button  value="submit" class="primary-btn" onclick="signup()">Signup</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
   `
    $('#LoginSignup').html(htmlFormSignUp)
}
function signup(){
    let username = $('#username').val();
    let password = $('#password').val();
    let role = $('#role').val();
    let user = {
        username: username,
        password: password,
        role: role,
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/users/signup`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(user),
        success: (message)=>{
            console.log(message)
            if (message === 'Đã có tài khoản') {
                alert('tai khoan da co');
            } else if(message === 'Dien thieu'){
                alert('Vui long nhap du')
            }else{
                alert('Tao tai khoan thanh cong');
                showFormLogin()
            }
        }
    })
}

function showFormLogin(){
    showNavbarSignInSignUp()
    let htmlFormLogin = `
    <section class="login_box_area section_gap" id="replace">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="login_box_img">
            <img class="img-fluid" src="img/login.jpg" alt="">
            <div class="hover">
              <h4>New to our website?</h4>
              <p>There are advances being made in science and technology every day, and a good example of this is the</p>
              <button class="primary-btn" onclick="showFormSignUp()">Create an Account</button>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="login_form_inner">
            <h3>Log in to enter</h3>

              <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="username"  placeholder="Username" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Username'">
              </div>
              <div class="col-md-12 form-group">
                <input type="text" class="form-control" id="password" placeholder="Password" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Password'">
              </div>
              <div class="col-md-12 form-group">
                <div class="creat_account">
                  <input type="checkbox" id="f-option2" name="selector">
                  <label for="f-option2">Keep me logged in</label>
                </div>
              </div>
              <div class="col-md-12 form-group">
                <button  value="submit" class="primary-btn" onclick="login()">Signup</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
   
`
    $('#LoginSignup').html(htmlFormLogin);
}

function login(){
    let username = $('#username').val();
    let password = $('#password').val();
    let user = {
        username: username,
        password: password,
    }
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/users/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(user),
        success: (message)=>{
            console.log(message)
            if(message === 'Username is not exits'){
                alert('Username is not exits')
            }else if(message === 'Password is wrong'){
                alert('Password is wrong')
            }else{
                let token = message.token
                let role = message.role
                localStorage.setItem('token', token)
                localStorage.setItem('role', '')
                let newValue = role;
                if(role === 'admin'){
                    localStorage.setItem("role", newValue);
                }else{
                    localStorage.setItem('role', newValue)
                }

                let replaceHtml = `
   <div class="container" id="LoginSignup">

  <div class="row">
    <div class="col-xl-3 col-lg-4 col-md-5">
      <div class="sidebar-categories">
        <div class="head">Browse Categories</div>

        <div id="category"></div>

      </div>
      <div class="sidebar-filter mt-50">
        <div class="top-filter-head">Product Filters</div>
        <div class="common-filter">
          <div class="head">Brands</div>
            <div id="brand"></div>
        </div>
        <div class="common-filter">
          <div class="head">Color</div>
          <div id="color"></div>
        </div>
        <div class="common-filter">
          <div class="head">Price</div>
          <div class="price-range-area">
            <div id="price-range"></div>
            <div class="value-wrapper d-flex">
              <div class="price">Price:</div>
              <span>$</span>
              <div id="lower-value"></div>
              <div class="to">to</div>
              <span>$</span>
              <div id="upper-value"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-9 col-lg-8 col-md-7">
     
      <div class="filter-bar d-flex flex-wrap align-items-center">
        <div class="sorting">
          <select>
            <option value="1">Default sorting</option>
            <option value="1">Default sorting</option>
            <option value="1">Default sorting</option>
          </select>
        </div>
        <div class="sorting mr-auto">
          <select>
            <option value="1">Show 12</option>
            <option value="1">Show 12</option>
            <option value="1">Show 12</option>
          </select>
        </div>
        <div class="pagination">
          <a href="#" class="prev-arrow"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></a>
          <a href="#" class="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#" class="dot-dot"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
          <a href="#">6</a>
          <a href="#" class="next-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
  
      <section class="lattest-product-area pb-40 category-list">
        <div id="product"></div>
      </section>
    </div>
  </div>
</div> `
                if(role === 'user'){
                    $("#replace").replaceWith(replaceHtml);
                   showHomeUser()
                }else if(role === 'admin'){
                    $("#replace").replaceWith(replaceHtml);
                    showHomeAdmin()
                }

            }
        }
    })
}




function deleteProduct(idDelete){
    console.log(1)
    if(confirm('Ban co muon xoa khong')) {
        console.log(localStorage.getItem('token'))
        $.ajax({
            type:'DELETE',
            url: `http://localhost:3000/products/delete/${idDelete}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            success: (message)=>{
                console.log(message);
                showHomeAdmin()
            }
        })
    }


}
// Chuyển tất cả các id của các div của các form thành cùng một name
// trước khi logout thay html vào id của các thẻ div

function logout(){
    if(!localStorage.token){
        alert('Ban chua dang nhap')
    }else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Da dang xuat thanh cong')
        $(".Replaceee").replaceWith(html);
        showHome()
    }
}


function uploadImage(e) {
    let fbBucketName = 'images';
    let uploader = document.getElementById('uploader');
    let file = e.target.files[0];
    let storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
            uploader.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    break;
                case firebase.storage.TaskState.RUNNING:
                    break;
            }
        }, function (error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        }, function () {
            let downloadURL = uploadTask.snapshot.downloadURL;
            document.getElementById('imgDiv').innerHTML = `<img className="img-fluid" src="${downloadURL}" alt="">`
            document.getElementById('image').value = downloadURL
        });
}


$("#search").on("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let searchTerm = $(this).val();
        let searchTermEncoded = encodeURIComponent(searchTerm)
        $.ajax({
            type: "GET",
            url: `http://localhost:3000/products/search?search=${searchTermEncoded}`,
            headers: {
                'Content-Type': 'application/json',
            },
            success: (products)=> {
                console.log(products)

                let html = `<div id="product" class="row">`;
                products.forEach(item =>{
                    html += `
               <div class="col-lg-3 mb-lg-0 mb-4" style="margin: 20px 0;">
                    <div class="card">
                        <div class="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                            <a href="javascript:;" class="d-block">
                                <img src="${item.image}" class="img-fluid border-radius-lg shadow">
                            </a>
                        </div>
                        <div class="card-body pt-3">
                            <div class="d-flex align-items-center">
                                <div>
                                    <span class="text-sm">${item.category.name}</span>
                                    <h4 class="card-description font-weight-bolder text-dark mb-4">
                                        ${item.name}</h4>
                                </div>
                                <div class="ms-auto">
                                    <a href="javascript:;" class="btn btn-link text-dark p-0">
                                        <i class="fa fa-star text-lg" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="d-flex align-items-center mb-3">
                                <h5 class="mb-0 font-weight-bolder">${item.price}</h5>
                            </div>
<!--                            Chỗ này cho hàm mua hàng vào-->
                           <div id="buttonAddToCart">
                            <button href="javascript:;" class="btn btn-outline-dark mb-0" id="idBy" value="${item.id}" onclick="">Add to cart</button>
                        </div>
                        <div id="buttonDeleteUpdate">
                          <button href="javascript:;" class="btn btn-outline-dark mb-0" id="idDelete" value="${item.id}" onclick="deleteProduct(${item.id})" >Delete</button>
                            <button href="javascript:;" class="btn btn-outline-dark mb-0" id="idUpdate" value="${item.id}" onclick="showFormUpdate(${item.id})">Update</button>
                          </div>
                        </div>
                    </div>
                </div>
      `
                })
                html += `</div>`
                $('#product').html(html);
            },
        });
    }
});

//Check out

function showOrderCheckOut(){
    console.log(1)
    $.ajax({
        type: 'GET',
        url: `http://localhost:3000/cart`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function(order) {
            // let listCategoryOptions = data.listCategory.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
            console.log(order)
            let listOrderDetails = order.orderDetail.map(item => `<li><a href="#">${item.idProduct.name} <span class="middle">X ${item.quantity}</span> <span class="last">${item.totalPrice}</span></a></li>`).join('');
            console.log(listOrderDetails)
            let htmlCart = `<div class="order_box">
                            <h2>Your Order</h2>
                            <ul class="list">
                                <li><a href="#">Product <span>Total</span></a></li>
                                ${listOrderDetails}
                            </ul>
                            <ul class="list list_2">
                                
                                <li><a href="#">Total <span>${order.orderTotalPrice}</span></a></li>
                            </ul>
                            <div class="payment_item">
                                <div class="radion_btn">
                                    <input type="radio" id="f-option5" name="selector">
                                    <label for="f-option5">Check payments</label>
                                    <div class="check"></div>
                                </div>
                                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                    Store Postcode.</p>
                            </div>
                            <div class="payment_item active">
                                <div class="radion_btn">
                                    <input type="radio" id="f-option6" name="selector">
                                    <label for="f-option6">Paypal </label>
                                    <img src="img/product/card.jpg" alt="">
                                    <div class="check"></div>
                                </div>
                                <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                    account.</p>
                            </div>
                            <div class="creat_account">
                                <input type="checkbox" id="f-option4" name="selector">
                                <label for="f-option4">I’ve read and accept the </label>
                                <a href="#">terms & conditions*</a>
                            </div>
                            <a class="primary-btn" href="index.html" onclick="checkOut(${order.id})">Proceed to Paypal</a>
                        </div>`;


            $("#order").replaceWith(htmlCart);

        }
    });

}



function checkOut(orderId){
    alert("Mua hang thanh cong")
    $.ajax({
        type: 'PUT',
        url: `http://localhost:3000/bill/${orderId}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function() {

        }
    });

}




