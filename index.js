const frontendStylesArray = [
	'transform: translateY(-6.5rem);',
	'transform: translateY(-4.09rem) translateX(5.05rem);',
	'transform: translateY(1.35rem) translateX(6.357rem);',
	'transform: translateY(5.86rem) translateX(2.82rem);',
	'transform: translateY(5.86rem) translateX(-2.82rem);',
	'transform: translateY(1.35rem) translateX(-6.357rem);',
	'transform: translateY(-4.09rem) translateX(-5.05rem);'
];

const backendStylesArray = [
	'transform: translateY(-6.5rem);',
	'transform: translateY(-2rem) translateX(6.18rem);',
	'transform: translateY(5.26rem) translateX(3.82rem);',
	'transform: translateY(5.26rem) translateX(-3.82rem);',
	'transform: translateY(-2rem) translateX(-6.18rem);'
];

const otherSkillsStylesArray = [
	'transform: translateY(-6.5rem);',
	'transform: translateY(3.25rem) translateX(5.63rem);',
	'transform: translateY(3.25rem) translateX(-5.63rem);'
];

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
			setTimeout(() => {
				showSkills(frontendStylesArray, 'frontend');
				showSkills(backendStylesArray, 'backend');
				showSkills(otherSkillsStylesArray, 'other');
			}, 200);
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

const initialLoad = () => {
	let pageId;
	if (window.location.hash) {
		pageId = window.location.hash.slice(1) + 'Page';
	} else {
		pageId = 'aboutPage';
	}

	if (window.location.hash == '#skills') {
		setTimeout(() => {
			showSkills(frontendStylesArray, 'frontend');
			showSkills(backendStylesArray, 'backend');
			showSkills(otherSkillsStylesArray, 'other');
		}, 200);
	}

	const pageContainer = document.getElementById(pageId);
	pageContainer.classList.remove('display-none');
	pageContainer.classList.add('currentPage');
};

const showSkills = (stylesArray, skillName) => {
	const Container = document.querySelector(`.${skillName}-skills-container`);
	for (let i = 1; i < Container.children.length; i++) {
		Container.children[i].style.cssText = stylesArray[i - 1];
	}
};

initialLoad();
window.onhashchange = hashChangeHandler;
