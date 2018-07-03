import {API_BASE_URL, ACCESS_TOKEN} from "../Constants/index";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest){
    return request({
        url:API_BASE_URL+"user/login",
        method:'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function register(registerRequest){
    return request({
        url:API_BASE_URL+"user/register",
        method:'POST',
        body:JSON.stringify(registerRequest),
    });
}

export function checkUserNameAvailability(username){
    // console.log(username)
    return request(
        {
            
            url:API_BASE_URL+"user/isUsernameAvailable?username="+username,
            method:'GET'
        }
    )
}
export function checkEmailAvailability(email){
    return request({
        url:API_BASE_URL+"user/isEmailRegistered?email="+email,
        method:'GET'
    })
}

export function getUserProfile(username){
    return request({
        url:API_BASE_URL+"profile/get/"+username,
        method:'GET'
    })
}

export function getEducationDetails(username){
    return request({
        url:API_BASE_URL+"education/getdetails?username?"+username,
        method:'GET'

    })
}

