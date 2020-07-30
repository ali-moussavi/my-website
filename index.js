const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
	const navbar__items = document.querySelector('.navbar__items');
	//Animate Links
	navbar__items.classList.toggle('open');
	//  links.forEach(link => {
	// 	 link.classList.toggle("fade");
	//  });

	//Hamburger Animation
	hamburger.classList.toggle('toggle');
});

const gotoRightPage = (currentPage, targetPageClassname) => {
	currentPage.classList.add('exitToLeft');
	currentPage.classList.remove('currentPage');

	const targetPage = document.querySelector(
		`.pagesCube__content--${targetPageClassname}`
	);
	targetPage.classList.add('enterFromRight', 'currentPage');
	targetPage.classList.remove('display-none');
	setTimeout(removeUnnecessaryClassesHandler.bind(this, currentPage, targetPage), 676);
};

const gotoLeftPage = (currentPage, targetPageClassname) => {
	currentPage.classList.add('exitToRight');
	currentPage.classList.remove('currentPage');
	const targetPage = document.querySelector(
		`.pagesCube__content--${targetPageClassname}`
	);
	targetPage.classList.add('enterFromLeft', 'currentPage');
	targetPage.classList.remove('display-none');
	setTimeout(removeUnnecessaryClassesHandler.bind(this, currentPage, targetPage), 676);
};

const removeUnnecessaryClassesHandler = (currentPage, targetPage) => {
	currentPage.classList.add('display-none');
	currentPage.classList.remove('exitToLeft', 'exitToRight');

	targetPage.classList.remove('enterFromRight', 'enterFromLeft');
};

function changePageHandler(targetPageNum) {
	// window.location.hash = event.target.dataset.classname;
	const currentPage = document.querySelector('.currentPage');
	if (targetPageNum < currentPage.dataset.page) {
		gotoLeftPage(currentPage, window.location.hash.slice(1));
	} else if (targetPageNum > currentPage.dataset.page) {
		gotoRightPage(currentPage, window.location.hash.slice(1));
	}
}

const hashChangeHandler = () => {
	let pageNum;
	switch (window.location.hash) {
		case '':
			pageNum = '1';
			window.location.hash = 'about';
			break;
		case '#about':
			pageNum = '1';
			break;
		case '#skills':
			pageNum = '2';
			break;
		case '#projects':
			pageNum = '3';
			break;
		case '#contact':
			pageNum = '4';
		default:
			break;
	}

	changePageHandler(pageNum);
};

window.onhashchange = hashChangeHandler;
