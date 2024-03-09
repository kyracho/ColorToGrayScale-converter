//http://www.javascripter.net/faq/rgb2cmyk.htm
//https://tabreturn.github.io/code/html/javascript/2017/01/26/converting_css_colour_to_greyscale.html
//https://learnersbucket.com/examples/interview/convert-rgb-to-hex-color-in-javascript/

function getRGBBackgroundColorById(elementId) {
	var selector = document.getElementById(elementId);

	var style = window.getComputedStyle(selector, null);
	var bgcolor = style.backgroundColor;
	var rgba = bgcolor.match(/[0-9\.]+/g);
	return rgba.map(item => parseFloat(item));
}

function getRGBBackgroundColorByHex(hex) {
	var selector = document.getElementById(elementId);

	var style = window.getComputedStyle(selector, null);
	var bgcolor = style.backgroundColor;
	var rgba = bgcolor.match(/[0-9\.]+/g);
	return rgba.map(item => parseFloat(item));
}

// =============== RGB to HSL ===============

function RGB_HSL (r,g,b) {
	r /= 255;
	g /= 255;
	b /= 255;
	const l = Math.max(r, g, b);
	const s = l - Math.min(r, g, b);
	const h = s
	? l === r
	  ? (g - b) / s
	  : l === g
	  ? 2 + (b - r) / s
	  : 4 + (r - g) / s
	: 0;
	return [
	60 * h < 0 ? 60 * h + 360 : 60 * h,
	100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
	(100 * (2 * l - s)) / 2,
	];
}

// =============== RGB to CMYK ===============

function RGB_CMYK (r,g,b) {
	var computedC = 0;
	var computedM = 0;
	var computedY = 0;
	var computedK = 0;

	//remove spaces from input RGB values, convert to int
	var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
	var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
	var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

	if ( r==null || g==null || b==null ||
	 isNaN(r) || isNaN(g)|| isNaN(b) )
	{
	alert ('Please enter numeric RGB values!');
	return;
	}
	if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
	alert ('RGB values must be in the range 0 to 255.');
	return;
	}

	// BLACK
	if (r==0 && g==0 && b==0) {
	computedK = 1;
	return [0,0,0,1];
	}

	computedC = 1 - (r/255);
	computedM = 1 - (g/255);
	computedY = 1 - (b/255);

	var minCMY = Math.min(computedC,
			  Math.min(computedM,computedY));
	computedC = (computedC - minCMY) / (1 - minCMY) ;
	computedM = (computedM - minCMY) / (1 - minCMY) ;
	computedY = (computedY - minCMY) / (1 - minCMY) ;
	computedK = minCMY;

	return [computedC,computedM,computedY,computedK];
}

// =============== RGB to HEX ===============

const RGB_HEX = (r, g, b) => {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

// =============== RGB to Grayscale ===============

function RGB_Grayscale(rgba, algorithm='luminosity') {
	
	if (rgba) {
	var sum = 0;

	switch (algorithm) {
		case 'averaged':
			sum += parseInt(rgba[0]);
			sum += parseInt(rgba[1]);
			sum += parseInt(rgba[2]);
			break;

		case 'luminosity':
			sum += parseFloat(rgba[0]*0.89);
			sum += parseFloat(rgba[1]*1.77);
			sum += parseFloat(rgba[2]*0.33);
			break;
	}

	var g = Math.ceil(sum/3);

	return [g,g,g];
	}

}

// =============== HEX to RGB ===============

function HEX_RGB(hex) {
	var hex_color = hex
		, pattern_color = "^#([A-Fa-f0-9]{6})$";
	if (hex_color.match(pattern_color)) {
		var hex_color = hex_color.replace("#", "")
			, r = parseInt(hex_color.substring(0, 2), 16)
			, g = parseInt(hex_color.substring(2, 4), 16)
			, b = parseInt(hex_color.substring(4, 6), 16);
		return [r,g,b];
	}
	else {
		alert('Error Color Format');
	}
}
		
// =============== RGB formatter ===============

function RGB_formatter(r,g,b,a=null) {
	var formattedRGB = 'rgb('+r+','+g+','+b;

	if (a) {
	formattedRGB += ','+a;
	}

	formattedRGB += ')';

	return formattedRGB;
}

// =============== selectors ===============

const colorPicker = document.getElementById('colorpicker');
const colorDisplay = document.getElementById('color-display');
const grayscaleDisplay = document.getElementById('grayscale');

const rValue = document.getElementById('r-value');
const gValue = document.getElementById('g-value');
const bValue = document.getElementById('b-value');

const grValue = document.getElementById('gr-value');
const ggValue = document.getElementById('gg-value');
const gbValue = document.getElementById('gb-value');

const cValue = document.getElementById('c-value');
const mValue = document.getElementById('m-value');
const yValue = document.getElementById('y-value');
const kValue = document.getElementById('k-value');

const hValue = document.getElementById('h-value');
const sValue = document.getElementById('s-value');
const lValue = document.getElementById('l-value');

const hexValue = document.getElementById('hex-value');
const luminValue = document.getElementById('lumin-value');

// =============== action starts here ===============

colorPicker.addEventListener('input', function() {
	const HEX = this.value;
	const RGB = HEX_RGB(HEX)// getRGBBackgroundColorById('colorpicker');
	const HSL = RGB_HSL(RGB[0], RGB[1], RGB[2]);
	const CMYK = RGB_CMYK(RGB[0], RGB[1], RGB[2]);
	
	console.log(HEX)
	console.log(RGB)
	console.log(HSL)
	console.log(CMYK)

	
	rValue.textContent = RGB[0];
	gValue.textContent = RGB[1];
	bValue.textContent = RGB[2];

	cValue.textContent = CMYK[0].toFixed(2);
	mValue.textContent = CMYK[1].toFixed(2);
	yValue.textContent = CMYK[2].toFixed(2);
	kValue.textContent = CMYK[3].toFixed(2);
	
	hValue.textContent = HSL[0].toFixed(2);
	sValue.textContent = HSL[1].toFixed(2);
	lValue.textContent = HSL[2].toFixed(2);
	
	hexValue.textContent = HEX;
	luminValue.textContent = HSL[2].toFixed(2);
	
	colorDisplay.style.backgroundColor = RGB_formatter(RGB[0],RGB[1],RGB[2]);
	
	let grayColor = RGB_Grayscale([RGB[0],RGB[1],RGB[2]]);
	grayscaleDisplay.style.backgroundColor = RGB_formatter(...grayColor);
	
	grValue.textContent = grayColor[0];
	ggValue.textContent = grayColor[1];
	gbValue.textContent = grayColor[2];
})
