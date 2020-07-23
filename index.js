const aboutMe = document.getElementById('aboutMe');
aboutMe.addEventListener('click', changePageHandler);

const mySkills = document.getElementById('mySkills');
mySkills.addEventListener('click', changePageHandler);

const myProjects = document.getElementById('myProjects');
myProjects.addEventListener('click', changePageHandler);

const contactMe = document.getElementById('contactMe');
contactMe.addEventListener('click', changePageHandler);

const gotoRightPage = (currentPage, targetPageClassname) => {
	currentPage.classList.add('exitToLeft');
	currentPage.classList.remove('currentPage');

	const targetPage = document.querySelector(
		`.pagesCube__content--${targetPageClassname}`
	);
	targetPage.classList.add('enterFromRight', 'currentPage');
	targetPage.classList.remove('display-none');
	setTimeout(removeUnnecessaryClassesHandler.bind(this, currentPage, targetPage), 700);
};

const gotoLeftPage = (currentPage, targetPageClassname) => {
	currentPage.classList.add('exitToRight');
	currentPage.classList.remove('currentPage');
	const targetPage = document.querySelector(
		`.pagesCube__content--${targetPageClassname}`
	);
	targetPage.classList.add('enterFromLeft', 'currentPage');
	targetPage.classList.remove('display-none');
	setTimeout(removeUnnecessaryClassesHandler.bind(this, currentPage, targetPage), 700);
};

const removeUnnecessaryClassesHandler = (currentPage, targetPage) => {
	currentPage.classList.add('display-none');
	currentPage.classList.remove('exitToLeft', 'exitToRight');

	targetPage.classList.remove('enterFromRight', 'enterFromLeft');
};

function changePageHandler() {
	const currentPage = document.querySelector('.currentPage');
	let pageNum = event.target.dataset.page;
	if (pageNum < currentPage.dataset.page) {
		gotoLeftPage(currentPage, event.target.dataset.classname);
	} else if (pageNum > currentPage.dataset.page) {
		gotoRightPage(currentPage, event.target.dataset.classname);
	}
}
