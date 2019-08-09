class RatsliderCore{
	constructor(props){
		//props: id, slides (class)
		this.props=props;
		this.slidesLength=document.querySelectorAll(props.slides).length;
		this.sliderId=`${props.id.slice(1)}`;

		document.querySelector(props.slides).className+=' current';
	}

	next(callback){
		var currentElement=document.querySelector(`#${this.sliderId} .current`)
		var currentIndex=this.getNodeIndex(currentElement)

		currentElement.className=currentElement.className.replace(/current/g,'')

		if (currentIndex == this.slidesLength) {
			document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[0].className+=' current'
			callback(
				currentElement,
				document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[0],
				document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[0].nextElementSibling
			)
		}else{
			currentElement.nextElementSibling.className+=' current';
			callback(
				currentElement,
				currentElement.nextElementSibling,
				currentIndex==this.slidesLength-1?document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[0] :currentElement.nextElementSibling.nextElementSibling
			)
		}

	}
	prev(callback){
		var currentElement=document.querySelector(`#${this.sliderId} .current`)
		var currentIndex=this.getNodeIndex(currentElement)

		currentElement.className=currentElement.className.replace(/current/g,'')
		if (currentIndex == 1) {
			document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[this.slidesLength-1].className+=' current'
			callback(
				document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[this.slidesLength-1].previousElementSibling,
				document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[this.slidesLength-1],
				currentElement
			)
		}else{
			currentElement.previousElementSibling.className+=' current'
			callback(
				currentIndex==1?document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[this.slidesLength-2]:currentElement.previousElementSibling.previousElementSibling,
				currentElement.previousElementSibling,
				currentElement
			)
		}

	}
	goTo(to,callback){
		if (to >= 0 && to < this.slidesLength ) {
			var currentElement=document.querySelector(`#${this.sliderId} .current`)
			currentElement.className=currentElement.className.replace(/current/g,'')
			document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[to].className+=' current'
			callback(
				currentElement,
				document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[to],
				document.querySelectorAll(`#${this.sliderId} ${this.props.slides}`)[to].nextElementSibling
			)
		}

	}
	getNodeIndex(element){
		return([].indexOf.call(element.parentElement.children, element))
	}

}

class Ratslider extends RatsliderCore{
	constructor(props){
		super({id:props.id, slides:props.slides});
		this.props=props;
		this.containerElement=document.querySelector(props.id)
		this.containerElement.className='ratslider '+this.containerElement.className

		document.querySelectorAll(`${props.id} ${props.slides}`)[document.querySelectorAll(`${props.id} ${props.slides}`).length-1].className+=` ${props.slides.slice(1)}-prev`
		document.querySelector(`${props.id} ${props.slides}.current`).nextElementSibling.className+=` ${props.slides.slice(1)}-next`

		if (props.dots) {
			this.dots()
		}
		if (props.handlers) {
			this.handlers()
		}

	}
	handlers(){
		var right=document.createElement("span")
		right.innerHTML=">"
		right.className='next handler'

		var left=document.createElement("span")
		left.innerHTML="<"
		left.setAttribute('id', `prev`);
		left.className='prev handler'

		this.containerElement.insertBefore(left,this.containerElement.firstElementChild)
		this.containerElement.appendChild(right)

		document.querySelector(`${this.props.id} .prev.handler`).addEventListener('click',(e)=>{
			super.prev((prev,current,next)=>{
				var cleanPrev=new RegExp(`${this.props.slides.slice(1)}-prev`,'g')
				var cleanNext=new RegExp(`${this.props.slides.slice(1)}-next`,'g')
				document.querySelectorAll(`${this.props.id} ${this.props.slides}`).forEach((item)=>{
					item.className=item.className.replace(cleanPrev,'')
					item.className=item.className.replace(cleanNext,'')
				})
				prev.className+=` ${this.props.slides.slice(1)}-prev`
				next.className+=` ${this.props.slides.slice(1)}-next`
			});
		})
		document.querySelector(`${this.props.id} .next.handler`).addEventListener('click',(e)=>{
			super.next((prev,current,next)=>{
				var cleanPrev=new RegExp(`${this.props.slides.slice(1)}-prev`,'g')
				var cleanNext=new RegExp(`${this.props.slides.slice(1)}-next`,'g')
				document.querySelectorAll(`${this.props.id} ${this.props.slides}`).forEach((item)=>{
					item.className=item.className.replace(cleanPrev,'')
					item.className=item.className.replace(cleanNext,'')
				})
				prev.className+=` ${this.props.slides.slice(1)}-prev`
				next.className+=` ${this.props.slides.slice(1)}-next`
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
				super.goTo(e.target.getAttribute('slide'))
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
