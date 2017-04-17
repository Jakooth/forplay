function CommentManager() {

  /**
   * PRIVATE
   */
    
  var self = this;
  var commentAPI = '/forapi/forsecure/comment.php';
  var restoreEdit;
  
  var $comment = $('#comment'),
      $commentForm = $('#sendCommentForm');








  /**
   * PUBLIC
   */
   
  this.showComments = function() {
    $commentForm.attr('aria-hidden', false);
  } 
  
  this.hideComments = function() {
    $commentForm.attr('aria-hidden', true);
  }
  
  this.getNewComments = function(articleId, profileId) {
    var params = {};
    
    if (articleId) params.articleId = articleId;
    if (profileId) params.profileId = profileId;
    
    var result = $.get(encodeURI(commentAPI + '?' + $.param(params))),
        renderer = $.get('/renderers/notification.html');
  
    $.when(result, renderer).done(function(result, renderer) {
      var data = result[0].length ? JSON.parse(result[0]) : result,
          tmpls = $.templates({
            notificationTemplate: renderer[0]
          }),
          html = $.templates.notificationTemplate
                            .render(data);
          
      $('body').append($(html));
      
      utils.replaceProxyImages($('[role=status]'));
    }).fail(function() {
      console.log("Failed to load notifications.");   
    });
  }
   
  this.getComments = function(articleId) {
    var self = this;
    
    var params = '?articleId=' + articleId,
        result = $.get(encodeURI(commentAPI + params)),
        renderer = $.get('/renderers/comment.html');
    
    lastArticleId = articleId;
      
    $.when(result, renderer).done(function(result, renderer) {
      var data = result[0].length ? JSON.parse(result[0]) : result,
          tmpls = $.templates({
            commentTemplate: renderer[0]
          }),
          html = $.templates.commentTemplate
                            .render(data, {
            unescape: utils.unescape,
            translate: utils.translate,
            formatDate: utils.formatDate,
            canEdit: _canEdit,
            canLike: _canLike,
            canBan: _canBan,
            indentComment: _indentComment,
            getParentId: _getParentId
          });
       
      _clearComments();
          
      $comment.prepend($(html));
      $comment.attr('aria-busy', false);
      $commentForm.attr('aria-hidden', false); 
      
      if (location.hash) { 
        var offset = $('header').is('.static') ? banner.getFixedHeight() : 
                                                 banner.getCoversCurrentHeight();
        
        $(document).scrollTop($(location.hash).offset().top - offset);
      }
    }).fail(function() {
      
      /**
       * Comments are loaded, but the user is not authorized.
       * Or something went terribly wrong and nothing is loaded.
       */
      
      if (location.hash) { 
        var offset = $('header').is('.static') ? banner.getFixedHeight() : 
                                                 banner.getCoversCurrentHeight();
        
        $(document).scrollTop($(location.hash).offset().top - offset);
        
        if (! window.userProfile) {
          login.showUserLock();
        }
      }
      
      if (! window.userProfile) return;
      
      /**
       * If there is profile, but the token is expired.
       */
      
      if (! login.canRetryLogin()) { 
        console.log("Too many automatic retries. Logging out.  " +  
                    "Try to log in again or contact admin@forplay.bg."); 
         
        login.clearUserProfile(); 
         
        return; 
      } 
       
      console.log("Failed to authorize against the comments API. " +  
                  "Automatically trying to renew log in."); 
       
      login.increaseFailedLogins(); 
      login.renewUserProfile(function() { 
          self.getComments(articleId); 
      });         
    });  
  }
   
  this.sendComment = function(data) {
    var self = this;
    
    $comment.attr('aria-busy', true);
    $commentForm.attr('aria-hidden', true);
    
    $.ajax({
      type: data.deleted ? "DELETE" : "POST",
      contentType: "application/json; charset=utf-8",
      url: commentAPI,
      data: JSON.stringify(data),
      dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
    
      /**
       * Remove the hash anchor to avoid scroll.
       */
      
      if (location.hash) {
        history.pushState("", document.title, window.location.pathname + 
                                              window.location.search);
      }
      
      self.getComments(data.comments.article_id);
    }).fail(function (data, textStatus, jqXHR) {
      console.log("Failed to post comment.");
    });
  }
  
  this.showNotification = function() {
		$profile = $('[role=status]');
		
		$profile.attr('aria-hidden', false);
	}
	
	this.hideNotification = function() {
		$profile = $('[role=status]');
		
		$profile.attr('aria-hidden', true);
	}








  /**
   * PRIVATE
   */
  
  var _getParentId = function(path) {
    return parseInt(path.slice(0, 6), 16);
  } 
   
  var _canEdit = function(profileId) {
    if (! window.userProfile) return true;
    
    return window.userProfile.profile_id == profileId ? false : true;
  } 
  
  var _canLike = function(profileId) {
    if (! window.userProfile) return true;
    
    return window.userProfile.profile_id == profileId ? true : false;
  }
  
  var _canBan = function() {
    var canBan = true;
    
    if (! window.userProfile) return true;
    
    if (window.userProfile['roles'][0] == 'admin' ||
				window.userProfile['roles'][0] == 'superadmin') {
			
      canBan = false;
    }
    
    return canBan;
  }
  
  var _indentComment = function(path) {
    return (path.length * (utils.isMobile() ? 1 : 2)) - (6 * (utils.isMobile() ? 1 : 2)) + 'px';
  }
   
  this._getArticleId = function() {
    var path = window.location.href.split('/');
    
    return Number(path[path.length - 2]);
  }
  
  var _getComment = function($button) {    
    return $button.parents('form').find('[contenteditable]').html();
  }
  
  var _getParentComment = function($button) {
    return $button.parents('li').data('id');
  }
  
  var _getCommentId = function($button) {
    return $button.parents('li').data('id');
  }
  
  var _clearComments = function() {
    $comment.find('h2').remove();
    $comment.find('ul').remove();
  }
  
  var _editComment = function($button, isEdit) {
    var $li = $button.parents('li'),
        $edit = $li.find('[contenteditable]');
    
    _removeReplyForm();
    
    if (isEdit) restoreEdit = $edit.html();   
    if (!isEdit) $edit.html(restoreEdit); 
        
    $edit.attr('aria-readonly', !isEdit);   
    $edit.attr('contenteditable', isEdit);
    $li.find('[data-icon=reply]').attr('aria-hidden', isEdit);
    $li.find('[data-icon=delete]').attr('aria-hidden', isEdit);
    $li.find('[data-icon=edit]').attr('aria-hidden', isEdit);
    $li.find('[data-icon=save]').attr('aria-hidden', !isEdit);
    $li.find('[data-icon=cancel]').attr('aria-hidden', !isEdit);
    $li.find('[data-icon=bold]').attr('aria-hidden', !isEdit);
    $li.find('[data-icon=italic]').attr('aria-hidden', !isEdit);
  }
  
  var _cloneSendForm = function($button) {
    var $form = $('#replyCommentForm').length > 0 ? 
                $('#replyCommentForm').detach() : 
                $comment.find('> form').clone(),
        $h3 = $form.find('h3'),
        $li = $button.parents('li');
    
    if ($('#replyCommentForm').length <= 0) {
      $h3.text('Добави отговор');
      $h3.prop('id', 'replyCommentHeading');
      $form.prop('id', 'replyCommentForm');
    }
    
    $form.appendTo($li);
  }
  
  var _removeReplyForm = function() {
    $('#replyCommentForm').remove(); 
  }
  
  var _resetSendForm = function($button) {
    $commentForm.find('[contenteditable]').html(''); 
  }
  
  var _getButtonStatus = function($button) {
    return $button.attr('aria-pressed') == 'true' ? 0 : 1;
  }
   
  var _getCommentData = function(method, $this) {
    var commentId,
        parentCommentId = null,
        path,	
        articleId,	
        profileId,
        comment = '',
        liked = null,	
        disliked = null,	
        flagged = null,	
        banned = null,
        delted = 0,
        comment = {};
        
    switch (method) {
      case 'add':
        comment.articleId = self._getArticleId();
        comment.comment = utils.escape(_getComment($this));
        
        break;
      case 'reply':
        comment.articleId = self._getArticleId();        
        comment.comment = utils.escape(_getComment($this));
        comment.parentCommentId = utils.escape(_getParentComment($this));
        
        break;
      case 'edit':
        comment.commentId = _getCommentId($this);
        comment.comment = utils.escape(_getComment($this));
        
        break;  
      case 'like':
        comment.commentId = _getCommentId($this);
        comment.liked = _getButtonStatus($this);
        
        break; 
      case 'dislike':
        comment.commentId = _getCommentId($this);
        comment.disliked = _getButtonStatus($this);
        
        break;
      case 'flag':
        comment.commentId = _getCommentId($this);
        comment.flagged = _getButtonStatus($this);
        
        break;
      case 'ban':
        comment.commentId = _getCommentId($this);
        comment.banned = _getButtonStatus($this);
        
        break; 
      case 'delete':
        comment.commentId = _getCommentId($this);
        comment.deleted = 1;
        
        break;      
    }    
        
    return comment;
  } 








  /**
   * EVENTS
   */
   
  $('body').on('click', '#notificationClose', function(e) {		
		self.hideNotification();
	}); 
  
  $comment.on('click', 'h2 > a', function(e) {
    if (! window.userProfile) {
      login.showUserLock();
    }
  });
  
  $comment.on('focus', '#sendCommentForm [contenteditable]', function(e) {
    if (! window.userProfile) {
      $(this).blur();
      
      login.showUserLock();
    }
  });
  
  $(document).on('forplayAppended portalAppended', function(e, articleId) {
    if (window.userProfile) {
      
      /**
       * Any string or number will work as profile_id.
       * This is a workaround in case the read comments are called,
       * before the authentications is finalized.
       * In fact the porfile_id is get on API side.
       */
      
      self.getNewComments(false, window.userProfile.profile_id || 'anonymous');
    }
  });
   
  $(document).on('articleAppended newsAppended', function(e, articleId) {
    self.getComments(articleId);
  });
  
  $comment.on('click', '[data-icon=delete]', function(e) {
    self.sendComment(_getCommentData('delete', $(this)));
  }); 
   
  $comment.on('click', '[data-icon=like]', function(e) {
    self.sendComment(_getCommentData('like', $(this)));
  });
  
  $comment.on('click', '[data-icon=ban]', function(e) {
    self.sendComment(_getCommentData('ban', $(this)));
  }); 
  
  $comment.on('click', '[data-icon=flag]', function(e) {
    self.sendComment(_getCommentData('flag', $(this)));
  });  
   
  $comment.on('click', '[data-icon=edit]', function(e) {
    _editComment($(this), true);
  }); 
  
  $comment.on('click', '[data-icon=save]', function(e) {
    self.sendComment(_getCommentData('edit', $(this)));  
  }); 
  
  $comment.on('click', '[data-icon=cancel]', function(e) {
    _editComment($(this), false);
  });
  
  $comment.on('click', '#sendCommentForm [data-icon=clear]', function(e) {
    _resetSendForm();
  });
  
  $comment.on('click', '#replyCommentForm [data-icon=clear]', function(e) {
    _removeReplyForm(); 
  });
  
  $comment.on('click', '[data-icon=clear]', function(e) {
    _removeReplyForm(); 
    _resetSendForm();
  });
  
  $comment.on('click', '[data-icon=reply]', function(e) {
    if (! window.userProfile) {
      login.showUserLock();
      
      return;
    }
    
    _cloneSendForm($(this));  
  });
  
  $comment.on('click', '#sendCommentForm [data-icon=send]', function(e) {
    if (! window.userProfile) {
      login.showUserLock();
      
      return;
    }
        
    self.sendComment(_getCommentData('add', $(this)));
    
    _resetSendForm();
  });
  
  $comment.on('click', '#replyCommentForm [data-icon=send]', function(e) {    
    self.sendComment(_getCommentData('reply', $(this)));  
  });
   
  $comment.on('click', '[data-icon=bold]', function(e) {
    document.execCommand('bold');  
  });
  
  $comment.on('click', '[data-icon=italic]', function(e) {
    document.execCommand('italic');  
  });
}