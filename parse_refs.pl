#!/usr/bin/perl
#
# parse_refs.pl
#     parses elements out of a .REF, and outputs CSV format
#
# 2013.nov.12 - v1.0 - Dexter Freivald

$display_name = shift;
die "Usage: parse_refs.pl <FILENAME.REF>\n" if $display_name eq '';

sub trim { my $s = shift; $s =~ s/^\s+|\s+$//g; return $s; }
sub clear_data { foreach $i (@_) { $i = ''; } }
sub print_data { foreach $i (@_) { print "$i,"; } print "\n"; }

%elem_col = (
    'display_name',         0,
    'ref_id',               1,
    'element_id',           2,
    'element_type',         3,
    'pres_ext_identity',    4,
    'pres_prim_pref',       5,
    'pres_iap_iref',        6,
    'pres_suppl_pres_form', 7,
    'pres_suppl_att_table', 8
);
@elem_dat = ( 0..8 );

open(DISPLAY, "< $display_name ");
while (<DISPLAY>)
{
    chomp;
    ($col, $val) = split(':');
    ($col, $val) = (trim ($col), trim($val));

    if ($col eq 'begin_elem_ref_part') {
        clear_data(@elem_dat);
        @elem_dat[$elem_col{'display_name'}] = $display_name;
        @elem_dat[$elem_col{'ref_id'}] = $val;
    }
    elsif (exists $elem_col{$col}) {
        @elem_dat[$elem_col{$col}] = $val;
    }
    elsif ($col eq 'end_elem_ref_part') {
        # filter out empty pres_ext_identity, TAGS, MANINSTATION, UNACK ALARM, non-discrete elements
        print_data(@elem_dat) if (
            @elem_dat[$elem_col{'pres_ext_identity'}] ne '' &&
            @elem_dat[$elem_col{'pres_prim_pref'}] !~ /TAG LEVEL|MANINSTATION|11/ &&
            @elem_dat[$elem_col{'element_type'}] eq 'discrete_element' );
    }
}
close DISPLAY;
