const ROOT_URL = 'http://localhost:8000/';

const select = {
  SUBMIT_BUTTON: 'button[type=submit]',
  CELEBRATION_TYPE_OTHER_INPUT: 'input[name=celebration-type-other]',
  CELEBRATION_TYPE_OTHER_CHECKBOX: 'input[name=celebration-type][value=other]',
  CELEBRATION_TYPE_CORPORATE_CHECKBOX: 'input[name=celebration-type][value=corporate]',
  CELEBRATION_TYPE_INPUT: 'input[name=celebration-type]',
  CAKE_ENQUIRY_FORM: '.cake-enquiry-form',
};

describe('Cake Enquiry Form', () => {
  before(() => {
    casper.start();
    // Display any console messages logged in the remote browser
    casper.on('remote.message', (message) => {
      casper.echo(`REMOTE: ${message}`);
    });
  });

  describe('Celebration Type Other', () => {
    context('When submitting an empty form', () => {
      before((done) => {
        casper.thenOpen(ROOT_URL, () => {
          casper.click(select.SUBMIT_BUTTON);
          done();
        });
      });

      it('Should not have an error', () => {
        const inputClass = casper.getElementAttribute(
          select.CELEBRATION_TYPE_OTHER_INPUT, 'class'
        );
        expect(inputClass).to.not.contain('error');
      });
    });

    context('When submitting with `corporate` celebration type', () => {
      before((done) => {
        casper.thenOpen(ROOT_URL, () => {
          casper.click(select.CELEBRATION_TYPE_CORPORATE_CHECKBOX);
          casper.click(select.SUBMIT_BUTTON);
          done();
        });
      });
      it('Should not have an error', () => {
        const inputClass = casper.getElementAttribute(
          select.CELEBRATION_TYPE_OTHER_INPUT, 'class'
        );
        expect(inputClass).to.not.contain('error');
      });
    });

    context('When submitting with `other` celebration type', () => {
      before((done) => {
        casper.thenOpen(ROOT_URL, () => {
          casper.click(select.CELEBRATION_TYPE_OTHER_CHECKBOX);
          casper.click(select.SUBMIT_BUTTON);
          done();
        });
      });
      it('Should have an error', () => {
        const inputClass = casper.getElementAttribute(
          select.CELEBRATION_TYPE_OTHER_INPUT, 'class'
        );
        expect(inputClass).to.contain('error');
      });
    });

    context('When submitting with `other` celebration type and providing an other value', () => {
      before((done) => {
        casper.thenOpen(ROOT_URL, () => {
          casper.click(select.CELEBRATION_TYPE_OTHER_CHECKBOX);
          casper.fill(select.CAKE_ENQUIRY_FORM, {
            'celebration-type-other': 'Other Celebration Type',
          }, false);
          casper.click(select.SUBMIT_BUTTON);
          done();
        });
      });
      it('Should have not an error', () => {
        const inputClass = casper.getElementAttribute(
          select.CELEBRATION_TYPE_OTHER_INPUT, 'class'
        );
        expect(inputClass).to.not.contain('error');
      });
    });

    context('When submitting with `other` celebration type '
      + 'and providing an other value that is only spaces', () => {
      before((done) => {
        casper.thenOpen(ROOT_URL, () => {
          casper.click(select.CELEBRATION_TYPE_OTHER_CHECKBOX);
          casper.fill(select.CAKE_ENQUIRY_FORM, {
            'celebration-type-other': '     ',
          }, false);
          casper.click(select.SUBMIT_BUTTON);
          done();
        });
      });
      it('Should have an error', () => {
        const inputClass = casper.getElementAttribute(
          select.CELEBRATION_TYPE_OTHER_INPUT, 'class'
        );
        expect(inputClass).to.contain('error');
      });
    });
  });
});
