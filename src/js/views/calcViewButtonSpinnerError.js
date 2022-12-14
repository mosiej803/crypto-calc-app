import View from './View.js';
import { PRIMARY_COLOR, TERTIARY_COLOR } from '../config';

class CalcViewSummaryButtonSpinnerError extends View {
  _content;
  _mobile;
  _parentElement;
  _viewPart;

  addHandlerMobileBackToInput(handler) {
    if (!this._parentElement) return;

    // Mobile view > summary spinner error box > back to input button
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const btnEl = e.target.closest('.back-to-input');

      if (!btnEl) return;

      handler();
    });
  }

  renderButton(mobile) {
    this._selectParentElement(mobile, 'button');
    if (!this._parentElement) return;

    this._renderBasic(this._generateButtonMarkup.bind(this));
  }

  renderSpinner(mobile) {
    this._selectParentElement(mobile, 'spinner');
    if (!this._parentElement) return;

    this._renderBasic(this._generateSpinnerMarkup.bind(this));
  }

  renderError(mobile, content) {
    this._selectParentElement(mobile, 'error');
    if (!this._parentElement) return;

    this._content = content;

    this._renderBasic(this._generateErrorMarkup.bind(this));
  }

  _selectParentElement(mobile, element) {
    // There are 2 containers for button, spinner and error in both form and summary parts of calc view. When in mobile view, we want to render spinner and error in form part. When not in mobile view, we want to render back to input button, spinner and error in summary part
    if (element === 'button') this._viewPart = mobile ? 'summary' : 'form';
    if (element === 'spinner' || element === 'error')
      this._viewPart = mobile ? 'form' : 'summary';

    this._parentElement = document.querySelector(
      `.${this._viewPart}-button-spinner-error`
    );
  }

  _generateButtonMarkup() {
    if (this._viewPart === 'form')
      return `<button type="submit" value="submit" class="btn btn--form">
                CALC
              </button>`;

    if (this._viewPart === 'summary')
      return `<div class="content">
                   <button class="back-to-input btn btn--form">back to input</button>
              </div>`;
  }

  _generateSpinnerMarkup() {
    return `
              <div class="content">
                  <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path fill="${
                  this._viewPart === 'form' ? PRIMARY_COLOR : TERTIARY_COLOR
                }" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
                  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
                      <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="2s" 
                        from="0 50 50"
                        to="360 50 50" 
                        repeatCount="indefinite" />
                  </path>
                <path fill="${
                  this._viewPart === 'form' ? PRIMARY_COLOR : TERTIARY_COLOR
                }" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
                  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
                      <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="1s" 
                        from="0 50 50"
                        to="-360 50 50" 
                        repeatCount="indefinite" />
                  </path>
                <path fill="${
                  this._viewPart === 'form' ? PRIMARY_COLOR : TERTIARY_COLOR
                }" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
                  L82,35.7z">
                      <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="2s" 
                        from="0 50 50"
                        to="360 50 50" 
                        repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
          `;
  }

  _generateErrorMarkup() {
    return `
            <div class="content">
              <p>${this._content}</p>
              ${
                this._viewPart === 'form'
                  ? `<button class="back-to-input btn btn--form">
                got it
              </button>`
                  : ``
              }
            </div>
    
          `;
  }
}

export default new CalcViewSummaryButtonSpinnerError();
