const url = 'https://66e7e6bbb17821a9d9da7058.mockapi.io/images';
let btn = document.getElementById('btn');
let inputImg = document.getElementById('img');
let imgName = document.getElementById('name');
let container = document.getElementById('container');


function createImageContainer(data) {
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');

    let image = document.createElement('img');
    image.src = data.img;

    let text = document.createElement('h1');
    text.textContent = data.name;

    let del = document.createElement('button');
    del.textContent = 'Delete Image';
    del.onclick = function() {
        deleteImage(data.id, imgContainer);
    };

    imgContainer.appendChild(text);
    imgContainer.appendChild(image);
    imgContainer.appendChild(del);
    container.appendChild(imgContainer);
}

function addImage() {
    // Validate inputs
    if (!inputImg.value || !imgName.value) {
        alert('Please provide both an image URL and a name.');
        return; 
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            img: inputImg.value,
            name: imgName.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        createImageContainer(data);
    })
    .catch(error => console.error('Error:', error));
}

function deleteImage(id, imgContainer) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then((res) => {
        if (res.ok) {
            container.removeChild(imgContainer);
            console.log('Image deleted successfully');
        } else {
            console.error('Failed to delete the image');
        }
    })
    .catch(error => console.error('Error:', error));
}

function loadImages() {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(item => createImageContainer(item));
    })
    .catch(error => console.error('Error:', error));
}

btn.addEventListener('click', addImage);
loadImages();