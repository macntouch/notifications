/**
 * @copyright (c) 2016 Joas Schilling <coding@schilljs.com>
 * @copyright (c) 2015 Tom Needham <tom@owncloud.com>
 *
 * @author Tom Needham <tom@owncloud.com>
 * @author Joas Schilling <coding@schilljs.com>
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 */

(function() {

	/**
	 * Initialise the notification
	 *
	 * @param {Object} data
	 * @param {int} data.notification_id
	 * @param {string} data.app
	 * @param {string} data.user
	 * @param {string} data.datetime
	 * @param {string} data.object_type
	 * @param {string} data.object_id
	 * @param {string} data.subject
	 * @param {string} data.message
	 * @param {string} data.link
	 * @param {string} data.icon
	 * @param {Object[]} data.actions
	 */
	OCA.Notifications.Notification = function(data) {
		this.data = data;
	};

	OCA.Notifications.Notification.prototype = {
		getId: function() {
			return this.data.notification_id;
		},

		getApp: function() {
			return this.data.app;
		},

		getUser: function() {
			return this.data.user;
		},

		getTimestamp: function() {
			return moment(this.data.datetime).format('X');
		},

		getObjectType: function() {
			return this.data.object_type;
		},

		getObjectId: function() {
			return this.data.object_id;
		},

		getSubject: function() {
			return this.data.subject;
		},

		getMessage: function() {
			var message = this.data.message;

			/**
			 * Trim on word end after 100 chars or hard 120 chars
			 */
			if (message.length > 120) {
				var spacePosition = message.indexOf(' ', 100);
				if (spacePosition !== -1 && spacePosition <= 120) {
					message = message.substring(0, spacePosition);
				} else {
					message = message.substring(0, 120);
				}
				message += '…';
			}

			return message.replace(new RegExp("\n", 'g'), ' ');
		},

		getLink: function() {
			return this.data.link;
		},

		getIcon: function() {
			return this.data.icon;
		},

		getActions: function() {
			return this.data.actions;
		},

		getElement: function() {
			return $('div.notification[data-id=' + parseInt(this.getId(), 10) + ']');
		},

		/**
		 * Generates the HTML for the notification
		 * @param {Function} template
		 */
		renderElement: function(template) {
			return template(_.extend(this.data, {
				message: this.getMessage()
			}));
		}
	};

})();
