# Ratslider

Ratslider is a stand alone responsive slider maker library wrote in vainilla javascript and its extends [RatsliderCore](#ratslidercore) Class.

### [DEMO](https://rantasma.github.io/ratslider/example/)

## Usage
### Ratslider( { id: string , slides: string, dots: bool, handlers:bool, draggable: bool }, callback)

```
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="style.css">
		<link rel="stylesheet" href="ratslider.css">
	</head>
	<body>
		<div id="my-slider">
			<div class="slide" >
				<h1>1</h1>
			</div>
			<div class="slide">
				<h1>2</h1>
			</div>
			<div class="slide" >
				<h1>3</h1>
			</div>
			<div class="slide"  >
				<h1>4</h1>
			</div>
		</div>
		<script src="ratslider.js" charset="utf-8"></script>
		<script>
			const my-slider=new Ratslider({
					id:'#my-slider', //my slider id css selector
					slides:'.slide', //my slide classes inside my slider css selector
					dots:true, //enable dots handlers
					handlers:true, //enable arrow handlers
					draggable:true, //enable dragg navigatioin (suport touch events)
					create:true // use this option to create on class initialization
				},
				(element)=>{ //callback executed when current slider its in place.
					console.log('do something');
				}
			);
		</script>
	</body>
</html>
```

## functions

you can also trigger manually navigation function, or write custom events for the navigation.

### `create()`
- use it if you dont set the create option on class initialization

### `destroy()`

### `nex( callback(prev,current,next) )`

- `callback` its optional. the callback args are the named dom element

### `prev( callback(prev,current,next) )`

- `callback` its optional. the callback args are the named dom element

### `goTo( index, callback(prev,current,next) )`

- `index` require
- `callback` its optional. the callback args are the named dom element

# RatsliderCore

`RatsliderCore` Class have the most basics functions to make your custom slider and was write in vainilla js, that means not dependencies require.


## constructor

`RatsliderCore( { id: string, slides : string, init: bool }, onChange, setCurrentSlide, resetCurrentSlide, getCurrentSlide)`

- `onChange` function - event triggered when some navigation event occurs - **optional**

- `setCurrentSlide` function to write a custom strategy - **optional**

- `resetCurrentSlide` function - **required if *setCurrentSlide* is declared**

- `getCurrentSlide` function - **required if *setCurrentSlide* is declared**

### options
- `id` = css selector of id slider container
- `slides` = css selector of all slides inside the container
- `init` = set the current slide on class initialization

## functions

- `setCurrentSlide(index=int,goto=false)` void

- `resetCurrentSlide()` void

- `next(callback)` void

- `prev(callback)` void

- `goTo(index=int,callback)` void

- `getMetadata()` return {container,id,slidesClass}

- `getCurrentSlide()` return domObj

- `getCurrentSlideIndex()` return int

- `getSlides()` return Array

- `getSliderLength()` return int

- `getNodeIndex(domElement)` return int
