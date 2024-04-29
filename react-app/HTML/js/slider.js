let changeImage = (e) => {

    let imgSrc = e.src;
    imgSrc = imgSrc.replace(/400/g, '800');
    document.querySelector('.image-holder > img').src = imgSrc;
    document.querySelector('.image-thumbnail > img.active').classList.toggle('active');
    e.classList.toggle('active');

};