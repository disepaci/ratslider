class RatsliderCore{
	constructor(props,set,reset,get,onChange){
		//props: id, slides (class), onChange(optional)
		this.props=props;

		this.set=set
		this.reset=reset;
		this.get=get
		this.onChange=onChange;

		this.slidesLength=document.querySelectorAll(props.slides).length;
		this.sliderId=`${props.id}`;
		this.setCurrentSlide(0);

	}
	setCurrentSlide(index){
		var max=this.getSliderLength();
		index=index==0?0:index==max?max-1:index-1;
		console.log(index);
		if(typeof this.set == 'function'){
			this.set(this.getSlides()[index],index)
		}else{
			this.getSlides()[index].className+=` current`;
		}
	}
	resetCurrentSlide(){
		if(typeof this.reset == 'function'){
			this.reset(this.getCurrentSlide(),this.getNodeIndex(this.getCurrentSlide()))
		}else{
			let regex=new RegExp('current','g')
			let current=this.getCurrentSlide()
			current.className=current.className.replace(regex,'')
		}
	}
	getCurrentSlide(){
		if(typeof this.get == 'function'){
			return this.get()
		}else{
			return document.querySelector(`${this.sliderId} .current`);
		}
	}
	getCurrentSlideIndex(){
		return this.getNodeIndex(this.getCurrentSlide());
	}
	getSlides(){
		return document.querySelectorAll(`${this.sliderId} ${this.props.slides}`);
	}
	getSliderLength(){
		return this.getSlides().length
	}
	getNodeIndex(element){
		var arr=Array.from(this.getSlides())
		return arr.indexOf(element)+1

	}
	getMetadata(){
		return{
			container:document.querySelector(this.sliderId),
		}
	}
	next(callback){
		var currentElement=this.getCurrentSlide()
		var currentIndex=this.getCurrentSlideIndex()
		var slides=this.getSlides()
		var slidesLength=this.getSliderLength();

		this.resetCurrentSlide();
		if (currentIndex == slidesLength) {
			this.setCurrentSlide(0);
			typeof callback=='function'?callback(
				currentElement,
				slides[0],
				slides[1]
			):null;
		}else{
			this.setCurrentSlide(currentIndex+1)
			typeof callback=='function'?callback(
				currentElement,
				slides[currentIndex],
				currentIndex==slidesLength-1?slides[0] : slides[(currentIndex+1)]
			):null;
		}
		typeof this.onChange=='function'?this.onChange(currentElement,currentIndex,slides):null;
	}
	prev(callback){
		var slides=this.getSlides()
		var slidesLength=this.getSliderLength();
		var currentElement=this.getCurrentSlide()
		var currentIndex=this.getCurrentSlideIndex();

		this.resetCurrentSlide();
		if (currentIndex == 1	) {
			this.setCurrentSlide(slidesLength)
			callback(
				slides[0],//prev
				slides[slidesLength-1],//current
				currentElement//next
			)
		}else{
			this.setCurrentSlide(currentIndex-1)
			callback(
				currentIndex==2?slides[slidesLength-1]:currentElement.previousElementSibling.previousElementSibling,
				currentElement.previousElementSibling,
				currentElement
			)
		}
		typeof this.onChange=='function'?this.onChange(currentElement,currentIndex,slides):null;
	}
	goTo(to,callback){
		var slides=this.getSlides();
		var slidesLength=this.getSliderLength();
		var currentElement=this.getCurrentSlide()
		var currentIndex=this.getCurrentSlideIndex()

		typeof callback.before == 'function' ? callback.before(currentElement,currentIndex,slides):null;

		if (to >= 0 && to < slidesLength && to!= data.index-1 ) {
			this.resetCurrentSlide()
			this.setCurrentSlide(to)
			callback.after? callback.after(
				to==0?slides[slidesLength.length-1]:currentElement,
				slides[to],
				top==slidesLength-1?slides[0]:slides[to].nextElementSibling
			):null;
			typeof this.onChange=='function'?this.onChange(slides,currentIndex):null;
		}
	}
}

class Ratslider extends RatsliderCore{
	constructor(props){
		super({
				id:props.id,
				slides:props.slides,
			},
			setCurrentSlide,
			resetCurrentSlide,
			getCurrentSlide
		);


		function setCurrentSlide(element,index){
			element.setAttribute('ratslider','current-slide')
		}
		function resetCurrentSlide(element,index){
			element.setAttribute('ratslider','slide')
		}

		function getCurrentSlide(){
			return document.querySelector(`${props.id} [ratslider*=current-slide]`)
		}


		// set global variables
		this.props=props;
		this.metadata=super.getMetadata()
		this.containerElement=this.metadata.container
		this.containerSelector='#'+this.containerElement.getAttribute('id')
		this.prefix='ratslider'
		this.defaultAttr='slide';
		this.currentSlideAttr='current-slide'
		this.containerAttr='container'
		this.nextSlideAttr='reverse-slide'
		this.prevSlideAttr='foward-slide'
		// tagg all the slider
		this.setAttribute(this.containerElement,this.containerAttr)
		super.getSlides().forEach((slide)=>{
			if (slide.getAttribute(this.prefix) != this.currentSlideAttr) {
				this.setAttribute(slide,this.defaultAttr)

			}
		})


		if (props.dots) {
			this.dots()
		}
		if (props.handlers) {
			this.handlers()
		}
	}
	setAttribute(selector,value){
		if (typeof selector=='object') {
			selector.setAttribute(this.prefix,value)
		}else{
			var containerSelector=this.containerSelector+' ';
			document.querySelector(containerSelector + selector).setAttribute(this.prefix,value)
		}
	}
	cleanAttributes(){
		this.getSlides().forEach((slide)=>{
			var attr=slide.getAttribute(this.prefix)
			if (attr==this.nextSlideAttr ) {
				this.setAttribute(slide,this.defaultAttr)
			}
			if(attr == this.prevSlideAttr){
				this.setAttribute(slide,this.defaultAttr)
			}
		})
	}
	handlers(){
		var right=document.createElement("span")
		right.innerHTML="&#10097;"
		right.className='next handler'

		var left=document.createElement("span")
		left.innerHTML="&#10096;"
		left.setAttribute('id', `prev`);
		left.className='prev handler'

		this.containerElement.insertBefore(left,this.containerElement.firstElementChild)
		this.containerElement.appendChild(right)

		document.querySelector(`${this.containerSelector} span.prev.handler`).addEventListener('click',(e)=>{
			super.prev((prev,current,next)=>{
				this.cleanAttributes()
				this.setAttribute(current,`${this.currentSlideAttr}-${this.prevSlideAttr}`)
				this.setAttribute(next,this.prevSlideAttr)
			});
		})
		document.querySelector(`${this.props.id} .next.handler`).addEventListener('click',(e)=>{
			super.next((prev,current,next)=>{
				this.cleanAttributes()
				this.setAttribute(current,`${this.currentSlideAttr}-${this.nextSlideAttr}`)
				this.setAttribute(prev,this.nextSlideAttr)
			})
		})
	}
	dots(){
		var dotContainer=document.createElement('div')
		dotContainer.className='dotHandler'
		this.containerElement.appendChild(dotContainer)
		for (var i = 0; i < document.querySelectorAll(this.props.slides).length; i++) {
			var dot=document.createElement('span')
			dot.setAttribute('slide',i);
			dotContainer.appendChild(dot)

			dot.addEventListener('click',(e)=>{
				super.goTo(e.target.getAttribute('slide'),
					()=>{console.log('')},
					(prev,current,next)=>{
						var cleanPrev=new RegExp(`ratslider-prev`,'g')
						var cleanNext=new RegExp(`ratslider-next`,'g')
						document.querySelectorAll(`${this.props.id} ${this.props.slides}`).forEach((item)=>{
							item.className=item.className.replace(cleanPrev,'')
							item.className=item.className.replace(cleanNext,'')
						})
						prev.className+=` ratslider-prev`
						next.className+=` ratslider-next`

					}
				)
			})
		}
	}
}

const s=new Ratslider({
	id:'#ratslider',
	slides:'.slide',
	dots:true,
	handlers:true
});

// s.next(0)
