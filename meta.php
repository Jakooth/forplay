<?php
include ('../../forsecret/db.php');

$uri = $_SERVER['REQUEST_URI'];
$params = explode('/', $uri);

if (sizeof($params) < 4) {
    $get_issue_sql = "SELECT for_articles.*, 
                           for_issues.`name` AS issue, 
                           for_issues.tag AS issue_tag 
                      FROM for_articles
                      INNER JOIN for_rel_issues ON for_articles.article_id = for_rel_issues.article_id
                      INNER JOIN for_issues ON for_issues.issue_id = for_rel_issues.issue_id
                      WHERE (subtype 
                      IN ('news', 'video', 'review', 'feature') 
                      OR (subtype = 'aside' AND priority = 'aside')) 
                      AND for_articles.`date` <= now()
                      ORDER BY date DESC
                      LIMIT 1;";
    
    $get_issue_result = mysqli_query($link, $get_issue_sql);
    
    while ($article = mysqli_fetch_assoc($get_issue_result)) {
        echo '<title>Forplay брой ' . $article['issue_tag'] . ' ' .
                 $article['issue'] . '</title>';
        echo '<meta name="description" content="Форплей е онлайн портал за всякакъв вид развлечение. Това е нашето виртуално кътче, където ще намериш новини, ревюта и анализи относно любимите ти видео игри, филми, музика, книги, настолни игри, лайфстайл и изобщо всички модерни форми на забавление.">';
        echo '<meta property="fb:app_id" content="1570704799916233" />';
        echo '<meta property="og:url" content="https://www.forplay.bg/">';
        echo '<meta property="og:type" content="website">';
        echo '<meta property="og:title" content="Forplay брой ' .
                 $article['issue_tag'] . ' ' . $article['issue'] . '">';
        echo '<meta property="og:description" content="Форплей е онлайн портал за всякакъв вид развлечение. Това е нашето виртуално кътче, където ще намериш новини, ревюта и анализи относно любимите ти видео игри, филми, музика, книги, настолни игри, лайфстайл и изобщо всички модерни форми на забавление.">';
        echo '<meta property="og:image" content="https://forplay.bg/forapi/phplib/timthumb/timthumb.php?src=/assets/articles/forplay/forplay-01.jpg&w=1280&h=720">';
        echo '<meta property="og:site_name" content="Forplay">';
        echo '<meta property="og:locale" content="bg_BG">';
    }
} else {
    
    $get_article_sql = "SELECT * FROM for_articles 
					    WHERE article_id = {$params [4]};";
    
    $get_article_result = mysqli_query($link, $get_article_sql);
    
    while ($article = mysqli_fetch_assoc($get_article_result)) {
        
        /**
         * Merge authors.
         */
        
        $get_author_sql = "SELECT for_authors.* FROM for_authors
    					   LEFT JOIN for_rel_authors
    					   ON for_authors.author_id = for_rel_authors.author_id
    					   WHERE for_rel_authors.article_id = {$params [4]}
    					   GROUP BY author_id;";
        
        $get_author_result = mysqli_query($link, $get_author_sql);
        
        $article['authors'] = array();
        
        if ($get_author_result) {
            while ($author = mysqli_fetch_assoc($get_author_result)) {
                $article['authors'][] = $author['en_name'];
            }
        }
        
        /**
         * Merge version tested.
         */
        
        if ($article['subtype'] == 'review' || $article['subtype'] == 'video') {
            
            $get_platform_sql = "SELECT for_platforms.*
    							 FROM for_platforms
    							 WHERE platform_id = {$article['platform']};";
            
            $get_platform_result = mysqli_query($link, $get_platform_sql);
            
            if ($get_platform_result) {
                $platform = mysqli_fetch_assoc($get_platform_result);
                
                $article['version_tested'] = $platform;
            }
        }
        
        /**
         * Merge tags.
         */
        
        $get_tags_sql = "SELECT for_tags.*, for_rel_tags.prime FROM for_tags
    					 LEFT JOIN for_rel_tags
    					 ON for_tags.tag_id = for_rel_tags.tag_id
    					 WHERE for_rel_tags.article_id = {$params [4]}
    					 GROUP BY tag_id
    					 ORDER BY for_rel_tags.prime DESC;";
        
        $get_tags_result = mysqli_query($link, $get_tags_sql);
        
        while ($tag = mysqli_fetch_assoc($get_tags_result)) {
            $article['tags'][] = $tag['en_name'];
            
            if ($tag['prime'] == 1) {
                $article['prime'] = $tag;
            }
        }
        
        /**
         * Merge issue.
         */
        
        $get_issue_sql = "SELECT for_issues.issue_id,
        						 for_issues.name AS en_name,
        						 for_issues.tag
    					  FROM for_issues
    					  LEFT JOIN for_rel_issues
    					  ON for_issues.issue_id = for_rel_issues.issue_id
    					  WHERE for_rel_issues.article_id = {$params [4]}
    					  GROUP BY issue_id;";
        
        $get_issue_result = mysqli_query($link, $get_issue_sql);
        
        while ($issue = mysqli_fetch_assoc($get_issue_result)) {
            $article['issue'][] = $issue;
        }
        
        echo '<title>' . $article['title'] . '</title>';
        echo '<meta name="description" content="' . $article['subtitle'] .
                 ', Статия: ' . $article['subtype'] . ', Раздел: ' .
                 $article['type'] . ', Автор: ' . join(', ', 
                        $article['authors']) . ', Относно: ' .
                 join(', ', $article['tags']) . '">';
        echo '<meta property="fb:app_id" content="1570704799916233" />';
        echo '<meta property="og:url" content="https://www.forplay.bg' . $uri .
                 '">';
        echo '<meta property="og:type" content="article">';
        echo '<meta property="og:title" content="' . $article['title'] . '">';
        echo '<meta property="og:description" content="' . $article['subtitle'] .
                 '">';
        echo '<meta property="og:image" content="https://forplay.bg/forapi/phplib/timthumb/timthumb.php?src=/assets/articles/' . substr(
                $article['cover_img'], 0, strripos($article['cover_img'], '-')) .
                 '/' . $article['cover_img'] . '&w=1280&h=720">';
        echo '<meta property="og:site_name" content="Forplay">';
        echo '<meta property="og:locale" content="bg_BG">';
    }
    
    mysqli_close($link);
}
?>