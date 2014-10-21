var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),
	testContent = require('./content/testcontent.html'),

	Chat = require('../../libs/Chat/view');

suite('testing dropdown view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		this.chat = new Chat({el : '.chat'});
	});

	teardown(function() {

	});

	test('test set input text', function(){
		var testMessage = 'test1',
			textInput   = Backbone.$( this.chat.ui.textInput)[0];
		this.chat.setInputTextMessage(testMessage);
		assert.isTrue(textInput.value == testMessage);
	}),

	test('test send message', function() {
		var testMessage = 'test2',
			sendButton  = Backbone.$( this.chat.ui.sendButton),
			chatBox     = Backbone.$( this.chat.ui.chatBox)[0];
		this.chat.setInputTextMessage(testMessage);
		sendButton.trigger('click');
		assert.isTrue(chatBox.lastChild.innerHTML == testMessage);
	});

	test('test send message 2', function() {
		var testMessage = 'test3',
			sendButton  = Backbone.$( this.chat.ui.sendButton),
			chatBox     = Backbone.$( this.chat.ui.chatBox)[0];
		this.chat.setInputTextMessage('valami');
		sendButton.trigger('click');
		this.chat.setInputTextMessage(testMessage);
		sendButton.trigger('click');
		assert.isTrue(chatBox.lastChild.innerHTML == testMessage);
	});

	test('test message validation', function() {
		assert.isTrue(this.chat.validateMessage('valid'));
	});

	test('test empty message validation', function() {
		assert.isFalse(this.chat.validateMessage(''));
	});

	test('test maximum long message validation', function() {
		assert.isTrue(this.chat.validateMessage(Array(40 + 1).join("a")));
	});

	test('test too long message validation', function() {
		assert.isFalse(this.chat.validateMessage(Array(41 + 1).join("a")));
	});

	test('test not valid message sending', function() {
		var testMessage = '',
			sendButton  = Backbone.$( this.chat.ui.sendButton),
			chatBox     = Backbone.$( this.chat.ui.chatBox)[0];
		this.chat.setInputTextMessage(testMessage);
		sendButton.trigger('click');
		assert.isFalse(chatBox.lastChild.innerHTML == testMessage);
	});

});
