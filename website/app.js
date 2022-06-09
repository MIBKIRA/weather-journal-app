/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=0406d9ae3b2587e990b1fe459f66613c&units=metric'; // Personal API Key for OpenWeatherMap API
const userInfo = document.getElementById('userInfo');
const generatebutton = document.getElementById('generate');


// Create a new date
let d = new Date();

// i did not use let newDate Because I've had problems with it, and I always end up with a date a month ago

        // let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element

generatebutton.addEventListener('click',taskProcessing);

/* Function called by event listener */
function taskProcessing(e) {
    e.preventDefault();

    //get user input
    /**
     * I did not place the declaration of these constants in the global scope So that the values ​​are not recorded as null
     */
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        generatebutton.classList.remove('invalid');
        getWeatherInformations(baseUrl, zipCode, apiKey)
            .then(function(data) {
                // add data to POST request
                postData('/add', { temp:data.main.temp, date: d, content: content });
            }).then(function() {
                // call syncData to sync the new browser's data & content
                syncData()
            }).catch(function(error) {
                console.log(error);
                alert('Something wrong with the zip code. Try again');

            });
        
    } else {
        generatebutton.classList.add('invalid');
    }


}

/* Function to GET Web API Data*/
const getWeatherInformations = async(baseUrl, zipCode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseUrl}${zipCode}${apiKey}`);
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
/**we used async function so we can use await fetch
 * The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style
 */
const postData = async(url = '', data = {}) => { //When there is no change to the link and data We run this Arrow Function
    const response = await fetch(url, { // used fetch to post data
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ //to convert from object into json
            temp: Math.round(data.temp), // used math.round to get An integer number of temp
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        console.log(newData) //Just to make sure everything is okay
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const syncData = async() => { //We used fetch again, because it is used in operations that may take time
    const request = await fetch('/all');
    try {
        const savedNewData = await request.json(); //to convert from json into object So that we can save it and be able to use it to update data
        console.log(savedNewData);
        // update new entry values
        if (savedNewData.date !== undefined && savedNewData.temp !== undefined && savedNewData.content !== undefined) {
            /**Each element in html holds data based on its own id */
            document.getElementById('date').innerHTML = savedNewData.date;
            document.getElementById('temp').innerHTML = savedNewData.temp + ' degree C';
            document.getElementById('content').innerHTML = savedNewData.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};
