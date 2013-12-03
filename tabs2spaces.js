/* tabs2spaces.js
 *
 * converts tabs to spaces
 *
 * Dexter Freivald
 * 2007.aug.05
 *
 */
var FOR_READING = 1;
var FOR_WRITING = 2;
var TAB_STOP = 8;
var TAB = /\t/;
var EOL = "\r\n";

function spaces(n) { for (var s = ""; n > 0; n--) s += ' '; return s; }

var file_system = new ActiveXObject("Scripting.FileSystemObject");
var file_name = WScript.Arguments(0);
var text_file = file_system.OpenTextFile(file_name, FOR_READING);

var buffer = "";
var cur_line = "";
while (!text_file.AtEndOfStream) {
    cur_line = text_file.ReadLine();
    while (TAB.test(cur_line))
        cur_line = cur_line.replace(TAB, spaces(TAB_STOP - cur_line.search(TAB) % TAB_STOP));
    buffer += cur_line + EOL;
    }
text_file.Close();

text_file = file_system.OpenTextFile(file_name, FOR_WRITING);
text_file.Write(buffer);
text_file.Close();
