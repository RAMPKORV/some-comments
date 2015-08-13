/**
 * Some Comments - a comment engine
 * Copyright (C) 2015 Fredrik Liljegren
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU Affero General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See
 * the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along with this
 * program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
 * GNU-AGPL-3.0
 */

var jwt = require('jsonwebtoken')

module.exports = function(db, config) {
  var User = db.qDefine('user', {
    displayName: String,
    avatar:      String,
    email:       String,
  }, {
    methods: {
      /**
       * Get an unsubscribe token for a page
       */
      unsubscribeToken: function (pageId) {
        return jwt.sign({page: pageId, user: this.id}, config.secret, {subject: 'unsubscribe'})
      }
    }
  })

  /**
   * @return Promise for a user
   *
   * @exception Error  If token is not valid
   */
  User.unsubscribe = function(unsubscribeToken) {
    if (!jwt.verify(unsubscribeJwt, config.secret)) {
      throw new Error('Unsubscribe token is invalid.')
    }

    /// @todo...
  }

  return User
}
