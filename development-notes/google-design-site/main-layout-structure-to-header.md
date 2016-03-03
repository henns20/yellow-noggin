###now next
navigation menu bar can I look at it as a separate component single without
*separate out header
+mainz sections
+header individual blog post article page


##main layout structure notes
*see google drawing
https://docs.google.com/drawings/d/1XmpoqMAhe74QFwdLPoKgDnff1htr4MZflIB4Qq0WQIY/edit
* concentrating on structure(top level less the more complex nuances g)

###shell
* (1) html
+ no height or width properties
+ references *{box-sizing: border-box} (is this in angular material?)
+ user agent: references display block on html element

* (2) body
+ references the border box
+ no height or width properties referenced

* (3) script tags
+ google analytics
+ google tag manager


<!-- start of the header section -->

header (main page)
- _wrapper (nav menu (nav text wrapper))
+behavior: position at absolutely 2 the header very top very left very righ-t shadow
+behavior:  positioned absolutely to the 12 pixels negative bottom right left 0
-

*(4)header
+ part of a group (listed elements)with display block property
 - article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary (listed together)
+ references border box
+ site-header property:
-fixed position;
-width 100 percent;
-zindex 10000
-height 256 px static on the site header class name
- dynamic height(element.style)256px
**probably related to jssite  headerclass name

*(4.1)div _wrapper (js-nav-row)
+ references border box
+ mark up css .site-header ._rapper: (properties)
 - z index 1
position absolute
top 0
right 0
left 0
hgt 64 px

*(4.1.1) _fake shadow  (js fake shadow)
*provide the shadow for the navigation wrapper
+ hidden on the front page or section pages



<!-- end of header section  -->
