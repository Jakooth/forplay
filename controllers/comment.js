function CommentManager() {

  /**
   * PRIVATE
   */
    
  var self = this;
  var commentAPI = '/forapi/forsecure/comment.php';
  var restoreEdit;
  
  var $comment = $('#comment');








  /**
   * PUBLIC
   */
   
  this.getComments = function(articleId) {
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
            indentComment: _indentComment
          });
          
      $comment.prepend($(html));
    }).fail(function() {
      console.log("Failed to get comments.");   
    });  
  }
   
  this.sendComment = function(data) {
    var self = this;
    
    $.ajax({
      type: data.deleted ? "DELETE" : "POST",
      contentType: "application/json; charset=utf-8",
      url: commentAPI,
      data: JSON.stringify(data),
      dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
      _clearComments();
      
      self.getComments(data.comments.article_id);
    }).fail(function (data, textStatus, jqXHR) {
      console.log("Failed to post comment.");
    });
  }








  /**
   * PRIVATE
   */
   
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
    
    if (window.userProfile['appMetadata']['roles'][0] == 'admin' ||
				window.userProfile['appMetadata']['roles'][0] == 'superadmin') {
			
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
    $li.find('[data-id=reply]').attr('aria-hidden', isEdit);
    $li.find('[data-id=delete]').attr('aria-hidden', isEdit);
    $li.find('[data-id=edit]').attr('aria-hidden', isEdit);
    $li.find('[data-id=save]').attr('aria-hidden', !isEdit);
    $li.find('[data-id=cancel]').attr('aria-hidden', !isEdit);
    $li.find('[data-id=bold]').attr('aria-hidden', !isEdit);
    $li.find('[data-id=italic]').attr('aria-hidden', !isEdit);
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
    $('#sendCommentForm').find('[contenteditable]').html(''); 
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
   
  $comment.on('click', '[data-id=delete]', function(e) {
    self.sendComment(_getCommentData('delete', $(this)));
  }); 
   
  $comment.on('click', '[data-id=like]', function(e) {
    self.sendComment(_getCommentData('like', $(this)));
  });
  
  $comment.on('click', '[data-id=ban]', function(e) {
    self.sendComment(_getCommentData('ban', $(this)));
  }); 
  
  $comment.on('click', '[data-id=flag]', function(e) {
    self.sendComment(_getCommentData('flag', $(this)));
  });  
   
  $comment.on('click', '[data-id=edit]', function(e) {
    _editComment($(this), true);
  }); 
  
  $comment.on('click', '[data-id=save]', function(e) {
    self.sendComment(_getCommentData('edit', $(this)));  
  }); 
  
  $comment.on('click', '[data-id=cancel]', function(e) {
    _editComment($(this), false);
  });
  
  $comment.on('click', '#sendCommentForm [data-id=clear]', function(e) {
    _resetSendForm();
  });
  
  $comment.on('click', '#replyCommentForm [data-id=clear]', function(e) {
    _removeReplyForm(); 
  });
  
  $comment.on('click', '[data-id=clear]', function(e) {
    _removeReplyForm(); 
    _resetSendForm();
  });
  
  $comment.on('click', '[data-id=reply]', function(e) {
    _cloneSendForm($(this));  
  });
  
  $comment.on('click', '#sendCommentForm [data-id=send]', function(e) {    
    self.sendComment(_getCommentData('add', $(this)));
    
    _resetSendForm();
  });
  
  $comment.on('click', '#replyCommentForm [data-id=send]', function(e) {    
    self.sendComment(_getCommentData('reply', $(this)));  
  });
   
  $comment.on('click', '[data-id=bold]', function(e) {
    document.execCommand('bold');  
  });
  
  $comment.on('click', '[data-id=italic]', function(e) {
    document.execCommand('italic');  
  });
}