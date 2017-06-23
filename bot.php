<?php
/*
 * Banned IP Addresses and Bots - Redirects banned visitors who make it past the
 * .htaccess and or robots.txt files to an URL.
 * The $banned_ip_addresses array can contain both full and partial IP
 * addresses, i.e. Full = 123.456.789.101, Partial = 123.456.789. or 123.456. or
 * 123.
 * Use partial IP addresses to include all IP addresses that begin with a
 * partial IP addresses. The partial IP addresses must end with a period.
 * The $banned_bots, $banned_unknown_bots, and $good_bots arrays should contain
 * keyword strings found within the User Agent string.
 * The $banned_unknown_bots array is used to identify unknown robots (identified
 * by 'bot' followed by a space or one of the following characters _+:,.;/\-).
 * The $good_bots array contains keyword strings used as exemptions when
 * checking for $banned_unknown_bots. If you do not want to utilize the
 * $good_bots array such as
 * $good_bots = array(), then you must remove the the keywords strings
 * bot.','bot/','bot-' from the $banned_unknown_bots array or else the good
 * bots will also be banned.
 */
$banned_ip_addresses = array(
        '41.',
        '64.79.100.23',
        '5.254.97.75',
        '148.251.236.167',
        '88.180.102.124',
        '62.210.172.77',
        '45.',
        '195.206.253.146'
);
$banned_bots = array(
        'AhrefsBot',
        'BLEXBot',
        '.ru',
        'AhrefsBot',
        'crawl',
        'crawler',
        'DotBot',
        'linkdex',
        'majestic',
        'meanpath',
        'PageAnalyzer',
        'robot',
        'rogerbot',
        'semalt',
        'SeznamBot',
        'spider',
        'SemrushBot-BA'
);
$banned_unknown_bots = array(
        'bot ',
        'bot_',
        'bot+',
        'bot:',
        'bot,',
        'bot;',
        'bot\\',
        'bot.',
        'bot/',
        'bot-'
);
$good_bots = array(
        'Google',
        'MSN',
        'bing',
        'Slurp',
        'Yahoo',
        'DuckDuck'
);
$banned_redirect_url = 'https://www.forplay.bg/hulk.html';

/**
 * Visitor's IP address and Browser (User Agent).
 */
$ip_address = $_SERVER['REMOTE_ADDR'];
$browser = $_SERVER['HTTP_USER_AGENT'];

/**
 * Declared Temporary Variables.
 */
$ipfound = $piece = $botfound = $gbotfound = $ubotfound = '';

/**
 * Checks for Banned IP Addresses and Bots.
 */
if ($banned_redirect_url != '') {
    /**
     * Checks for Banned IP Address.
     */
    if (! empty($banned_ip_addresses)) {
        if (in_array($ip_address, $banned_ip_addresses)) {
            $ipfound = 'found';
        }
        if ($ipfound != 'found') {
            $ip_pieces = explode('.', $ip_address);
            foreach ($ip_pieces as $value) {
                $piece = $piece . $value . '.';
                if (in_array($piece, $banned_ip_addresses)) {
                    $ipfound = 'found';
                    break;
                }
            }
        }
        if ($ipfound == 'found') {
            header("location: $banned_redirect_url");
            exit();
        }
    }
    
    /**
     * Checks for Banned Bots.
     */
    if (! empty($banned_bots)) {
        foreach ($banned_bots as $bbvalue) {
            $pos1 = stripos($browser, $bbvalue);
            if ($pos1 !== false) {
                $botfound = 'found';
                break;
            }
        }
        if ($botfound == 'found') {
            header("location: $banned_redirect_url");
            exit();
        }
    }
    
    /**
     * Checks for Banned Unknown Bots.
     */
    if (! empty($good_bots)) {
        foreach ($good_bots as $gbvalue) {
            $pos2 = stripos($browser, $gbvalue);
            if ($pos2 !== false) {
                $gbotfound = 'found';
                break;
            }
        }
    }
    if ($gbotfound != 'found') {
        if (! empty($banned_unknown_bots)) {
            foreach ($banned_unknown_bots as $bubvalue) {
                $pos3 = stripos($browser, $bubvalue);
                if ($pos3 !== false) {
                    $ubotfound = 'found';
                    break;
                }
            }
            if ($ubotfound == 'found') {
                header("location: $banned_redirect_url");
                exit();
            }
        }
    }
}
?>