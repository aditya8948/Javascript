// TASK
// 1.write a function to download data from a url 
// 2.write a function to save that download data in a file and return the filename 
// 3. write a function to upload the file written in previous step to a newurl

const { download } = require("express/lib/response");

// function downloadFile(url , cb){
//     // dummy function to download the file 
//     console.log('file downloading from ' , url);
//     setTimeout(function() {
//         let content = 'helloAditya'; 
//         cb(content);
//         return content ;
//     },5000);
// };

// function writefile(data , cb){
//     // dummy function to write the data 
//     console.log("writing file with data" , data);
//     setTimeout(function write() {
//         console.log("complete writting the file ");
//         const fileName = "test.txt";
//         cb(fileName)
//     }, 2000);
// }

// function uploadFile(url , data){
//     // dummy function to upload the file 
//     console.log("uploading file on url" , url);
//     setTimeout(function u() {
//         console.log("finished uploading");
//         const url = "www.wxyz.com";
//         data(url);
//     })
// }

// downloadFile("www.xyz.com", function processDownload(content){
//     console.log("we are now going to process the download data ");
//     writefile(content, function processWrite(filename){
//         console.log("we have download and written the file , now will upload");
//         uploadFile("www.upload.com", function processUpload(response){
//             console.log("we have uploaded on" , response);
//         });
//     });
// });

/////////////////////////////////////////////////////////////////////////////////////////

// TASK (same task with promises)
// 1.write a function to download data from a url 
// 2.write a function to save that download data in a file and return the filename 
// 3. write a function to upload the file written in previous step to a newurl


function downloadfile(url){
    return new Promise(function(res , rej){ 
        console.log("downloading the file from " , url);
        setTimeout(function down(){
            console.log("downloading complete");
            const content = "helloAditya";
            res(content);
        },3000);
    });
}

function writefile(content){
    return new Promise(function(res, rej){ 
        console.log("copying data to the file ");
        setTimeout(function (){
            console.log("complete writting the file ");
            const fileName = 'test.txt';
            res(fileName); // 
        },2000)
    });
};

function uploadfile(fileName){
    return new Promise(function(res, rej){ 
        console.log("uploading the file");
        setTimeout(() => {
            console.log("file uploaded on " , fileName);
            res("upload complete"); 
        }, 2000);
    });
}

downloadfile('xyz.com') // corrected: call downloadfile first, then chain with .then()
    .then(function(content){
        return writefile(content); // corrected: call writefile and return its Promise
    })
    .then(function(fileName){
        return uploadfile(fileName); // corrected: call uploadfile, not upload
    })
    .then(function(response){
        console.log(response); // corrected: handle the final resolved value
    })
    .catch(function(error){
        console.log(error); // corrected: added catch for promise errors
    });
