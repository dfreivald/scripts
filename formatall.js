/* formatall.js
 *
 * runs formatting tools
 *
 * Dexter Freivald
 * 2007.aug.05
 *
 */

var shell = new ActiveXObject( "WScript.Shell" );

function run_tool( tool ) {
    shell.Run( '"' + WScript.Arguments( 0 ) + '\\' + tool + '" "' + WScript.Arguments( 1 ) + '"', 10, true );
    }

run_tool( 'tabs2spaces.js' );
run_tool( 'stripspace.js'  );
run_tool( 'striplines.js'  );
