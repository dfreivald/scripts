/* removes rde_* from csv files */
var fso = new ActiveXObject( "Scripting.FileSystemObject" );
var shell = new ActiveXObject( "WScript.Shell" );

var d = fso.GetFolder( shell.CurrentDirectory );

for ( var e = new Enumerator(d.Files); !e.atEnd(); e.moveNext() )
	if ( /^rde_(.*).csv$/.test( e.item().Name ) )
		fso.MoveFile( e.item().Name, e.item().Name.substring(4) );

