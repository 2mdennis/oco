const animate = () => {
	var animationItem = document.querySelectorAll('[data-anim__scroll]'),
        doc = document.documentElement;
    for (var i = 0, item; !!(item = animationItem[i++]);) {
        var itemPosTop = item.getBoundingClientRect();
        if (itemPosTop.bottom > 100 && itemPosTop.top < (window.innerHeight || doc.clientHeight) - 50) {
            item.setAttribute('data-anim__animate', true);
        }
    }
};

export default animate;