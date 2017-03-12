function CommentManager() {

/**
 * PRIVATE
 */
	
var self = this;
var commentAPI = '/forapi/forsecure/comment.php';

var $comments = $('#comments');
var $addComment = $('#addComment');
var $cancelComment = $('#cancelComment');
var $boldComment = $('#boldComment');
var $italicComment = $('#italicComment');








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
          commentsTemplate: renderer[0]
        }),
        html = $.templates.commentsTemplate
                          .render(data, {
          unescape: utils.unescape,
          translate: utils.translate
        });
        
    $comments.prepend($(html));
  }).fail(function() {
    if (!login.canRetryLogin()) {
      console.log("Too many automatic retries. Logging out.  " + 
                  "Try to log in again or contact admin@forplay.bg.");
      
      login.clearUserProfile();
      
      return;
    }
    
    console.log("Failed to authorize against the comments API. " + 
                "Automatically trying to renew log in.");
    
    login.increaseFailedLogins();
    login.renewUserProfile(function() {
        self.getComments(articleId)
    });   
  });  
}
 
this.addComment = function(data) {
  var self = this;
  
  $.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: commentAPI,
		data: JSON.stringify(data),
		dataType: 'json'
	}).done(function (data, textStatus, jqXHR) {
  
    /**
     * TODO: Update comments list after post.
     */
  
	}).fail(function (data, textStatus, jqXHR) {
		console.log("Failed to post comment.");
	});
}

this.replyToComment = function() {
}

this.banComment = function() {
}

this.likeComment = function() {
}

this.dislikeComment = function() {
}

this.flagComment = function() {
}








/**
 * PRIVATE
 */
 
this._getArticleId = function() {
  var path = window.location.href.split('/');
  
  return Number(path[path.length - 2]);
}

var _getComment = function() {
  return $comment.find('[contenteditable]').html();
}
 
var _getCommentData = function(method) {
  var commentId,
      parentCommentId = null,
      path,	
      articleId,	
      profileId,
      comment = "",
      liked = 0,	
      disliked = 0,	
      flagged = 0,	
      banned = 0,
      comment = {};
      
  switch (method) {
    case 'add':
      comment.articleId = this._getArticleId();
      comment.path = '';
      comment.comment = _getComment();
      
      break;
  }    
      
  return comment;
} 








/**
 * EVENTS
 */ 

}