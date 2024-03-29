window.addEventListener("load", function() {
    var lazyImages = document.querySelectorAll('.lazy');
    function lazyLoad() {
        lazyImages.forEach(function(img) {
        var rect = img.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight && getComputedStyle(img).display !== 'none') {
            img.src = img.getAttribute('alt');
            img.classList.remove('lazy');
        }
    });
    }
    window.addEventListener('scroll', lazyLoad);
});