/* Asynch JS Prerequisites: 
Computer literacy
Reasonable understanding of JS

Asynch enables a program to start a possible long-running task and still be responsive to other events while that task is running 
So you do not have to wait until that task has finished
Program presents result when task is finished

Browsers provided functions:
HTTP requests with fetch()
Asking user to select files showOpenFilePicker()

Even though may not have to implement own async functions often, need to use them correctly
*/
  

//ChatGPT example of asynchronous JS
// Fetch example

// Define a function to fetch data asynchronously
function fetchData(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Example usage of fetchData
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  
  fetchData(apiUrl)
    .then(data => {
      // Handle the fetched data here
      console.log('Handling data in a callback:', data);
    })
    .catch(error => {
      // Handle errors here
      console.error('Handling error in a callback:', error);
    });
  
  console.log('This line is executed before the fetch operation is complete');
  



/* Synchronous programming:
const name = "Miriam";
const greeting = `Hello, my name is ${name}!`;
console.log(greeting);
// "Hello, my name is Miriam!"
Declares string called name
Declares string called greeting that uses name string
Outputs result in JS console

Browser goes through program one line at a time as it is written
Browser waits for each line to finish before moving on to the next line
Each line depends on work in the lines before it
makeGreeting() is a synchronous function as the caller must wait for the function to finish and return a value before the caller can continue

Long-running synchronous function:
Trouble with long-running synchronous function is that they can become unresponsive if the lines do not return a result in the console before moving to the next time
Start a long-running operation by calling a function.
Have that function start the operation and return immediately, so that our program can still be responsive to other events
Notify us with the result of the operation when it eventually completes.
*/

const name = "Antonia";
const greeting = `Hello, my name is ${name}!`;
console.log(greeting);
// "Hello, my name is Antonia"



function makeGreeting(name) {
    return `Hello, my name is ${name}!`;
  }
  
  const name = "Antonia";
  const greeting = makeGreeting(name);
  console.log(greeting);
  // "Hello, my name is Antonia!"







/* Event handlers:
Form of asynchronous programming 
Provide a function that will be called when the event happens
If the even is the asynchronous operation has completed then that event is used to notify the caller about the result of an async function call
*/

const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
  log.textContent = "";

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("loadend", () => {
    log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
  });

  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
  );
  xhr.send();
  log.textContent = `${log.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
  log.textContent = "";
  document.location.reload();
});






/* Callbacks:
Event handler is a particular type of callback
Callback is a function that’s passed into another function with the expectation that the callback is called at the right time
Callback based code can be hard to understand when the callback itself has to call functions that accept a callback
We get deeply nested doOperation() function which is much harder to read and debug
Referred to as the “callback hell” or the “pyramid of doom”
Hard to handle errors
Most async APIs don’t use callbacks 
*/

function doStep1(init) {
    return init + 1;
  }
  
  function doStep2(init) {
    return init + 2;
  }
  
  function doStep3(init) {
    return init + 3;
  }
  
  function doOperation() {
    let result = 0;
    result = doStep1(result);
    result = doStep2(result);
    result = doStep3(result);
    console.log(`result: ${result}`);
  }
  
  doOperation();

  



  //



  function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
  }
  
  function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
  }
  
  function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
  }
  
  function doOperation() {
    doStep1(0, (result1) => {
      doStep2(result1, (result2) => {
        doStep3(result2, (result3) => {
          console.log(`result: ${result3}`);
        });
      });
    });
  }
  
  doOperation();
  