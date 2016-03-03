###Get Section And Front Page 2 look(structurally for example image look)

x###separate staging files with gulp unique filenames and can't get
+starting parts:
-(1)blog html(the html body that I create for the blog post(considerate html in between body tags))
- (2) blog-metadata: includes Excerpt, category, author name the image stuff that gives the blog color and meta- more information
+step 1: clean html file(condense quasi-minify)
+step 2: combine minified html and blog meta-data & story is a unique file

*done for now seemingly works pretty smooth
well documented in the court file
on second thought: need to document what I did similar to the old utilityin in if


##TODO
*unit test category routes
*stack overflow google groups scope.watch scenario and core controller
*separate staging files with gulp unique filenames and can't get

###capitalize the word of category id
*best practice create your filter
* or use 1 from the community trying this 1 out:
https://github.com/Puigcerber/angular-capitalize-filterback
*also a best practice: in larger scenarios most likely or more relevantly: stay away from filters in the ui
*do it in the controller
*coding pattern strategy: Smart Welcomed/Expected/Synergistic Leverage
+code that is straightforward but still may take some time 2 that and make robust
+k blocks, modules, snippets of behaviors, features that are clear but will take time(help save time DRY, LEAN Programming(lean on others as well as the traditional meaning of lean as far as business meetingtoyota))


###re-factors
*made initialize b promises 4 couple reasons for more of a revealed convention
*for some other reason I can think of

###worked on section view
+created a route with state parameters
+created a viewer(category view works for both)

###$state en route scope as suggested in ui router
* https://github.com/angular-ui/ui-router/blob/master/sample/index.html#L51https://gist.github.com/blesh/8846528
* category https://github.com/angular-ui/ui-router/blob/master/sample/app/app.js


###reviewing controller variables or bindings up top(how)
* for example: undefined ?      vm.isHomeState = undefined;(as a revealing convention)


###core.controller: vm.isHomeState: 4 header height and small title visibility
*goal behavior:
+check $state.current.name to see if it's 'blog' or not
-save true or false into a variable to be used by ngstyle and ngshow

*more:
+$state.current.name should be available on first page load*
+"" and any future change 2 the view

*issues current:
+$state.current.name not available immediately
+ "" it does not change inside core controller when clicking 2 a different view(state for some reason)
- Ireason for route scope on?

*overall problems with this exercise or endeavor
+computer working in the controller and real environment but do not know how to replicating tests



###core.controller: best way to promote*behavior 4 home blog state identifier(his own steve 4 dynamic html headerheight;small title show)
options:
* root scope.on state change start like gallery module in huber
* scope.watch?scope.watch works but can't test it
+may be transitionto will work(state go)
-is there a difference between the 2(update state.go uses transition to underneath so seemingly no oh going to spend time on let's try root scope method)



###core.controller.spec(getting the proper state for your controller that relies on a certain state)
see: should check and store is home blog state for dynamic html(header height, site title )
good source for blog post quick blog post
why I needed
logic behind it
what I do before
(1)state 1 = $state.go('blog');  $state: state 1
(2) $state.go rootscope.apply(after controller instantiation(state was empty 1 testing controller values g))


###play-by-play john papa
testing state(should work with state.go)
john uses state.is(doesn't register a test)unless using toBe method

###core.controller.spec
jamie q
just the right convention adding yn.blog in the module mock(it worked)
question:do is it better to put into the module itself(as a dependency)
both work


### angular behavior
*(1)dynamic header height
+ngstyle
+directly in controller  site controller
