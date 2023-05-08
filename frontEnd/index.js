function showHome() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/products',
        headers:{
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data) => {
            let listProduct = data.listProduct;
            let listCategory = data.listCategory;
            let listBrand  = data.listBrand;
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

                    <a  class="social-info" onclick="byProduct(${item.id})" >
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

function byProduct(productId, productName){
    console.log(1)
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/product?id=${productId}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (data)=>{
            console.log(data)
        }
    })

}
// có thể truyền tham số là 1 string vào trong hàm không





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
                    <a href="" class="social-info" onclick="">
                      <span class="lnr lnr-sync"></span>
                      <p class="hover-text">update</p>
                    </a>
                    <a href="" class="social-info" onclick="">
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
            showFilterProduct(products)
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
            showFilterProduct(products)
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
            showFilterProduct(products)
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

function showCart(){
        $.ajax({
        type: 'GET',
        url: `http://localhost:3000/cart`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: function(data) {



            $("#cart").replaceWith(orderHtml);




        }
    });

}








function showNavbarAdmin(){
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
                     <li class="nav-item"><a class="nav-link" href="index.html">Add Product</a></li>

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






// function showFormAdd(){
//     $.ajax({
//         type: 'GET',
//         url: `http://localhost:3000/products/add`,
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//         success: function(data) {
//             console.log(data)
//             let htmlFormAdd = `
//   <div class="form-group">
//     <label for="exampleFormControlInput1">name</label>
//     <input type="text" class="form-control" id="name" placeholder="name">
//   </div>
//     <div class="form-group">
//     <label for="exampleFormControlInput1">price</label>
//     <input type="text" class="form-control" id="price" placeholder="price" required>
//   </div>
//    <div class="form-group">
//     <label for="exampleFormControlFile1" >image</label>
//     <input type="file" class="form-control-file" onchange="uploadImage(event)" >
//   </div>
//      <div class="form-group">
//     <label for="exampleFormControlFile1">imageLink</label>
//     <input type="text" class="form-control-file" id="image" >
//   </div>
// <div id="imgDiv"></div>
//  <div class="form-group">
//     <label for="exampleFormControlSelect1" >category</label>
//     <select class="form-control" id="category" >`
//             data.category.forEach(item =>{
//                 htmlFormAdd += `<option value="${item.id}">${item.name}</option>`
//             })
//             htmlFormAdd += `</select>
//             </div>
//             <button type="submit" onclick="add()">submit</button>`
//             $('#product').html(htmlFormAdd)
//         }
//     });
// }
//
//
//
//
//
//
// function add(){
//     let price = $('#price').val();
//     if(price === ''){
//         alert('vui long nhap price');
//         return false;
//     }
//     let image = $('#image').val();
//     if(image === ''){
//         alert('vui long chon file');
//         return false;
//     }
//     let name = $('#name').val()
//     if(name === ''){
//         alert('vui long nhap name');
//         return false;
//     }
//     let category = $('#category').val()
//     let product = {
//         name: name,
//         price: price,
//         image: image,
//         category: category
//     }
//     $.ajax({
//         type: 'POST',
//         url: 'http://localhost:3000/products/add',
//         headers:{
//             'Content-Type':'application/json',
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//         data: JSON.stringify(product),
//         success: (message) => {
//             console.log(message)
//             showHome()
//         }
//     })
// }
//
// function showFormUpdate(id){
//     $.ajax({
//         type: 'GET',
//         url: `http://localhost:3000/products/${id}`,
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//         success: function(data) {
//             console.log(data)
//             let htmlFormUpdate = `
//  <div class="form-group">
//     <label for="exampleFormControlInput1">id</label>
//     <input type="text" class="form-control" id="id" value="${data.product[0].id}">
//   </div>
//   <div class="form-group">
//     <label for="exampleFormControlInput1">name</label>
//     <input type="text" class="form-control" id="name" value="${data.product[0].name}">
//   </div>
//     <div class="form-group">
//     <label for="exampleFormControlInput1">price</label>
//     <input type="text" class="form-control" id="price" value="${data.product[0].price}" >
//   </div>
//    <div class="form-group">
//     <label for="exampleFormControlFile1" >image</label>
//     <input type="file" class="form-control-file" onchange="uploadImage(event)">
//   </div>
//      <div class="form-group">
//     <label for="exampleFormControlFile1">imageLink</label>
//     <input type="text" class="form-control-file" id="image" >
//   </div>
// <div id="imgDiv"></div>
//  <div class="form-group">
//     <label for="exampleFormControlSelect1" >category</label>
//     <select class="form-control" id="category" >`
//             data.category.forEach(item =>{
//                 htmlFormUpdate += `<option value="${item.id}">${item.name}</option>`
//             })
//             htmlFormUpdate += `</select>
//             </div>
//             <button type="submit" onclick="update()">submit</button>`
//             $('#product').html(htmlFormUpdate)
//         }
//     });
// }



// function update(){
//     let id = $('#id').val();
//     let price = $('#price').val();
//     if(price === ''){
//         alert('vui long nhap price');
//         return false;
//     }
//     let image = $('#image').val();
//     if(image === ''){
//         alert('vui long chon file');
//         return false;
//     }
//     let name = $('#name').val();
//     if(name === ''){
//         alert('vui long nhap name');
//         return false;
//     }
//     let category = $('#category').val();
//     let productToUpdate = {
//         id: id,
//         name: name,
//         price: price,
//         image: image,
//         category: category
//     }
//     $.ajax({
//         type: 'PUT',
//         url: `http://localhost:3000/products/${id}`,
//         headers:{
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + localStorage.getItem('token')
//         },
//         data:JSON.stringify(productToUpdate),
//         success: (message)=>{
//             console.log('message' + message)
//             showHome()
//         }
//     })
// }
//

function showNavbarSignInSignUp(){
    let htmlnavbarSignUp = `
<header class="header_area sticky-header">
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
<!--            <form class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">-->
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
<!--                <a href="#">Forgot Password?</a>-->
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
              <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
              <button class="primary-btn" onclick="showFormSignUp()">Create an Account</button>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="login_form_inner">
            <h3>Log in to enter</h3>
<!--            <form class="row login_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">-->
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
<!--                <a href="#">Forgot Password?</a>-->
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
   <div class="row" id="cart">
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
    confirm('Ban cho chac chan muon xoa khong');
    console.log(localStorage.getItem('token'))
    $.ajax({
        type:'DELETE',
        url: `http://localhost:3000/products/${idDelete}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        success: (message)=>{
            console.log(message);
            showHome()
        }
    })
}


function logout(){
    if(!localStorage.token){
        alert('Ban chua dang nhap')
    }else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        alert('Da dang xuat thanh cong')
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
            document.getElementById('imgDiv').innerHTML = `<img src="${downloadURL}" alt="" style='width: 50px; height:50px'>`
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
