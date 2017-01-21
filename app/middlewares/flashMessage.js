class FlashMessage {
  constructor(ctx) {
    this._session = ctx.session;
    this._flashMessage = ctx.session && ctx.session.flashMessage;
    if (!this._flashMessage) {
      this._flashMessage = {};
    }
  }

  _saveMessage(type, message) {
    this._flashMessage[type] = message;
    if (this._session) {
      this._session.flashMessage = this._flashMessage;
    }
  }

  _getMessage(type) {
    const message = this._flashMessage[type];
    if (message) {
      delete this._flashMessage[type];
      if (this._session) {
        this._session.flashMessage = this._flashMessage;
      }
    }
    return message;
  }

  set success(message) {
    this._saveMessage('success', message);
  }

  get success() {
    return this._getMessage('success');
  }

  set notice(message) {
    this._saveMessage('info', message);
  }

  get notice() {
    return this._getMessage('info');
  }

  set danger(message) {
    this._saveMessage('danger', message);
  }

  get danger() {
    return this._getMessage('danger');
  }

  set warning(message) {
    this._saveMessage('warning', message);
  }

  get warning() {
    return this._getMessage('warning');
  }

  get messages() {
    const messages = this._flashMessage;
    const keys = Object.keys(messages);
    if (keys.length > 0 && this._session) {
      this._session.flashMessage = null;
    }
    return messages;
  }
}

const flashMessageMiddle = async function(ctx, next) {
  const flashMessage = new FlashMessage(ctx);
  if (!ctx.state) {
    ctx.state = {};
  }
  ctx.state.flashMessage = flashMessage;
  ctx.flashMessage = flashMessage;
  await next();
};

export default flashMessageMiddle;
