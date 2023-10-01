// this file autogenerates json file with all lectures + index.html with respective links

const fs = require("fs");
const path = require("path");

const ICONS_PATH = path.resolve('slides', 'icons');
const SLIDES_PATH = path.resolve('slides', 'view');
const ATTRIBUTES = ['GROUP', 'NAME', 'COURSE', 'LOCALE', 'ORDER'];
const MANDATORY_ATTRIBUTES = ['GROUP', 'NAME'];
const OUTPUT_INFO_FILE = 'slides-info.json';

console.log('Generating index');

// get all SVG icons and PUG slides
const icons = fs.readdirSync(ICONS_PATH).filter(file => !fs.lstatSync(path.resolve(ICONS_PATH, file)).isDirectory());
const lectures = fs.readdirSync(SLIDES_PATH).filter(file => file.toLowerCase().endsWith('.pug') && !fs.lstatSync(path.resolve(SLIDES_PATH, file)).isDirectory());

// check for missing icons
const missingIcons = lectures.filter(lec => !icons.find(ic => ic.substring(0, ic.lastIndexOf('.')) === lec.substring(0, lec.lastIndexOf('.'))));

if (missingIcons.length) {
	throw new Error(`Some icons are not provided: ${missingIcons.join('\n')}`)
}


const lectureInfo = [];

// counter we will later use for ordering
const groupCounter = new Map();

for (let lecture of lectures) {
	console.log(lecture);

	const file = fs.readFileSync(path.resolve(SLIDES_PATH, lecture), "utf8");
	const lines = file.split('\n');

	let counter = 0;
	let line = lines[counter++];

	const data = {};
	// store filename without extension
	data['file_name'] = lecture.substring(0, lecture.lastIndexOf('.'));

	// parse attributes that are in the beginning of each file
	while (line.indexOf('//') !== -1) {
		if(line.indexOf('=') !== -1) {
			const attrName = line.substring(line.indexOf('//') + 2, line.indexOf('=')).trim();
			const attrValue = line.substring(line.indexOf('=') + 1).trim();

			if(ATTRIBUTES.find(attr => attr === attrName)) {
				data[attrName.toLowerCase()] = attrValue;
			} else {
				console.error(`Unknown attribute: ${attrName} in ${lecture}`);
			}
		}
		line = lines[counter++];
    }

	// assign missing parameters
	if(!data['locale']) {
		data['locale'] = 'en';
	}

	// check for missing attributes
	const keys = Object.keys(data);
	for(let attr of MANDATORY_ATTRIBUTES) {
		if(!keys.find((key) => key === attr.toLowerCase())) {
			throw new Error(`File ${data['file_name']} is missing the attribute ${attr.toLowerCase()}`);
		}
	}

	// store order value
	const group = data['group'];
	const groupNum = (groupCounter.get(group) || 0) + 1;
	groupCounter.set(group, groupNum);
	// store the order value -> if the order is not specified in the slide file, we will use .1 suffix,
	// for instance 1.1, 2.1, 3.1 ... therefore, whenever the user specifies a value, it will take precedence
	data['order'] = data['order'] || `${groupNum}.1`;
	lectureInfo.push(data);
}

// reorder the list by ORDER value (note that order applies only to items inside each group)
lectureInfo.sort((lec1, lec2) => {
	if(lec1['group'] !== lec2['group']) {
		return lec1['group'].localeCompare(lec2['group']);
	}
	const lec1Order = lec1['order'];
	const lec2Order = lec2['order'];
	return parseInt(lec1Order) - parseInt(lec2Order);
});

// delete auxilliary attrs
lectureInfo.forEach(l => {
	delete l['order'];
});

// put the json file into the build folder
fs.writeFileSync(path.resolve('slides', OUTPUT_INFO_FILE), JSON.stringify(lectureInfo));
console.log('JSON SAVED');

// generate index.html for each language
const locales = [...new Set(lectureInfo.map(l => l['locale']))];

for(let locale of locales) {
	let indexTemplate = fs.readFileSync(path.resolve('scripts', 'index_template.html'), "utf8");
	const groups = [...new Set(lectureInfo.filter(inf => inf['locale'] === locale).map(l => l['group']))];
	let str = '';
	
	for(let group of groups) {
		const groupSlides = lectureInfo.filter(l => l['group'] === group && l['locale'] === locale);
		str += `<h2>${group}</h2>`;
		str += "<div class='list'>";
	
		// add links
		for(slides of groupSlides) {
			str += `<a href='./${slides['file_name']}.html'>${slides['name']}</a>`;
		}
	
		str += "</div>";
	}
	
	indexTemplate = indexTemplate.replace('#PLACEHOLDER', str);
	// put the file into the slides folder
	fs.writeFileSync(path.resolve('slides', locale == 'en' ? 'index.html' : `index_${locale}.html`), indexTemplate);
}


console.log('HTML INDEX SAVED');