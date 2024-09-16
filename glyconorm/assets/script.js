///////////////////////////////////////////////////////////////////////////////////
//Scroll
///////////////////////////////////////////////////////////////////////////////////
function scrollLink() {
	$(document).ready(function () {
		$("a[href^='#']").on("click", function (e) {
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 777);
			e.preventDefault();
			return false;
		});
	});
}
scrollLink();
///////////////////////////////////////////////////////////////////////////////////
//Scroll
///////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//timer на колличество минут
////////////////////////////////////////////////////////////////////////////////
//функция таймера(колличество минут ввести в параметр(в секундах))
function makeTimer(time) {
	var minBox = document.querySelector('#min'),
		secBox = document.querySelector('#sec')
	var timer = setInterval(function () {
		if (time === -1) {
			clearInterval(timer)
		} else {
			minBox.textContent = (Math.floor(time / 60)) < 10 ? ('0' + (Math.floor(
				time /
				60))) : (Math.floor(time / 60));
			secBox.textContent = (time % 60) < 10 ? ('0' + (time % 60)) : (time %
				60)
			time -= 1;
		}
	}, 1000)
};
/////////////////////////////////////////////////////////////////////////
//timer на колличество минут
////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
//timer до конца дня
///////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
	//код jQuery
	//Вызываем функцию на исполнение
	get_timer('.timer');
	//функция вызова таймера
	function get_timer(elem) {
		var date_new = new Date();
		date_new.setDate(date_new.getDate() + 1);
		date_new.setHours(0);
		date_new.setMinutes(0);
		date_new.setSeconds(0);
		////////////////////////////////////
		////////////////////////////////////
		date_new.setSeconds(date_new.getSeconds() - 1);
		//Объект даты для обратного отсчета
		//var date_t = new Date(date_new);
		//Объект текущей даты
		var date = new Date();
		//Вычесляем сколько миллисекунд пройдет
		//от текущей даты до даты отсчета времени
		var timer = date_new - date;
		//Проверяем не нужно ли закончить отсчет
		//если дата отсчета еще не истекла, то количество
		//миллисекунд в переменной date_t будет больше чем в переменной date
		if (date_new > date) {
			//Вычисляем сколько осталось часов до даты отсчета.
			//Для этого переменную timer делим на количество
			//миллисекунд в одном часе и отбрасываем дни
			hour = parseInt(timer / (60 * 60 * 1000)) % 24;
			//если полученное число меньше 10 прибавляем 0
			if (hour < 10) {
				hour = '0' + hour;
			}
			//Приводим результат к строке
			hour = hour.toString();
			//Вычисляем сколько осталось минут до даты отсчета.
			//Для этого переменную timer делим на количество
			//миллисекунд в одной минуте и отбрасываем часы
			min = parseInt(timer / (1000 * 60)) % 60;
			//если полученное число меньше 10 прибавляем 0
			if (min < 10) {
				min = '0' + min;
			}
			//Приводим результат к строке
			min = min.toString();
			//Вычисляем сколько осталось секунд до даты отсчета.
			//Для этого переменную timer делим на количество
			//миллисекунд в одной минуте и отбрасываем минуты
			sec = parseInt(timer / 1000) % 60;
			//если полученное число меньше 10 прибавляем 0
			if (sec < 10) {
				sec = '0' + sec;
			}
			//Приводим результат к строке
			sec = sec.toString();
			//Выводим часы
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков часов
			if (hour[1] == 3 &&
				min[0] == 5 &&
				min[1] == 9 &&
				sec[0] == 5 &&
				sec[1] == 9) {
				animation($(elem).find(".hour0"), hour[0]);
			} else {
				$(elem).find(".hour0").html(hour[0]);
			}
			//Для единиц чассов
			if (min[0] == 5 &&
				min[1] == 9 &&
				sec[0] == 5 &&
				sec[1] == 9) {
				animation($(elem).find(".hour1"), hour[1]);
			} else {
				$(elem).find(".hour1").html(hour[1]);
			}
			//Выводим минуты
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков минут
			if (min[1] == 9 &&
				sec[0] == 5 &&
				sec[1] == 9) {
				animation($(elem).find(".min0"), min[0]);
			} else {
				$(elem).find(".min0").html(min[0]);
			}
			//Для единиц минут
			if (sec[0] == 5 && sec[1] == 9) {
				animation($(elem).find(".min1"), min[1]);
			} else {
				$(elem).find(".min1").html(min[1]);
			}
			//Выводим секунды
			//Проверяем какие предыдущие цифры времени должны вывестись на экран
			//Для десятков секунд
			if (sec[1] == 9) {
				animation($(elem).find(".sec0"), sec[0]);
			} else {
				$(elem).find(".sec0").html(sec[0]);
			}
			$(elem).find(".sec1").html(sec[1]);
			animation($(elem).find(".sec1"), sec[1]);
			//Переодически вызываем созданную функцию,
			//интервал вызова одна секунда(1000 милли секунд)
			setTimeout(get_timer, 1000, elem);
		} else {
			//$("#clock").html("<span id='stop'>Отсчет закончен!!!</span>");
			console.log('end');
		}
	}
	//Функция для красивого отображения времени.
	function animation(vibor, param) {
		vibor.html(param)
		// .css({'marginTop':'-20px','opacity':'0'})
		// .animate({'marginTop':'0px','opacity':'1'});
	}
});
///////////////////////////////////////////////////////////////////////////////////
//timer до конца
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
//date from moment.js
///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////
//date from moment.js
///////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//Roulette
////////////////////////////////////////////////////////////////////////////////
var resultWrapper = document.querySelector('.spin-result-wrapper-roulette');
var wheel = document.querySelector('.wheel-img-roulette');
var closePopup = document.querySelector('.close-popup-roulette');
$('.close-popup-roulette, .pop-up-button-roulette').click(function (e) {
	e.preventDefault();
	$('.spin-result-wrapper-roulette').fadeOut();

});
//Функция для прокрутки рулетки//
function spin() {
	if (!wheel.classList.contains('rotated')) {
		wheel.classList.add('super-rotation');
		setTimeout(function () {
			resultWrapper.style.display = "block";
		}, 8000);
		setTimeout(function () {
			$('.spin-wrapper-roulette').slideUp();
			$('.order_block-roulette').slideDown();
			makeTimer(600)
		}, 10000);
		wheel.classList.add('rotated');
	}
}
/////////////////////////////////////////////////////////////////////////
//Roulette
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//box
////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
	$('.boxes > div').click(function () {
		if ($(this).parent().hasClass('boxesfirsttry')) {
			$('.boxes').removeClass('boxesfirsttry');
			$(this).addClass('openbox');
			$(this).find('.try').hide();
			$(this).find('.opentry').show();
			setTimeout(function () {
				$('.sweet-overlay').show();
				$('.sweet-alert').show();
			}, 500);
		} else if ($(this).parent().hasClass('boxeslasttry')) {
			if (!$(this).hasClass('openbox')) {
				$(this).find('.try').hide();
				$(this).find('.opentry').show();
				$(this).find('.boxtext').css('display', 'block');
				setTimeout(function () {
					$('.spin-result-wrapper-box').show();
					setTimeout(function () {
						$('#boxesContainer').slideUp(250);
						setTimeout(function () {
							$('.order_block').slideDown(250);
						}, 500)
					}, 500)
				}, 500);
			}
		}
	});

	$('#update').click(function () {
		$('.sweet-overlay').hide();
		$('.sweet-alert').hide();
		$('.boxes').addClass('boxeslasttry');
	});

	$('.pop-up-button-box').click(function () {
		$('.spin-result-wrapper').hide();
		$("a").attr("href", "#fforms");
		makeTimer(600);
	})
});
/////////////////////////////////////////////////////////////////////////
//box
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
//comm
////////////////////////////////////////////////////////////////////////////////
class Comment {
	constructor(
		commentForm,
		inputCommentName,
		inputCommentText,
		formImage,
		formAvatar,
		commentPushBlock
	) {
		this.commentForm = document.querySelector(commentForm);
		this.inputCommentName = document.querySelector(inputCommentName);
		this.inputCommentText = document.querySelector(inputCommentText);
		this.formImage = document.querySelector(formImage);
		this.formAvatar = document.querySelector(formAvatar);
		this.commentPushBlock = document.querySelector(commentPushBlock);
		this.commArrAll = [];
		this.formImageUrl;
		this.formImageChange();
		this.pushComBlock();
		this.domOnloader()
	}

	uploadFile(file) {
		// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Solo se permiten imágenes.');
			formImage.value = '';
			return;
		}
		// проверим размер файла (<2 Мб) 
		if (file.size > 1 * 1024 * 1024) {
			alert('El archivo debe tener menos de 1 MB.');
			return;
		}
		var reader = new FileReader();
		reader.onload = (e) => {
			this.formAvatar.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
			this.formAvatar.classList.add('form__avatar--loaded');
			this.formImageUrl = e.target.result;
		};
		reader.onerror = function (e) {
			alert('Error');
		};
		reader.readAsDataURL(file);
	}

	formImageChange() {
		this.formImage.addEventListener('change', () => {
			this.uploadFile(this.formImage.files[0]);
		});
	}

	pushComm() { }

	removeInputClass() {
		if (this.inputCommentName) {
			this.inputCommentName.value = '';
			this.inputCommentName.classList.remove('error')
		}
		this.inputCommentText.value = '';
		this.inputCommentText.classList.remove('error')
	}

	pushComBlock() {
		this.commentForm.addEventListener('submit', (e) => {
			e.preventDefault();
			if (this.inputCommentName) {
				if (this.inputCommentName.value && inputCommentText.value) {
					this.formAvatar.innerHTML = '';
					this.formAvatar.classList.remove('form__avatar--loaded');
					return this.pushComm();
				}
				this.inputCommentName.classList.add('error')
				this.inputCommentText.classList.add('error')
			} else {
				if (this.inputCommentText.value) {
					this.formAvatar.innerHTML = '';
					this.formAvatar.classList.remove('form__avatar--loaded');
					return this.pushComm();
				}
				this.inputCommentText.classList.add('error')
			}
		})
	}

	domOnloader() {
		document.addEventListener("DOMContentLoaded", () => {
			let commArr = localStorage['commArr'];
			if (commArr) {
				this.commArrAll = JSON.parse(localStorage.getItem('commArr'));
				commentPushBlock.innerHTML = this.commArrAll.join('');
			}
		});
	}
}
/////////////////////////////////////////////////////////////////////////
//comm
////////////////////////////////////////////////////////////////////////