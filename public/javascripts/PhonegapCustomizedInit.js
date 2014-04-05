/*This is a custom init event for JQueryMobile*/
/*Used to tweak jquery mobile default settings such ass xss and default style*/

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    
    //Enable XSS
    //optional, only for several browser ex. Blackberry
    $.support.cors = true;
    //mandatory
    $.mobile.allowCrossDomainPages = true;

    //Enable no style widgets, widget must be wrapped with 
    //<div data-enhance="false"></div>
    $.mobile.ignoreContentEnabled = true;
});