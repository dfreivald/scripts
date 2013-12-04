/* striplines.js
 *
 * strips empty lines at the end of a file
 *
 * Dexter Freivald
 * 2007.aug.05
 *
 */

var file_name = WScript.Arguments( 0 );
var blank_lines = 0;
var eol = "\r\n";
var buff = "";
var l = "";

var fso = new ActiveXObject( "Scripting.FileSystemObject" );
var ts_in = fso.OpenTextFile( file_name, 1 );

while ( !ts_in.AtEndOfStream ) {
    l = ts_in.ReadLine( );

    if ( !l.length ) {
        blank_lines++;
        continue;
        }

    while ( blank_lines > 0 ) {
        buff += eol;
        blank_lines--;
        }
    buff += l + eol;
    }

ts_in.Close( );

var ts_out = fso.OpenTextFile( file_name, 2 );
ts_out.Write( buff );
ts_out.Close( );
