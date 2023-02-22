import { useEffect } from "react";
import  axios  from "axios";
import './MainPage.css';
function MainPage(){
    useEffect(()=>{
        //
        //      get all category
        //  
        axios({
            method: 'get',
            url: 'https://localhost:7031/api/ControllerClass/GetAllCategory',
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            var secondDivTable = document.getElementById('tableDiv');
            secondDivTable.setAttribute('class','visibleDiv');
            var bodyTable = document.getElementById('tablebody');
            bodyTable.innerHTML = "";
            for (const iterator of data['data']['value']) {
                var tr = document.createElement('tr');
                tr.setAttribute('class','tr_find');
                var td = document.createElement('td');
                td.scope = 'row';
                td.textContent = iterator['id'];
                td.setAttribute('class','findID');
                tr.appendChild(td);
                
                var td2 = document.createElement('td');
                td2.textContent = iterator['title'];
                tr.appendChild(td2);


                //bitton add product
                var tdButton = document.createElement('td');
                var buttonAdd = document.createElement('button');
                buttonAdd.setAttribute('class','buttonAdd');
                buttonAdd.textContent = 'Add Product';
                buttonAdd.addEventListener('click',()=>{
                    console.log(iterator['id']);
                    var mainDivAddProduct = document.getElementsByClassName('MainDiv')[0];
                    var divAddProduct = document.createElement('div');
                    divAddProduct.id = 'AddProductDiv';

                    var h3 = document.createElement('h3');
                    h3.textContent = 'Add Product';
                    var inpTitle = document.createElement('input');
                    inpTitle.placeholder = 'Title product...';
                    var inpModel = document.createElement('input');
                    inpModel.placeholder = 'Model product...';
                    var inpPrice = document.createElement('input');
                    inpPrice.type = 'number';
                    inpPrice.placeholder = 'Price product...';
                    var inpUri = document.createElement('input');
                    inpUri.placeholder = 'URL Photo...';
                    var inpAmount = document.createElement('input');
                    inpAmount.placeholder = 'Amount...';
                    inpAmount.type = 'number';
                    var inpStatus = document.createElement('input');
                    inpStatus.placeholder = 'Status...';
                    var buttonConfirmAddProduct = document.createElement('button');
                    buttonConfirmAddProduct.textContent = 'Confirm';
                    inpTitle.className = 'inpMargin';
                    inpModel.className = 'inpMargin';
                    inpPrice.className = 'inpMargin';
                    inpUri.className = 'inpMargin';
                    inpAmount.className = 'inpMargin';
                    inpStatus.className = 'inpMargin';
                    buttonConfirmAddProduct.className = 'inpMargin';
                    buttonConfirmAddProduct.addEventListener('click',()=>{
                        axios({
                            method: 'post',
                            url: `https://localhost:7031/api/ControllerClass/addProduct`,
                            dataType: "dataType",
                            data:JSON.stringify({
                                id:0,
                                title:inpTitle.value,
                                model:inpModel.value,
                                price:inpPrice.value,
                                idCategory:iterator['id'],
                                uriPhoto:inpUri.value,
                                amount:inpAmount.value,
                                status:inpStatus.value
                            }),
                            headers: {
                                'Accept': '*/*',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+sessionStorage.getItem('token')
                            }
                        }).then(resAdd => {
                            console.log(resAdd);
                        });
                        divAddProduct.remove();
                    });

                    divAddProduct.append(h3);
                    divAddProduct.append(inpTitle);
                    divAddProduct.append(inpModel);
                    divAddProduct.append(inpPrice);
                    divAddProduct.append(inpUri);
                    divAddProduct.append(inpAmount);
                    divAddProduct.append(inpStatus);
                    divAddProduct.append(buttonConfirmAddProduct);
                    mainDivAddProduct.append(divAddProduct);
                });
                tdButton.appendChild(buttonAdd);
                tr.appendChild(tdButton);


                td2.addEventListener('click',()=>{
                    var mainDivFrstTable = document.getElementsByClassName('MainDiv')[0];
                    mainDivFrstTable.id = 'hidden';
                    secondDivTable.setAttribute('class','');
                    axios({
                        method: 'get',
                        url: `https://localhost:7031/api/ControllerClass/GetProductsByID?id=${iterator['id']}`,
                        dataType: "dataType",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                            
                        }
                    }).then(listproduct => {
                        console.log(listproduct);
                        var divProduct = document.getElementById('Producttablebody');
                        for (const iter of listproduct['data']['value']) {
                            var tr = document.createElement('tr');
                            var tdID = document.createElement('td');
                            tdID.textContent = iter['id'];
                            tdID.className = 'iterClass';
                            var tdImg = document.createElement('td');
                            tdImg.textContent = iter['uriPhoto'];
                            tdImg.className = 'iterClass';
                            var tdName = document.createElement('td');
                            tdName.textContent = iter['title'];
                            tdName.className = 'iterClass';
                            var tdModel = document.createElement('td');
                            tdModel.textContent = iter['model'];
                            tdModel.className = 'iterClass';
                            var tdPrice = document.createElement('td');
                            tdPrice.textContent = iter['price'];
                            tdPrice.className = 'iterClass';
                            var tdAmount = document.createElement('td');
                            tdAmount.textContent = iter['amount'];
                            tdAmount.className = 'iterClass';
                            var tdSold = document.createElement('td');
                            tdSold.textContent = Math.floor(Math.random()*10);
                            tdSold.className = 'iterClass';
                            var tdStatus = document.createElement('td');
                            tdStatus.textContent = iter['status'];
                            tdStatus.className = 'iterClass';
                            var tdUpdate = document.createElement('td');
                            var imgUpdate = document.createElement('img');
                            imgUpdate.src = './images-bg.png';
                            imgUpdate.width = 50;
                            tdUpdate.appendChild(imgUpdate);
                            tdUpdate.className = 'buttonUpdate';
                            tdUpdate.id = iter['id'];
                            var tdDelete = document.createElement('td');
                            var imgDelete = document.createElement('img');
                            //
                            //      delete product
                            //
                            imgDelete.addEventListener('click',()=>{
                               
                                axios({
                                    method: 'post',
                                    url: `https://localhost:7031/api/ControllerClass/deleteProduct?id=${iter['id']}`,
                                    dataType: "dataType",
                                    headers: {
                                        'Accept': '*/*',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+sessionStorage.getItem('token')
                                    }
                                }).then(deleteOK => {
                                    console.log(deleteOK);
                                    window.location.reload();
                                });

                            });
                            imgDelete.src = './delete-bg.png';
                            imgDelete.width = 50;
                            tdDelete.appendChild(imgDelete);
                            var tdIdCategory = document.createElement('td');
                            tdIdCategory.textContent = iter['idCategory'];
                            tdIdCategory.className = 'iterClass';

                            //clicks
                            tr.appendChild(tdID);
                            tr.appendChild(tdImg);
                            tr.appendChild(tdName);
                            tr.appendChild(tdModel);
                            tr.appendChild(tdPrice);
                            tr.appendChild(tdAmount);
                            tr.appendChild(tdSold);
                            tr.appendChild(tdStatus);
                            tr.appendChild(tdIdCategory);
                            tr.appendChild(tdUpdate);
                            tr.appendChild(tdDelete);
                            divProduct.append(tr);
                        }
                        // save changes
                        var btnSaveIsOk = false;
                        var butonsUpdate = document.getElementsByClassName('buttonUpdate');
                        var buttonSave = document.createElement('button');
                        buttonSave.textContent = 'Save changes';
                        var listClick = document.getElementsByClassName('iterClass');
                        for(let i = 0;i<butonsUpdate.length;i++){
                           butonsUpdate[i].addEventListener('click',()=>{
                            var countID = listClick.length/9;
                            var idNow = 0;
                            for(let x = 0;x<countID;x++){
                                if(butonsUpdate[i].id === listClick[idNow].innerHTML){
                                    console.log("Now: "+listClick[idNow].innerHTML);
                                    for(let y = idNow+1;y<idNow+9;y++){
                                        listClick[y].setAttribute('contentEditable','true');
                                    }
                                    if(btnSaveIsOk === false){

                                        var divSaveButton = document.getElementById('tableDiv');
                                        buttonSave.addEventListener('click',()=>{
                                            axios({
                                                method: 'post',
                                                url: `https://localhost:7031/api/ControllerClass/updateProduct`,
                                                dataType: "dataType",
                                                data: JSON.stringify({
                                                    id: listClick[idNow].innerHTML,
                                                    title: listClick[idNow+2].innerHTML,
                                                    model: listClick[idNow+3].innerHTML,
                                                    price: listClick[idNow+4].innerHTML,
                                                    idCategory: listClick[idNow+8].innerHTML,
                                                    uriPhoto: listClick[idNow+1].innerHTML,
                                                    amount: listClick[idNow+5].innerHTML,
                                                    status: listClick[idNow+7].innerHTML,
                                                }),
                                                headers: {
                                                    'Accept': '*/*',
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                                                }
                                            }).then(result => {
                                                console.log(result);
                                                buttonSave.remove();
                                            });
                                        });
                                        divSaveButton.append(buttonSave);
                                        btnSaveIsOk = true;

                                    }
                                    return;
                                }
                                idNow+=9;
                            }
                        });
                    }  
                    });
                });
                var td3 = document.createElement('td');
                var imgDelCat = document.createElement('img');
                imgDelCat.src = './delete-bg.png';
                imgDelCat.width = 50;
                imgDelCat.addEventListener('click',()=>{
                    console.log(iterator['id']);
                    axios({
                        method: 'post',
                        url: `https://localhost:7031/api/ControllerClass/deleteCategory?id=${iterator['id']}`,
                        dataType: "dataType",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+sessionStorage.getItem('token')
                        }
                    }).then(deletePost => {
                        console.log(deletePost);
                        window.location.reload();
                    });
                });
                td3.appendChild(imgDelCat);
                tr.appendChild(td3);
                bodyTable.append(tr);
            }
        });
    });
return(
    <div>
        <div className="MainDiv">
        <button id="addCategoryBTN" onClick={()=>{
                var divAddcategory = document.getElementsByClassName('MainDiv')[0];

                var divAddCat = document.createElement('div');
                divAddCat.id = 'AddProductDiv';
                var h3AddCat = document.createElement('h3');
                h3AddCat.textContent = 'Add category';
                var inpAddCat = document.createElement('input');
                inpAddCat.placeholder = 'Title category...';
                inpAddCat.className = 'inpMargin';
                var btnAddCat = document.createElement('button');
                btnAddCat.textContent = 'Confirm';
                btnAddCat.className = 'inpMargin';
                btnAddCat.addEventListener('click',()=>{
                    axios({
                        method: 'post',
                        url: 'https://localhost:7031/api/ControllerClass/addCategory',
                        dataType: "dataType",
                        data:{
                            title: inpAddCat.value
                        },
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+sessionStorage.getItem('token')
                        }
                    }).then(addCat => {
                        console.log(addCat);
                    });
                    divAddCat.remove();
                    window.location.reload();
                });

                divAddCat.append(h3AddCat);
                divAddCat.append(inpAddCat);
                divAddCat.append(btnAddCat);
                divAddcategory.append(divAddCat);
            }}>Add Category</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Add</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="tablebody">
                </tbody>
            </table>
            
        </div>
        <div id="tableDiv">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Model</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sold</th>
                        <th scope="col">Status</th>
                        <th scope="col">ID Category</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="Producttablebody">

                </tbody>
            </table>
        </div>
    </div>
);
}
export default MainPage;



// <div id="AddcategoryDiv">
// <button id="buttonAddCategory">Add Category</button>
// <div  id="DivAddCategory">
// <h3 style="margin-left: 15px;">Add Category</h3>
// <input id="inpCategoryAdd" style="width: 210px;" type="text" placeholder="Title">
// <button id="ConfirmButtonAddCategory" style="margin-left: 30%;margin-top: 20px;">Confirm</button>
// </div>
// </div>
// <div id="ActionDiv">
// <button id="addproduct">Add Product</button>
// <div id="DivAddproduct">
// <h3>Add Product</h3>
// <input  id="titleAddproduct" style="margin-top: 10px;" type="text" placeholder="Title">
// <input  id="modelAddproduct" style="margin-top: 10px;" type="text" placeholder="Model">
// <input  id="priceAddproduct" style="margin-top: 10px;" type="number" min="1" placeholder="Price">
// <input  id="idCatAddproduct" style="margin-top: 10px;" type="number" min="1" placeholder="ID Categoty">
// <input  id="urlAddproduct" style="margin-top: 10px;" type="url" placeholder="Url Picture">
// <input  id="amiuntAddproduct" style="margin-top: 10px;" type="number" min="0" placeholder="Amount">
// <input  id="statusAddproduct" style="margin-top: 10px;" type="text" placeholder="Status">
// <button id="buttonConfirmAddproduct" style="margin-top: 10px;margin-left: 30%;">Confirm</button>
// </div>
// </div>