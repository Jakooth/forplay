<?php
include ('../../forsecret/db.php');

header('Content-type: application/xml');

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
              xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">';

$get_articles_sql = "SELECT for_articles.*, 
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
                     LIMIT 1000;";

$get_articles_result = mysqli_query($link, $get_articles_sql);

while ($article = mysqli_fetch_assoc($get_articles_result)) {
    
    /**
     * Merge tags.
     */
    
    $get_tags_sql = "SELECT for_tags.*, for_rel_tags.prime FROM for_tags
                     LEFT JOIN for_rel_tags
                     ON for_tags.tag_id = for_rel_tags.tag_id
                     WHERE for_rel_tags.article_id = {$article ['article_id']}
                     GROUP BY tag_id
                     ORDER BY for_rel_tags.prime DESC;";
    
    $get_tags_result = mysqli_query($link, $get_tags_sql);
    
    while ($tag = mysqli_fetch_assoc($get_tags_result)) {
        $article['tags'][] = $tag['en_name'];
    }
    
    $mysqlDate = strtotime($article['date']);
    $googleDate = date("c", $mysqlDate);
    $url = urlencode(
            'https://www.forplay.com/articles/' . $article['type'] . '/' .
                     $article['subtype'] . '/' . $article['article_id'] . '/' .
                     $article['url']);
    
    echo '<url>
        <loc>' . $url . '</loc>
        <news:news>
            <news:publication>
                <news:name>Forplay</news:name>
                <news:language>bg</news:language>
            </news:publication>
            <news:publication_date>' .
             $googleDate .
             '</news:publication_date>
            <news:keywords>' .
             join(', ', $article['tags']) . '</news:keywords>
            <news:title>' .
             $article['title'] . '</news:title>
        </news:news>
    </url>';
}

echo '</urlset>';
?>

