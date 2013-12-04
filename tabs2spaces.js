/* tabs2spaces.js
 *
 * converts tabs to spaces - drag and drop a file onto this script to convert tabs
 *
 * 2007.aug.05 v1.0 - Dexter Freivald - initial version.
 * 2013.dec.04 v1.1 - Dexter Freivald - added second argument as tab_stop setting
 *
 */
var FOR_READING = 1;
var FOR_WRITING = 2;
var TAB_STOP_DEFAULT = 8;
var TAB = /\t/;
var EOL = "\r\n";

function spaces(n) { for (var s = ""; n > 0; n--) s += ' '; return s; }

var tab_stop = WScript.Arguments.Count() > 1 ? WScript.Arguments(1) : TAB_STOP_DEFAULT;

var file_system = new ActiveXObject("Scripting.FileSystemObject");
var file_name = WScript.Arguments(0);
var text_file = file_system.OpenTextFile(file_name, FOR_READING);

var buffer = "";
var cur_line = "";
while (!text_file.AtEndOfStream) {
    cur_line = text_file.ReadLine();
    while (TAB.test(cur_line))
        cur_line = cur_line.replace(TAB, spaces(tab_stop - cur_line.search(TAB) % tab_stop));
    buffer += cur_line + EOL;
    }
text_file.Close();

text_file = file_system.OpenTextFile(file_name, FOR_WRITING);
text_file.Write(buffer);
text_file.Close();

