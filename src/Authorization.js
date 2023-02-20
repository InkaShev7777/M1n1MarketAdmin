import axios, { Axios } from 'axios';
import './Authorization.css';
function Authorization(){
    return(
        <div className='mainDiv'>
            <h1>Authorization</h1>
            <input id='login' type="text" placeholder="Login" />
            <input id='pass' style={{ margin: '0px' }} type="password" placeholder="Password" />
            <button onClick={() => {
                axios({
                    method: 'post',
                    url: 'https://localhost:7031/api/Authentication/Login',
                    data: {
                        "userName": document.getElementById('login').value,
                        "password": document.getElementById('pass').value
                    },
                    dataType: "dataType",
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                }).then(data => {
                    sessionStorage.setItem('token', data['data']['token']);
                });
            }}>Confirm</button>
        </div>
    );
}
export default Authorization;