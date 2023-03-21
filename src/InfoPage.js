import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
function InfoPage() {
    console.log();
    var mainDivFrstTable = document.getElementsByClassName('MainDiv')[0];
    const listCategory = [];
    var selectIDCat = -1;
    // const [listCategory, setlist] = useState([]);
    // mainDivFrstTable.id = 'hidden';
    // secondDivTable.setAttribute('class','');

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://marketuser.azurewebsites.net/api/ControllerClass/GetAllCategory',
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(catList => {
            listCategory.push(catList);
            // setlist(catList['data']['value']);
            axios({
                method: 'get',
                url: `https://marketuser.azurewebsites.net/api/ControllerClass/GetProductsByID?id=${sessionStorage.getItem('idCat')}`,
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
                    tdSold.textContent = Math.floor(Math.random() * 10);
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
                    imgDelete.addEventListener('click', () => {
    
                        axios({
                            method: 'post',
                            url: `https://marketuser.azurewebsites.net/api/ControllerClass/deleteProduct?id=${iter['id']}`,
                            dataType: "dataType",
                            headers: {
                                'Accept': '*/*',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                            }
                        }).then(deleteOK => {
                            console.log(deleteOK);
                            window.location.reload();
                        });
    
                    });
                    imgDelete.src = './delete-bg.png';
                    imgDelete.width = 50;
                    tdDelete.appendChild(imgDelete);
    
                    //
                    //      set
                    //
                    var tdIdCategory = document.createElement('td');
                    var selectID = document.createElement("select");
                    selectID.id = iter['id'];
                    selectID.className = "selectors";
                    selectID.disabled = "disabled";
                    selectID.addEventListener('change',(e)=>{
                        selectIDCat = e.target.value;
                        console.log(selectIDCat);
                    });
                    // console.log(listCategory);
                    for (const catit of listCategory[0]['data']['value']) {
                        var option = document.createElement("option");
                        option.value = catit['id'];
                        option.text = catit['title'];
                        if(catit['id'] == sessionStorage.getItem('idCat')){
                            option.selected = iter['id'];
                        }
                        selectID.appendChild(option);
                    }
                    
                    tdIdCategory.appendChild(selectID);
                    tdIdCategory.className =  'iterClass';
    
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
                for (let i = 0; i < butonsUpdate.length; i++) {
                    butonsUpdate[i].addEventListener('click', () => {
                        var countID = listClick.length / 9;
                        var idNow = 0;
                        for (let x = 0; x < countID; x++) {
                            if (butonsUpdate[i].id === listClick[idNow].innerHTML) {
                                console.log("Now: " + listClick[idNow].innerHTML);
                                for (let y = idNow + 1; y < idNow + 9; y++) {
                                    if(y === idNow+8){
                                        var listSelect = document.getElementsByClassName('selectors');
                                        console.log(listSelect[0].id);
                                        for(let selectI = 0;selectI<listSelect.length;selectI++){
                                            if(listSelect[selectI].id === listClick[idNow].innerHTML){
                                                // listSelect[selectI].setAttribute('disabled','false');
                                                listSelect[selectI].disabled = false;
                                            }
                                        }
                                    }
                                    else{
                                        listClick[y].setAttribute('contentEditable', 'true');
                                    }
                                }
                                if (btnSaveIsOk === false) {
    
                                    var divSaveButton = document.getElementById('tableDiv');
                                    buttonSave.addEventListener('click', () => {
                                        //
                                        //
                                        //
                                        console.log(listClick[idNow + 8].innerHTML);
                                        axios({
                                            method: 'post',
                                            url: `https://marketuser.azurewebsites.net/api/ControllerClass/updateProduct`,
                                            dataType: "dataType",
                                            data: JSON.stringify({
                                                id: listClick[idNow].innerHTML,
                                                title: listClick[idNow + 2].innerHTML,
                                                model: listClick[idNow + 3].innerHTML,
                                                price: listClick[idNow + 4].innerHTML,
                                                idCategory: selectIDCat,
                                                uriPhoto: listClick[idNow + 1].innerHTML,
                                                amount: listClick[idNow + 5].innerHTML,
                                                status: listClick[idNow + 7].innerHTML,
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
                            idNow += 9;
                        }
                    });
                }
            });
        });
    });
    return (
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
                        <th scope="col">Category</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody id="Producttablebody">

                </tbody>
            </table>
        </div>
    );
}
export default InfoPage;