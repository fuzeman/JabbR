﻿/*global define*/
define([
    'logger',
    'kernel',
    'jabbr/core/events',
    'jabbr/core/utility'
], function (Logger, kernel, events, utility) {
    var logger = new Logger('jabbr/viewmodels/message'),
        client = null,
        ru = null,
        processor = null;

    events.bind(events.activated, function () {
        client = kernel.get('jabbr/client');
        ru = kernel.get('jabbr/components/rooms.ui');
        processor = kernel.get('jabbr/messageprocessors/processor');

        logger.trace('activated');
    });

    logger.trace('loaded');

    function mentionsMatch(content) {
        if (client.customMentionRegex === null) {
            return false;
        }

        return client.customMentionRegex.test(content);
    }

    function Message(data) {
        if (data === null) {
            logger.warn('invalid message data');
            return;
        }

        var reUsername = new RegExp("\\b@" + client.chat.state.name.replace(/\./, '\\.') + "\\b", "i");

        this.name = data.User.Name;
        this.hash = data.User.Hash;
        this.mention = data.User.Mention;
        this.id = data.Id;
        this.date = data.When.fromJsonDate();
        this.highlight = (reUsername.test(data.Content) || mentionsMatch(data.Content)) ? 'highlight' : '';
        this.isOwn = reUsername.test(data.User.name);
        this.isMine = data.User.Name === client.chat.state.name;
        this.isHistory = 'isHistory' in data ? data.isHistory : false;
        this.imageUrl = data.ImageUrl;
        this.source = data.Source;
        this.messageType = data.MessageType;

        this.message = data.HtmlEncoded ? data.Content :
            processor.processPlainContent(data.Content, {
                isHistory: this.isHistory,
                messageType: this.messageType
            });

        this.htmlContent = data.HtmlContent;
    }

    return Message;
});