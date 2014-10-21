/**
 * @module views/Chat
 */

var Backbone = require('backbone'),

	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
		Chat = Backbone.Marionette.View.extend(
		/** @lends module:views/Chat~Chat.prototype */
		{
			ui : {
				textInput  : '.chat-input',
				sendButton : '.chat-submit',
				chatBox    : '.chat-box'
			},

			events : {
				'click @ui.sendButton' : 'sendButtonClick'
			},

			/**
			 * Set the chat input's value to the given message.
			 * @param {string} message   The message what we want to set in.
			 */
			setInputTextMessage : function(message) {
				var textInput = Backbone.$(this.ui.textInput)[0];
				textInput.value = message;
			},

			/**
			 * Add the valid input message into the chatbox.
			 */
			sendButtonClick : function() {
				var textInput = Backbone.$(this.ui.textInput)[0],
					chatBox = Backbone.$(this.ui.chatBox)[0];
				if (this.validateMessage(textInput.value)) {
					Backbone.$('<p>', {
						class : 'message',
						text  : textInput.value
					}).appendTo(chatBox);
					textInput.value = '';
				}
			},

			/**
			 * Validate the given message.
			 * @param {string} message   The message what we want to validate.
			 * @returns {boolean}        Is it valid or not?
			 */
			validateMessage : function(message) {
				return (!!message && message.length <= 40);
			}
		}
	);

module.exports = Chat;
