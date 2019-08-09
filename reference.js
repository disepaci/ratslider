class Ratslider {
	constructor(container,slide,props) {
		this.container=container
		this.slides=slide
		this.slideslenght=$(slide).length

		if (props.arrows) {
			this.arrowHandler();
			let lastR=false
			let firstR=false
			$('.slider-handler-a.right').on('click',(e)=>{
				lastR=this.next(lastR);
			})
			$('.slider-handler-a.left').on('click',(e)=>{
				firstR=this.prev(firstR);
			})
		}
		this.dotsHandler()
		$($('.slider-dotHandler')[0]).addClass('active')
		let lastD=false;
		let firstD=false;
		let current=0
		$('.slider-dotHandler').on('click',(e)=>{
			let target=$('.slider-dotHandler').index(e.target)
			// current=$('.slides-dotHandler').index(e.target)
			current=$(this.slides).index($(this.slides+'.current'))
			console.log(current + ' - ' + target);
			if (target<current) {
				this.prev(firstD,target)
			}else if(target>current){
				this.next(lastD,target)
			}
			$('.slider-dotHandler').removeClass('active')
			$(e.target).addClass('active')
			// current=$('.slides-dotHandler').index(e.target)
		})
		this.draggable()
		$($(slide)[0]).addClass('current')
	}
	draggable(){
		$(this.slides).draggable({
			axis:'x',
			stop:(e,ui)=>{
				if (ui.position.left < 0) {
					this.prev()
				}else{
					this.next()
				}
				$(e.target).removeAttr('style')
			}
		})
	}
	dotsHandler(){
		$(this.container).after('<div class="slider-handler-d"></div>')

		for(var i=0;i<$(this.slides).length;i++){
			$('.slider-handler-d').append('<a class="slider-dotHandler"></a>')
		}
		$('.slider-dotHandler').on('click',(e)=>{
			$('.slider-dotHandler').removeClass('active');
			$(e.target).addClass('active')
		})
	}

	arrowHandler(){
		$(this.container).prepend(`<div class='slider-handler-a left'>&#8249;</div>`)
		$(this.container).append(`<a class='slider-handler-a right'>&#8250;</a>`)

		$('.slider-handler-a').on('click',(e)=>{
			$('.slider-handler-a').removeClass('active');
			$(e.target).addClass('active')
				$('.slider-handler-a').removeClass('active');
		})
	}

	next(last,i){
		var index=$(this.slides).index($(this.slides + '.current'))
		if (index == $(this.slides).length-1 ) {
			last=true
		}

		$(this.slides + '.current').addClass('next')
		setTimeout(()=>{
			$(this.slides + '.current.next').removeClass('current')
		},200)

		if (i) {

			$($(this.slides)[i]).addClass('back')
			setTimeout(()=>{
				$($(this.slides)[i]).addClass('current')
			},100)
			$('.slider-dotHandler').removeClass('active')
			$($('.slider-dotHandler')[i]).addClass('active')
		}else{
			$($(this.slides)[last?0:index+1]).addClass('back')
			setTimeout(()=>{
				$($(this.slides)[last?0:index+1]).addClass('current')
			},100)
			$('.slider-dotHandler').removeClass('active')
			$($('.slider-dotHandler')[last?0:index+1]).addClass('active')

		}

		setTimeout(()=>{
		$($(this.slides)[index]).removeClass('next')
		$(this.slides + '.current').removeClass('back')
	},300)
		if (index == $(this.slides).length-2) {
			return true
		}

	}
	prev(first,i){

			var index=$(this.slides).index($(this.slides + '.current'))

			if (index == 0) {
				first=true
			}
			$(this.slides + '.current').addClass('last')
			setTimeout(()=>{
				$(this.slides + '.current.last').removeClass('current')
			},200)

		if (i || i == 0) {

			$($(this.slides)[i]).addClass('front')
			setTimeout(()=>{
				$($(this.slides)[i]).addClass('current')
			},200)
			$('.slider-dotHandler').removeClass('active')
			$($('.slider-dotHandler')[i]).addClass('active')
		}else{
			$($(this.slides)[first?$(this.slides).length-1:index-1]).addClass('front')

			setTimeout(()=>{
				$($(this.slides)[first?$(this.slides).length-1:index-1]).addClass('current')
			},200)
			$('.slider-dotHandler').removeClass('active')
			$($('.slider-dotHandler')[first?$(this.slides).length-1:index-1]).addClass('active')
		}

		setTimeout(()=>{
		$($(this.slides)[index]).removeClass('last')
		$(this.slides + '.current').removeClass('front')
	},300)
		if (index == 1 ){
			return true
		}


	}

}

setTimeout(()=>{
new Ratslider('.slider','.slider .slider-tap',{
	arrows:true
})
},100)
