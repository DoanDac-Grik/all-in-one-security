window.onscroll=function() {
	if (document.querySelector('body').scrollTop > 70 || document.documentElement.scrollTop > 70) {
		document.querySelector('.moveTop').style.opacity="1";
		document.querySelector('.moveTop').style.transition="opacity linear 0.4s";
	}
	else {
		document.querySelector('.moveTop').style.opacity="0";
		document.querySelector('.moveTop').style.transition="opacity linear 0.4s";
	}
}