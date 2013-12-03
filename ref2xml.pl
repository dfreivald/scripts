#!/usr/bin/perl
#
# ref2xml.pl
#     reads a .REF, and outputs XML format
#
# 2013.nov.13 - v1.0 - Dexter Freivald

$display_name = shift;
die "Usage: ref2xml.pl <FILENAME.REF>\n" if $display_name eq '';

sub trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s; }
sub spaces { my $i = shift; while ($i--) { print " "; } }
sub xmltag { my $t = shift; my $be = shift; return substr($t, length($be)); }

$indent = 0;
$tab_stop = 4;

open DISPLAY, "< $display_name";
while (<DISPLAY>) {
    chomp;
    ($col, $val) = split(/:/);
    ($col, $val) = (trim($col), trim($val));
    if ( $col =~ /^begin_/ ) {
        spaces($indent);
        $indent += $tab_stop;
        printf("<%s seq=%s>\n", xmltag($col, 'begin_'), $val);
        }
    elsif ($col =~ /^end_/) {
        $indent -= $tab_stop;
        spaces($indent);
        printf("<%s />\n", xmltag($col, 'end_'));
        }
    else {
        spaces($indent);
        if ($val =~ /^".*"$/) { $val =~ s/^"|"$//g; }
        $val = trim($val);
        printf("<%s>%s</%s>\n", $col, $val, $col);
        }
    }
close DISPLAY;
