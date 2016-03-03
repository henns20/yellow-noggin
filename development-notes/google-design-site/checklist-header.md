header
*ngstyle on the  state
*shadow 
* ripples
*  check typography(colors)


1 basic body and html layout css
2 create header(main page header and article better)
2.1 navigation top menu bar layout same or very similar on both sections
2.2 behavior differences: small title hidden on main page only

2.3 header height differences
*articles: 64 pixels
*main page in sections 256 pixels

1. top level header - or real header
- header
- the nav wrapper
- todo other other stuff
- div nav text
- small title
- middle
- nav element

header behavior:
1
x*basic structure positioning(navigation menu top bar)
x*rapper and navigation text div
+to adjust vertical alignment 4 small title needed to use relative positioning for thehref(not sure how that will affect in long run)

header behavior:

2 *the header height changes

+solutions:
-(1)ngclass
**not optimum my first feeling buoh int 3 ford seemingly:
**use$stay includes or is to determine if it's on a blog post page
**ngclass object.site-header;.site-header-post(evaluating convention of course*a perfectly described)
**need to adjust header.css to maintain same interior css(adding css values using or including.site-header-post)
-(2) ngstyle
**saves(should) css adjustments
**$state service(still using)


1 *small title show and hide
+notes: (google design uses some animation that uses opacity invisibility)
* nghide show(using state service was used for this purpose at this point)
(holding off on fake shadow make sure you put on a checklist)
