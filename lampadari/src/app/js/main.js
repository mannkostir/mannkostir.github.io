'use strict';

window.onresize = function(){ location.reload(); }

popupWindow();

highlightNav();

glideSlider();

slidingBlock();

drodownMenu();

hamburgerMenu();

function highlightNav() {
	const currentLink = window.location.pathname;
	const links = document.querySelectorAll('.main-menu__link');

	for (let i = 0; i < links.length; i++) {
		let link = links[i];

		if (link.getAttribute('href') == currentLink) {
			link.classList.add('main-menu__link_current');
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
		type: 'slider',
		autoplay: 5000,
		animationDuration: 1000,
		hoverpause: false,
		gap: 0
	});

	glide.mount();
}

function slidingBlock() {
	const slideToggle = document.querySelector('.sliding-block__toggle');
	const slideToggleIcon = document.querySelector('.sliding-block__toggle-icon');
	const slideList = document.querySelector('.sliding-block__list');
	const slideItem = document.querySelector('.sliding-block__item');

	let slideListHeight;

	slideToggle.addEventListener("click", () => {

		if (slideList.classList.contains('open')) {
			slideList.classList.remove('open');
			slideToggleIcon.classList.remove('active');
			slideList.style.height = null;
		} else {
			slideListHeight = slideList.scrollHeight;
			slideList.classList.add('open');
			slideToggleIcon.classList.add('active');
			slideList.style.height = slideListHeight + 'px';
		}
	});
};

function drodownMenu() {
	const drodownToggle = document.querySelector('.dropdown__dropdown-toggle');
	const dropdownMenu = document.querySelector('.dropdown__dropdown-menu');

	drodownToggle.addEventListener("click", () => {
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