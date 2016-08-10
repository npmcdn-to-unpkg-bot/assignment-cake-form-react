/* eslint max-len: 0 */

import trim from 'lodash/trim';
import find from 'lodash/find';

export default class CakeEnquiryForm extends React.Component {
  constructor() {
    super();
    this.initState();
  }

  onCelebrationTypeOtherChange = (e) => {
    this.setState({
      celebrationType: e.currentTarget.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.clearErrors();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
    }
  }

  onReset = () => {
    this.initState();
  }

  getError(field) {
    const e = find(this.state.errors, (error) => error.field === field);
    return e || {};
  }

  getErrorClass(field) {
    return this.getError(field).field ? 'error' : '';
  }

  getErrorMessage(field) {
    return this.getError(field).message || '';
  }

  initState() {
    this.state = {
      errors: [],
      celebrationType: null,
    };
  }

  clearErrors() {
    this.setState({ errors: [] });
  }

  validate() {
    const errors = [];

    // Celebration type other should be specified
    if (this.state.celebrationType === 'other') {
      const celebrationTypeOther = trim(this.celebrationTypeOtherEl.value);
      if (!celebrationTypeOther) {
        errors.push({ field: 'celebration-type-other', message: 'Please enter your celebration type' });
      }
    }

    return errors;
  }

  render() {
    return (
      <form className="cake-enquiry-form">

        <fieldset>

          <legend>Cake Enquiry Form</legend>

          <label>Name:</label>
          <input type="text" name="name" />

          <label>Email:</label>
          <input type="email" name="email" />

          <label>Type of cake:</label>
          <ul>
            <li><label><input type="checkbox" name="cake-type-cupcakes" />Cupcakes</label></li>
            <li><label><input type="checkbox" name="cake-type-cheesecakes" />Cheesecakes</label></li>
            <li><label><input type="checkbox" name="cake-type-buttercakes" />Buttercakes</label></li>
            <li><label><input type="checkbox" name="cake-type-mudcakes" />Mudcakes</label></li>
          </ul>

          <label>Celebration type:</label>
          <ul>
            <li><label><input type="radio" name="celebration-type" value="birthday" onClick={this.onCelebrationTypeOtherChange} />Birthday</label></li>
            <li><label><input type="radio" name="celebration-type" value="wedding" onClick={this.onCelebrationTypeOtherChange} />Wedding</label></li>
            <li><label><input type="radio" name="celebration-type" value="corporate" onClick={this.onCelebrationTypeOtherChange} />Corporate</label></li>
            <li><label><input type="radio" name="celebration-type" value="other" onClick={this.onCelebrationTypeOtherChange} />Other</label></li>
            <li>
              <div className="error-message celebration-type-other-error">
                {this.getErrorMessage('celebration-type-other')}
              </div>
              <label>
                <input
                  type="text"
                  name="celebration-type-other"
                  ref={(el) => { this.celebrationTypeOtherEl = el; }}
                  className={this.getErrorClass('celebration-type-other')}
                />
              </label>
            </li>
          </ul>

          <label>Tell us about your dream cake:</label>
          <textarea name="dream-cake" rows="4" />

          <button type="submit" onClick={this.onSubmit}>Send away</button>
          <button type="reset" onClick={this.onReset}>Restart</button>

        </fieldset>

      </form>
    );
  }
}
