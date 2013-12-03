#!/usr/bin/perl
#
# fix_refs.pl
#     outputs input ref, with specified ELEMENT_ID set to show MANUAL ENTRY
#
# 2013.nov.20 - v1.0 - Dexter Freivald
# 2013.nov.21 - v2.0 - Dexter Freivald - consolidated to single loop

$element_to_fix = shift;
$display_name = shift;
$fix_element = 0;

die "Usage: fix_refs.pl <ELEMENT_NO> <FILENAME.REF>\n" if ($display_name eq '' || $element_to_fix eq '');

sub trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s; }

%elem_flag = (
  'pres_prim_pref',       0,
  'pres_iap_iref',        0,
  'pres_suppl_pres_form', 0,
  'pres_suppl_att_table', 0
);

%elem_fix = (
  'pres_prim_pref',       '"3"',
  'pres_iap_iref',        '"12"',
  'pres_suppl_pres_form', '3',
  'pres_suppl_att_table', '"VAT_DOUBLE_INDIC"'
);

open DISPLAY, "< $display_name";
while (<DISPLAY>)
{
    chomp;
    ($col, $val) = split(':');
    ($col, $val) = (trim($col), trim($val));

    if ($fix_element) {
        # insert pres_iap_iref before pres_selectable_element
        if ($col eq 'pres_selectable_element' && $elem_flag{'pres_iap_iref'} eq 0) {
            $elem_flag{'pres_iap_iref'} = 1;
            print "  pres_iap_iref : \"12\"\n$_\n";
	    }
        elsif (exists $elem_flag{$col}) {
            $elem_flag{$col} = 1;
            print "  $col : $elem_fix{$col}\n";
        }
        elsif ($col eq 'end_elem_ref_part') {
            # insert pres_suppl_att_table before end_elem_ref_part if not already present
            if ($elem_flag{'pres_suppl_att_table'} eq 0) {
                print "  pres_suppl_att_table : \"VAT_DOUBLE_INDIC\"\n";
            }
            print "$_\n";
            # we're done! finish outputting file, and jump out of while loop
            while (<DISPLAY>) { print; }
            last;
        }
        else {
            print "$_\n";
        }
    }
    else {
        $fix_element = ($col eq 'begin_elem_ref_part' && $val eq $element_to_fix);
        print "$_\n";
    }
}
close DISPLAY;
