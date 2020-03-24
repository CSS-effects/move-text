// 'use strict';

let countElem = document.querySelectorAll('.bl-text p');
let masLetter = getPosition(countElem);

let countElemHide = document.querySelectorAll('.text-hide p');

// setTimeout( () => {
// 	setPosition(countElemHide, countElem, masLetter);
// }, 2000);

move.onclick = function () {
	setPosition(countElemHide, countElem, masLetter);
}

function getPosition(countElem) {
	let masLetter = {};
	
	countElem.forEach( (el, i) => {
		let text = el.textContent;
		text = text.split('');
	
		let listSpan = text.reduce( (zn, el, i) => {
			zn += `<span>${el}</span>`;
			return zn;
		}, '');
	
		el.innerHTML = listSpan;
		
		let countSpan = document.querySelectorAll('.bl-text span');
		countSpan.forEach( (el, i) => {
			let contEl = el.textContent;
			if (masLetter[contEl]) {
				masLetter[contEl].push({x: parseInt(el.getBoundingClientRect().x), y: parseInt(el.getBoundingClientRect().y)});
			} else {
				masLetter[contEl] = [{x: parseInt(el.getBoundingClientRect().x), y: parseInt(el.getBoundingClientRect().y)}];
			}
		});
	});
	
	return masLetter;
}

function setPosition(countElem, countElemVise, masLetter) {
	
	let masCount = {};
	for (let el in masLetter) {
		masCount[el] = 0;
	}
	
	countElem.forEach( (el, i) => {
		let text = el.textContent;
		text = text.split('');
	
		let listSpanEl = text.reduce( (zn, elmn, i) => {
			zn += `<span>${elmn}</span>`;
			return zn;
		}, '');
	
		el.innerHTML = listSpanEl;
		let countSpan = document.querySelectorAll('.text-hide span');
	
		let listSpan = '';
		
		countSpan.forEach( (elm, i) => {
			let transRend = (Math.random() * 4 + 5.5).toFixed(2);
			let txEl = elm.textContent;
			let x = 0, y = 0;
			let opacity = 'opacity: 0';
			
			if (masLetter[txEl]) {
				opacity = '';
				let index = masCount[txEl];
				console.log("index", index );
				const elX = elm.getBoundingClientRect().x;
				const elY = elm.getBoundingClientRect().y;
				
				if (masLetter[txEl][index]) {
					x = masLetter[txEl][index]['x'] - elX;
					y = masLetter[txEl][index]['y'] - elY;
					
					// x = elX - masLetter[txEl][index]['x'];
					// y = elY - masLetter[txEl][index]['y'];
					
					if (masLetter[txEl].length > index) {
						masCount[txEl] = index + 1;
						console.log("masCount[txEl]", masCount[txEl] );
					} else {
						masCount[txEl] = 0;
					}
				}
			}
			
			if (txEl == ' ') txEl = '&nbsp;';
			
			let styleParam = `transform: translate(${x}px, ${y}px); transition: transform ${transRend}s; ${opacity}`;
			listSpan += `<span style="${styleParam}" class="anim">${txEl}</span>`;
		});
		
		// listSpan = listSpan.replace(/\s/g, '&ensp;');
		countElemVise[i].innerHTML = listSpan;
		let allSpan = countElemVise[i].querySelectorAll('span.anim');
		
		allSpan.forEach( (ell, ii) => {
			ell.addEventListener('transitionend', updateParam );
		});
	
		allSpan.forEach( (ell, ii) => {
			requestAnimationFrame(function () {
				requestAnimationFrame(function () {
					ell.style.cssText = '';
					// ell.style.transform = '';
				});
			});
		});
	});
	
	return masLetter;
}

function updateParam(elem, e) {
	let el = elem.target;
	// el.classList.toggle('anim', false);
	el.style.transitionDelay = '';
	
	el.removeEventListener('transitionend', updateParam ); // remove event
}
