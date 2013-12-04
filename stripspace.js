/* stripspace.js
 *
 * strips trailing spaces
 *
 * Dexter Freivald
 * 2007.aug.05
 *
 */

var file_name = WScript.Arguments( 0 );
var buff = "";
var eol = "\r\n";

var fso = new ActiveXObject( "Scripting.FileSystemObject" );
var ts_in = fso.OpenTextFile( file_name, 1 );

while ( !ts_in.AtEndOfStream )
    buff += ts_in.ReadLine( ).replace( /\s+$/, '' ) + eol;

ts_in.Close( );

var ts_out = fso.OpenTextFile( file_name, 2 );
ts_out.Write( buff );
ts_out.Close( );
