/* sort.js
 *
 * sorts the lines of a text file
 *
 * Dexter Freivald
 * 2007.dec.04
 * taken from: http://www.microsoft.com/technet/scriptcenter/resources/qanda/feb05/hey0225.mspx
 */

var file_name = WScript.Arguments( 0 );
var eol = "\r\n";
var buff = "";

var rec = new ActiveXObject( "ADOR.Recordset" );
rec.Fields.Append( "sortme", 200, 255);
rec.Open();

var fso = new ActiveXObject( "Scripting.FileSystemObject" );
var ts_in = fso.OpenTextFile( file_name, 1 );

while ( !ts_in.AtEndOfStream ) {
    rec.AddNew();
    rec("sortme") = ts_in.ReadLine( );
    rec.Update();
        }

ts_in.Close();

rec.Sort = "sortme";
rec.MoveFirst();
while ( !rec.EOF ) {
    buff += rec.Fields.Item( "sortme" ) + eol;
    rec.MoveNext();
        }

var ts_out = fso.OpenTextFile( file_name, 2 );
ts_out.WriteLine( buff );
ts_out.Close( );
