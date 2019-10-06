'use strict';

// window.onresize = function(){ location.reload(); }

popupWindow();

highlightNav();

glideSlider();

slidingBlock();

drodownMenu();

hamburgerMenu();

function highlightNav() {
	const currentLink = window.location.pathname;
	const links = document.querySelectorAll('.menu__link');

	for (let i = 0; i < links.length; i++) {
		let link = links[i];

		if (link.getAttribute('href') == currentLink) {
			link.classList.add('menu__link_current');
		}
	};
};

function popupWindow() {
	const popupToggle = document.querySelector('.popup-toggle');
	const popupOverlay = document.querySelector('.popup-overlay');
	const popupWindow = document.querySelector('.popup-window');
	const popupCloseButton = document.querySelector('.popup-window__close-button');

	popupToggle.addEventListener("click", () => {
		popupOverlay.classList.add('active');
		popupWindow.classList.add('active');
	});

	popupOverlay.addEventListener("click", () => {
		popupOverlay.classList.remove('active');
		popupWindow.classList.remove('active');
	});

	popupCloseButton.addEventListener("click", () => {
		popupOverlay.classList.remove('active');
		popupWindow.classList.remove('active');
	});
};

function glideSlider() {
	const Glide = require('@glidejs/glide');

	const glide = new Glide('.glide-slider', {
		type: 'carousel',
		autoplay: 5000,
		animationDuration: 2000,
		hoverpause: false,
		gap: 0
	});

	glide.mount();
};

function slideUp(block) {
	let blockHeight = block.scrollHeight;
	block.classList.add('open');
	block.style.height = blockHeight + 'px';
};
function slideDown(block) {
	block.classList.remove('open');
	block.style.height = null;
};

function slidingBlock() {
	const slideToggle = document.querySelector('.sliding-block__toggle');
	const slideToggleIcon = document.querySelector('.sliding-block__toggle-icon');
	const slideList = document.querySelector('.sliding-block__list');

	slideToggle.addEventListener("click", () => {

		if (slideList.classList.contains('open')) {
			slideToggleIcon.classList.remove('active');
			slideDown(slideList);
		} else {
			slideToggleIcon.classList.add('active');
			slideUp(slideList);
		}
	});
};


function drodownMenu() {
	const dropdownToggle = document.querySelector('.dropdown__toggle');
	const dropdownMenu = document.querySelector('.dropdown__menu');

	dropdownToggle.addEventListener("click", () => {
		dropdownToggle.classList.toggle('active');
		dropdownMenu.classList.toggle('visible');
	});
};

function hamburgerMenu() {
	const hamburgerToggle = document.querySelector('.hamburger');
	const navMenu = document.querySelector('.menu');

	hamburgerToggle.addEventListener("click", () => {
		if (hamburgerToggle.classList.contains('is-active')) {
			hamburgerToggle.classList.remove('is-active');
			navMenu.classList.remove('collapsed');
		} else {
			hamburgerToggle.classList.add('is-active');
			navMenu.classList.add('collapsed');
		}
	})
};