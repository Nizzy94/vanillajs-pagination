// these are the items i was talking about.
// it's just one array with all the items.
// the space between them is just for explanation purposes.
// dont worry about the index  by it for now.
// i'll be using it to explain the code below
const list_items = [
	"Item 1", //INDEX 0 the slice function takes item with index 0
	"Item 2", //1
	"Item 3", //2
	"Item 4", //3
	"Item 5", //4 and ends here
	// so the first page ends here
	// now i'll scroll down
	"Item 6", //5 leaving this one out
	"Item 7",
	"Item 8",
	"Item 9",
	"Item 10",

	"Item 11",
	"Item 12",
	"Item 13",
	"Item 14",
	"Item 15",

	"Item 16",
	"Item 17",
	"Item 18",
	"Item 19",
	"Item 20",

	"Item 21",
	"Item 22"
];

// first of all i get the list wrapper from the html page
// that is where the items are going to be displayed.

// then i get the wrapper for the buttons

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 2;

// current page by default is 1
// and i want to display five items at a time

function DisplayList(items, wrapper, rows_per_page, page) {
	// this function displays the list per page.
	// i'll explain line by line

	// the wrapper.innerHTML = "" is meant to create
	// a an empty html section which well use later
	wrapper.innerHTML = "";

	// pages are displayed by index so we need the index of each page
	// so we substruct one from the current page
	// meaning if you are on page 1, index will be 0
	// page 2 index is 1.
	page--;

	// now when we start the loop, we have to get index of all Items
	// the start variable below defines where we start the loop from
	// and the end variable ends it
	// for eg if row_per_page is 5 and pageIndex is 0, our start variable will be 0
	// then end will be 0+5 which is 5
	let start = rows_per_page * page;
	let end = start + rows_per_page;
	// so the paginated items are the items that will be shown on each page
	// we use slice to return items in a certain range of index
	// so with the eg above where start=0 and end=5, we have items.slice(0,5)
	// which will return items with index 0-4 without the one with index 5
	// i'm scrolling up to explain
	let paginatedItems = items.slice(start, end);
	// now that we have the items per page, we loop through them to display in the list div

	for (let i = 0; i < paginatedItems.length; i++) {
		// i'll log this in the console for you to see
		// console.log(paginatedItems[i])
		// the items are listed in the console below
		// i'll change the page and number of items for you to see
		// we can make these changes in only one place

		// now we store the item as we go through the loop
		let item = paginatedItems[i];

		// create a div for the item with a class item
		let item_element = document.createElement('div');
		item_element.classList.add('item');
		// then we put in what ever text we want (in this case the strigs in the list_items array)
		// if its a bigger project with html tags, well have to do more than just put in strings
		item_element.innerText = item;

		// after creating every div, we append to the last div in the wrapper
		/**
		 * like so
		 * <wrapper>
		 * 	<div class="item">
		 * 		item 1 
		 * </div>
		 * <div class="item">
		 * 		item 2
		 * </div>
		 * </wrapper>
		 */
		wrapper.appendChild(item_element);
	}
}

// DisplayList(list_items, list_element, rows, current_page);

// SetupPagination(list_items, pagination_element, rows);

function SetupPagination(items, wrapper, rows_per_page) {
	// we set up buttons for next and previous page
	// the wrapper hear not the same as the one in DisplayList()
	// this is the pagination div
	// 	we are going to append the buttons there
	wrapper.innerHTML = "";

	// I created prevButton and nextButton variables to craete them
	let prevButton = document.createElement('button');
	let nextButton = document.createElement('button');

	// now i assigned some text to be displayed in the button elements
	prevButton.innerText = 'Previous';
	nextButton.innerText = 'Next';

	// since the wrapper is the parent div for both buttons, we append both inside
	wrapper.appendChild(prevButton);
	wrapper.appendChild(nextButton);

	// now we create click events for them.
	// the condition checks if the current page is > 1
	// if current page is 1, we shouldn't go back again cuz there is no page to go to
	// if it's greater than 1, then we keep subtructing 1
	prevButton.addEventListener('click', function () {
		if (current_page > 1) {
			current_page -= 1;
			DisplayList(items, list_element, rows_per_page, current_page);
		}
	});

	// here, we check if current page is less than page count
	// let me explain
	nextButton.addEventListener('click', function () {
		// console.log(page)
		// Math.ceil() rounds up the float value given to it
		// items.length is the total number of items in the list_items array
		// rows_per_page is the number per page
		// now if row is 5 and total is 22, we get 4.4 which is not valid for page number
		// so we round it up to 5 using Math.ceil()
		// so no matter than decimals generated from the division, we round it up
		// we round up because if we round it down, we'll get 4, and items on page 5 cannot be accessed
		let page_count = Math.ceil(items.length / rows_per_page);

		// now that we have the last page number, which is page_count, we only go to next page if its less than total page
		// so if we have 5 pages, then we keep going next till 5th page then the next button wont work again
		if (current_page < page_count) {
			current_page += 1;
			DisplayList(items, list_element, rows_per_page, current_page);
		}
	});

	// let page_count = Math.ceil(items.length / rows_per_page);
	// for (let i = 1; i < page_count + 1; i++) {
	// 	let btn = PaginationButton(i, items);
	// 	wrapper.appendChild(btn);
	// }
}

// function PaginationButton(page, items) {
// 	let button = document.createElement('button');
// 	button.innerText = page;

// 	if (current_page == page) button.classList.add('active');

// 	button.addEventListener('click', function () {
// 		current_page = page;
// 		DisplayList(items, list_element, rows, current_page);

// 		let current_btn = document.querySelector('.pagenumbers button.active');
// 		current_btn.classList.remove('active');

// 		button.classList.add('active');
// 	});

// 	return button;
// }

// so now we call both functions let me explain the parameters
/**
 * list_items is the total number of item
 * list_element is the wrapper div with class 'list'
 * rows and current_page are self explanatory
 */

DisplayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element, rows);

// now if i'm on page one, i cant go back again and if on last page, i cant go next