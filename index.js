window.addEventListener('load', () => {
	const loaderWrapper = document.getElementById('loader-wrapper1');
	loaderWrapper.classList.add('loader-out');
	setTimeout(() => {
		const loaderWrapper = document.getElementById('loader-wrapper1');
		loaderWrapper.classList.add('display-none');
	}, 1500);
});

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
	setTimeout(removeUnnecessaryClassesHandler.bind(this, currentPage, targetPage), 803);
};

const gotoLeftPage = (currentPage, targetPageClassname) => {
	currentPage.classList.add('exitToRight');
	currentPage.classList.remove('currentPage');
	const targetPage = document.querySelector(
		`.pagesCube__content--${targetPageClassname}`
	);
	targetPage.classList.add('enterFromLeft', 'currentPage');
	targetPage.classList.remove('display-none');
	setTimeout(removeUnnecessaryClassesHandler.bind(this, currentPage, targetPage), 803);
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

const hashChangeHandler = (event) => {
	const previousActiveNavItem = document.querySelector('.navbar-item-active');
	previousActiveNavItem.classList.remove('navbar-item-active');
	const currentActiveNavItem = document.querySelector(`${window.location.hash}Nav div`);
	currentActiveNavItem.classList.add('navbar-item-active');
	const navbar = document.querySelector('.navbar');
	navbar.classList.remove('navbar-sticky');

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
			}, 800);
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
		const currentActiveNavItem = document.querySelector(
			`${window.location.hash}Nav div`
		);
		currentActiveNavItem.classList.add('navbar-item-active');
	} else {
		pageId = 'aboutPage';
		const currentActiveNavItem = document.querySelector(`#aboutNav div`);
		currentActiveNavItem.classList.add('navbar-item-active');
	}

	if (window.location.hash == '#skills') {
		setTimeout(() => {
			showSkills(frontendStylesArray, 'frontend');
			showSkills(backendStylesArray, 'backend');
			showSkills(otherSkillsStylesArray, 'other');
		}, 1600);
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

const onScroll = () => {
	const navbar = document.querySelector('.navbar');
	if (event.target.scrollTop > 80) {
		navbar.classList.add('navbar-sticky');
	} else {
		navbar.classList.remove('navbar-sticky');
	}
};

const renderLoadingAnim = () => {
	const loaderWrapper = document.getElementById('loader-wrapper2');
	loaderWrapper.classList.remove('loader-out');
};

const showMessage = (validity = false) => {
	const loaderWrapper = document.getElementById('loader-wrapper2');
	loaderWrapper.children[0].remove();

	const message = document.createElement('div');
	message.classList.add('message-after-load');
	if (validity) {
		message.innerHTML =
			'Your message was sent succesfully <i class="fas fa-check-circle" style="color:#1abc9c"></i>';
	} else {
		message.innerHTML =
			'An error ocurred! Please try to send you message again <i class="fas fa-times-circle style="color:#990000 ""></i>';
	}

	loaderWrapper.append(message);
};

const removeLoadingAnim = () => {
	const loaderWrapper = document.getElementById('loader-wrapper2');
	loaderWrapper.classList.add('loader-out');
};

const onSubmit = async (event) => {
	event.preventDefault();
	renderLoadingAnim();
	const body = {
		name: event.target[0].value,
		email: event.target[1].value,
		message: event.target[2].value
	};
	try {
		const response = await axios.post(
			'https://contactform-handler.herokuapp.com/send',
			body
		);
		if (response.status == '200') {
			showMessage(true);
		} else {
			showMessage(false);
		}
		console.log(response);
		setTimeout(() => {
			removeLoadingAnim();
		}, 1500);
	} catch (error) {
		showMessage(false);
		console.log(error);
		setTimeout(() => {
			removeLoadingAnim();
		}, 1500);
	}
};

initialLoad();
window.onhashchange = hashChangeHandler;

const pageContainerArray = document.querySelectorAll('.pageContainer');

pageContainerArray.forEach((pagecontainer) => {
	pagecontainer.addEventListener('scroll', onScroll);
});

const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', onSubmit);
