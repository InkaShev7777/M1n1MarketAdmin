import { useEffect } from "react";
import  axios  from "axios";
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
    </div>
);
}
export default MainPage;


// <div id="tableDiv">
// <table class="table table-striped">
//     <thead>
//       <tr>
//         <th scope="col">ID</th>
//         <th scope="col">Image</th>
//         <th scope="col">Product Name</th>
//         <th scope="col">Model</th>
//         <th scope="col">Price</th>
//         <th scope="col">Quantity</th>
//         <th scope="col">Sold</th>
//         <th scope="col">Status</th>
//         <th scope="col">Update</th>
//         <th scope="col">Delete</th>
//         <th scope="col">ID Category</th>
//       </tr>
//     </thead>
//     <tbody id="Producttablebody">

//     </tbody>
//   </table>
// </div>
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