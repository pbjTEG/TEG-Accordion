/* TEG Accordion
 *
 * Add accordion folding to a CMS's generated output.
 * Defaults for ticket holders in Engaging Network's Events module.
 * "Should" work for any accordion list structure.
 */

class TEGAccordion {
	// private
	#defaultOptions = {
		// rootSelector        : '.en__component.en__component--eventregistrants',
		categorySelector    : '.en__registrants__ticket',
		categoryHeadSelector: '.en__registrants__ticketHead',
		groupSelector       : '.en__registrants__group', // element that contains the expanding and contracting content
		groupIsCatChild     : true, // If true, looks for groupSelector in item identified by categorySelector. If false, gets nextElementSibling.
		useAria             : true, // Add aria-labeledby to group element. Add ID to head element, if necessary.
		openClass           : 'open',
		exclusive           : false, // only allow one group open at a time
	};
	#memoInitTime = (new Date()).getTime(); // hopefully unique per instance
	#memoSequence = 0; // numeric sequence for ID strings

	constructor(Options) {
		// make "this" explicit
		const TEGA = this;

		TEGA.options = Object.assign(TEGA.#defaultOptions, Options);

		document.querySelectorAll(TEGA.options.categorySelector)
		        .forEach((element, index) => {
			        const categoryElement = element.querySelector(TEGA.options.categoryHeadSelector) || document.querySelectorAll(TEGA.options.categoryHeadSelector)[index] || element;

			        categoryElement.addEventListener('click', () => TEGA.toggleGroup(TEGA, categoryElement));

			        if (TEGA.options.useAria) {
				        const categoryID          = TEGA.getID(categoryElement),
				              // depending on structure, the header might be a different element
				              categoryHeadElement = document.querySelectorAll(TEGA.options.categoryHeadSelector)[index];

				        // in case it's a new ID, set it
				        categoryElement.id = categoryID;
						  // set category element ID first in case they're the same thing.
				        const categoryHeadID = TEGA.getID(categoryHeadElement);
				        categoryElement.setAttribute('aria-expanded', 'false');
				        let categoryLabelledBy = categoryElement.getAttribute('id')

				        if (categoryLabelledBy === null) {
					        const idPrefix = TEGA.options.categoryHeadSelector.replace(/[^\w]/g, '');
					        categoryElement.setAttribute('id', categoryID);
				        }

				        let groupElement;

				        if (TEGA.options.groupIsCatChild) {
					        groupElement = element.querySelector(TEGA.options.groupSelector);
				        } else {
					        groupElement = element.nextElementSibling;
				        }

				        groupElement.setAttribute('aria-labelledby', categoryHeadID);

						  let groupElementID = TEGA.getID(groupElement);
						  // if it's a new ID, set it
						  groupElement.id = groupElementID
				        categoryElement.setAttribute('aria-controls', groupElementID);
			        } // end if useAria
		        });

	} // end constructor

	/**
	 * toggle the open and closed class names on the category header / button
	 * executed with .call() to set "this" to the TEGA instance
	 *
	 * @param {TEGAccordion} TEGA
	 * @param {HTMLElement} categoryElement
	 */
	toggleGroup(TEGA, categoryElement) {

		if (this.options.exclusive) {
			// if we're only allowed one at a time, close all open items
			const isClosed = !categoryElement.classList.contains(TEGA.options.openClass);
			document.querySelectorAll(`.${TEGA.options.openClass}`).forEach((element) => {
				element.classList.remove(TEGA.options.openClass);
			});
			// and open this one, if needed
			if (isClosed) {
				categoryElement.classList.add(TEGA.options.openClass);
				if (TEGA.options.useAria) categoryElement.setAttribute('aria-expanded', 'true');
			}
		} else {
			// otherwise just toggle it
			categoryElement.classList.toggle(TEGA.options.openClass);
			if (TEGA.options.useAria) categoryElement.setAttribute('aria-expanded', categoryElement.classList.contains('open'));
		}
	}

	/**
	 * get the ID of the element or create a new one
	 *
	 * @param {HTMLElement} element
	 * @returns {String} existing or new ID string
	 */
	getID(element) {
		return element.getAttribute('id') || `TEGA${this.#memoInitTime}${this.#memoSequence++}`;
	}
} // end TEGAccordion
