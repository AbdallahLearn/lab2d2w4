// let input = document.getElementById('input')
let btn = document.getElementById('btn')
// let text =document.getElementById('text')
let inputImg = document.getElementById('img')
let imgName = document.getElementById('name')
btn.addEventListener('click', function(){

    const url = 'https://66e7e6bbb17821a9d9da7058.mockapi.io/images'
    fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          img: inputImg.value,
          name: imgName.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then((res)=>res.json()).then((data)=>{
        console.log(data)
        let container = document.getElementById('container')
        let image = document.createElement('img')
        let del = document.createElement('button')
        del.textContent = 'delete img'
        let text = document.createElement('h1')
        text.textContent = imgName.value 
        image.src = inputImg.value
        let imgContainer = document.createElement('div')
        imgContainer.classList.add('imgContainer')

        container.appendChild(imgContainer)

        imgContainer.appendChild(text)
        imgContainer.appendChild(image)
        imgContainer.appendChild(del)

        del.onclick = function() {
            fetch(`${url}/${data.id}`, {
                method: 'DELETE'
            })
            .then((res) => {
                if (res.ok) {
                    container.removeChild(imgContainer)
                    console.log('Image deleted successfully');
                } else {
                    console.error('Failed to delete the image');
                }
            })
            .catch(error => console.error('Error:', error));
        };

    })
    
})
