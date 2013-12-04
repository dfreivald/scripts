/* unix2dos.js
 *
 * converts UNIX text files end of line to DOS
 *
 * Dexter Freivald
 * 2013.aug.13
 *
 */
var MBOKONLY        = 0;
var MBYESNOCANCEL   = 3;
var MBEXCLAMATION   = 48;
var MBRESULTYES     = 6;
var FOR_READING     = 1;
var FOR_WRITING     = 2;
var MSGTITLE        = "unix2dos";
var MSGCONFIRM      = "Convert all csv and text files in \n" +
                      "current directory from UNIX to DOS?\n\n" +
                      "This may take several minutes.";
var MSGFINISHED     = "Finished converting all files.";


var file_system = new ActiveXObject("Scripting.FileSystemObject");
var shell = new ActiveXObject("WScript.Shell");

function convert_file(file_name) {
    var file_read = file_system.OpenTextFile(file_name, FOR_READING);
    var file_write = file_system.OpenTextFile(file_name + '.tmp', FOR_WRITING, true);
    while (!file_read.AtEndOfStream) {
        // takes advantage of TextStream defaults to automatically remove and re-add default EOL
        file_write.WriteLine(file_read.ReadLine());
        }
    file_write.Close();
    file_read.Close();
    file_system.DeleteFile(file_name);
    file_system.MoveFile(file_name + '.tmp', file_name);
    }

if (!WScript.Arguments.Count()) {
    if (MBRESULTYES == shell.Popup(MSGCONFIRM, 0, MSGTITLE, MBYESNOCANCEL + MBEXCLAMATION)) {
        var cur_directory = file_system.GetFolder(shell.CurrentDirectory);
        for (var cur_file = new Enumerator(cur_directory.Files); !cur_file.atEnd(); cur_file.moveNext()) {
            if (/\.csv$|\.txt$/.test(cur_file.item().Name))
                convert_file(cur_file.item().Name);
            }
        }
    }
else {
    convert_file(WScript.Arguments(0));
    }

shell.Popup(MSGFINISHED, 0, MSGTITLE, MBOKONLY);

