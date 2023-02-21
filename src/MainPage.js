import { useEffect } from "react";
import  axios  from "axios";
import './MainPage.css';
function MainPage(){
    useEffect(()=>{
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
                tr.addEventListener('click',()=>{
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
                            imgDelete.src = './delete-bg.png';
                            imgDelete.width = 50;
                            tdDelete.appendChild(imgDelete);
                            var tdIdCategory = document.createElement('td');
                            tdIdCategory.textContent = iter['idCategory'];
                            tdIdCategory.className = 'iterClass';

                            //clicks

                            

                            // tdUpdate.addEventListener('click',()=>{
                            //     var listClick = document.getElementsByClassName('iterClass');
                            //     console.log(tdUpdate.parentNode);

                            //     tdImg.setAttribute('contentEditable','true');
                            //     tdAmount.setAttribute('contentEditable','true');
                            //     tdIdCategory.setAttribute('contentEditable','true');
                            //     tdModel.setAttribute('contentEditable','true');
                            //     tdName.setAttribute('contentEditable','true');
                            //     tdPrice.setAttribute('contentEditable','true');
                            //     tdSold.setAttribute('contentEditable','true');
                            //     tdStatus.setAttribute('contentEditable','true');
                            //     var buttonSave = document.createElement('button');
                            //     buttonSave.textContent = 'Save changes';
                            //     secondDivTable.append(buttonSave);
                            // });

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
                        var butonsUpdate = document.getElementsByClassName('buttonUpdate');
                            console.log(butonsUpdate);
                            for(let i =0;i< butonsUpdate.length;i++)
                            {
                                butonsUpdate[i].addEventListener('click',()=>{
                                    console.log(butonsUpdate[i].id);
                                    var listClick = document.getElementsByClassName('iterClass');
                                    console.log(listClick);
                                    var flag = 0;
                                    for(let y = 0;y<listClick.length;y++){
                                        if(listClick[y].innerHTML ===  butonsUpdate[i].id){
                                            console.log('id:' + listClick[y].innerHTML);
                                            y+=1;
                                            flag = 1;
                                        }
                                        if(flag !== 0){
                                            if(flag < 9){
                                                console.log('flag' + flag);
                                                listClick[y].setAttribute('contentEditable','true');
                                                flag+=1;
                                                if(flag === 9){
                                                    flag = 1;
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                    for (const it of listClick) {
                                       if(it.id === butonsUpdate[i].id){

                                       }
                                    }
                                });
                                // console.log(butonsUpdate[i].id);
                                
                            }
                        
                    });
                });
                bodyTable.append(tr);
            }
        });
    });
return(
    <div>
        <div className="MainDiv">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
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
        {/* <input type="button" value='Go Back' onClick={()=>{
            window.history.back();
            return false;
            // window.location.reload();
            // return false;
        }}/> */}
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