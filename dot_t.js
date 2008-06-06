lkadjfldocument.write('<script type="text/javascript" src="dot_t/js_tile/js_tile.js"></script>');

document.write('<link rel="stylesheet" href="dot_t/syntaxhighlighter/SyntaxHighlighter.css" type="text/css" />');
document.write('<link rel="stylesheet" href="dot_t/syntaxhighlighter/shBrushCss.js"></script>');

document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shCore.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushCSharp.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushCpp.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushDelphi.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushJScript.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushJava.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushPhp.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushPython.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushRuby.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushSql.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushVb.js"></script>');
document.write('<script type="text/javascript" src="dot_t/syntaxhighlighter/shBrushXml.js"></script>');

document.write('<link rel="stylesheet" href="dot_t/SyntaxHighlighterOverrides.css" type="text/css" />');

function pre_convert(text){
  text = text.replace(/::slide(::)?/g, '\n</div><div class="slide">\n'); // slide dividers
	
	code_styles = ["cpp", "c", "c\\+\\+", "c#", "c-sharp", "csharp", "css", "delphi", "pascal", "java", "js", "jscript", "javascript", "php", "py", "python", "rb", "ruby", "rails", "ror", "sql", "vb", "vb\.net", "xml", "html", "xhtml", "xslt"]
	for (var i = 0; i < code_styles.length; i++) {
		start_code = new RegExp('::'+code_styles[i],'g')
		stop_code  = new RegExp(code_styles[i]+'::','g')
		text = text.replace(start_code, '\n<pre name="code" class="'+code_styles[i]+':nocontrols">\n');	// ruby code
	  text = text.replace(stop_code,  '\n</pre>\n');																									// end pre
	}
	text = '<div class="slide">' + text + '\n\n</div>'; // wrap is all in slide divs
	return text;
}

function convert_presentation() { 
	var presentation_div = getElementsByClassNames('presentation')[0];
  var presentation_code = presentation_div.innerHTML;
	var pre_converted = pre_convert(presentation_code);
	
  var converter = new Textile.converter();
  var presentation_html = converter.to_html(pre_converted);
	
  presentation_div.innerHTML = presentation_html;
  startup();
	dp.SyntaxHighlighter.HighlightAll('code');
}

// returns all elements with exactly matching classnames.
function getElementsByClassNames(classnames){
  var elements = [];
  var allElems = document.getElementsByTagName('*');
  for (var i = 0; i < allElems.length; i++) {
    var thisElem = allElems[i];
    if (thisElem.className && thisElem.className == classnames) {
      elements.push(thisElem);
    }
  }
  return(elements);
}

window.onload = convert_presentation;
