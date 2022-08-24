describe('TEG Accordion', () => {
	describe('default settings', () => {
		beforeAll(() => {
			window.myAccordion = new TEGAccordion();
		});

		it('should add labels', () => {
			expect(document.querySelectorAll('.en__registrants [aria-labelledby]').length).toBe(5);
		}); // end it('should add labels')

		// describe('the default settings', () => {
		it('should expand and close an item', () => {
			const accordionItem = document.querySelectorAll('.en__registrants__ticketHead')[3];
			accordionItem.click();
			expect(accordionItem.classList.contains('open')).toBeTrue();
			accordionItem.click();
			expect(accordionItem.classList.contains('open')).toBeFalse();
		}); // end it('should expand and close an item')
		// }); // end describe('items')

		it('should set aria-expanded', () => {
			expect(document.querySelectorAll('.open[aria-expanded="false"]').length).toBe(0);
			expect(document.querySelectorAll('.en__registrants__ticketHead:not(.open)[aria-expanded="true"]').length).toBe(0);
		}); // end it('should set aria-labelled')

		it('should set aria-controls and folding content ID', () => {
			expect(document.querySelector('.en__registrants__ticketHead').getAttribute('aria-controls')).toBe(document.querySelector('.en__registrants__group').id);
			expect(document.querySelectorAll('.en__registrants__ticketHead')[3].getAttribute('aria-controls')).toBe(document.querySelectorAll('.en__registrants__group')[3].id);
		}); // end it('should set aria-controls')

		it('should set aria-labeledby and heading IDs', () => {
			expect(document.querySelector('.en__registrants__ticketHead').id).toBe(document.querySelector('.en__registrants__group').getAttribute('aria-labelledby'));
			expect(document.querySelectorAll('.en__registrants__ticketHead')[2].id).toBe(document.querySelectorAll('.en__registrants__group')[2].getAttribute('aria-labelledby'));
		}); // end it('should set IDs')
	}); // end describe('default settings')

	describe('Custom Settings', () => {
		beforeAll(() => {
			window.myCustomAccordion = new TEGAccordion({
				                                            categorySelector    : '.unNestedTitle',
				                                            categoryHeadSelector: '.unNestedTitle',
				                                            groupSelector       : '.folding',
				                                            groupIsCatChild     : false,
				                                            useAria             : false,
				                                            exclusive           : true,
			                                            });
		});

		it('should have no aria attributes', () => {
			expect(document.querySelectorAll('#nonEN [aria-expanded]').length).toBe(0);
			expect(document.querySelectorAll('#nonEN [aria-labelledby]').length).toBe(0);
		}); // end it('should have no aria attributes')

		it('should add open class', () => {
			document.querySelectorAll('.unNestedTitle')[1].classList.remove('open')
			document.querySelectorAll('.unNestedTitle')[1].click();
			expect(document.querySelectorAll('.unNestedTitle')[1].classList.contains('open')).toBeTrue();
		}); // end it('should add open class')

		it('should remove open class', () => {
			document.querySelectorAll('.unNestedTitle')[1].classList.remove('open')
			document.querySelectorAll('.unNestedTitle')[1].click();
			document.querySelectorAll('.unNestedTitle')[1].click();
			expect(document.querySelectorAll('.unNestedTitle')[1].classList.contains('open')).toBeFalse();
		}); // end it('should add open class')

		it('should only open one at a time', () => {
			const accordionItem01 = document.querySelectorAll('.unNestedTitle')[0],
			      accordionItem02 = document.querySelectorAll('.unNestedTitle')[1];
			accordionItem01.click();
			accordionItem02.click();
			expect(accordionItem02.classList.contains('open')).toBeTrue();
			expect(accordionItem01.classList.contains('open')).toBeFalse();
		}); // end it('should only open one at a time')
	}); // end describe('Custom Settings')
}); // end describe('TEG Accordion')
