const MAX_WIDTH = 440;
const MAX_HEIGHT = 440;

const INPUT = document.getElementById("imgId");
const container = document.querySelector('.imageholder');


const DOWNLOAD = document.getElementById("downloadImg"); 
DOWNLOAD.addEventListener("click",()=>{
    let canvas = document.querySelector("canvas");
    let canvasURL = canvas.toDataURL();

    const DownloadLink = document.createElement('a');
    DownloadLink.href = canvasURL;

    DownloadLink.download = "image";

    DownloadLink.click();
    DownloadLink.remove();
})

INPUT.onclick = () =>{ 
  let image_canvas_element = document.querySelector('canvas');
  let image_h1_element = document.querySelector('h1');
  container.removeChild(image_canvas_element);
  container.removeChild(image_h1_element);
} 
INPUT.onchange = function (event) {



  console.log(event);
  const file = event.target.files[0]; // get the file
  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;
  
  img.onload = function () {
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
    const canvas = document.createElement("canvas");
   // canvas.className('image-canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    container.appendChild(canvas);
    canvas.toBlob(
      (blob) => {
        // Handle the compressed image.
        const displayTag = document.createElement('h1');
        displayTag.innerText = `Original Image - ${readableBytes(file.size)} :::::: Compressed Image - ${readableBytes(blob.size)}`;
         document.querySelector('.imageholder').append(displayTag);
      },
    );
  };
};

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

function readableBytes(bytes) {
  const i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}